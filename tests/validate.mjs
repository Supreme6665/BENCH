import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../data.js", import.meta.url), "utf8");
const extraConcepts = fs.readFileSync(new URL("../concepts.js", import.meta.url), "utf8");
const extraConcepts2 = fs.readFileSync(new URL("../concepts-200.js", import.meta.url), "utf8");
const rewardsSource = fs.readFileSync(new URL("../rewards.js", import.meta.url), "utf8");
const expansionContent = fs.readFileSync(new URL("../expansion-content.js", import.meta.url), "utf8");
const expansionQuestions = fs.readFileSync(new URL("../expansion-questions.js", import.meta.url), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox);
vm.runInNewContext(extraConcepts, sandbox);
vm.runInNewContext(extraConcepts2, sandbox);
vm.runInNewContext(rewardsSource, sandbox);
vm.runInNewContext(expansionContent, sandbox);
vm.runInNewContext(expansionQuestions, sandbox);
const DATA = sandbox.window.BENCH_DATA;

const errors = [];
const warn = [];

const compounds = DATA.compounds;
const reagents = DATA.reagents;
const reactions = DATA.reactions;
const smiles = DATA.smiles || {};

// 1. unique ids already guaranteed by object keys; check reaction references
reactions.forEach((r, i) => {
  if (!compounds[r.from]) errors.push(`reaction ${i}: missing from compound "${r.from}"`);
  if (!compounds[r.to]) errors.push(`reaction ${i}: missing to compound "${r.to}"`);
  if (!reagents[r.reagent]) errors.push(`reaction ${i}: missing reagent "${r.reagent}"`);
  if (!r.type) errors.push(`reaction ${i}: missing reaction type`);
  if (!r.note) errors.push(`reaction ${i}: missing explanation`);
});

// 2. mission integrity
const seen = new Set();
DATA.missions.forEach((m) => {
  if (seen.has(m.id)) errors.push(`duplicate mission id ${m.id}`);
  seen.add(m.id);
  if (!compounds[m.start]) errors.push(`${m.id}: missing start "${m.start}"`);
  if (!compounds[m.target]) errors.push(`${m.id}: missing target "${m.target}"`);
  if (!smiles[m.start]) errors.push(`${m.id}: no skeletal SMILES for start "${m.start}"`);
  if (!smiles[m.target]) errors.push(`${m.id}: no skeletal SMILES for target "${m.target}"`);
  if (!m.steps?.length) errors.push(`${m.id}: no steps`);
  if (m.steps.length !== (m.steps.length)) {}
  let prevTo = null;
  m.steps.forEach((s, i) => {
    const where = `${m.id} step ${i + 1}`;
    if (!compounds[s.from]) errors.push(`${where}: missing from "${s.from}"`);
    if (!compounds[s.to]) errors.push(`${where}: missing to "${s.to}"`);
    if (!smiles[s.from]) errors.push(`${where}: no skeletal SMILES for from "${s.from}"`);
    if (!smiles[s.to]) errors.push(`${where}: no skeletal SMILES for to "${s.to}"`);
    if (i === 0 && s.from !== m.start) errors.push(`${where}: from should equal mission start`);
    if (i > 0 && s.from !== prevTo) errors.push(`${where}: from ${s.from} != previous to ${prevTo}`);
    prevTo = s.to;
    if (!Array.isArray(s.shelf) || s.shelf.length < 4) errors.push(`${where}: shelf too short`);
    const seenShelf = new Set();
    (s.shelf || []).forEach((id) => {
      if (!reagents[id]) errors.push(`${where}: shelf missing reagent "${id}"`);
      if (seenShelf.has(id)) errors.push(`${where}: duplicate shelf reagent "${id}"`);
      seenShelf.add(id);
    });
    const valid = (s.shelf || []).some((id) =>
      reactions.some((r) => r.from === s.from && r.reagent === id && r.to === s.to)
    );
    if (!valid) errors.push(`${where}: no shelf reagent produces ${s.to} from ${s.from}`);
    if (!s.prompt) errors.push(`${where}: no prompt`);
    if (!s.title) errors.push(`${where}: no title`);
  });
  if (prevTo !== m.target) errors.push(`${m.id}: final step to ${prevTo} != target ${m.target}`);
  if (!m.hints?.length) errors.push(`${m.id}: no hints`);
  if (!m.debrief) errors.push(`${m.id}: no debrief`);
});

