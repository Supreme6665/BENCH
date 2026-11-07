# BENCH — Organic Synthesis

A text-based organic synthesis game that runs entirely in the browser. You are given a starting
molecule, a target molecule and a rack of numbered reagent systems. Pick the right reagent for each
step, watch the product appear, and build a multi-step route. Wrong reagents still react — they just
take you somewhere else, and the game tells you where.

Correct Concept Lab answers earn research points. Thirty points opens a CS:GO-style chemistry case
containing one of 16 compounds across five rarity tiers. Collect the full set in the collection book;
undiscovered compounds stay hidden as `?`. The economy is calibrated at roughly 10 hours of Concept Lab
at 150 correct answers per hour.

The content is compiled from the H2 Organic Chemistry notes: alkanes, alkenes, arenes, halogen
derivatives, alcohols, phenols, carbonyl compounds, carboxylic acids and derivatives, nitrogen
compounds, and polymers. The source PDFs are not included in the public repository. Skeletal structures are drawn from SMILES with the vendored
[SmilesDrawer](https://github.com/reymond-group/smilesDrawer) library (MIT).

## Run it

No build step, no CDN, no internet.

```bash
cd /home/windy/chemistrygame
./serve.sh
# open http://localhost:8000
```

Or manually:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Public deployment

Repository: **https://github.com/Supreme6665/BENCH**

A playable public preview of the pushed `main` branch:

```text
https://htmlpreview.github.io/?https://github.com/Supreme6665/BENCH/blob/main/index.html
```

For the official GitHub Pages URL, enable **Settings → Pages → Source: GitHub Actions**, then run
the **Deploy BENCH to GitHub Pages** workflow from the Actions tab. The official URL will be:

```text
https://supreme6665.github.io/BENCH/
```

To publish from this machine after authenticating GitHub:

```bash
gh auth login --hostname github.com --git-protocol ssh --web
./publish.sh BENCH
```

`publish.sh` creates the public repository, pushes `main`, enables Pages and triggers the deploy.
The source PDFs and extracted text are ignored, so they are not published.

## How to play

1. Choose **Campaign** and open a brief.
2. Read the brief, the current vessel and the final target.
3. Pick one complete reagent + condition system from the shelf:
   - click it, or
   - type its number (`3`), or
   - type a name or alias (`SOCl2`, `thionyl chloride`, `nitrating mixture 50`).
4. Press **Run**. A correct reaction advances the route; a wrong one costs yield and explains
   the chemistry you triggered instead.
5. Finish all steps to see the yield, rank, debrief and source section.

### Commands

| Command | Effect |
|---|---|
| `1`, `2`, … | choose that shelf item |
| reagent name | match by name/formula/alias |
| `hint` | a nudge (costs 8 yield, 3 per brief) |
| `shelf` | re-read the shelf |
| `notes` | open the field notes |
| `status` | show brief, step, yield and target |
| `reset` | restart the brief (type twice to confirm) |
| `map` | leave the brief |
| `help` | open the how-to-play panel |

`Enter` runs the command, `/` focuses the command line, `Esc` returns to the map,
`?` opens help when the command line is not focused.

### Scoring

Each brief starts at **100 yield**. A wrong reagent costs 10, a hint costs 8, and the floor is 10.
Clear at 50 for a Pass, 70 for a Merit, 90 for a Distinction. Best yields and concept scores are
stored in `localStorage`; nothing leaves the browser.

## Reward system

- **1 research point** per correct Concept Lab answer.
- **30 points** per case opening — exactly 30 correct answers.
- **16 collectible compounds** across Common (35%), Uncommon (28%), Rare (18%), Epic (14.01%) and
  Legendary (4.99%).
- **~10-second CS:GO-style opening**: a long spin, a slow-down, an overshoot past the winner, a settle,
  then the reveal.
- **Duplicates** refund points by rarity: Common 2, Uncommon 3, Rare 5, Epic 8, Legendary 15.
- **Collection book** shows found compounds with skeletal structures; undiscovered ones remain `?`.
- **Economy calibration:** the simulation in `tests/economy.mjs` averages ~57 cases and ~1,543 net
  points to complete the book — **~10.3 hours at 150 correct answers/hour** (8.6 h at 180/h,
  12.9 h at 120/h).

## Modes

- **Campaign** — 13 briefs, 27 bench steps. Every current-vessel and target card shows a
  rendered skeletal structure (plus a step-target structure on intermediate steps). Routes cover:
  controlled oxidation, acyl chloride/amide synthesis, Markovnikov addition, arene directing
  effects, phenol bromination, side-chain oxidation/esterification, nitrile chain extension,
  nitro reduction, cyanohydrin formation, anilide synthesis, double substitution, and a
  nitration/oxidation capstone.
- **Concept Lab** — a 10-question set drawn from a pool of 300 questions on tests, mechanisms,
  selectivity, functional-group reactivity and structure recognition. Structure questions include
  rendered skeletal diagrams, and the four answer options are shuffled for every question.
  Diagrams are omitted where a caption would give the answer away (for example, “Which compound
  is a ketone?”).
- **Case Lab** — spend 30 research points to open a weighted chemistry case with a ~10-second
  CS:GO-style reel animation. Every case gives one compound; duplicates refund points.
- **Collection book** — 16 compounds grouped by rarity. Found compounds show their skeletal structure;
  undiscovered compounds are shown as `?`.
- **Field Notes** — seven compact reference cards: oxidation ladder, reduction, substitution vs
  elimination, aromatic directing, tests, mechanisms, and polymers.

## Files

| File | Purpose |
|---|---|
| `index.html` | shell and script/style links |
| `styles.css` | warm-paper lab-notebook art direction, responsive layout |
| `data.js` | 99 compounds, 32 skeletal SMILES, 53 reagents, 165 reactions, 13 missions |
| `concepts.js` | 80 additional concept questions (bank 20 → 100) |
| `concepts-200.js` | 200 more concept questions (bank 100 → 300) |
| `rewards.js` | 16 case compounds, five rarities, drop weights and duplicate refunds |
| `game.js` | routing, missions, concept lab, case opening, collection book, localStorage, diagrams |
| `vendor/smiles-drawer.min.js` | offline SMILES → skeletal-SVG renderer (MIT; license in `vendor/`) |
| `PLAN.md` | the build plan |
| `tests/validate.mjs` | data integrity and route reachability checks (no browser) |
| `tests/browser.mjs` | Playwright smoke test of the UI |
| `tests/economy.mjs` | Monte Carlo check that the collection takes around 10 hours |
| `tests/playthrough.mjs` | Playwright test that clears all 13 missions and checks every vessel/target diagram |
| `tests/run-all.sh` | starts a local server and runs the full test suite |

## Tests

```bash
# data only
node tests/validate.mjs

# full suite (requires playwright and a free port 8000)
npm install
./tests/run-all.sh
```

Expected output:

```
compounds: 99
reagents: 53
reactions: 165
missions: 13, steps: 27
concepts: 300
reward items: 16, total weight: 10000
OK: all mission routes are valid and reachable.

items: 16
case cost: 30 points
average cases to complete: 57.1
estimated time at 150 correct answers/hour: 10.3 h
Economy target OK (around 10 h at 150 correct answers/hour).

PASS  case opening lasts around 10 seconds
checks: 50, passed: 50, failed: 0

All 13 missions cleared automatically, 27 steps.
```

## Content and accuracy

The reaction graph deliberately follows the conditions in the notes, not generic A-level
chemistry. For example:

- LiAlH₄ is the only reducing agent that reduces `–CO₂H`; H₂/Ni cannot reduce acids, amides or
  nitrobenzene.
- Aqueous NaOH + heat hydrolyses a halogenoalkane; ethanolic NaOH + heat eliminates HX.
- Nitrobenzene is reduced by Sn/conc. HCl with heat, then excess NaOH liberates the amine.
- Phenol is brominated by aqueous Br₂ without a catalyst; benzene needs FeBr₃.
- Carboxylic acid + amine gives a salt; an acyl chloride is needed for the amide.
- Nitrile hydrolysis does not change the oxidation state, so no oxidant is added.

Each mission debrief and concept answer cites the chapter/section it came from. The copyrighted
source PDFs are not published; only the game code, the compiled data and the original summaries are.

## Notes

- The game is single-player and stateless on the server; progress is local to the browser.
- If `localStorage` is blocked, the current session still works and progress is simply not saved.
- `node_modules/` is only for the optional Playwright tests; the game itself has no dependencies.
