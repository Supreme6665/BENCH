import { chromium } from "playwright";
import fs from "node:fs";

const URL = "http://localhost:8000";
const OUT = "/tmp/opencode";
const errors = [];
const checks = [];

function ok(condition, label) {
  checks.push({ label, pass: !!condition });
  if (!condition) errors.push(label);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push("console: " + msg.text());
});
page.on("pageerror", (err) => errors.push("pageerror: " + err.message));

await page.goto(URL, { waitUntil: "networkidle" });
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: "networkidle" });

// Title
ok(await page.locator("h1").innerText().then((t) => t.includes("Make the molecule")), "title screen renders");
ok((await page.locator(".menu-item").count()) === 6, "title has six menu items");
ok((await page.locator('[data-action="case-lab"] .menu-note').innerText()).toLowerCase().includes("4 cases"), "title advertises all four cases");
ok((await page.evaluate(() => window.BENCH_DATA.concepts.length)) === 300, "concept bank contains 300 questions");

// Every concept diagram SMILES must parse and draw.
const badConceptDiagrams = await page.evaluate(() => {
  const failures = [];
  for (const concept of window.BENCH_DATA.concepts) {
    for (const diagram of concept.diagrams || []) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 200 150");
      document.body.appendChild(svg);
      let drawn = false;
      let error = "";
      try {
        SmilesDrawer.parse(diagram.smiles, (tree) => {
          try {
            new SmilesDrawer.SvgDrawer({ width: 200, height: 150, padding: 8 }).draw(tree, svg, "light");
            drawn = svg.children.length > 1;
          } catch (err) { error = err.message; }
        }, (err) => { error = String(err); });
      } catch (err) { error = err.message; }
      if (!drawn) failures.push({ id: concept.id, smiles: diagram.smiles, error });
      svg.remove();
    }
  }
  return failures;
});
ok(badConceptDiagrams.length === 0, "all concept diagram SMILES render");
const badRewardDiagrams = await page.evaluate(() => {
  const failures = [];
  for (const item of window.BENCH_DATA.rewards.items) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 200 150");
    document.body.appendChild(svg);
    let drawn = false;
    try {
      SmilesDrawer.parse(item.smiles, (tree) => {
        try {
          new SmilesDrawer.SvgDrawer({ width: 200, height: 150, padding: 8 }).draw(tree, svg, "light");
          drawn = svg.children.length > 1;
        } catch { drawn = false; }
      }, () => { drawn = false; });
    } catch { drawn = false; }
    if (!drawn) failures.push(item.id);
    svg.remove();
  }
  return failures;
});
ok(badRewardDiagrams.length === 0, "all reward item SMILES render");
await page.screenshot({ path: `${OUT}/bench-title.png`, fullPage: true });

// Campaign
await page.locator('[data-action="start-campaign"]').click();
await page.waitForSelector(".map-grid");
ok((await page.locator(".mission-card").count()) === 13, "campaign lists 13 missions");
await page.screenshot({ path: `${OUT}/bench-map.png`, fullPage: true });

// Mission 1: one wrong answer then the correct one
await page.locator('.mission-card[data-id="m01"]').click();
await page.waitForSelector("#answer");
ok((await page.locator(".shelf-item").count()) === 10, "M01 shelf has 10 items");
ok((await page.locator("#answer").getAttribute("placeholder")).includes("shelf number"), "answer input is present");
ok((await page.locator(".vessel .structure-svg").count()) === 2, "both vessel and target have skeletal SVG diagrams");
const diagramShapes = await page.locator(".vessel .structure-svg").evaluateAll((nodes) =>
  nodes.map((node) => ({ children: node.children.length, viewBox: node.getAttribute("viewBox") }))
);
ok(diagramShapes.every((d) => d.children > 1 && d.viewBox), "skeletal diagrams contain drawn geometry");
ok((await page.locator(".structure-fallback").count()) === 0, "no skeletal diagram fell back to text");

await page.locator("#answer").fill("2");
await page.locator("#answer").press("Enter");
await page.waitForSelector(".result-bad");
ok((await page.locator(".result-bad").innerText()).toLowerCase().includes("reaction rejected"), "wrong answer is rejected");
ok((await page.locator(".scoreboard").innerText()).includes("90"), "wrong answer costs 10 yield");

await page.locator("#answer").fill("1");
await page.locator("#answer").press("Enter");
await page.waitForSelector(".result-ok");
ok((await page.locator(".result-ok").innerText()).toLowerCase().includes("reaction accepted"), "correct answer is accepted");
ok((await page.locator(".equation").innerText()).toUpperCase().includes("CH"), "correct answer shows an equation");
await page.screenshot({ path: `${OUT}/bench-mission-feedback.png`, fullPage: true });