// 3. concepts
const normalise = (value) => {
  const subs = { "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4", "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9" };
  return String(value).toLowerCase().replace(/[₀₁₂₃₄₅₆₇₈₉]/g, (c) => subs[c]).replace(/[^a-z0-9]/g, "");
};
const seenConcepts = new Set();
DATA.concepts.forEach((c, i) => {
  if (seenConcepts.has(c.id)) errors.push(`duplicate concept id ${c.id}`);
  seenConcepts.add(c.id);
  if (!Array.isArray(c.options) || c.options.length !== 4) errors.push(`concept ${c.id}: needs 4 options`);
  if (typeof c.answer !== "number" || c.answer < 0 || c.answer >= c.options.length) errors.push(`concept ${c.id}: bad answer`);
  if (!c.explanation) errors.push(`concept ${c.id}: no explanation`);
  if (!c.source) errors.push(`concept ${c.id}: no source`);
  if (c.diagrams) {
    if (!Array.isArray(c.diagrams) || c.diagrams.length === 0) {
      errors.push(`concept ${c.id}: diagrams must be a non-empty array`);
    } else {
      const optionSet = new Set(c.options.map(normalise));
      c.diagrams.forEach((d, j) => {
        if (!d.smiles) errors.push(`concept ${c.id} diagram ${j + 1}: no SMILES`);
        if (!d.label) errors.push(`concept ${c.id} diagram ${j + 1}: no label`);
        if (d.label && optionSet.has(normalise(d.label))) {
          errors.push(`concept ${c.id} diagram ${j + 1}: label "${d.label}" exposes an answer option`);
        }
      });
      if (/^which pair/i.test(c.question)) {
        const optionNorms = c.options.map(normalise);
        const labelNorms = c.diagrams.map((d) => normalise(d.label));
        optionNorms.forEach((option, index) => {
          if (labelNorms.length && labelNorms.every((label) => label && option.includes(label))) {
            errors.push(`concept ${c.id}: diagram labels expose pair option ${index + 1}`);
          }
        });
      }
    }
  }
});
if (DATA.concepts.length < 300) {
  errors.push(`concept bank has ${DATA.concepts.length} questions; expected at least 300`);
}

// 3b. reward economy
const rewards = DATA.rewards;
if (!rewards) {
  errors.push("missing reward data");
} else {
  if (!rewards.case || rewards.case.cost <= 0) errors.push("reward case has no positive cost");
  const rarityIds = new Set((rewards.rarities || []).map((r) => r.id));
  if (!Array.isArray(rewards.items) || rewards.items.length === 0) errors.push("reward case has no items");
  const seenItems = new Set();
  let totalWeight = 0;
  (rewards.items || []).forEach((item, i) => {
    if (seenItems.has(item.id)) errors.push(`duplicate reward item id ${item.id}`);
    seenItems.add(item.id);
    if (!item.name) errors.push(`reward item ${i + 1}: no name`);
    if (!item.formula) errors.push(`reward item ${i + 1}: no formula`);
    if (!item.smiles) errors.push(`reward item ${i + 1}: no SMILES`);
    if (!item.blurb) errors.push(`reward item ${i + 1}: no blurb`);
    if (!item.source) errors.push(`reward item ${i + 1}: no source`);
    if (!rarityIds.has(item.rarity)) errors.push(`reward item ${item.id}: bad rarity ${item.rarity}`);
    if (!(item.weight > 0)) errors.push(`reward item ${item.id}: bad weight`);
    totalWeight += item.weight || 0;
    if (!(rewards.case.duplicateRefunds?.[item.rarity] >= 0)) {
      errors.push(`reward item ${item.id}: no duplicate refund for ${item.rarity}`);
    }
  });
}

