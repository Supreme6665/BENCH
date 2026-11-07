# BENCH — build plan

## Goal
A text-based organic synthesis game served at localhost, built from the H2 organic chemistry notes.

## Core loop
1. Pick a synthesis brief (start molecule -> target molecule).
2. Read the current vessel and the target.
3. Choose one reagent/condition system from the numbered shelf.
4. The game checks the reaction, shows the product, the reaction type, an equation and an explanation.
5. Repeat for multi-step routes. Wrong reagents cost yield and explain *why* they fail.
6. Finish the mission, get a yield score and a concept debrief. Best scores persist in localStorage.
7. Every current-vessel and target card renders a skeletal structure diagram; intermediate steps
   also show a compact step-target diagram. Rendering is offline via a vendored SmilesDrawer build.
8. Research points are universal: campaign briefs (2–5 by yield), Concept Lab answers (1 each),
   chapter tutorials (+5 once) and chapter drills (2 base + 1 per correct + 3 first-clear) all pay
   into the same wallet. Any 30
   points open any case from the unified Case Lab, which holds 40 collectibles across four cases:
   organic, physical, inorganic and metals. The Monte Carlo economy check targets ~10 h at 150
   points/hour.

## Modes
- **Campaign** — 13 missions, 27 steps, covering alkanes/alkenes/arenes, halogenoalkanes,
  alcohols/phenols, carbonyls, carboxylic acids/derivatives and nitrogen compounds.
- **Concept Lab** — 300 multiple-choice concept questions on mechanisms, tests, selectivity, structure recognition and polymers, with skeletal diagrams where the question refers to a structure — omitted where a caption would reveal the answer. Answer options are shuffled for every question.
- **Physical & Inorganic (A–P)** — 16 chapters, each with a five-step guided tutorial and 100 MCQs
  (1,600 total), plus a 10-question chapter drill with explanations and best-score tracking.
- **Case Lab** — one unified interface for all four cases (Organic, Physical, Inorganic and Metals).
  Thirty universal points opens any case; 40 collectibles in total; a ~10-second CS:GO-style reel in a
  large full-screen stage with an overshoot-and-settle finish; duplicates refund points.
- **Chapter payouts** — tutorials pay +5 points once; drills pay 2 + 1 per correct + 3 on first clear.
- **Collection book** — found compounds show skeletal structures; undiscovered compounds are `?`.
- **Field Notes** — a compact data-booklet drawn from the summary chapter.

## Technical
- `index.html`, `styles.css`, `data.js`, `game.js` — no build step, no external CDN.
- `serve.sh` / `python3 -m http.server 8000`.
- `tests/validate.mjs` — checks every compound/reagent/reaction/mission step and every
  mission route is actually possible in the reaction graph.
- Browser smoke test with Playwright (screenshot + interaction).

## Art direction
Warm paper + graph-paper grid + typewriter mono + editorial serif headings; hard ink rules,
red rubber-stamp accents. Not a neon terminal cliché; more like a 1960s lab bench worksheet.
