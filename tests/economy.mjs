import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../data.js", import.meta.url), "utf8");
const rewardsSource = fs.readFileSync(new URL("../rewards.js", import.meta.url), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox);
vm.runInNewContext(rewardsSource, sandbox);
const rewards = sandbox.window.BENCH_DATA.rewards;
const items = rewards.items;
if (rewards.case.cost !== 30) {
  console.error("Case cost must be 30 correct answers/points.");
  process.exit(1);
}
if (items.length !== 16) {
  console.error(`Expected 16 collectible compounds, found ${items.length}.`);
  process.exit(1);
}
const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);

function roll() {
  let r = Math.random() * totalWeight;
  for (const item of items) {
    r -= item.weight;
    if (r <= 0) return item;
  }
  return items[items.length - 1];
}

function run() {
  const owned = new Set();
  let cases = 0;
  let refund = 0;
  let duplicates = 0;
  while (owned.size < items.length && cases < 5000) {
    cases += 1;
    const item = roll();
    if (owned.has(item.id)) {
      duplicates += 1;
      refund += rewards.case.duplicateRefunds[item.rarity] || 0;
    } else {
      owned.add(item.id);
    }
  }
  return { cases, refund, duplicates };
}

const trials = 20000;
let cases = 0;
let refund = 0;
let duplicates = 0;
for (let i = 0; i < trials; i += 1) {
  const r = run();
  cases += r.cases;
  refund += r.refund;
  duplicates += r.duplicates;
}
cases /= trials;
refund /= trials;
duplicates /= trials;
const netPoints = cases * rewards.case.cost - refund;
const hoursAt = (rate) => netPoints / rate;

console.log(`items: ${items.length}`);
console.log(`case cost: ${rewards.case.cost} points`);
console.log(`average cases to complete: ${cases.toFixed(1)}`);
console.log(`average duplicate refund: ${refund.toFixed(1)} points`);
console.log(`average net points: ${netPoints.toFixed(0)}`);
console.log(`average duplicates: ${duplicates.toFixed(1)}`);
console.log(`estimated time at 150 correct answers/hour: ${hoursAt(150).toFixed(1)} h`);
console.log(`estimated time at 120 correct answers/hour: ${hoursAt(120).toFixed(1)} h`);
console.log(`estimated time at 180 correct answers/hour: ${hoursAt(180).toFixed(1)} h`);

const hours = hoursAt(150);
if (hours < 8.5 || hours > 11.5) {
  console.error(`Economy is outside the target 8.5–11.5 h window at 150 correct answers/hour.`);
  process.exit(1);
}
console.log("Economy target OK (around 10 h at 150 correct answers/hour).");