await page.locator('[data-action="next"]').click();
await page.waitForSelector(".complete");
ok((await page.locator(".complete").innerText()).toUpperCase().includes("CLEARED"), "mission completion screen renders");
ok((await page.locator(".score-panel").innerText()).includes("90"), "mission score is recorded");
await page.screenshot({ path: `${OUT}/bench-complete.png`, fullPage: true });

// Map shows cleared
await page.locator('.complete [data-action="map"]').click();
await page.waitForSelector(".map-grid");
ok((await page.locator('.mission-card[data-id="m01"] .mission-status').innerText()).includes("CLEARED"), "map marks M01 cleared");

// Mission 2: full three-step route via shelf clicks
await page.locator('.mission-card[data-id="m02"]').click();
await page.waitForSelector("#answer");
ok((await page.locator(".step-goal .structure-svg").count()) === 1, "intermediate step target has a skeletal diagram");
for (const reagentId of ["oxid_kmno4_acid_hot", "socl2", "nh3_gas"]) {
  await page.locator(`[data-reagent="${reagentId}"]`).click();
  await page.locator("#answer").press("Enter");
  await page.waitForSelector(".result-ok");
  await page.locator('[data-action="next"]').click();
}
await page.waitForSelector(".complete");
ok((await page.locator(".score-panel").innerText()).includes("100"), "three-step M02 scores 100");
ok((await page.locator(".debrief").innerText()).includes("acyl chloride"), "M02 debrief explains the route");

// Concept lab: answer all ten, first option each time
await page.locator('.complete [data-action="map"]').click();
await page.waitForSelector(".map-grid");
await page.locator('[data-action="start-concepts"]').click();
await page.waitForSelector(".concept-card");
ok((await page.locator(".option").count()) === 4, "concept question has four options");
await page.screenshot({ path: `${OUT}/bench-concept.png`, fullPage: true });
let conceptDiagramSeen = false;
let conceptOrderShuffled = true;
let conceptCorrectMapping = true;
for (let i = 0; i < 10; i += 1) {
  const pointsBefore = i === 0 ? await page.evaluate(() => JSON.parse(localStorage.getItem("bench.progress.v1") || "{}").points || 0) : 0;
  const correctIndex = await page.evaluate(() => {
    const text = document.querySelector("#concept-question")?.innerText || "";
    const q = window.BENCH_DATA.concepts.find((c) => c.question === text);
    const domOptions = [...document.querySelectorAll(".option")].map((o) => o.querySelectorAll("span")[1]?.innerText);
    return q ? domOptions.indexOf(q.options[q.answer]) : -1;
  });
  const orderCheck = await page.evaluate(() => {
    const text = document.querySelector("#concept-question")?.innerText || "";
    const q = window.BENCH_DATA.concepts.find((c) => c.question === text);
    const domOptions = [...document.querySelectorAll(".option")].map((o) => o.querySelectorAll("span")[1]?.innerText);
    return q ? { same: JSON.stringify(domOptions) === JSON.stringify(q.options) } : { same: true };
  });
  if (orderCheck.same) conceptOrderShuffled = false;
  const diagramCount = await page.locator(".concept-diagram .structure-svg").count();
  if (diagramCount > 0 && !conceptDiagramSeen) {
    const shapes = await page.locator(".concept-diagram .structure-svg").evaluateAll((nodes) =>
      nodes.map((node) => ({ children: node.children.length, viewBox: node.getAttribute("viewBox") }))
    );
    ok(shapes.every((d) => d.children > 1 && d.viewBox), "concept-lab skeletal diagram has drawn geometry");
    conceptDiagramSeen = true;
  }
  await page.locator(".option").nth(i === 0 ? correctIndex : 0).click();
  await page.waitForSelector(".concept-result");
  if (i === 0) {
    const pointsAfter = await page.evaluate(() => JSON.parse(localStorage.getItem("bench.progress.v1") || "{}").points || 0);
    ok(pointsAfter === pointsBefore + 1, "a correct Concept Lab answer earns 1 research point");
  }
  const mapping = await page.evaluate(() => {
    const text = document.querySelector("#concept-question")?.innerText || "";
    const q = window.BENCH_DATA.concepts.find((c) => c.question === text);
    const domOptions = [...document.querySelectorAll(".option")].map((o) => o.querySelectorAll("span")[1]?.innerText);
    const correctIndex = q ? domOptions.indexOf(q.options[q.answer]) : -1;
    const markedIndex = [...document.querySelectorAll(".option")].findIndex((o) => o.classList.contains("correct"));
    return { correctIndex, markedIndex };
  });
  if (mapping.correctIndex !== mapping.markedIndex) conceptCorrectMapping = false;
  await page.locator('[data-action="concept-next"]').click();
}
ok(conceptDiagramSeen, "concept set includes a question with a skeletal diagram");
ok(conceptOrderShuffled, "every concept question's answer order is shuffled");
ok(conceptCorrectMapping, "shuffled answers keep the correct answer marking");
await page.waitForSelector(".complete");
ok((await page.locator(".complete").innerText()).toLowerCase().includes("concept lab"), "concept result screen renders");
ok((await page.locator(".score-panel").innerText()).toLowerCase().includes("correct"), "concept score panel renders");

