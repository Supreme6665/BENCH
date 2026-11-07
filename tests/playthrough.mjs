import { chromium } from "playwright";

const URL = "http://localhost:8000";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
const errors = [];
page.on("pageerror", (err) => errors.push("pageerror: " + err.message));
page.on("console", (msg) => { if (msg.type() === "error") errors.push("console: " + msg.text()); });

await page.goto(URL, { waitUntil: "networkidle" });
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: "networkidle" });

const missionIds = await page.evaluate(() => window.BENCH_DATA.missions.map((m) => m.id));
let stepCount = 0;

await page.locator('[data-action="start-campaign"]').click();
await page.waitForSelector(".map-grid");

for (let mi = 0; mi < missionIds.length; mi += 1) {
  const missionId = missionIds[mi];
  if (mi > 0) {
    await page.locator('.complete [data-action="map"]').click();
    await page.waitForSelector(".map-grid");
  }
  await page.locator(`.mission-card[data-id="${missionId}"]`).click();
  await page.waitForSelector("#answer");

  const steps = await page.evaluate((id) => {
    const m = window.BENCH_DATA.missions.find((x) => x.id === id);
    return m.steps.map((s) => ({
      from: s.from,
      to: s.to,
      target: m.target,
      shelf: s.shelf,
      correct: s.shelf.find((rid) => window.BENCH_DATA.reactions.some((r) => r.from === s.from && r.reagent === rid && r.to === s.to))
    }));
  }, missionId);

  for (let i = 0; i < steps.length; i += 1) {
    const step = steps[i];
    if (!step.correct) throw new Error(`${missionId} step ${i + 1}: no correct shelf reagent`);
    const diagrams = await page.locator(".vessel .structure-svg").evaluateAll((nodes) =>
      nodes.map((node) => ({ children: node.children.length, viewBox: node.getAttribute("viewBox") }))
    );
    if (diagrams.length !== 2 || diagrams.some((d) => d.children < 2 || !d.viewBox)) {
      throw new Error(`${missionId} step ${i + 1}: vessel/target skeletal diagram missing`);
    }
    if ((await page.locator(".structure-fallback").count()) > 0) {
      throw new Error(`${missionId} step ${i + 1}: a skeletal diagram fell back to text`);
    }
    const stepGoal = await page.locator(".step-goal .structure-svg").evaluateAll((nodes) =>
      nodes.map((node) => ({ children: node.children.length, viewBox: node.getAttribute("viewBox") }))
    );
    const expectStepGoal = step.to !== step.target ? 1 : 0;
    if (stepGoal.length !== expectStepGoal || stepGoal.some((d) => d.children < 2 || !d.viewBox)) {
      throw new Error(`${missionId} step ${i + 1}: step-target skeletal diagram missing`);
    }
    await page.locator(`[data-reagent="${step.correct}"]`).click();
    await page.locator("#answer").press("Enter");
    await page.waitForSelector(".result-ok");
    const resultText = await page.locator(".result-ok").innerText();
    if (!resultText.toLowerCase().includes("reaction accepted")) {
      throw new Error(`${missionId} step ${i + 1}: result was not accepted`);
    }
    stepCount += 1;
    await page.locator('[data-action="next"]').click();
  }

  await page.waitForSelector(".complete");
  const completeText = await page.locator(".complete").innerText();
  if (!completeText.includes("100")) {
    throw new Error(`${missionId}: expected 100 yield, got: ${completeText.slice(0, 200)}`);
  }
  if (!completeText.toUpperCase().includes("CLEARED")) {
    throw new Error(`${missionId}: no CLEARED stamp`);
  }
  console.log(`PASS  ${missionId}  (${steps.length} steps, 100 yield)`);
}

// Persistence: best scores should survive a reload.
const before = await page.evaluate(() => JSON.parse(localStorage.getItem("bench.progress.v1")));
await page.reload({ waitUntil: "networkidle" });
const after = await page.evaluate(() => JSON.parse(localStorage.getItem("bench.progress.v1")));
if (!before || !after) throw new Error("progress missing from localStorage");
for (const id of missionIds) {
  if (!after.missions[id] || after.missions[id].best !== 100 || !after.missions[id].completed) {
    throw new Error(`${id}: best/completed progress did not persist`);
  }
}
console.log("PASS  all 13 best scores persist in localStorage across reload");

// Force a fresh document so the #briefs hash is parsed again.
await page.goto(`${URL}/?fresh=1#briefs`, { waitUntil: "networkidle" });
await page.waitForSelector(".map-grid");
await page.locator('.mission-card[data-id="m04"]').click();
await page.waitForSelector("#answer");
await page.locator('[data-reagent="br2_febr3"]').click();
await page.locator("#answer").press("Enter");
await page.waitForSelector(".result-bad");
const wrongText = await page.locator(".result-bad").innerText();
if (!wrongText.toLowerCase().includes("2,4-directing")) throw new Error("M04 wrong-answer feedback missing directing lesson");
console.log("PASS  wrong answer gives a specific chemistry explanation");

// Hint and reset controls.
await page.locator("#answer").fill("hint");
await page.locator("#answer").press("Enter");
await page.waitForSelector(".result-warn");
const hinted = await page.locator(".scoreboard").innerText();
if (!hinted.includes("82")) throw new Error("hint did not cost 8 yield after the wrong answer");
await page.locator("#answer").fill("reset");
await page.locator("#answer").press("Enter");
await page.waitForSelector(".result-warn");
if (!(await page.locator(".result-warn").innerText()).toLowerCase().includes("type reset again")) {
  throw new Error("reset did not ask for confirmation");
}
await page.locator("#answer").fill("reset");
await page.locator("#answer").press("Enter");
await page.waitForTimeout(150);
if (!(await page.locator(".scoreboard").innerText()).includes("100")) throw new Error("reset did not restore 100 yield");
console.log("PASS  hint costs yield and reset restores the brief");

// Type a reagent alias, not just a number.
await page.locator("#answer").fill("nitrating mixture 50");
await page.locator("#answer").press("Enter");
await page.waitForSelector(".result-ok");
console.log("PASS  typed reagent aliases resolve to the shelf");

await browser.close();
if (errors.length) {
  console.log("\nERRORS:");
  errors.forEach((e) => console.log("  " + e));
  process.exit(1);
}
console.log(`\nAll ${missionIds.length} missions cleared automatically, ${stepCount} steps.`);