// 3c. physical & inorganic expansion
const expansion = DATA.expansion;
if (!expansion || !Array.isArray(expansion.chapters)) {
  errors.push("missing A–P expansion");
} else {
  if (expansion.chapters.length !== 16) errors.push(`expansion has ${expansion.chapters.length} chapters; expected 16`);
  const codes = new Set();
  let total = 0;
  expansion.chapters.forEach((chapter) => {
    if (codes.has(chapter.code)) errors.push(`duplicate chapter code ${chapter.code}`);
    codes.add(chapter.code);
    if (!Array.isArray(chapter.sections) || chapter.sections.length < 5) {
      errors.push(`${chapter.code}: expected at least 5 tutorial sections`);
    }
    if (!Array.isArray(chapter.questions) || chapter.questions.length < 100) {
      errors.push(`${chapter.code}: only ${chapter.questions?.length || 0} MCQs; expected 100`);
      return;
    }
    total += chapter.questions.length;
    const seenQ = new Set();
    chapter.questions.forEach((q) => {
      if (!q.question) errors.push(`${chapter.code} ${q.id}: no question`);
      if (!Array.isArray(q.options) || q.options.length !== 4) errors.push(`${chapter.code} ${q.id}: needs 4 options`);
      if (new Set(q.options).size !== 4) errors.push(`${chapter.code} ${q.id}: duplicate options`);
      if (typeof q.answer !== "number" || q.answer < 0 || q.answer >= 4) errors.push(`${chapter.code} ${q.id}: bad answer`);
      if (!q.explanation) errors.push(`${chapter.code} ${q.id}: no explanation`);
      if (!q.source) errors.push(`${chapter.code} ${q.id}: no source`);
      const key = normalise(q.question);
      if (seenQ.has(key)) errors.push(`${chapter.code} ${q.id}: duplicate question text`);
      seenQ.add(key);
    });
  });
  if (total < 1600) errors.push(`expansion has ${total} MCQs; expected at least 1600`);
}

// 4. reachability: for each mission, BFS through reaction graph from start to target
function bfs(start, target) {
  const q = [[start, 0]];
  const seen = new Set([start]);
  while (q.length) {
    const [node, d] = q.shift();
    if (node === target) return d;
    for (const r of reactions) {
      if (r.from === node && !seen.has(r.to)) {
        seen.add(r.to);
        q.push([r.to, d + 1]);
      }
    }
  }
  return Infinity;
}

DATA.missions.forEach((m) => {
  const d = bfs(m.start, m.target);
  if (!Number.isFinite(d)) errors.push(`${m.id}: target unreachable in graph`);
  else if (d > m.steps.length) warn.push(`${m.id}: graph shortest ${d}, mission steps ${m.steps.length}`);
});

// 5. reaction duplicates from+reagent -> different products
const pairMap = new Map();
reactions.forEach((r, i) => {
  const key = `${r.from}|${r.reagent}`;
  if (pairMap.has(key)) {
    const prev = pairMap.get(key);
    if (prev.to !== r.to) warn.push(`ambiguous ${key}: ${prev.to} vs ${r.to}`);
  } else pairMap.set(key, r);
});

console.log(`compounds: ${Object.keys(compounds).length}`);
console.log(`reagents: ${Object.keys(reagents).length}`);
console.log(`reactions: ${reactions.length}`);
console.log(`missions: ${DATA.missions.length}, steps: ${DATA.missions.reduce((a, m) => a + m.steps.length, 0)}`);
console.log(`concepts: ${DATA.concepts.length}`);
console.log(`reward items: ${rewards?.items?.length || 0}, total weight: ${rewards?.items?.reduce((a, i) => a + (i.weight || 0), 0) || 0}`);
console.log(`expansion chapters: ${DATA.expansion?.chapters?.length || 0}, MCQs: ${DATA.expansion?.chapters?.reduce((a, c) => a + c.questions.length, 0) || 0}`);
if (warn.length) {
  console.log("\nWARNINGS:");
  warn.forEach((w) => console.log("  ! " + w));
}
if (errors.length) {
  console.log("\nERRORS:");
  errors.forEach((e) => console.log("  x " + e));
  process.exit(1);
}
console.log("\nOK: all mission routes are valid and reachable.");