// Field notes screen and overlay
await page.locator('.complete [data-action="map"]').click();
await page.waitForSelector(".map-grid");
await page.locator('[data-action="notes"]').click();
await page.waitForSelector(".notes-grid");
ok((await page.locator(".note-card").count()) === 7, "field notes has seven sections");
await page.screenshot({ path: `${OUT}/bench-notes.png`, fullPage: true });

await page.locator('.back-button[data-action="map"]').click();
await page.waitForSelector(".map-grid");
await page.locator('.mission-card[data-id="m03"]').click();
await page.waitForSelector("#answer");
await page.locator('.command-help [data-action="help"]').click();
await page.waitForSelector(".overlay");
ok((await page.locator(".overlay").innerText()).toLowerCase().includes("how to play"), "help overlay opens");
await page.screenshot({ path: `${OUT}/bench-help.png`, fullPage: true });
await page.locator('[data-action="close-overlay"]').click();

// Hint path
await page.locator("#answer").fill("hint");
await page.locator("#answer").press("Enter");
await page.waitForSelector(".result-warn");
ok((await page.locator(".result-warn").innerText()).toLowerCase().includes("hint 1 / 3"), "hint command works and costs yield");

// Reward lab: seed 30 points, open one case, check collection and the ? placeholders.
await page.evaluate(() => {
  const progress = {
    missions: {},
    concepts: { best: 0, attempts: 0 },
    totalRuns: 0,
    points: 30,
    casesOpened: 0,
    duplicates: 0,
    collection: {}
  };
  localStorage.setItem("bench.progress.v1", JSON.stringify(progress));
});
await page.goto(`${URL}/?reward=1#case`, { waitUntil: "networkidle" });
await page.waitForSelector(".case-hub-grid");
ok((await page.locator("#topbar-status").innerText()).includes("30 PTS"), "case lab shows the 30-point balance");
ok((await page.locator(".case-hub-card").count()) === 4, "case lab lists all four cases in one interface");
ok((await page.locator(".case-archive-card").count()) === 40, "one interface shows all 40 case collectibles");
ok((await page.locator('[data-action="open-case"]').count()) === 4, "every case has an open button");
ok(!(await page.locator('[data-action="open-case"]').first().isDisabled()), "a case is available at 30 points");
await page.screenshot({ path: `${OUT}/bench-case.png`, fullPage: true });

const caseStart = Date.now();
await page.locator('[data-action="open-case"]').first().click();
await page.waitForSelector(".case-reel-window");
ok((await page.locator(".case-reel-card").count()) === 45, "CSGO-style case reel renders");
const openingBox = await page.locator(".case-opening-panel").boundingBox();
ok(openingBox.width > 1200 && openingBox.height > 800, "case opening fills most of the screen");
await page.waitForSelector(".case-reveal", { timeout: 15000 });
const caseElapsed = Date.now() - caseStart;
ok(caseElapsed >= 9000 && caseElapsed <= 12000, "case opening lasts around 10 seconds");
ok((await page.locator(".case-reveal").innerText()).toLowerCase().includes("new compound"), "first case reveals a new compound");
const firstCase = await page.evaluate(() => {
  const p = JSON.parse(localStorage.getItem("bench.progress.v1"));
  return { points: p.points, cases: p.casesOpened, owned: Object.keys(p.collection).length };
});
ok(firstCase.points === 0, "opening a case costs 30 points");
ok(firstCase.cases === 1, "case counter increments");
ok(firstCase.owned === 1, "first case adds one compound to the collection");
await page.screenshot({ path: `${OUT}/bench-case-reveal.png`, fullPage: true });

