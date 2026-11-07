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
8. Correct Concept Lab answers earn research points (1 each). A case costs 30 points; the
   collection has 16 compounds across five rarities. The Monte Carlo economy check targets ~10 h
   at 150 correct answers/hour.

## Modes
- **Campaign** — 13 missions, 27 steps, covering alkanes/alkenes/arenes, halogenoalkanes,
  alcohols/phenols, carbonyls, carboxylic acids/derivatives and nitrogen compounds.
- **Concept Lab** — 300 multiple-choice concept questions on mechanisms, tests, selectivity, structure recognition and polymers, with skeletal diagrams where the question refers to a structure — omitted where a caption would reveal the answer. Answer options are shuffled for every question.
- **Case Lab** — 30 research points opens one weighted chemistry case. Sixteen compounds across five
  rarities; a ~10-second CS:GO-style reel with an overshoot-and-settle finish; duplicates refund points.
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
