/* BENCH — game engine. No dependencies. */
(() => {
  "use strict";

  const DATA = window.BENCH_DATA;
  if (!DATA) throw new Error("BENCH data failed to load.");

  const COMPOUNDS = DATA.compounds;
  const REAGENTS = DATA.reagents;
  const SMILES = DATA.smiles || {};
  const REWARDS = DATA.rewards || {
    case: { id: "organic-case", name: "The Organic Chemistry Case", cost: 30, duplicateRefunds: {} },
    rarities: [],
    items: []
  };
  const CASE = REWARDS.case;
  const RARITIES = REWARDS.rarities || [];
  const REWARD_ITEMS = REWARDS.items || [];
  const EXPANSION = DATA.expansion || { chapters: [] };
  const EXP_CHAPTERS = EXPANSION.chapters || [];
  const EXP_CASES = EXPANSION.cases || [];
  const CASE_DEFS = [
    {
      id: CASE.id,
      name: CASE.name,
      tagline: CASE.tagline,
      cost: CASE.cost,
      items: REWARD_ITEMS,
      kind: "organic"
    },
    ...EXP_CASES.map((def) => ({ ...def, kind: "expansion" }))
  ];
  const CASE_ITEM_TOTAL = CASE_DEFS.reduce((sum, def) => sum + def.items.length, 0);
  const REACTIONS = DATA.reactions;
  const MISSIONS = DATA.missions;
  const CONCEPTS = DATA.concepts;
  const REFERENCE = DATA.reference;
  const STORE_KEY = "bench.progress.v1";

  const app = document.getElementById("main");
  const overlayRoot = document.getElementById("overlay-root");
  const topbarStatus = document.getElementById("topbar-status");

  let progress = loadProgress();
  const view = { screen: "title", overlay: null };
  let mission = null;
  let concept = null;
  let drill = null;
  let chapterView = null;
  let caseState = null;
  let lastOverlayFocus = null;

  /* ============================================================
     persistence
     ============================================================ */

  function blankProgress() {
    return {
      missions: {},
      concepts: { best: 0, attempts: 0 },
      totalRuns: 0,
      points: 0,
      casesOpened: 0,
      duplicates: 0,
      collection: {},
      expansion: { tutorials: {}, best: {}, attempts: {}, completions: {}, cases: {} }
    };
  }

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return blankProgress();
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return blankProgress();
      parsed.missions = parsed.missions && typeof parsed.missions === "object" ? parsed.missions : {};
      parsed.concepts = parsed.concepts && typeof parsed.concepts === "object"
        ? parsed.concepts
        : { best: 0, attempts: 0 };
      if (typeof parsed.concepts.best !== "number") parsed.concepts.best = 0;
      if (typeof parsed.concepts.attempts !== "number") parsed.concepts.attempts = 0;
      if (typeof parsed.totalRuns !== "number") parsed.totalRuns = 0;
      if (typeof parsed.points !== "number" || parsed.points < 0) parsed.points = 0;
      if (typeof parsed.casesOpened !== "number") parsed.casesOpened = 0;
      if (typeof parsed.duplicates !== "number") parsed.duplicates = 0;
      parsed.collection = parsed.collection && typeof parsed.collection === "object" ? parsed.collection : {};
      parsed.expansion = parsed.expansion && typeof parsed.expansion === "object" ? parsed.expansion : {};
      parsed.expansion.tutorials = parsed.expansion.tutorials && typeof parsed.expansion.tutorials === "object" ? parsed.expansion.tutorials : {};
      parsed.expansion.best = parsed.expansion.best && typeof parsed.expansion.best === "object" ? parsed.expansion.best : {};
      parsed.expansion.attempts = parsed.expansion.attempts && typeof parsed.expansion.attempts === "object" ? parsed.expansion.attempts : {};
      parsed.expansion.completions = parsed.expansion.completions && typeof parsed.expansion.completions === "object" ? parsed.expansion.completions : {};
      parsed.expansion.cases = parsed.expansion.cases && typeof parsed.expansion.cases === "object" ? parsed.expansion.cases : {};
      return parsed;
    } catch {
      return blankProgress();
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(progress));
    } catch {
      /* private mode: the session still works */
    }
  }

  function totalYield() {
    return MISSIONS.reduce((sum, m) => sum + (progress.missions[m.id]?.best || 0), 0);
  }

  function clearedCount() {
    return MISSIONS.filter((m) => progress.missions[m.id]?.completed).length;
  }

  function rankFor(xp) {
    if (xp >= 1150) return "Chief Chemist";
    if (xp >= 850) return "Synthesis Fellow";
    if (xp >= 550) return "Bench Chemist";
    if (xp >= 250) return "Junior Analyst";
    return "Lab Assistant";
  }

  /* ============================================================
     small helpers
     ============================================================ */

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[ch]));
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function plural(n, word) {
    return `${n} ${word}${n === 1 ? "" : "s"}`;
  }

  function compound(id) {
    return COMPOUNDS[id] || { name: id, formula: id, structure: "", groups: [], note: "" };
  }

  function reagent(id) {
    return REAGENTS[id] || { label: id, short: id, family: "", aliases: [], fail: "" };
  }

  function rarityById(id) {
    return RARITIES.find((r) => r.id === id) || { id, label: id, color: "#8b929d", order: 99 };
  }

  function rewardItemById(id) {
    return REWARD_ITEMS.find((item) => item.id === id) || null;
  }

  function collectionCount() {
    return REWARD_ITEMS.filter((item) => (progress.collection?.[item.id] || 0) > 0).length;
  }

  function caseDef(caseId) {
    return CASE_DEFS.find((def) => def.id === caseId) || CASE_DEFS[0];
  }

  function isOrganicCase(def) {
    return def.id === CASE.id;
  }

  function caseRecordFor(def) {
    if (isOrganicCase(def)) {
      return {
        opened: progress.casesOpened || 0,
        duplicates: progress.duplicates || 0,
        collection: progress.collection || {}
      };
    }
    return expCaseRecord(def.id);
  }

  function caseCollectionFor(def) {
    return caseRecordFor(def).collection || {};
  }

  function caseFound(def) {
    return def.items.filter((item) => (caseCollectionFor(def)[item.id] || 0) > 0).length;
  }

  function caseOpenedCount(def) {
    return caseRecordFor(def).opened || 0;
  }

  function caseTotalFound() {
    return CASE_DEFS.reduce((sum, def) => sum + caseFound(def), 0);
  }

  function casesOpenedTotal() {
    return CASE_DEFS.reduce((sum, def) => sum + caseOpenedCount(def), 0);
  }

  function expCaseRecord(caseId) {
    if (!progress.expansion.cases[caseId]) {
      progress.expansion.cases[caseId] = { opened: 0, duplicates: 0, collection: {} };
    }
    return progress.expansion.cases[caseId];
  }

  function caseOdds(def) {
    const total = def.items.reduce((sum, item) => sum + (item.weight || 0), 0) || 1;
    return RARITIES.map((rarity) => {
      const items = def.items.filter((item) => item.rarity === rarity.id);
      const weight = items.reduce((sum, item) => sum + (item.weight || 0), 0);
      return { ...rarity, items, weight, percent: (weight / total) * 100 };
    }).filter((rarity) => rarity.items.length > 0);
  }

  function rollFrom(items) {
    const total = items.reduce((sum, item) => sum + (item.weight || 0), 0);
    let roll = Math.random() * total;
    for (const item of items) {
      roll -= item.weight || 0;
      if (roll <= 0) return item;
    }
    return items[items.length - 1];
  }

  function recordCaseOpen(def, item, isNew, refund) {
    const rec = caseRecordFor(def);
    if (isOrganicCase(def)) {
      progress.points = (progress.points || 0) - def.cost;
      progress.casesOpened = (progress.casesOpened || 0) + 1;
      if (isNew) {
        progress.collection[item.id] = 1;
      } else {
        progress.points += refund;
        progress.duplicates = (progress.duplicates || 0) + 1;
        progress.collection[item.id] = (progress.collection[item.id] || 0) + 1;
      }
      return;
    }
    progress.points = (progress.points || 0) - def.cost;
    rec.opened = (rec.opened || 0) + 1;
    if (isNew) {
      rec.collection[item.id] = 1;
    } else {
      progress.points += refund;
      rec.duplicates = (rec.duplicates || 0) + 1;
      rec.collection[item.id] = (rec.collection[item.id] || 0) + 1;
    }
  }

  function rewardDiagramHTML(item, className = "reward-figure") {
    return `
      <figure class="${className}">
        <svg class="structure-svg" data-smiles="${esc(item.smiles)}" role="img" aria-label="Skeletal structure of ${esc(item.name)}" preserveAspectRatio="xMidYMid meet"></svg>
        <figcaption>${esc(item.name)}</figcaption>
      </figure>
    `;
  }

  function structureDiagramHTML(id) {
    const name = compound(id).name;
    const smiles = SMILES[id];
    if (!smiles) {
      return `<div class="structure-fallback" role="img" aria-label="Skeletal structure of ${esc(name)} unavailable">Skeletal structure unavailable</div>`;
    }
    return `<svg class="structure-svg" data-smiles="${esc(smiles)}" role="img" aria-label="Skeletal structure of ${esc(name)}" preserveAspectRatio="xMidYMid meet"></svg>`;
  }

  function conceptDiagramHTML(diagram) {
    return `
      <figure class="concept-diagram">
        <svg class="structure-svg" data-smiles="${esc(diagram.smiles)}" role="img" aria-label="Skeletal structure: ${esc(diagram.label)}" preserveAspectRatio="xMidYMid meet"></svg>
        <figcaption>${esc(diagram.label)}</figcaption>
      </figure>
    `;
  }

  function failDiagram(svg, message) {
    const fallback = document.createElement("div");
    fallback.className = "structure-fallback";
    fallback.setAttribute("role", "img");
    fallback.setAttribute("aria-label", `Skeletal structure unavailable: ${message}`);
    fallback.textContent = "Skeletal structure unavailable";
    svg.replaceWith(fallback);
  }

  function drawDiagrams() {
    const svgs = Array.from(document.querySelectorAll("svg[data-smiles]"));
    if (!svgs.length) return;
    if (typeof SmilesDrawer === "undefined") {
      svgs.forEach((svg) => failDiagram(svg, "structure renderer did not load"));
      return;
    }
    svgs.forEach((svg) => {
      if (svg.dataset.drawn === "1") return;
      const smiles = svg.dataset.smiles;
      try {
        const drawer = new SmilesDrawer.SvgDrawer({
          width: 340,
          height: 220,
          padding: 10,
          bondThickness: 1.35,
          bondLength: 24,
          fontSize: 11,
          compactDrawing: false,
          terminalCarbons: false,
          explicitHydrogens: false
        });
        SmilesDrawer.parse(
          smiles,
          (tree) => {
            try {
              drawer.draw(tree, svg, "light");
              svg.dataset.drawn = "1";
              svg.closest(".structure-figure")?.classList.add("structure-ready");
            } catch (err) {
              failDiagram(svg, err.message || "render failed");
            }
          },
          (err) => failDiagram(svg, err?.message || "parse failed")
        );
      } catch (err) {
        failDiagram(svg, err.message || "renderer failed");
      }
    });
  }

  function missionById(id) {
    return MISSIONS.find((m) => m.id === id) || null;
  }

  function nextMissionFor(id) {
    const i = MISSIONS.findIndex((m) => m.id === id);
    return i >= 0 && i + 1 < MISSIONS.length ? MISSIONS[i + 1] : null;
  }

  function totalSteps() {
    return MISSIONS.reduce((sum, m) => sum + m.steps.length, 0);
  }

  function rankLabel(score) {
    if (score >= 90) return "Distinction";
    if (score >= 70) return "Merit";
    if (score >= 50) return "Pass";
    return "Needs revision";
  }

  function normalise(value) {
    const subs = { "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4", "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9" };
    const sups = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9" };
    return String(value)
      .toLowerCase()
      .replace(/[₀₁₂₃₄₅₆₇₈₉]/g, (c) => subs[c] || c)
      .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (c) => sups[c] || c)
      .replace(/[⁺⁻]/g, (c) => (c === "⁺" ? "+" : "-"))
      .replace(/[^a-z0-9]/g, "");
  }

  function findReaction(from, reagentId, preferredTo) {
    const candidates = REACTIONS.filter((r) => r.from === from && r.reagent === reagentId);
    if (!candidates.length) return null;
    if (preferredTo) {
      const exact = candidates.find((r) => r.to === preferredTo);
      if (exact) return exact;
    }
    return candidates[0];
  }

  function focusElement(selector) {
    const el = document.querySelector(selector);
    if (el && typeof el.focus === "function") {
      try { el.focus({ preventScroll: true }); } catch { el.focus(); }
    }
  }

  function scrollTop() {
    window.scrollTo(0, 0);
  }

  function scrollToVessel() {
    const el = document.querySelector(".route-strip");
    if (el) el.scrollIntoView({ block: "start" });
  }

  function toast(message) {
    const old = document.querySelector(".toast");
    if (old) old.remove();
    const node = document.createElement("div");
    node.className = "toast";
    node.setAttribute("role", "status");
    node.textContent = message;
    document.body.appendChild(node);
    window.setTimeout(() => node.remove(), 2600);
  }

  /* ============================================================
     screens
     ============================================================ */

  function render() {
    renderTopbar();
    if (view.screen === "title") {
      app.innerHTML = titleHTML();
      document.title = "BENCH — Organic Synthesis";
    } else if (view.screen === "map") {
      app.innerHTML = mapHTML();
      document.title = "BENCH — Synthesis Briefs";
    } else if (view.screen === "mission") {
      app.innerHTML = missionHTML();
      document.title = mission ? `BENCH — ${mission.def.title}` : "BENCH — Brief";
    } else if (view.screen === "concept") {
      app.innerHTML = conceptHTML();
      document.title = "BENCH — Concept Lab";
    } else if (view.screen === "notes") {
      app.innerHTML = notesHTML();
      document.title = "BENCH — Field Notes";
    } else if (view.screen === "case") {
      app.innerHTML = caseHTML();
      document.title = "BENCH — Case Lab";
    } else if (view.screen === "collection") {
      app.innerHTML = collectionHTML();
      document.title = "BENCH — Collection Book";
    } else if (view.screen === "expansion") {
      app.innerHTML = expansionHTML();
      document.title = "BENCH — Expansion A–P";
    } else if (view.screen === "chapter") {
      app.innerHTML = chapterHTML();
      document.title = "BENCH — Physical & Inorganic Chapter";
    } else if (view.screen === "drill") {
      app.innerHTML = drillHTML();
      document.title = "BENCH — Chapter Drill";
    } else if (view.screen === "expcases") {
      app.innerHTML = expansionCasesHTML();
      document.title = "BENCH — Topic Cases";
    }
    drawDiagrams();
    renderOverlay();
    focusForScreen();
  }

  function renderTopbar() {
    const xp = totalYield();
    topbarStatus.innerHTML = `TOTAL <strong>${String(xp).padStart(3, "0")}</strong> · <strong>${progress.points || 0}</strong> PTS · ${esc(rankFor(xp))}`;
  }

  function focusForScreen() {
    if (view.screen === "mission" && mission) {
      if (mission.complete) {
        focusElement('[data-action="next-mission"]');
      } else if (mission.awaitingNext) {
        focusElement('[data-action="next"]');
      } else {
        focusElement("#answer");
      }
    }
  }

  /* ---------- title ---------- */

  function titleHTML() {
    const xp = totalYield();
    const cleared = clearedCount();
    return `
      <section class="title-screen">
        <div class="title-grid">
          <div class="title-copy">
            <span class="kicker">A text-based organic synthesis game · H2 2026</span>
            <h1>You have a flask.<br>You have a shelf.<br><em>Make the molecule.</em></h1>
            <p class="lede">Thirteen synthesis briefs, twenty-seven bench steps, a 300-question Concept Lab and a 16-chapter Physical & Inorganic expansion. Every reagent, condition, test, structure and mechanism is drawn from the H2 notes. Read the brief. Choose the reagent. Justify the route — then spend your universal points in the Case Lab.</p>
            <nav class="menu" aria-label="Main menu">
              <button class="menu-item" data-action="start-campaign">
                <span class="menu-no">01</span>
                <span class="menu-label">Campaign</span>
                <span class="menu-note">${MISSIONS.length} briefs · ${totalSteps()} steps</span>
              </button>
              <button class="menu-item" data-action="start-concepts">
                <span class="menu-no">02</span>
                <span class="menu-label">Concept Lab</span>
                <span class="menu-note">${CONCEPTS.length} questions</span>
              </button>
              <button class="menu-item" data-action="expansion">
                <span class="menu-no">03</span>
                <span class="menu-label">Physical & Inorganic</span>
                <span class="menu-note">${EXP_CHAPTERS.length} chapters · 1,600 MCQs</span>
              </button>
              <button class="menu-item" data-action="case-lab">
                <span class="menu-no">04</span>
                <span class="menu-label">Case Lab</span>
                <span class="menu-note">${CASE_DEFS.length} cases · ${CASE_ITEM_TOTAL} collectibles · ${CASE.cost} pts each</span>
              </button>
              <button class="menu-item" data-action="notes">
                <span class="menu-no">05</span>
                <span class="menu-label">Field Notes</span>
                <span class="menu-note">Reagents · tests · mechanisms</span>
              </button>
              <button class="menu-item" data-action="help">
                <span class="menu-no">06</span>
                <span class="menu-label">How to play</span>
                <span class="menu-note">Commands & scoring</span>
              </button>
            </nav>
          </div>

          <aside class="title-aside" aria-label="Bench card">
            <div class="paper-card">
              <div class="paper-label"><span>BENCH CARD / 001</span><span>${cleared}/${MISSIONS.length} CLEARED</span></div>
              <div class="flask-wrap">${flaskSVG()}</div>
              <blockquote>“A synthesis is not a list of reagents. It is a sequence of decisions.”</blockquote>
              <span class="stamp">H2 / ORGANIC</span>
              <div class="specimen-row">
                <div class="specimen"><strong>${MISSIONS.length}</strong>briefs</div>
                <div class="specimen"><strong>${totalSteps()}</strong>bench steps</div>
                <div class="specimen"><strong>${Object.keys(REAGENTS).length}</strong>reagents</div>
                <div class="specimen"><strong>${xp}</strong>total yield</div>
              </div>
            </div>
          </aside>
        </div>

        <div class="title-footer">
          <span><strong>Procedure:</strong> read the brief → choose one reagent system → run the reaction</span>
          <span><strong>Research:</strong> ${progress.points || 0} pts · ${caseTotalFound()}/${CASE_ITEM_TOTAL} case collectibles</span>
          <span><strong>Rank:</strong> ${esc(rankFor(xp))}</span>
          <span><strong>Best possible yield:</strong> ${MISSIONS.length * 100}</span>
        </div>
      </section>
    `;
  }

  function flaskSVG() {
    return `
      <svg viewBox="0 0 140 172" role="img" aria-label="A line drawing of a conical flask containing red liquid">
        <path d="M57 14h26v44l31 74c5 12-4 24-17 24H43c-13 0-22-12-17-24l31-74z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
        <path d="M38 119h64l13 30c2 6-2 10-8 10H33c-6 0-10-4-8-10z" fill="#b53621" opacity="0.84"/>
        <path d="M55 14h30M53 22h34" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
        <circle cx="56" cy="132" r="3" fill="#fbf8ef" opacity="0.8"/>
        <circle cx="76" cy="143" r="2.4" fill="#fbf8ef" opacity="0.7"/>
        <circle cx="90" cy="127" r="1.8" fill="#fbf8ef" opacity="0.6"/>
        <path d="M50 106c8 3 16-2 24 0s14 1 20-1" fill="none" stroke="#fbf8ef" stroke-width="1.4" opacity="0.55"/>
        <path d="M44 158h52" stroke="currentColor" stroke-width="1.4" opacity="0.45"/>
      </svg>
    `;
  }

  /* ---------- map ---------- */

  function mapHTML() {
    const xp = totalYield();
    const cleared = clearedCount();
    const pct = Math.round((cleared / MISSIONS.length) * 100);
    return `
      <header class="screen-head">
        <button class="back-button" data-action="home">← Bench</button>
        <div class="screen-title">
          <span class="kicker">Campaign / ${MISSIONS.length} briefs</span>
          <h2>Synthesis briefs</h2>
        </div>
        <div class="scoreboard">TOTAL YIELD <strong>${xp}</strong> / ${MISSIONS.length * 100}<br><span class="rank">${esc(rankFor(xp))} · ${progress.points || 0} PTS · ${collectionCount()}/${REWARD_ITEMS.length} COLLECTION</span></div>
      </header>

      <div class="map-toolbar">
        <div>CLEARED ${cleared} / ${MISSIONS.length} · ${totalSteps()} BENCH STEPS ACROSS THE CAMPAIGN</div>
        <div>PROGRESS
          <div class="progress-track" aria-label="Campaign progress"><div class="progress-fill" style="width:${pct}%"></div></div>
        </div>
      </div>

      <div class="map-grid">
        ${MISSIONS.map((m) => {
          const rec = progress.missions[m.id] || null;
          const status = rec && rec.completed
            ? `CLEARED · BEST ${rec.best}`
            : rec && rec.attempts
              ? `BEST ${rec.best || 0} · RETRY`
              : "UNOPENED";
          return `
            <button class="mission-card" data-action="mission" data-id="${m.id}">
              <span class="mission-no">${pad(m.number)}</span>
              <span class="mission-title">${esc(m.title)}</span>
              <span class="mission-route">${esc(compound(m.start).name)} <span>→</span> ${esc(compound(m.target).name)}</span>
              <span class="mission-meta">${esc(m.difficulty)} · ${plural(m.steps.length, "step")} · ${esc(m.topic)}</span>
              <span class="mission-status ${rec && rec.completed ? "cleared" : ""}">${status}</span>
            </button>
          `;
        }).join("")}
      </div>

      <div class="map-toolbar" style="margin-top:22px;border-top:1px solid var(--rule);padding-top:12px">
        <div>TIP: open <button class="link-button" data-action="notes">FIELD NOTES</button> if you need the reagent table.</div>
        <div class="map-links">
          <button class="link-button" data-action="start-concepts">CONCEPT LAB</button>
          <button class="link-button" data-action="expansion">EXPANSION A–P</button>
          <button class="link-button" data-action="case-lab">CASE LAB</button>
          <button class="link-button" data-action="help">HOW TO PLAY</button>
          <button class="link-button" data-action="reset-progress">RESET PROGRESS</button>
        </div>
      </div>
    `;
  }

  /* ---------- mission ---------- */

  function missionHTML() {
    if (!mission) return mapHTML();
    if (mission.complete) return completeHTML();

    const m = mission.def;
    const step = m.steps[mission.stepIndex];
    const from = compound(step.from);
    const to = compound(step.to);
    const target = compound(m.target);
    const shelf = step.shelf;
    const selected = mission.selected;

    return `
      <header class="screen-head">
        <button class="back-button" data-action="map">← Map</button>
        <div class="screen-title">
          <span class="kicker">Brief ${pad(m.number)} / ${MISSIONS.length} · ${esc(m.difficulty)}</span>
          <h2>${esc(m.title)}</h2>
        </div>
        <div class="scoreboard">YIELD <strong>${mission.score}</strong><br><span class="rank">STEP ${mission.stepIndex + 1} / ${m.steps.length}</span></div>
      </header>

      <div class="mission-layout">
        <section class="mission-main">
          <div class="brief-card">
            <p class="brief-label">Brief / ${esc(m.topic)}</p>
            <p>${esc(m.brief)}</p>
            <div class="objective"><span>Objective</span><div>${esc(m.objective)}</div></div>
          </div>

          <div class="route-strip">
            <div class="vessel">
              <div class="vessel-label">Current vessel</div>
              <div class="vessel-formula">${from.formula}</div>
              <div class="vessel-name">${esc(from.name)}</div>
              <figure class="structure-figure">
                ${structureDiagramHTML(step.from)}
                <figcaption>Skeletal structure · current state</figcaption>
              </figure>
              <div class="vessel-structure">${esc(from.structure)}</div>
            </div>
            <div class="route-arrow" aria-hidden="true">→<small>Target</small></div>
            <div class="vessel">
              <div class="vessel-label">Final target</div>
              <div class="vessel-formula">${target.formula}</div>
              <div class="vessel-name">${esc(target.name)}</div>
              <figure class="structure-figure">
                ${structureDiagramHTML(m.target)}
                <figcaption>Skeletal structure · target</figcaption>
              </figure>
              <div class="vessel-structure">${esc(target.structure)}</div>
            </div>
          </div>

          <div class="step-card">
            <div class="step-head">
              <span class="step-count">Step ${pad(mission.stepIndex + 1)} / ${pad(m.steps.length)}</span>
              <span>${from.formula} → ${to.formula}</span>
            </div>
            <h3>${esc(step.title)}</h3>
            <p class="step-prompt">${esc(step.prompt)}</p>
            ${step.to !== m.target ? `
              <div class="step-goal">
                <div class="step-goal-copy">
                  <span class="vessel-label">This step makes</span>
                  <div class="step-goal-formula">${to.formula}</div>
                  <div class="step-goal-name">${esc(to.name)}</div>
                </div>
                <figure class="structure-figure structure-figure-inline">
                  ${structureDiagramHTML(step.to)}
                  <figcaption>Skeletal · step target</figcaption>
                </figure>
              </div>
            ` : ""}
            ${mission.awaitingNext ? `
              <p class="step-complete">Step complete. The reaction receipt is below.</p>
            ` : answerFormHTML()}
          </div>

          ${feedbackHTML()}
          ${historyHTML()}
        </section>

        <aside class="shelf" aria-label="Reagent shelf">
          <div class="shelf-head"><span>Reagent shelf</span><span>${shelf.length} items</span></div>
          <p class="shelf-help">One complete reagent + condition system per step. Click to load it, then press Run. Or type its number.</p>
          <ol class="shelf-list">
            ${shelf.map((id, i) => {
              const r = reagent(id);
              return `
                <li>
                  <button class="shelf-item" type="button" data-reagent="${id}" aria-pressed="${selected === id}" ${mission.awaitingNext ? "disabled" : ""}>
                    <span class="shelf-no">${pad(i + 1)}</span>
                    <span class="shelf-label">${esc(r.label)}</span>
                    <span class="shelf-family">${esc(r.family)}</span>
                  </button>
                </li>
              `;
            }).join("")}
          </ol>
          <div class="shelf-foot">The shelf contains distractors. A reagent can be real chemistry and still be wrong for this step.</div>
        </aside>
      </div>
    `;
  }

  function answerFormHTML() {
    return `
      <form class="answer-form" id="answer-form" autocomplete="off">
        <label for="answer">Choose one reagent system</label>
        <div class="command-line">
          <span class="command-prompt" aria-hidden="true">&gt;</span>
          <input id="answer" name="answer" type="text" inputmode="text" spellcheck="false" autocapitalize="off" placeholder="type a shelf number, a reagent name, or a command" aria-describedby="command-help">
          <button type="submit">Run ⏎</button>
        </div>
        <div class="command-help" id="command-help">Try <code>hint</code> · <code>shelf</code> · <code>notes</code> · <code>status</code> · <code>reset</code> · <code>map</code> · <button type="button" class="link-button" data-action="help">help</button></div>
      </form>
    `;
  }

  function feedbackHTML() {
    if (!mission || !mission.feedback) return "";
    const f = mission.feedback;
    if (f.type === "ok") {
      const r = f.reaction;
      return `
        <div class="result result-ok" role="status" aria-live="polite">
          <div class="result-head"><span class="result-mark">✓</span><span>Reaction accepted</span><span class="result-cost">+0 yield</span></div>
          <div class="equation">${esc(compound(r.from).formula)} <span class="arrow">—[${esc(reagent(r.reagent).short)}]→</span> ${esc(compound(r.to).formula)}</div>
          <p><strong>${esc(r.type)}.</strong> ${esc(r.note)}</p>
          <p class="result-note">${esc(f.extra || "")}</p>
          ${mission.awaitingNext ? `
            <div class="continue-row">
              <button class="continue-button" data-action="next">Continue →</button>
            </div>
          ` : ""}
        </div>
      `;
    }
    if (f.type === "bad") {
      return `
        <div class="result result-bad" role="alert" aria-live="assertive">
          <div class="result-head"><span class="result-mark">×</span><span>Reaction rejected</span><span class="result-cost">−${f.penalty ?? 10} yield</span></div>
          <p class="choice">You chose: ${esc(f.choice || "—")}</p>
          <p>${esc(f.message)}</p>
          <p class="result-note">Check the functional group in the current vessel, then try again. <code>hint</code> costs 8 yield.</p>
        </div>
      `;
    }
    if (f.type === "hint") {
      return `
        <div class="result result-warn" role="status" aria-live="polite">
          <div class="result-head"><span class="result-mark">?</span><span>Hint ${f.n} / 3</span><span class="result-cost">−${f.penalty ?? 8} yield</span></div>
          <p>${esc(f.message)}</p>
        </div>
      `;
    }
    return `
      <div class="result result-warn" role="status" aria-live="polite">
        <div class="result-head"><span class="result-mark">i</span><span>Bench note</span></div>
        <p>${esc(f.message)}</p>
      </div>
    `;
  }

  function historyHTML() {
    if (!mission || !mission.history.length) {
      return `
        <div class="history">
          <div class="history-title">Route log</div>
          <p class="muted mono-sm">No steps logged yet. The first correct reagent opens the route.</p>
        </div>
      `;
    }
    return `
      <div class="history">
        <div class="history-title">Route log · ${mission.history.length} / ${mission.def.steps.length} steps</div>
        <ol class="history-list">
          ${mission.history.map((h, i) => `
            <li>
              <span class="tick">✓</span>
              <span><strong>${pad(i + 1)}</strong> ${esc(compound(h.from).formula)} → ${esc(compound(h.to).formula)} <span class="hist-reagent">via ${esc(reagent(h.reagent).short)}</span></span>
            </li>
          `).join("")}
        </ol>
      </div>
    `;
  }

  function completeHTML() {
    const m = mission.def;
    const next = nextMissionFor(m.id);
    const rec = progress.missions[m.id] || { best: mission.score };
    const route = [m.start, ...mission.history.map((h) => h.to)]
      .map((id) => compound(id).formula)
      .join(" → ");
    return `
      <div class="complete">
        <div class="complete-top">
          <span class="stamp">Cleared</span>
          <div>
            <span class="kicker">Brief ${pad(m.number)} / ${MISSIONS.length} · ${esc(m.difficulty)}</span>
            <h2>${esc(m.title)}</h2>
          </div>
        </div>
        <p class="complete-lede">${esc(m.objective)}</p>
        <div class="route-summary"><span>Route</span> ${esc(route)}</div>

        <div class="score-panel">
          <div class="score-cell"><span>Yield</span><strong class="red">${mission.score}</strong></div>
          <div class="score-cell"><span>Result</span><strong>${esc(rankLabel(mission.score))}</strong></div>
          <div class="score-cell"><span>Missteps / hints</span><strong>${mission.wrong} / ${mission.hints}</strong></div>
        </div>

        <div class="reward-callout"><span>Research payout</span><strong>+${mission.pointsEarned || 0} PTS</strong><span>Universal points — spend them on any case in the Case Lab.</span></div>

        <div class="debrief">
          <h3>Debrief</h3>
          <p>${esc(m.debrief)}</p>
          <div class="source">Source: ${esc(m.source)} · Best: ${rec.best} / 100</div>
        </div>

        <div class="complete-actions">
          ${next ? `<button class="button primary" data-action="next-mission" data-id="${next.id}">Next brief: ${esc(next.title)} →</button>` : ""}
          <button class="button" data-action="replay" data-id="${m.id}">Run again</button>
          <button class="button" data-action="map">Back to map</button>
        </div>
      </div>
    `;
  }

  /* ---------- concept lab ---------- */

  function conceptHTML() {
    if (!concept) return mapHTML();
    if (concept.done) return conceptResultHTML();

    const record = concept.questions[concept.index];
    const q = CONCEPTS.find((c) => c.id === concept.ids[concept.index]);
    const options = record.order.map((originalIndex) => q.options[originalIndex]);
    const answered = concept.answered;
    const selected = concept.selected;
    const best = progress.concepts.best || 0;

    return `
      <header class="screen-head">
        <button class="back-button" data-action="map">← Map</button>
        <div class="screen-title">
          <span class="kicker">Concept lab / structures, tests & mechanisms</span>
          <h2>Explain the bench</h2>
        </div>
        <div class="scoreboard">QUESTION <strong>${concept.index + 1}</strong> / ${concept.ids.length}<br><span class="rank">SCORE ${concept.correct}${concept.answers.length ? ` / ${concept.answers.length}` : ""} · ${progress.points || 0} PTS</span></div>
      </header>

      <div class="concept-layout">
        <aside class="concept-side">
          <h3>Set progress</h3>
          <div class="concept-progress" aria-label="Question progress">
            ${concept.ids.map((id, i) => {
              const a = concept.answers[i];
              const cls = a ? (a.correct ? "correct" : "wrong") : "";
              const current = i === concept.index ? "current" : "";
              return `<span class="concept-dot ${cls} ${current}" title="Question ${i + 1}"></span>`;
            }).join("")}
          </div>
          <p>Each set draws ${concept.ids.length} questions from a pool of ${CONCEPTS.length}. The four answers are shuffled for every question. Answer with A–D (or 1–4), or click an option.</p>
          <div class="concept-best">BEST SET <strong>${best}</strong> / ${concept.ids.length}</div>
          <div class="concept-best" style="border-top:0;padding-top:4px">RESEARCH <strong>${progress.points || 0}</strong> PTS</div>
        </aside>

        <section class="concept-card">
          <span class="kicker">${esc(q.topic)} · question ${pad(concept.index + 1)} / ${pad(concept.ids.length)}</span>
          <h2 id="concept-question">${esc(q.question)}</h2>

          ${q.diagrams?.length ? `
            <div class="concept-diagrams">
              ${q.diagrams.map(conceptDiagramHTML).join("")}
            </div>
          ` : ""}

          <div class="options">
            ${options.map((option, i) => {
              let cls = "option";
              if (answered) {
                if (i === record.answer) cls += " correct";
                else if (i === selected) cls += " wrong";
                else cls += " dim";
              }
              return `
                <button class="${cls}" data-action="concept-answer" data-index="${i}" ${answered ? "disabled" : ""}>
                  <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                  <span>${esc(option)}</span>
                </button>
              `;
            }).join("")}
          </div>

          ${answered ? `
            <div class="result ${selected === record.answer ? "result-ok" : "result-bad"} concept-result" role="status">
              <div class="result-head">
                <span class="result-mark">${selected === record.answer ? "✓" : "×"}</span>
                <span>${selected === record.answer ? "Correct" : "Not quite"}</span>
                <span class="result-cost">${selected === record.answer ? "+1 research point" : "+0 research points"}</span>
              </div>
              <p>${esc(q.explanation)}</p>
              <div class="source">Source: ${esc(q.source)}</div>
            </div>
          ` : ""}

          <div class="concept-footer">
            <span class="concept-score">SCORE <strong>${concept.correct}</strong>${concept.answers.length ? ` / ${concept.answers.length}` : ""}</span>
            ${answered ? `<button class="button primary" data-action="concept-next">${concept.index + 1 >= concept.ids.length ? "See result →" : "Next question →"}</button>` : `<span class="mono-sm muted">Choose A, B, C or D.</span>`}
          </div>
        </section>
      </div>
    `;
  }

  function conceptResultHTML() {
    const total = concept.ids.length;
    const score = concept.correct;
    const pct = Math.round((score / total) * 100);
    const missed = concept.answers
      .map((a, i) => ({ a, q: CONCEPTS.find((c) => c.id === concept.ids[i]) }))
      .filter(({ a }) => !a.correct);
    const label = pct >= 90 ? "Distinction" : pct >= 70 ? "Merit" : pct >= 50 ? "Pass" : "Review the notes";

    return `
      <header class="screen-head">
        <button class="back-button" data-action="map">← Map</button>
        <div class="screen-title">
          <span class="kicker">Concept lab / set complete</span>
          <h2>Set result</h2>
        </div>
        <div class="scoreboard">BEST SET <strong>${progress.concepts.best || 0}</strong> / ${total}<br><span class="rank">${esc(rankFor(totalYield()))} · ${progress.points || 0} PTS</span></div>
      </header>

      <div class="complete">
        <div class="complete-top">
          <span class="stamp">${pct >= 70 ? "Passed" : "Review"}</span>
          <div>
            <span class="kicker">Concept lab · ${plural(total, "question")}</span>
            <h2>${score} / ${total}</h2>
          </div>
          ${concept.newBest ? `<span class="stamp" style="transform:rotate(3deg)">New best</span>` : ""}
        </div>
        <p class="complete-lede">${esc(label)}. ${score === total ? "A clean sheet. The bench is yours." : "The notes are open. Read the explanation for anything you missed, then run a new set."}</p>

        <div class="score-panel">
          <div class="score-cell"><span>Correct</span><strong class="red">${score}</strong></div>
          <div class="score-cell"><span>Percentage</span><strong>${pct}%</strong></div>
          <div class="score-cell"><span>Research earned</span><strong class="red">+${score}</strong></div>
          <div class="score-cell"><span>Balance</span><strong>${progress.points || 0} PTS</strong></div>
        </div>

        <div class="reward-callout">
          <span>Case Lab</span>
          <strong>${progress.points || 0} PTS</strong>
          <span>${progress.points >= CASE.cost ? "A case is ready to open." : `${CASE.cost - (progress.points || 0)} more points from any mode for the next case.`}</span>
        </div>

        ${missed.length ? `
          <div class="debrief">
            <h3>Review these</h3>
            <ul class="review-list">
              ${missed.map(({ q }) => `<li><strong>${esc(q.topic)}</strong> — ${esc(q.explanation)}</li>`).join("")}
            </ul>
          </div>
        ` : `
          <div class="debrief">
            <h3>Debrief</h3>
            <p>Every answer was correct. Try a new set: the pool is larger than one run.</p>
          </div>
        `}

        <div class="complete-actions">
          <button class="button primary" data-action="start-concepts">New set →</button>
          <button class="button" data-action="case-lab">Case Lab · ${progress.points || 0} PTS</button>
          <button class="button" data-action="map">Back to map</button>
          <button class="button" data-action="notes">Field notes</button>
        </div>
      </div>
    `;
  }

  /* ---------- physical & inorganic expansion ---------- */

  function expansionHTML() {
    const totalQuestions = EXP_CHAPTERS.reduce((sum, c) => sum + (c.questions?.length || 0), 0);
    const completed = EXP_CHAPTERS.filter((c) => progress.expansion.best[c.code] >= 10).length;
    const tutorials = EXP_CHAPTERS.filter((c) => progress.expansion.tutorials[c.code]).length;
    return `
      <header class="screen-head">
        <button class="back-button" data-action="home">← Bench</button>
        <div class="screen-title">
          <span class="kicker">Expansion / documents A–P</span>
          <h2>Physical & Inorganic</h2>
        </div>
        <div class="scoreboard">${EXP_CHAPTERS.length} CHAPTERS<br><span class="rank">${totalQuestions} MCQs · ${completed} Aced · ${tutorials} Tutorials Done</span></div>
      </header>

      <div class="expansion-intro">
        <p>Sixteen new chapters, from moles and gases to transition-metal complexes and the Periodic Table. Every chapter has a five-step guided tutorial and a bank of 100 MCQs. The drill draws ten questions at a time; your best chapter score is saved.</p>
      </div>

      <div class="chapter-grid">
        ${EXP_CHAPTERS.map((chapter) => {
          const best = progress.expansion.best[chapter.code] || 0;
          const tutorialDone = !!progress.expansion.tutorials[chapter.code];
          const attempts = progress.expansion.attempts[chapter.code] || 0;
          return `
            <button class="chapter-card" data-action="chapter" data-code="${chapter.code}">
              <span class="chapter-code">${esc(chapter.code)}</span>
              <span class="chapter-title">${esc(chapter.title)}</span>
              <span class="chapter-subtitle">${esc(chapter.subtitle)}</span>
              <span class="chapter-meta">${chapter.questions?.length || 0} MCQs · ${chapter.sections.length} tutorial steps · pays PTS</span>
              <span class="chapter-status">${tutorialDone ? "TUTORIAL DONE" : "TUTORIAL"} · ${best ? `BEST ${best}/10` : attempts ? "IN PROGRESS" : "UNSTARTED"}</span>
            </button>
          `;
        }).join("")}
      </div>

      <div class="expansion-actions">
        <button class="button primary" data-action="case-lab">All cases · ${CASE_ITEM_TOTAL} collectibles · ${progress.points || 0} PTS</button>
        <button class="button" data-action="map">Campaign</button>
        <button class="button" data-action="start-concepts">Concept Lab</button>
      </div>
    `;
  }

  function expansionCasesHTML() {
    return caseHTML();
  }

  function chapterHTML() {
    const chapter = chapterView || EXP_CHAPTERS[0];
    if (!chapter) return expansionHTML();
    const best = progress.expansion.best[chapter.code] || 0;
    const attempts = progress.expansion.attempts[chapter.code] || 0;
    const tutorialDone = !!progress.expansion.tutorials[chapter.code];
    return `
      <header class="screen-head">
        <button class="back-button" data-action="expansion">← A–P</button>
        <div class="screen-title">
          <span class="kicker">Chapter ${esc(chapter.code)} / ${esc(chapter.subtitle)}</span>
          <h2>${esc(chapter.title)}</h2>
        </div>
        <div class="scoreboard">${chapter.questions?.length || 0} MCQs<br><span class="rank">BEST ${best}/10 · ${attempts} DRILLS</span></div>
      </header>

      <div class="chapter-layout">
        <section class="tutorial-main">
          <div class="tutorial-head">
            <div>
              <span class="kicker">Guided tutorial / five steps</span>
              <h3>Learn the chapter, then test it</h3>
            </div>
            ${tutorialDone ? `<span class="stamp">Tutorial done</span>` : ""}
          </div>
          ${chapter.sections.map((section, i) => `
            <details class="tutorial-step" ${i === 0 ? "open" : ""}>
              <summary><span class="tutorial-no">${pad(i + 1)}</span>${esc(section.title)}</summary>
              <div class="tutorial-body">
                ${section.body.map((p) => `<p>${esc(p)}</p>`).join("")}
                ${section.example ? `
                  <div class="guided-check">
                    <p><strong>Guided check.</strong> ${esc(section.example.prompt)}</p>
                    <details>
                      <summary>Show answer</summary>
                      <p><strong>${esc(section.example.answer)}</strong> — ${esc(section.example.explanation)}</p>
                    </details>
                  </div>
                ` : ""}
              </div>
            </details>
          `).join("")}
          <div class="tutorial-actions">
            <button class="button primary" data-action="mark-tutorial" data-code="${chapter.code}">${tutorialDone ? "Tutorial completed ✓" : "Mark tutorial complete"}</button>
          </div>
        </section>

        <aside class="chapter-side">
          <div class="reward-panel">
            <span>Universal points</span>
            <strong>${progress.points || 0}</strong>
            <small>Tutorial +5 once · drill 2–12 per completion</small>
          </div>
          <div class="reward-panel">
            <span>Chapter drill</span>
            <strong>${best}/10</strong>
            <small>10 random MCQs from ${chapter.questions?.length || 0}</small>
            <button class="button primary" data-action="start-drill" data-code="${chapter.code}" style="margin-top:10px;width:100%">Start drill →</button>
          </div>
          <div class="reward-panel">
            <span>Tutorial</span>
            <strong>${tutorialDone ? "DONE" : "5 STEPS"}</strong>
            <small>${tutorialDone ? "You have marked this chapter's tutorial complete." : "Open the five steps and use the guided checks."}</small>
          </div>
          <div class="reward-panel">
            <span>Chapter code</span>
            <strong>${esc(chapter.code)}</strong>
            <small>${esc(chapter.subtitle)}</small>
          </div>
          <button class="button" data-action="expansion">All chapters</button>
        </aside>
      </div>
    `;
  }

  function drillHTML() {
    if (!drill) return expansionHTML();
    if (drill.done) return drillResultHTML();
    const chapter = drill.chapter;
    const record = drill.questions[drill.index];
    const q = chapter.questions[record.index];
    const options = record.order.map((i) => q.options[i]);
    const answered = drill.answered;
    const selected = drill.selected;
    return `
      <header class="screen-head">
        <button class="back-button" data-action="chapter" data-code="${chapter.code}">← Chapter</button>
        <div class="screen-title">
          <span class="kicker">${esc(chapter.code)} · ${esc(chapter.title)} / chapter drill</span>
          <h2>Chapter drill</h2>
        </div>
        <div class="scoreboard">QUESTION <strong>${drill.index + 1}</strong> / ${drill.questions.length}<br><span class="rank">SCORE ${drill.correct}${drill.answers.length ? ` / ${drill.answers.length}` : ""}</span></div>
      </header>

      <div class="concept-layout">
        <aside class="concept-side">
          <h3>Drill progress</h3>
          <div class="concept-progress" aria-label="Drill progress">
            ${drill.questions.map((r, i) => {
              const a = drill.answers[i];
              const cls = a ? (a.correct ? "correct" : "wrong") : "";
              return `<span class="concept-dot ${cls} ${i === drill.index ? "current" : ""}" title="Question ${i + 1}"></span>`;
            }).join("")}
          </div>
          <p>Ten questions from the chapter bank. Every answer is explained. Your best score is saved.</p>
          <div class="concept-best">CHAPTER BEST <strong>${progress.expansion.best[chapter.code] || 0}</strong> / 10</div>
          <div class="concept-best" style="border-top:0;padding-top:4px">BANK <strong>${chapter.questions.length}</strong> MCQs</div>
        </aside>

        <section class="concept-card">
          <span class="kicker">${esc(chapter.title)} · question ${pad(drill.index + 1)} / ${pad(drill.questions.length)}</span>
          <h2>${esc(q.question)}</h2>
          <div class="options">
            ${options.map((option, i) => {
              let cls = "option";
              if (answered) {
                if (i === record.answer) cls += " correct";
                else if (i === selected) cls += " wrong";
                else cls += " dim";
              }
              return `<button class="${cls}" data-action="drill-answer" data-index="${i}" ${answered ? "disabled" : ""}><span class="option-letter">${String.fromCharCode(65 + i)}</span><span>${esc(option)}</span></button>`;
            }).join("")}
          </div>
          ${answered ? `
            <div class="result ${selected === record.answer ? "result-ok" : "result-bad"} concept-result" role="status">
              <div class="result-head">
                <span class="result-mark">${selected === record.answer ? "✓" : "×"}</span>
                <span>${selected === record.answer ? "Correct" : "Not quite"}</span>
              </div>
              <p>${esc(q.explanation)}</p>
              <div class="source">Source: ${esc(q.source)}</div>
            </div>
          ` : ""}
          <div class="concept-footer">
            <span class="concept-score">SCORE <strong>${drill.correct}</strong> / ${drill.answers.length || 0}</span>
            ${answered ? `<button class="button primary" data-action="drill-next">${drill.index + 1 >= drill.questions.length ? "See result →" : "Next question →"}</button>` : `<span class="mono-sm muted">Choose A, B, C or D.</span>`}
          </div>
        </section>
      </div>
    `;
  }

  function drillResultHTML() {
    const chapter = drill.chapter;
    const total = drill.questions.length;
    const score = drill.correct;
    const pct = total ? Math.round((score / total) * 100) : 0;
    const missed = drill.answers.map((a, i) => ({ a, q: chapter.questions[drill.questions[i].index] })).filter(({ a }) => !a.correct);
    const label = pct >= 90 ? "Distinction" : pct >= 70 ? "Merit" : pct >= 50 ? "Pass" : "Review the tutorial";
    return `
      <header class="screen-head">
        <button class="back-button" data-action="chapter" data-code="${chapter.code}">← Chapter</button>
        <div class="screen-title">
          <span class="kicker">${esc(chapter.code)} · chapter drill complete</span>
          <h2>Chapter result</h2>
        </div>
        <div class="scoreboard">BEST <strong>${progress.expansion.best[chapter.code] || 0}</strong> / 10<br><span class="rank">${chapter.questions.length} MCQs IN BANK</span></div>
      </header>
      <div class="complete">
        <div class="complete-top">
          <span class="stamp">${pct >= 70 ? "Passed" : "Review"}</span>
          <div><span class="kicker">${esc(chapter.title)}</span><h2>${score} / ${total}</h2></div>
          ${drill.newBest ? `<span class="stamp" style="transform:rotate(3deg)">New best</span>` : ""}
        </div>
        <p class="complete-lede">${esc(label)}. ${score === total ? "A clean chapter. Move to the next one." : "Read the explanations for anything you missed, then run the drill again."}</p>
        <div class="score-panel">
          <div class="score-cell"><span>Correct</span><strong class="red">${score}</strong></div>
          <div class="score-cell"><span>Percentage</span><strong>${pct}%</strong></div>
          <div class="score-cell"><span>Best</span><strong>${progress.expansion.best[chapter.code] || 0} / 10</strong></div>
        </div>
        <div class="reward-callout"><span>Research payout</span><strong>+${drill.pointsEarned || 0} PTS</strong><span>Universal points — spend them on any case in the Case Lab.</span></div>
        ${missed.length ? `
          <div class="debrief"><h3>Review these</h3><ul class="review-list">${missed.map(({ q }) => `<li><strong>${esc(q.question)}</strong> — ${esc(q.explanation)}</li>`).join("")}</ul></div>
        ` : `<div class="debrief"><h3>Debrief</h3><p>Every answer was correct. Try another set or move to the next chapter.</p></div>`}
        <div class="complete-actions">
          <button class="button primary" data-action="case-lab">Spend in Case Lab →</button>
          <button class="button" data-action="start-drill" data-code="${chapter.code}">New drill →</button>
          <button class="button" data-action="chapter" data-code="${chapter.code}">Back to tutorial</button>
          <button class="button" data-action="expansion">All chapters</button>
        </div>
      </div>
    `;
  }

  /* ---------- case lab & collection ---------- */

  function caseArtSVG() {
    return `
      <svg class="case-art" viewBox="0 0 360 220" role="img" aria-label="A metal organic chemistry case with a red stripe and a flask emblem">
        <defs>
          <linearGradient id="case-metal" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stop-color="#45423a"/>
            <stop offset="0.5" stop-color="#2b2923"/>
            <stop offset="1" stop-color="#191814"/>
          </linearGradient>
          <linearGradient id="case-stripe" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stop-color="#7f2518"/>
            <stop offset="0.5" stop-color="#c3402a"/>
            <stop offset="1" stop-color="#7f2518"/>
          </linearGradient>
        </defs>
        <rect x="28" y="62" width="304" height="130" rx="12" fill="url(#case-metal)" stroke="#1d1c18" stroke-width="3"/>
        <rect x="28" y="105" width="304" height="22" fill="url(#case-stripe)"/>
        <rect x="58" y="46" width="58" height="22" rx="4" fill="#4c473b" stroke="#1d1c18" stroke-width="2"/>
        <rect x="244" y="46" width="58" height="22" rx="4" fill="#4c473b" stroke="#1d1c18" stroke-width="2"/>
        <circle cx="87" cy="57" r="4" fill="#f1ecdf"/>
        <circle cx="273" cy="57" r="4" fill="#f1ecdf"/>
        <rect x="90" y="146" width="180" height="27" rx="3" fill="#11100d" opacity="0.55"/>
        <text x="180" y="164" text-anchor="middle" fill="#f1ecdf" font-family="monospace" font-size="10" letter-spacing="3">ORGANIC / CASE 01</text>
        <g transform="translate(180 86)" fill="none" stroke="#f1ecdf" stroke-width="2.2" stroke-linejoin="round">
          <path d="M-11-20h22v20l13 29c2 6-2 11-8 11h-38c-6 0-10-5-8-11l13-29z"/>
          <path d="M-13 14h26l8 18c1 3-1 5-4 5h-34c-3 0-5-2-4-5z" fill="#b53621" stroke="none"/>
          <path d="M-8-20h16" />
        </g>
        <path d="M28 62h304" stroke="#6a6457" stroke-width="1" opacity=".7"/>
      </svg>
    `;
  }

  function caseHTML() {
    const points = progress.points || 0;
    const totalFound = caseTotalFound();
    return `
      <header class="screen-head">
        <button class="back-button" data-action="map">← Map</button>
        <div class="screen-title">
          <span class="kicker">Reward lab / universal research points</span>
          <h2>Case Lab</h2>
        </div>
        <div class="scoreboard">RESEARCH <strong>${points}</strong> PTS<br><span class="rank">ARCHIVE ${totalFound}/${CASE_ITEM_TOTAL} · ${plural(casesOpenedTotal(), "case")}</span></div>
      </header>

      <div class="case-wallet">
        <div>
          <span class="kicker">One wallet · every topic</span>
          <p>Points earned in any campaign brief, chapter tutorial, chapter drill or Concept Lab question spend here. Every case costs <strong>${CASE.cost} points</strong>; duplicates refund points by rarity.</p>
        </div>
        <div class="case-wallet-balance"><span>Balance</span><strong>${points}</strong><small>research points</small></div>
        <div class="case-wallet-balance"><span>Cases</span><strong>${CASE_DEFS.length}</strong><small>${CASE_ITEM_TOTAL} collectibles</small></div>
      </div>

      <div class="case-hub-grid">
        ${CASE_DEFS.map((def) => {
          const found = caseFound(def);
          const opened = caseOpenedCount(def);
          const canOpen = points >= def.cost;
          const kindLabel = isOrganicCase(def) ? "Organic" : "Physical & Inorganic";
          return `
            <section class="case-hub-card case-panel" data-case-card="${def.id}" style="--case-accent:${isOrganicCase(def) ? "var(--red)" : "var(--ink)"}">
              <div class="case-hub-head">
                <span class="kicker">${esc(kindLabel)} · ${def.cost} PTS per case</span>
                <h3>${esc(def.name)}</h3>
                <p>${esc(def.tagline)}</p>
              </div>
              <div class="case-hub-statline">
                <span><strong>${found}</strong> / ${def.items.length} found</span>
                <span>${plural(opened, "case")} opened</span>
              </div>
              <div class="case-archive">
                ${def.items.map((item) => {
                  const count = caseCollectionFor(def)[item.id] || 0;
                  const rarity = rarityById(item.rarity);
                  return `
                    <div class="case-archive-card ${count ? "" : "unknown"} rarity-${item.rarity}" style="--rarity:${rarity.color}">
                      ${count
                        ? `<strong>${esc(item.formula)}</strong><span>${esc(item.name)}</span>${count > 1 ? `<em>×${count}</em>` : ""}`
                        : `<strong>?</strong><span>Undiscovered</span>`}
                    </div>
                  `;
                }).join("")}
              </div>
              <div class="case-actions">
                <button class="button primary" data-action="open-case" data-case="${def.id}" ${canOpen ? "" : "disabled"}>Open case · ${def.cost} PTS</button>
                ${isOrganicCase(def) ? `<button class="button" data-action="collection">Collection book · ${found}/${def.items.length}</button>` : ""}
              </div>
              <p class="case-progress">${canOpen
                ? "Ready. One collectible will be added to this case archive."
                : `${points} / ${def.cost} PTS · ${def.cost - points} more points for the next case.`}</p>
            </section>
          `;
        }).join("")}
      </div>

      <div class="case-hub-foot">
        <div class="reward-note">
          <h3>How points are earned</h3>
          <p>Concept Lab: 1 point per correct answer. Campaign brief: 2–5 points by yield. Chapter tutorial: +5 once. Chapter drill: 2 points for finishing + 1 per correct answer, with a first-clear bonus.</p>
        </div>
        <div class="case-actions">
          <button class="button" data-action="expansion">Study chapters →</button>
          <button class="button" data-action="start-concepts">Concept Lab</button>
        </div>
      </div>
    `;
  }

  function collectionHTML() {
    const points = progress.points || 0;
    const owned = collectionCount();
    const total = REWARD_ITEMS.length;
    const pct = total ? Math.round((owned / total) * 100) : 0;
    const complete = total > 0 && owned === total;
    return `
      <header class="screen-head">
        <button class="back-button" data-action="case-lab">← Case Lab</button>
        <div class="screen-title">
          <span class="kicker">Collection book / organic compounds</span>
          <h2>${complete ? "Collection complete" : "The collection"}</h2>
        </div>
        <div class="scoreboard">FOUND <strong>${owned}</strong> / ${total}<br><span class="rank">${points} PTS · ${plural(progress.casesOpened || 0, "case")}</span></div>
      </header>

      <div class="collection-top">
        <div class="collection-progress-copy">
          <span class="kicker">${complete ? "Every compound found" : "Undiscovered compounds are marked ?"}</span>
          <p>${complete
            ? "The case has given up every compound. The bench is complete."
            : `Open cases to fill the book. ${total - owned} compound${total - owned === 1 ? "" : "s"} still hidden.`}</p>
        </div>
        <div class="collection-progress-bar">
          <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
          <span>${pct}%</span>
        </div>
      </div>

      ${complete ? `<div class="collection-complete"><span class="stamp">Collection complete</span><span>${total} / ${total}</span></div>` : ""}

      <div class="collection-sections">
        ${RARITIES.map((rarity) => {
          const items = REWARD_ITEMS.filter((item) => item.rarity === rarity.id);
          const found = items.filter((item) => (progress.collection?.[item.id] || 0) > 0).length;
          return `
            <section class="collection-section rarity-${rarity.id}" style="--rarity:${rarity.color}">
              <div class="collection-section-head">
                <span class="rarity-dot"></span>
                <h3>${esc(rarity.label)}</h3>
                <span>${found} / ${items.length} found</span>
              </div>
              <div class="collection-grid">
                ${items.map((item) => {
                  const count = progress.collection?.[item.id] || 0;
                  if (!count) {
                    return `
                      <article class="collection-card collection-unknown rarity-${rarity.id}" style="--rarity:${rarity.color}">
                        <div class="collection-question" aria-label="Undiscovered compound">?</div>
                        <div class="collection-meta">
                          <span class="rarity-label">${esc(rarity.label)}</span>
                          <strong>???</strong>
                          <span>Undiscovered</span>
                        </div>
                      </article>
                    `;
                  }
                  return `
                    <article class="collection-card rarity-${rarity.id}" style="--rarity:${rarity.color}">
                      ${rewardDiagramHTML(item, "collection-figure")}
                      <div class="collection-meta">
                        <span class="rarity-label">${esc(rarity.label)}</span>
                        <strong>${esc(item.name)}</strong>
                        <span>${esc(item.formula)}${count > 1 ? ` · ×${count}` : ""}</span>
                      </div>
                    </article>
                  `;
                }).join("")}
              </div>
            </section>
          `;
        }).join("")}
      </div>

      <div class="complete-actions">
        <button class="button primary" data-action="case-lab">Case Lab · ${points} PTS</button>
        <button class="button" data-action="map">Back to map</button>
      </div>
    `;
  }

  function openCase(caseId = CASE.id) {
    const def = caseDef(caseId);
    if (!def || !def.items.length) {
      toast("That case is not loaded.");
      return;
    }
    const points = progress.points || 0;
    if (points < def.cost) {
      toast(`Need ${def.cost - points} more research points.`);
      return;
    }
    const collection = caseCollectionFor(def);
    const item = rollFrom(def.items);
    const ownedBefore = collection[item.id] || 0;
    const isNew = ownedBefore === 0;
    const refund = isNew ? 0 : (CASE.duplicateRefunds?.[item.rarity] || 0);
    recordCaseOpen(def, item, isNew, refund);
    const reel = [];
    for (let i = 0; i < 45; i += 1) {
      const pick = i === 38 ? item : def.items[Math.floor(Math.random() * def.items.length)];
      reel.push(pick);
    }
    caseState = {
      def,
      item,
      isNew,
      refund,
      reel,
      phase: "spinning",
      token: Date.now() + Math.random()
    };
    saveProgress();
    view.overlay = "case";
    render();
    focusElement(".case-opening-panel");
    animateCaseReel();
  }

  function openExpansionCase(caseId) {
    openCase(caseId);
  }

  function animateCaseReel() {
    if (!caseState || caseState.phase !== "spinning") return;
    const token = caseState.token;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      caseState.phase = "revealed";
      renderOverlay();
      focusElement(".overlay-close");
      return;
    }
    const alive = () => caseState && caseState.token === token && caseState.phase === "spinning";
    const note = (text) => {
      if (!alive()) return;
      const el = document.getElementById("case-spin-note");
      if (el) el.textContent = text;
    };

    window.requestAnimationFrame(() => {
      const reel = document.getElementById("case-reel");
      const windowEl = document.getElementById("case-reel-window");
      const target = reel?.children?.[38];
      if (!reel || !windowEl || !target) return;
      const targetOffset = Math.max(0, target.offsetLeft + target.offsetWidth / 2 - windowEl.clientWidth / 2);
      const overshoot = 58;
      reel.style.transition = "transform 8.75s cubic-bezier(0.06, 0.72, 0.08, 1)";
      reel.style.transform = `translate3d(-${targetOffset + overshoot}px, 0, 0)`;
      note("The reel is spinning…");
      window.setTimeout(() => note("Slowing down…"), 3300);
      window.setTimeout(() => note("The marker is closing in…"), 6300);
      window.setTimeout(() => note("Wait for it…"), 8600);
      window.setTimeout(() => {
        if (!alive()) return;
        reel.style.transition = "transform 0.9s cubic-bezier(0.18, 0.84, 0.2, 1)";
        reel.style.transform = `translate3d(-${targetOffset}px, 0, 0)`;
      }, 8750);
    });

    window.setTimeout(() => {
      if (caseState && caseState.token === token && caseState.phase === "spinning") {
        caseState.phase = "revealed";
        renderOverlay();
        drawDiagrams();
        focusElement(".overlay-close");
      }
    }, 9900);
  }

  function caseReelCard(item) {
    const rarity = rarityById(item.rarity);
    return `
      <div class="case-reel-card rarity-${item.rarity}" style="--rarity:${rarity.color}">
        <span class="case-reel-rarity">${esc(rarity.label)}</span>
        <strong>${esc(item.name)}</strong>
        <span>${esc(item.formula)}</span>
      </div>
    `;
  }

  function caseOverlayHTML() {
    if (!caseState) return "";
    const def = caseState.def;
    const item = caseState.item;
    const rarity = rarityById(item.rarity);
    const organic = isOrganicCase(def);
    if (caseState.phase === "spinning") {
      return `
        <div class="overlay case-overlay" data-overlay-backdrop>
          <div class="overlay-panel case-opening-panel" tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="case-overlay-title">
            <div class="overlay-head"><h2 id="case-overlay-title">Opening ${esc(def.name)}</h2><span class="case-overlay-balance">${progress.points || 0} PTS</span></div>
            <div class="overlay-body">
              <div class="case-opening-lede">
                <span class="kicker">${esc(def.tagline)}</span>
                <p>One collectible from ${def.items.length}. ${def.cost} research points. Good luck.</p>
              </div>
              <div class="case-reel-window" id="case-reel-window">
                <div class="case-reel" id="case-reel">${caseState.reel.map(caseReelCard).join("")}</div>
                <div class="case-reel-marker" aria-hidden="true"></div>
              </div>
              <p class="case-spin-note" id="case-spin-note">The reel is spinning…</p>
            </div>
          </div>
        </div>
      `;
    }
    const found = caseFound(def);
    return `
      <div class="overlay case-overlay" data-overlay-backdrop>
        <div class="overlay-panel case-reveal-panel" style="--rarity:${rarity.color}" role="dialog" aria-modal="true" aria-labelledby="case-overlay-title">
          <div class="overlay-head"><h2 id="case-overlay-title">Case opened</h2><button class="overlay-close" data-action="close-overlay">Close ✕</button></div>
          <div class="overlay-body case-reveal">
            <div class="case-reveal-rarity"><span class="rarity-dot"></span>${esc(rarity.label)} · ${esc(def.name)}</div>
            ${organic
              ? rewardDiagramHTML(item, "case-winner-figure")
              : `<div class="case-winner-formula case-winner-formula-large">${esc(item.formula)}</div>`}
            <h3>${esc(item.name)}</h3>
            ${organic ? `<div class="case-winner-formula">${esc(item.formula)}</div>` : ""}
            <p>${esc(item.blurb)}</p>
            <div class="case-reveal-status">
              ${caseState.isNew
                ? `<span class="stamp">${organic ? "New compound" : "New archive entry"}</span>`
                : `<span class="stamp">Duplicate +${caseState.refund} PTS</span>`}
              <span>${esc(def.name)} archive ${found}/${def.items.length}</span>
            </div>
            <div class="case-reveal-meta">${esc(def.name)} · ${plural(caseOpenedCount(def), "case")} opened · ${progress.points || 0} PTS left</div>
            <div class="complete-actions">
              <button class="button primary" data-action="open-case" data-case="${def.id}" ${(progress.points || 0) >= def.cost ? "" : "disabled"}>Open another · ${def.cost} PTS</button>
              <button class="button" data-action="case-lab">All cases</button>
              ${organic ? `<button class="button" data-action="collection">Collection book</button>` : ""}
              <button class="button" data-action="close-overlay">Close</button>
            </div>
            ${(progress.points || 0) < def.cost ? `<p class="case-progress">${progress.points || 0} / ${def.cost} PTS · ${def.cost - (progress.points || 0)} more points from campaign briefs, chapters or the Concept Lab.</p>` : ""}
          </div>
        </div>
      </div>
    `;
  }

  /* ---------- field notes ---------- */

  function notesHTML() {
    return `
      <header class="screen-head">
        <button class="back-button" data-action="map">← Map</button>
        <div class="screen-title">
          <span class="kicker">Field notes / data booklet</span>
          <h2>Reagents, tests & mechanisms</h2>
        </div>
        <div class="scoreboard">${REFERENCE.length} SECTIONS<br><span class="rank">From the PDFs</span></div>
      </header>
      <p class="lede" style="margin:18px 0 20px;max-width:70ch">A compact bench reference. Open a section when a brief asks you to choose between two plausible reagents. Everything here is a summary of the H2 notes, not a replacement for them.</p>
      ${notesCardsHTML()}
    `;
  }

  function notesCardsHTML() {
    return `
      <div class="notes-grid">
        ${REFERENCE.map((section) => `
          <details class="note-card">
            <summary>${esc(section.title)}</summary>
            <div class="note-body">
              <ul>${section.items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
              <div class="note-source">Source: ${esc(section.source)}</div>
            </div>
          </details>
        `).join("")}
      </div>
    `;
  }

  /* ---------- overlays ---------- */

  function renderOverlay() {
    document.body.classList.toggle("overlay-open", !!view.overlay);
    if (!view.overlay) {
      overlayRoot.innerHTML = "";
      return;
    }
    if (view.overlay === "case" && caseState) {
      overlayRoot.innerHTML = caseOverlayHTML();
      drawDiagrams();
      return;
    }
    if (view.overlay === "help") {
      overlayRoot.innerHTML = `
        <div class="overlay" data-overlay-backdrop>
          <div class="overlay-panel" role="dialog" aria-modal="true" aria-labelledby="overlay-title">
            <div class="overlay-head">
              <h2 id="overlay-title">How to play</h2>
              <button class="overlay-close" data-action="close-overlay">Close ✕</button>
            </div>
            <div class="overlay-body">
              <div class="help-grid">
                <div>
                  <h3>The loop</h3>
                  <p>Read the brief. Look at the current vessel and the final target. Choose one complete reagent + condition system from the shelf. The game runs the reaction: you see the product, the reaction type, an equation and a note. A multi-step brief advances one vessel at a time.</p>
                  <h3>Commands</h3>
                  <ul>
                    <li><code>1</code>, <code>2</code>, … — pick that shelf item</li>
                    <li><code>SOCl2</code> or <code>thionyl chloride</code> — match by name</li>
                    <li><code>hint</code> — a nudge (costs 8 yield, max 3 per brief)</li>
                    <li><code>shelf</code> — re-read the shelf</li>
                    <li><code>notes</code> — open the field notes</li>
                    <li><code>status</code> — yield and step</li>
                    <li><code>reset</code> — restart this brief (type twice)</li>
                    <li><code>map</code> — leave the brief</li>
                  </ul>
                </div>
                <div>
                  <h3>Scoring</h3>
                  <p>Every brief starts at 100 yield. A wrong reagent costs 10. A hint costs 8. The minimum is 10. Clear at 50 for a Pass, 70 for a Merit, 90 for a Distinction.</p>
                  <h3>Reading the result</h3>
                  <p>A wrong option may still be real chemistry: the feedback tells you what it would have made. That is the point. A reaction that works but leaves the brief is a detour, not a failure of the reagent.</p>
                  <h3>Keys</h3>
                  <p><code>Enter</code> runs the command. <code>/</code> focuses the command line. <code>Esc</code> closes this panel or returns to the map. <code>?</code> opens this help when the command line is not focused.</p>
                  <h3>Progress</h3>
                  <p>Best yields and concept scores are stored in this browser. Nothing is uploaded. You can reset from the campaign map.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (view.overlay === "notes") {
      overlayRoot.innerHTML = `
        <div class="overlay" data-overlay-backdrop>
          <div class="overlay-panel" role="dialog" aria-modal="true" aria-labelledby="overlay-title">
            <div class="overlay-head">
              <h2 id="overlay-title">Field notes</h2>
              <button class="overlay-close" data-action="close-overlay">Close ✕</button>
            </div>
            <div class="overlay-body">${notesCardsHTML()}</div>
          </div>
        </div>
      `;
    }
  }

  function openOverlay(kind) {
    lastOverlayFocus = document.activeElement;
    view.overlay = kind;
    renderOverlay();
    window.setTimeout(() => focusElement(".overlay-close"), 0);
  }

  function closeOverlay() {
    if (view.overlay === "case" && caseState?.phase === "spinning") return;
    if (view.overlay === "case") caseState = null;
    view.overlay = null;
    renderOverlay();
    if (lastOverlayFocus && document.contains(lastOverlayFocus)) {
      try { lastOverlayFocus.focus({ preventScroll: true }); } catch { lastOverlayFocus.focus(); }
    }
  }

  /* ============================================================
     navigation
     ============================================================ */

  function goHome() {
    view.screen = "title";
    view.overlay = null;
    caseState = null;
    try {
      history.replaceState(null, "", location.pathname + location.search);
    } catch {
      /* file:// contexts may refuse history.replaceState */
    }
    render();
    scrollTop();
  }

  function goMap() {
    view.screen = "map";
    view.overlay = null;
    caseState = null;
    location.hash = "briefs";
    render();
    scrollTop();
  }

  function goNotes() {
    view.screen = "notes";
    view.overlay = null;
    location.hash = "notes";
    render();
    scrollTop();
  }

  function goExpansion() {
    view.screen = "expansion";
    view.overlay = null;
    caseState = null;
    location.hash = "expansion";
    render();
    scrollTop();
  }

  function goExpansionCases() {
    goCaseLab();
  }

  function goChapter(code) {
    const chapter = EXP_CHAPTERS.find((c) => c.code === code);
    if (!chapter) { goExpansion(); return; }
    chapterView = chapter;
    view.screen = "chapter";
    view.overlay = null;
    caseState = null;
    location.hash = `chapter/${code}`;
    render();
    scrollTop();
  }

  function startDrill(code) {
    const chapter = EXP_CHAPTERS.find((c) => c.code === code);
    if (!chapter) { goExpansion(); return; }
    const ids = shuffle(chapter.questions.map((_, i) => i)).slice(0, Math.min(10, chapter.questions.length));
    const questions = ids.map((index) => {
      const q = chapter.questions[index];
      const order = shuffleOptionOrder(q.options.length);
      return { index, order, answer: order.indexOf(q.answer) };
    });
    drill = { chapter, questions, index: 0, correct: 0, answers: [], selected: null, answered: false, done: false, newBest: false };
    progress.expansion.attempts[code] = (progress.expansion.attempts[code] || 0) + 1;
    saveProgress();
    view.screen = "drill";
    view.overlay = null;
    caseState = null;
    location.hash = `drill/${code}`;
    render();
    scrollTop();
  }

  function goCaseLab() {
    view.screen = "case";
    view.overlay = null;
    caseState = null;
    location.hash = "case";
    render();
    scrollTop();
  }

  function goCollection() {
    view.screen = "collection";
    view.overlay = null;
    caseState = null;
    location.hash = "collection";
    render();
    scrollTop();
  }

  function startMission(id) {
    const def = missionById(id);
    if (!def) {
      goMap();
      return;
    }
    mission = {
      def,
      stepIndex: 0,
      score: 100,
      wrong: 0,
      hints: 0,
      history: [],
      selected: null,
      feedback: null,
      awaitingNext: false,
      complete: false,
      newBest: false,
      confirmReset: false
    };
    const prev = progress.missions[id] || { best: 0, attempts: 0, completed: false };
    progress.missions[id] = { ...prev, attempts: (prev.attempts || 0) + 1 };
    saveProgress();
    view.screen = "mission";
    view.overlay = null;
    location.hash = `brief/${id}`;
    render();
    scrollTop();
  }

  function startConcepts() {
    const pool = CONCEPTS.map((c) => c.id);
    const ids = shuffle(pool).slice(0, Math.min(10, pool.length));
    // Every set includes at least one structure question so the skeletal diagrams are used.
    const diagramIds = CONCEPTS.filter((c) => c.diagrams?.length).map((c) => c.id);
    if (diagramIds.length && !ids.some((id) => CONCEPTS.find((c) => c.id === id)?.diagrams?.length)) {
      const replacement = diagramIds[Math.floor(Math.random() * diagramIds.length)];
      if (!ids.includes(replacement)) ids[ids.length - 1] = replacement;
    }
    // Shuffle the four options once per question and record where the correct answer landed.
    const questions = ids.map((id) => {
      const q = CONCEPTS.find((c) => c.id === id);
      const order = shuffleOptionOrder(q.options.length);
      return { id, order, answer: order.indexOf(q.answer) };
    });
    concept = {
      ids,
      questions,
      index: 0,
      correct: 0,
      answers: [],
      selected: null,
      answered: false,
      done: false,
      newBest: false
    };
    progress.concepts.attempts = (progress.concepts.attempts || 0) + 1;
    saveProgress();
    view.screen = "concept";
    view.overlay = null;
    location.hash = "concepts";
    render();
    scrollTop();
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function shuffleOptionOrder(length) {
    const base = Array.from({ length }, (_, i) => i);
    let order = shuffle(base);
    // Avoid returning the original order: every question should visibly reshuffle.
    for (let attempt = 0; attempt < 20 && order.every((value, i) => value === i); attempt += 1) {
      order = shuffle(base);
    }
    return order;
  }

  /* ============================================================
     mission logic
     ============================================================ */

  function currentStep() {
    if (!mission || mission.complete) return null;
    return mission.def.steps[mission.stepIndex] || null;
  }

  function submitAnswer(rawInput) {
    if (!mission || mission.complete) return;
    if (mission.awaitingNext) {
      const cmd = String(rawInput || "").trim().toLowerCase();
      if (!cmd || cmd === "next" || cmd === "continue" || cmd === "go") goNext();
      else setFeedback({ type: "info", message: "This step is complete. Press Enter or type next to continue." });
      return;
    }

    const raw = String(rawInput || "").trim();
    if (!raw) {
      setFeedback({ type: "info", message: "The command line is empty. Type a shelf number, a reagent name, or a command." });
      return;
    }

    const cmd = raw.toLowerCase().replace(/[.!?]+$/, "").trim();
    const isReset = cmd === "reset" || cmd === "restart";
    if (!isReset) mission.confirmReset = false;

    if (cmd === "help" || cmd === "?") {
      openOverlay("help");
      return;
    }
    if (cmd === "hint") {
      giveHint();
      return;
    }
    if (cmd === "shelf") {
      setFeedback({ type: "info", message: `Shelf re-read. ${currentStep().shelf.length} items. Type the number or name of the reagent you want to add.` });
      return;
    }
    if (cmd === "notes") {
      openOverlay("notes");
      return;
    }
    if (cmd === "status") {
      setFeedback({
        type: "info",
        message: `Brief ${pad(mission.def.number)}: ${mission.def.title}. Step ${mission.stepIndex + 1} of ${mission.def.steps.length}. Yield ${mission.score}. Target: ${compound(mission.def.target).name}.`
      });
      return;
    }
    if (cmd === "map" || cmd === "quit" || cmd === "exit") {
      goMap();
      return;
    }
    if (cmd === "reset" || cmd === "restart") {
      if (mission.confirmReset) {
        startMission(mission.def.id);
      } else {
        mission.confirmReset = true;
        setFeedback({ type: "info", message: "That will restart the brief and reset its yield. Type reset again to confirm." });
      }
      return;
    }
    if (cmd === "next" || cmd === "continue") {
      if (mission.awaitingNext) goNext();
      else setFeedback({ type: "info", message: "There is no completed step to continue from yet." });
      return;
    }

    const resolved = resolveReagent(raw, currentStep().shelf);
    if (resolved.type === "multi-index") {
      setFeedback({ type: "info", message: "One reagent system per step. Pick a single number from the shelf." });
      return;
    }
    if (resolved.type === "many") {
      setFeedback({
        type: "info",
        message: `That matches more than one shelf item: ${resolved.ids.map((id) => `${shelfNumber(id, currentStep().shelf)}. ${reagent(id).short}`).join(" · ")}. Type the number you mean.`
      });
      return;
    }
    if (resolved.type === "offbench") {
      setFeedback({
        type: "info",
        message: `“${resolved.name}” is in the notes but not on this shelf. The bench gives you a limited set; check the numbered list.`
      });
      return;
    }
    if (resolved.type === "none") {
      setFeedback({
        type: "info",
        message: "I do not see that on the shelf. Type a number from 1 to " + currentStep().shelf.length + ", a reagent name such as “SOCl2”, or type “shelf”."
      });
      return;
    }

    runReagent(resolved.id);
  }

  function shelfNumber(id, shelf) {
    return pad(shelf.indexOf(id) + 1);
  }

  function runReagent(id) {
    const step = currentStep();
    const r = reagent(id);
    const edge = findReaction(step.from, id, step.to);

    mission.selected = id;

    if (edge && edge.to === step.to) {
      const correctEdge = findReaction(step.from, id, step.to);
      mission.feedback = {
        type: "ok",
        reaction: correctEdge,
        extra: ""
      };
      mission.awaitingNext = true;
      mission.history.push({ from: correctEdge.from, to: correctEdge.to, reagent: id });
      render();
      document.querySelector(".result-ok")?.scrollIntoView({ block: "center" });
      return;
    }

    // wrong: cost yield, but explain what the chosen reagent would actually do
    mission.selected = null;
    mission.wrong += 1;
    const before = mission.score;
    mission.score = Math.max(10, mission.score - 10);
    const penalty = before - mission.score;

    let message;
    if (step.wrong && step.wrong[id]) {
      message = step.wrong[id];
    } else if (edge) {
      message = `That reaction works, but it gives ${compound(edge.to).name} (${compound(edge.to).formula}), not ${compound(step.to).name}. ${edge.note}`;
    } else {
      message = `${r.fail} There is no productive reaction between ${compound(step.from).name} and this reagent in the current step.`;
    }

    mission.feedback = {
      type: "bad",
      choice: r.label,
      message,
      penalty
    };
    render();
  }

  function giveHint() {
    if (mission.hints >= 3) {
      setFeedback({ type: "info", message: "All three hints for this brief are already on the bench. The answer is on the shelf: read each option's functional-group language." });
      return;
    }
    mission.hints += 1;
    const before = mission.score;
    mission.score = Math.max(10, mission.score - 8);
    const penalty = before - mission.score;
    const hint = mission.def.hints[mission.hints - 1] || "Read the shelf labels and match the functional group in the current vessel to the product you need.";
    mission.feedback = { type: "hint", n: mission.hints, message: hint, penalty };
    render();
  }

  function goNext() {
    if (!mission || !mission.awaitingNext) return;
    if (mission.stepIndex + 1 < mission.def.steps.length) {
      mission.stepIndex += 1;
      mission.awaitingNext = false;
      mission.selected = null;
      mission.feedback = null;
      render();
      scrollToVessel();
      return;
    }
    completeMission();
  }

  function completeMission() {
    const id = mission.def.id;
    const prev = progress.missions[id] || { best: 0, attempts: 0, completed: false };
    const newBest = mission.score > (prev.best || 0);
    progress.missions[id] = {
      best: Math.max(prev.best || 0, mission.score),
      attempts: prev.attempts || 1,
      completed: true
    };
    progress.totalRuns = (progress.totalRuns || 0) + 1;
    mission.pointsEarned = Math.max(2, Math.round((mission.score || 0) / 20));
    progress.points = (progress.points || 0) + mission.pointsEarned;
    saveProgress();
    mission.complete = true;
    mission.newBest = newBest;
    mission.awaitingNext = false;
    mission.feedback = null;
    render();
    scrollTop();
    toast(`Brief cleared. +${mission.pointsEarned} PTS for any case.`);
    if (newBest) toast(`New best on ${mission.def.title}: ${mission.score} yield`);
  }

  function setFeedback(feedback) {
    if (!mission) return;
    mission.feedback = feedback;
    render();
  }

  /* ============================================================
     answer resolution
     ============================================================ */

  function resolveReagent(raw, shelf) {
    let text = raw.trim().replace(/[.!?]+$/, "").replace(/^(use|run|choose|item|no\.?|#)\s*/i, "").trim();

    const numberParts = text.split(/[\s,]+/).filter(Boolean);
    if (numberParts.length > 1 && numberParts.every((p) => /^\d+$/.test(p))) {
      return { type: "multi-index" };
    }

    const numeric = text.match(/^(\d+)$/);
    if (numeric) {
      const n = Number(numeric[1]);
      if (n >= 1 && n <= shelf.length) return { type: "one", id: shelf[n - 1] };
      return { type: "none" };
    }

    const q = normalise(text);
    if (!q) return { type: "none" };

    // A full label or exact id is unambiguous; prefer it over short alias matches.
    const strong = shelf.filter((id) => normalise(id) === q || normalise(reagent(id).label) === q);
    if (strong.length === 1) return { type: "one", id: strong[0] };
    if (strong.length > 1) return { type: "many", ids: strong };

    const shelfMatches = matchIds(q, shelf);
    if (shelfMatches.exact.length === 1 && shelfMatches.partial.length === 0) {
      return { type: "one", id: shelfMatches.exact[0] };
    }
    if (shelfMatches.exact.length > 1) return { type: "many", ids: shelfMatches.exact };
    if (shelfMatches.exact.length === 1 && shelfMatches.partial.length > 0) {
      return { type: "many", ids: [...shelfMatches.exact, ...shelfMatches.partial] };
    }
    if (shelfMatches.partial.length === 1) return { type: "one", id: shelfMatches.partial[0] };
    if (shelfMatches.partial.length > 1) {
      const best = bestMatch(q, shelfMatches.partial);
      if (best.length === 1) return { type: "one", id: best[0] };
      return { type: "many", ids: best };
    }

    const globalMatches = matchIds(q, Object.keys(REAGENTS));
    if (globalMatches.exact.length || globalMatches.partial.length) {
      const id = globalMatches.exact[0] || globalMatches.partial[0];
      return { type: "offbench", name: reagent(id).label };
    }

    return { type: "none" };
  }

  function matchIds(q, ids) {
    const exact = [];
    const partial = [];
    ids.forEach((id) => {
      const r = reagent(id);
      const haystack = [id, r.short, r.label, ...(r.aliases || [])].map(normalise).filter(Boolean);
      if (haystack.some((h) => h === q)) {
        exact.push(id);
      } else if (haystack.some((h) => h.length >= 3 && (h.includes(q) || (q.length >= 3 && q.includes(h))))) {
        partial.push(id);
      }
    });
    return { exact, partial };
  }

  function bestMatch(q, ids) {
    let bestScore = -1;
    let best = [];
    ids.forEach((id) => {
      const r = reagent(id);
      const haystack = [id, r.short, r.label, ...(r.aliases || [])].map(normalise).filter(Boolean);
      let s = 0;
      haystack.forEach((h) => {
        if (h === q) s = Math.max(s, 1000 + h.length);
        else if (h.startsWith(q)) s = Math.max(s, 500 + q.length);
        else if (h.includes(q)) s = Math.max(s, 100 + q.length);
        else if (q.includes(h)) s = Math.max(s, 50 + h.length);
      });
      if (s > bestScore) {
        bestScore = s;
        best = [id];
      } else if (s === bestScore) {
        best.push(id);
      }
    });
    return best;
  }

  /* ============================================================
     concept logic
     ============================================================ */

  function markTutorial(code) {
    const first = !progress.expansion.tutorials[code];
    progress.expansion.tutorials[code] = true;
    let awarded = 0;
    if (first) {
      awarded = 5;
      progress.points = (progress.points || 0) + awarded;
    }
    saveProgress();
    render();
    toast(first ? `Tutorial complete. +${awarded} PTS added to your universal balance.` : "Tutorial already completed.");
  }

  function answerDrill(index) {
    if (!drill || drill.done || drill.answered) return;
    const record = drill.questions[drill.index];
    const q = drill.chapter.questions[record.index];
    if (index < 0 || index >= record.order.length) return;
    drill.selected = index;
    drill.answered = true;
    const correct = index === record.answer;
    if (correct) drill.correct += 1;
    drill.answers.push({ index: record.index, selected: index, correct });
    render();
  }

  function nextDrill() {
    if (!drill || !drill.answered) return;
    if (drill.index + 1 < drill.questions.length) {
      drill.index += 1;
      drill.selected = null;
      drill.answered = false;
      render();
      scrollTop();
      return;
    }
    drill.done = true;
    const code = drill.chapter.code;
    const best = progress.expansion.best[code] || 0;
    const firstClear = (progress.expansion.completions[code] || 0) === 0;
    drill.newBest = drill.correct > best;
    drill.pointsEarned = 2 + drill.correct + (firstClear ? 3 : 0);
    progress.expansion.best[code] = Math.max(best, drill.correct);
    progress.expansion.completions[code] = (progress.expansion.completions[code] || 0) + 1;
    progress.points = (progress.points || 0) + drill.pointsEarned;
    saveProgress();
    render();
    scrollTop();
    toast(`Chapter complete. +${drill.pointsEarned} PTS for any case.`);
  }

  function answerConcept(index) {
    if (!concept || concept.done || concept.answered) return;
    const q = CONCEPTS.find((c) => c.id === concept.ids[concept.index]);
    const record = concept.questions[concept.index];
    if (!q || !record || index < 0 || index >= record.order.length) return;
    concept.selected = index;
    concept.answered = true;
    const correct = index === record.answer;
    if (correct) {
      concept.correct += 1;
      progress.points = (progress.points || 0) + 1;
      saveProgress();
    }
    concept.answers.push({ id: q.id, selected: index, correct });
    render();
  }

  function nextConcept() {
    if (!concept || !concept.answered) return;
    if (concept.index + 1 < concept.ids.length) {
      concept.index += 1;
      concept.selected = null;
      concept.answered = false;
      render();
      document.querySelector(".concept-card")?.scrollIntoView({ block: "start" });
      return;
    }
    concept.done = true;
    const best = progress.concepts.best || 0;
    const newBest = concept.correct > best;
    progress.concepts.best = Math.max(best, concept.correct);
    saveProgress();
    concept.newBest = newBest;
    render();
    scrollTop();
    if (newBest) toast(`New concept best: ${concept.correct} / ${concept.ids.length}`);
  }

  /* ============================================================
     events
     ============================================================ */

  document.addEventListener("click", (event) => {
    const backdrop = event.target.closest("[data-overlay-backdrop]");
    if (backdrop && event.target === backdrop) {
      closeOverlay();
      return;
    }

    const shelfButton = event.target.closest("[data-reagent]");
    if (shelfButton) {
      if (!mission || mission.complete || mission.awaitingNext) return;
      mission.selected = shelfButton.dataset.reagent;
      const input = document.getElementById("answer");
      if (input) {
        input.value = reagent(mission.selected).label;
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
      document.querySelectorAll(".shelf-item").forEach((btn) => {
        btn.setAttribute("aria-pressed", String(btn === shelfButton));
      });
      return;
    }

    const target = event.target.closest("[data-action]");
    if (!target) return;
    const action = target.dataset.action;
    const id = target.dataset.id;

    if (action === "home") goHome();
    else if (action === "map") goMap();
    else if (action === "start-campaign") goMap();
    else if (action === "start-concepts") startConcepts();
    else if (action === "mission") startMission(id);
    else if (action === "replay") startMission(id);
    else if (action === "notes") goNotes();
    else if (action === "expansion") goExpansion();
    else if (action === "expansion-cases") goExpansionCases();
    else if (action === "open-exp-case" && target.dataset.case) openCase(target.dataset.case);
    else if (action === "chapter" && target.dataset.code) goChapter(target.dataset.code);
    else if (action === "start-drill" && target.dataset.code) startDrill(target.dataset.code);
    else if (action === "mark-tutorial" && target.dataset.code) markTutorial(target.dataset.code);
    else if (action === "drill-answer") answerDrill(Number(target.dataset.index));
    else if (action === "drill-next") nextDrill();
    else if (action === "case-lab") goCaseLab();
    else if (action === "collection") goCollection();
    else if (action === "open-case") openCase(target.dataset.case || CASE.id);
    else if (action === "help") openOverlay("help");
    else if (action === "close-overlay") closeOverlay();
    else if (action === "next") goNext();
    else if (action === "next-mission" && id) startMission(id);
    else if (action === "concept-answer") answerConcept(Number(target.dataset.index));
    else if (action === "concept-next") nextConcept();
    else if (action === "reset-progress") resetProgress();
  });

  document.addEventListener("submit", (event) => {
    if (event.target && event.target.id === "answer-form") {
      event.preventDefault();
      const input = document.getElementById("answer");
      submitAnswer(input ? input.value : "");
    }
  });

  document.addEventListener("keydown", (event) => {
    const active = document.activeElement;
    const isTyping = active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.isContentEditable);

    if (event.key === "Escape") {
      if (view.overlay) {
        event.preventDefault();
        closeOverlay();
        return;
      }
      if (view.screen === "mission" || view.screen === "concept" || view.screen === "notes") {
        event.preventDefault();
        goMap();
        return;
      }
      if (view.screen === "map") {
        event.preventDefault();
        goHome();
        return;
      }
    }

    if (event.key === "?" && !isTyping) {
      event.preventDefault();
      openOverlay("help");
      return;
    }

    if (event.key === "/" && !isTyping && view.screen === "mission" && !mission?.awaitingNext) {
      event.preventDefault();
      focusElement("#answer");
      return;
    }

    if (view.screen === "concept" && !view.overlay && !isTyping && /^[1-4]$/.test(event.key)) {
      event.preventDefault();
      answerConcept(Number(event.key) - 1);
      return;
    }

    if (view.screen === "concept" && !view.overlay && !isTyping && /^[a-dA-D]$/.test(event.key)) {
      event.preventDefault();
      answerConcept(event.key.toLowerCase().charCodeAt(0) - 97);
      return;
    }

    if (view.screen === "concept" && !view.overlay && !isTyping && event.key === "Enter" && concept?.answered) {
      event.preventDefault();
      nextConcept();
      return;
    }

    if (view.screen === "mission" && !view.overlay && !isTyping && event.key === "Enter" && mission?.awaitingNext) {
      event.preventDefault();
      goNext();
    }
  });

  function resetProgress() {
    const ok = window.confirm("Erase all BENCH progress (mission bests and concept best)? This cannot be undone.");
    if (!ok) return;
    progress = blankProgress();
    try { localStorage.removeItem(STORE_KEY); } catch { /* ignore */ }
    saveProgress();
    toast("Progress erased. Clean bench.");
    goMap();
  }

  /* ============================================================
     boot
     ============================================================ */

  function parseLocation() {
    const hash = location.hash.replace(/^#\/?/, "");
    if (hash.startsWith("brief/")) {
      const id = hash.slice("brief/".length);
      if (missionById(id)) {
        startMission(id);
        return true;
      }
    }
    if (hash === "concepts") {
      startConcepts();
      return true;
    }
    if (hash === "notes") {
      view.screen = "notes";
      render();
      return true;
    }
    if (hash === "expansion") {
      view.screen = "expansion";
      render();
      return true;
    }
    if (hash === "expansion-cases" || hash === "cases") {
      goCaseLab();
      return true;
    }
    if (hash.startsWith("chapter/")) {
      const code = hash.slice("chapter/".length);
      const chapter = EXP_CHAPTERS.find((c) => c.code === code);
      if (chapter) { chapterView = chapter; view.screen = "chapter"; render(); return true; }
    }
    if (hash.startsWith("drill/")) {
      const code = hash.slice("drill/".length);
      if (EXP_CHAPTERS.some((c) => c.code === code)) { startDrill(code); return true; }
    }
    if (hash === "case") {
      view.screen = "case";
      render();
      return true;
    }
    if (hash === "collection") {
      view.screen = "collection";
      render();
      return true;
    }
    if (hash === "briefs" || hash === "map") {
      view.screen = "map";
      render();
      return true;
    }
    view.screen = "title";
    render();
    return true;
  }

  parseLocation();
})();