await page.locator('.case-reveal [data-action="collection"]').click();
await page.waitForSelector(".collection-grid");
ok((await page.locator(".collection-card").count()) === 16, "collection book has 16 cards");
ok((await page.locator(".collection-unknown").count()) === 15, "undiscovered compounds are labelled ?");
ok((await page.locator(".collection-figure .structure-svg").count()) === 1, "the found compound has a skeletal diagram");
const collectionShape = await page.locator(".collection-figure .structure-svg").evaluate((node) => ({
  children: node.children.length,
  viewBox: node.getAttribute("viewBox")
}));
ok(collectionShape.children > 1 && collectionShape.viewBox, "collection diagram contains drawn geometry");
await page.screenshot({ path: `${OUT}/bench-collection.png`, fullPage: true });

await page.locator('.complete-actions [data-action="case-lab"]').click();
await page.waitForSelector(".case-hub-grid");
ok(await page.locator('[data-action="open-case"]').first().isDisabled(), "case is disabled at 0 points");
ok((await page.locator(".case-progress").first().innerText()).includes("30"), "case lab shows points still needed");

// Duplicate path: own every compound, open one more case and check the refund.
const rewardIds = await page.evaluate(() => window.BENCH_DATA.rewards.items.map((item) => item.id));
await page.evaluate((ids) => {
  const collection = {};
  ids.forEach((id) => { collection[id] = 1; });
  const progress = {
    missions: {},
    concepts: { best: 0, attempts: 0 },
    totalRuns: 0,
    points: 30,
    casesOpened: 10,
    duplicates: 0,
    collection
  };
  localStorage.setItem("bench.progress.v1", JSON.stringify(progress));
}, rewardIds);
await page.goto(`${URL}/?reward=2#case`, { waitUntil: "networkidle" });
await page.waitForSelector(".case-hub-grid");
await page.locator('[data-action="open-case"]').first().click();
await page.waitForSelector(".case-reveal", { timeout: 15000 });
ok((await page.locator(".case-reveal").innerText()).toLowerCase().includes("duplicate"), "duplicate case shows a duplicate result");
const duplicate = await page.evaluate(() => {
  const p = JSON.parse(localStorage.getItem("bench.progress.v1"));
  return { points: p.points, duplicates: p.duplicates, cases: p.casesOpened };
});
ok(duplicate.points >= 2 && duplicate.points <= 15, "duplicate refunds points by rarity");
ok(duplicate.duplicates === 1 && duplicate.cases === 11, "duplicate and case counters update");
await page.screenshot({ path: `${OUT}/bench-case-duplicate.png`, fullPage: true });

// Physical & Inorganic expansion: all 16 chapters, tutorial, and a 10-question drill.
await page.goto(`${URL}/?expansion=1#expansion`, { waitUntil: "networkidle" });
await page.waitForSelector(".chapter-grid");
ok((await page.locator(".chapter-card").count()) === 16, "expansion lists 16 chapters");
ok((await page.evaluate(() => window.BENCH_DATA.expansion.chapters.reduce((sum, chapter) => sum + chapter.questions.length, 0))) === 1600, "expansion contains 1600 MCQs");
ok((await page.evaluate(() => window.BENCH_DATA.expansion.chapters.every((chapter) => chapter.questions.length >= 100 && chapter.sections.length >= 5))) === true, "every chapter has 100 MCQs and a tutorial");
await page.screenshot({ path: `${OUT}/bench-expansion.png`, fullPage: true });

await page.locator('.chapter-card[data-code="A"]').click();
await page.waitForSelector(".tutorial-step");
ok((await page.locator(".tutorial-step").count()) === 5, "chapter A tutorial has five steps");
ok((await page.locator(".chapter-side").innerText()).includes("100"), "chapter A has a 100-question bank");
const pointsBeforeTutorial = await page.evaluate(() => JSON.parse(localStorage.getItem("bench.progress.v1") || "{}").points || 0);
await page.locator('[data-action="mark-tutorial"]').click();
await page.waitForTimeout(150);
ok((await page.evaluate(() => JSON.parse(localStorage.getItem("bench.progress.v1")).expansion.tutorials.A)) === true, "tutorial completion is saved");
ok((await page.evaluate(() => JSON.parse(localStorage.getItem("bench.progress.v1")).points)) === pointsBeforeTutorial + 5, "chapter tutorial awards 5 universal points");
await page.locator('[data-action="start-drill"]').click();
await page.waitForSelector(".concept-card");
ok((await page.locator(".option").count()) === 4, "chapter drill renders four options");
for (let i = 0; i < 10; i += 1) {
  await page.locator(".option").first().click();
  await page.waitForSelector(".concept-result");
  await page.locator('[data-action="drill-next"]').click();
}
await page.waitForSelector(".complete");
ok((await page.locator(".screen-title h2").innerText()).toLowerCase().includes("chapter result"), "chapter drill result renders");
const chapterState = await page.evaluate(() => {
  const p = JSON.parse(localStorage.getItem("bench.progress.v1"));
  return { best: p.expansion.best.A, points: p.points, completions: p.expansion.completions.A };
});
ok(typeof chapterState.best === "number" && chapterState.best >= 0 && chapterState.best <= 10, "chapter best score is saved");
ok(chapterState.points === pointsBeforeTutorial + 10 + chapterState.best, "finishing a drill awards 2 base + 1 per correct + 3 first-clear points");
ok(chapterState.completions === 1, "chapter completion is recorded");
ok((await page.locator(".reward-callout").innerText()).includes("PTS"), "chapter result shows the universal point payout");
await page.screenshot({ path: `${OUT}/bench-drill-result.png`, fullPage: true });

// Unified case hub: all four cases, shared wallet, large opening stage, metals case.
await page.evaluate(() => {
  const progress = {
    missions: {}, concepts: { best: 0, attempts: 0 }, totalRuns: 0,
    points: 60, casesOpened: 0, duplicates: 0, collection: {},
    expansion: { tutorials: {}, best: {}, attempts: {}, completions: {}, cases: {} }
  };
  localStorage.setItem("bench.progress.v1", JSON.stringify(progress));
});
await page.goto(`${URL}/?cases=1#case`, { waitUntil: "networkidle" });
await page.waitForSelector(".case-hub-grid");
ok((await page.locator(".case-hub-card").count()) === 4, "one hub exposes organic, physical, inorganic and metals cases");
ok((await page.locator(".case-archive-card").count()) === 40, "the hub shows all 40 collectibles");
ok((await page.locator(".case-archive-card.unknown").count()) === 40, "undiscovered case items are ?");
ok((await page.locator('[data-case-card="metals"]').innerText()).includes("Metals Case"), "metals case is accessible");
await page.screenshot({ path: `${OUT}/bench-unified-cases.png`, fullPage: true });

await page.locator('[data-action="open-case"][data-case="physical"]').click();
await page.waitForSelector(".case-reel-window");
ok((await page.locator(".case-reel-card").count()) === 45, "unified case reel renders");
const stageBox = await page.locator(".case-opening-panel").boundingBox();
ok(stageBox.width > 1200 && stageBox.height > 800, "case opening occupies most of the viewport");
await page.waitForSelector(".case-reveal", { timeout: 15000 });
ok((await page.locator(".case-winner-formula").innerText()).length > 0, "topic case reveals a collectible");
const physicalCase = await page.evaluate(() => {
  const p = JSON.parse(localStorage.getItem("bench.progress.v1"));
  return { points: p.points, physical: p.expansion.cases.physical };
});
ok(physicalCase.points === 30, "one universal wallet pays for a topic case");
ok(Object.keys(physicalCase.physical.collection).length === 1, "topic case adds one archive entry");
await page.screenshot({ path: `${OUT}/bench-topic-case.png`, fullPage: true });

await page.locator('.case-reveal [data-action="case-lab"]').click();
await page.waitForSelector(".case-hub-grid");
ok((await page.locator('[data-case-card="physical"]').innerText()).includes("1"), "hub archive updates after a case");
await page.locator('[data-action="open-case"][data-case="metals"]').click();
await page.waitForSelector(".case-reveal", { timeout: 15000 });
const metalsCase = await page.evaluate(() => {
  const p = JSON.parse(localStorage.getItem("bench.progress.v1"));
  return { points: p.points, metals: p.expansion.cases.metals };
});
ok(metalsCase.points === 0, "metals case spends the same universal points");
ok(Object.keys(metalsCase.metals.collection).length === 1, "metals case adds one archive entry");
await page.screenshot({ path: `${OUT}/bench-metals-case.png`, fullPage: true });

// Mobile screenshot
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForSelector("h1");
await page.screenshot({ path: `${OUT}/bench-mobile.png`, fullPage: true });
ok((await page.locator("h1").innerText()).includes("Make the molecule"), "mobile title renders");

await browser.close();

const failed = checks.filter((c) => !c.pass);
console.log(`checks: ${checks.length}, passed: ${checks.length - failed.length}, failed: ${failed.length}`);
checks.forEach((c) => console.log(`${c.pass ? "PASS" : "FAIL"}  ${c.label}`));
if (errors.length) {
  console.log("\nERRORS:");
  errors.forEach((e) => console.log("  " + e));
  process.exit(1);
}
if (failed.length) process.exit(1);
console.log("\nBrowser smoke test OK.");
