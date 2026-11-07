/* BENCH — generated MCQ banks for the A–P expansion.
   Each chapter is built from numbered concept templates. The builder deduplicates
   question text and throws if a chapter cannot produce 110 valid questions. */

(() => {
  const EXP = window.BENCH_DATA && window.BENCH_DATA.expansion;
  if (!EXP || !Array.isArray(EXP.chapters)) return;

  const norm = (s) => String(s).toLowerCase().replace(/[₀₁₂₃₄₅₆₇₈₉]/g, (c) => "0123456789"["₀₁₂₃₄₅₆₇₈₉".indexOf(c)]).replace(/[^a-z0-9]/g, "");
  const fmt = (x, dp = 3) => {
    if (!Number.isFinite(x)) return String(x);
    if (x === 0) return "0";
    const a = Math.abs(x);
    if (a >= 1e5 || a < 1e-3) {
      const [m, e] = x.toExponential(2).split("e");
      return `${m} × 10^${Number(e)}`;
    }
    return Number(x.toFixed(dp)).toString();
  };
  const lcg = (seed) => {
    let s = seed >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  };
  const ri = (rng, a, b) => Math.floor(rng() * (b - a + 1)) + a;
  const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];
  const shuffle = (rng, arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const mcq = (rng, question, correct, wrongs, explanation, source) => {
    const seen = new Set();
    const options = [];
    [correct, ...wrongs].forEach((v) => {
      if (v === undefined || v === null) return;
      if (!seen.has(v)) { seen.add(v); options.push(v); }
    });
    let n = 0;
    while (options.length < 4) {
      const filler = ["None of these", "Cannot be determined", "All of these", "Not enough information"][n++ % 4];
      if (!seen.has(filler)) { seen.add(filler); options.push(filler); }
    }
    const shuffled = shuffle(rng, options.slice(0, 4));
    return { question, options: shuffled, answer: shuffled.indexOf(correct), explanation, source };
  };
  const numQ = (rng, question, correct, unit, wrongs, explanation, source, dp = 3) => {
    const u = unit ? ` ${unit}` : "";
    const c = `${fmt(correct, dp)}${u}`;
    const w = wrongs.map((v) => `${fmt(v, dp)}${u}`);
    return mcq(rng, question, c, w, explanation, source);
  };
  const sourceFor = (chapter) => `${chapter.code} ${chapter.title}`;

  /* ---------------- shared tables ---------------- */

  const compounds = [
    ["water", "H₂O", 18, "H", 1, 2], ["carbon dioxide", "CO₂", 44, "C", 12, 1],
    ["sodium chloride", "NaCl", 58.5, "Na", 23, 1], ["calcium carbonate", "CaCO₃", 100, "Ca", 40, 1],
    ["sodium hydroxide", "NaOH", 40, "Na", 23, 1], ["sulfuric acid", "H₂SO₄", 98, "S", 32, 1],
    ["ammonia", "NH₃", 17, "N", 14, 1], ["methane", "CH₄", 16, "C", 12, 1],
    ["ethanol", "C₂H₅OH", 46, "C", 12, 2], ["copper(II) sulfate", "CuSO₄", 160, "Cu", 64, 1],
    ["potassium manganate(VII)", "KMnO₄", 158, "K", 39, 1], ["glucose", "C₆H₁₂O₆", 180, "C", 12, 6],
    ["magnesium oxide", "MgO", 40, "Mg", 24, 1], ["ammonium nitrate", "NH₄NO₃", 80, "N", 14, 2],
    ["hydrogen peroxide", "H₂O₂", 34, "H", 1, 2], ["calcium oxide", "CaO", 56, "Ca", 40, 1]
  ];

  const period3 = [
    ["Na", 186, 496, 0.93], ["Mg", 160, 738, 1.31], ["Al", 143, 578, 1.61],
    ["Si", 118, 786, 1.90], ["P", 110, 1012, 2.19], ["S", 104, 1000, 2.58],
    ["Cl", 99, 1251, 3.16], ["Ar", 94, 1521, null]
  ];
  const period2 = [
    ["Li", 152, 520, 0.98], ["Be", 112, 899, 1.57], ["B", 85, 801, 2.04],
    ["C", 77, 1086, 2.55], ["N", 75, 1402, 3.04], ["O", 73, 1314, 3.44],
    ["F", 71, 1681, 3.98], ["Ne", 69, 2081, null]
  ];

  const elementsC = [
    ["H", 1, 1, 0, "1s¹", 1], ["He", 2, 4, 0, "1s²", 0], ["Li", 3, 7, 0, "1s² 2s¹", 1],
    ["C", 6, 12, 0, "1s² 2s² 2p²", 2], ["N", 7, 14, 0, "1s² 2s² 2p³", 3],
    ["O", 8, 16, 0, "1s² 2s² 2p⁴", 2], ["F", 9, 19, 0, "1s² 2s² 2p⁵", 1],
    ["Na", 11, 23, 0, "1s² 2s² 2p⁶ 3s¹", 1], ["Mg", 12, 24, 0, "1s² 2s² 2p⁶ 3s²", 0],
    ["Al", 13, 27, 0, "1s² 2s² 2p⁶ 3s² 3p¹", 1], ["Si", 14, 28, 0, "1s² 2s² 2p⁶ 3s² 3p²", 2],
    ["Cl", 17, 35, 0, "1s² 2s² 2p⁶ 3s² 3p⁵", 1], ["K", 19, 39, 0, "[Ar] 4s¹", 1],
    ["Ca", 20, 40, 0, "[Ar] 4s²", 0], ["Fe", 26, 56, 0, "[Ar] 3d⁶ 4s²", 4],
    ["Cu", 29, 63, 0, "[Ar] 3d¹⁰ 4s¹", 1], ["Zn", 30, 64, 0, "[Ar] 3d¹⁰ 4s²", 0],
    ["Br", 35, 80, 0, "[Ar] 3d¹⁰ 4s² 4p⁵", 1], ["Na⁺", 11, 23, 1, "1s² 2s² 2p⁶", 0],
    ["Mg²⁺", 12, 24, 2, "1s² 2s² 2p⁶", 0], ["Cl⁻", 17, 35, -1, "[Ar]", 0],
    ["O²⁻", 8, 16, -2, "1s² 2s² 2p⁶", 0]
  ];

  const moleculesF = [
    ["BeCl₂", "linear", "180°", "non-polar"], ["CO₂", "linear", "180°", "non-polar"],
    ["BF₃", "trigonal planar", "120°", "non-polar"], ["SO₂", "bent", "~119°", "polar"],
    ["CH₄", "tetrahedral", "109.5°", "non-polar"], ["NH₃", "trigonal pyramidal", "~107°", "polar"],
    ["H₂O", "bent", "~104.5°", "polar"], ["PCl₅", "trigonal bipyramidal", "90°/120°", "non-polar"],
    ["SF₆", "octahedral", "90°", "non-polar"], ["C₂H₄", "trigonal planar", "~120°", "non-polar"],
    ["C₂H₂", "linear", "180°", "non-polar"], ["CHCl₃", "tetrahedral", "~109.5°", "polar"],
    ["NH₄⁺", "tetrahedral", "109.5°", "non-polar"], ["H₂S", "bent", "~92°", "polar"],
    ["PCl₃", "trigonal pyramidal", "~100°", "polar"], ["SiCl₄", "tetrahedral", "109.5°", "non-polar"],
    ["XeF₄", "square planar", "90°", "non-polar"], ["ClF₃", "T-shaped", "~87°", "polar"],
    ["SF₄", "seesaw", "~89°/117°", "polar"], ["BrF₅", "square pyramidal", "~90°", "polar"]
  ];

  const redoxPotentials = [
    ["Zn²⁺/Zn", -0.76], ["Fe²⁺/Fe", -0.44], ["Pb²⁺/Pb", -0.13], ["2H⁺/H₂", 0.00],
    ["Cu²⁺/Cu", 0.34], ["I₂/I⁻", 0.54], ["Fe³⁺/Fe²⁺", 0.77], ["Ag⁺/Ag", 0.80],
    ["Br₂/Br⁻", 1.07], ["Cl₂/Cl⁻", 1.36], ["MnO₄⁻/Mn²⁺", 1.51], ["Cr₂O₇²⁻/Cr³⁺", 1.33]
  ];

  /* ---------------- chapter builders ---------------- */

  function chapterA(c) {
    const src = sourceFor(c);
    const gens = [
      (rng) => { const [name, f, mr] = pick(rng, compounds); const m = ri(rng, 1, 80); const n = m / mr; return numQ(rng, `How many moles are in ${m} g of ${name} (Mᵣ = ${mr})?`, n, "mol", [m * mr, mr / m, m / (2 * mr)], `n = m/Mᵣ = ${m}/${mr}.`, src); },
      (rng) => { const [name, f, mr] = pick(rng, compounds); const n = ri(rng, 1, 50) / 10; const m = n * mr; return numQ(rng, `What is the mass of ${fmt(n, 2)} mol of ${name} (Mᵣ = ${mr})?`, m, "g", [n / mr, mr / n, n * mr * 2], `m = nMᵣ.`, src); },
      (rng) => { const n = ri(rng, 1, 40) / 10; const N = n * 6.02; return mcq(rng, `How many molecules are in ${fmt(n, 1)} mol of a substance?`, `${fmt(N, 2)} × 10²³`, [`${fmt(N / 2, 2)} × 10²³`, `${fmt(N * 2, 2)} × 10²³`, `${fmt(n, 2)} × 10²³`], "N = nN_A, with N_A = 6.02 × 10²³.", src); },
      (rng) => { const n = ri(rng, 1, 40) / 10; const N = n * 6.02; return numQ(rng, `How many moles are present in ${fmt(N, 2)} × 10²³ particles?`, n, "mol", [N, N / 2, n * 2], "n = N/N_A.", src); },
      (rng) => { const n = ri(rng, 1, 30) / 10; const V = n * 24; return numQ(rng, `What volume does ${fmt(n, 1)} mol of gas occupy at r.t.p.?`, V, "dm³", [n * 22.4, n * 12, n * 48], "At r.t.p., V = n × 24 dm³.", src); },
      (rng) => { const V = ri(rng, 2, 96); const n = V / 24; return numQ(rng, `How many moles of gas occupy ${V} dm³ at r.t.p.?`, n, "mol", [V * 24, V / 22.4, V / 12], "n = V/24.", src); },
      (rng) => { const n = ri(rng, 1, 20) / 10; const V = ri(rng, 1, 5) / 10; const conc = n / V; return numQ(rng, `What is the concentration when ${fmt(n, 1)} mol is dissolved in ${fmt(V, 1)} dm³?`, conc, "mol dm⁻³", [n * V, V / n, n / (2 * V)], "c = n/V.", src); },
      (rng) => { const conc = ri(rng, 1, 20) / 10; const V = ri(rng, 1, 5) / 10; const n = conc * V; return numQ(rng, `How many moles are in ${fmt(V, 1)} dm³ of ${fmt(conc, 1)} mol dm⁻³ solution?`, n, "mol", [conc / V, V / conc, conc * V * 2], "n = cV.", src); },
      (rng) => { const c1 = ri(rng, 1, 20) / 10; const v1 = ri(rng, 1, 50); const v2 = v1 * ri(rng, 2, 5); const c2 = (c1 * v1) / v2; return numQ(rng, `${v1} cm³ of ${fmt(c1, 1)} mol dm⁻³ solution is diluted to ${v2} cm³. What is the new concentration?`, c2, "mol dm⁻³", [c1 * v1 * v2, c1 * v2 / v1, c1 / 2], "c₁V₁ = c₂V₂.", src); },
      (rng) => { const [name, f, mr, el, am, cnt] = pick(rng, compounds); const pct = (am * cnt * 100) / mr; return numQ(rng, `What is the percentage by mass of ${el} in ${name}?`, pct, "%", [pct / 2, pct * 2, 100 - pct / 2], `(${am}×${cnt}/${mr})×100.`, src, 2); },
      (rng) => { const list = [["CH₂O", "C₆H₁₂O₆", 180], ["CH", "C₆H₆", 78], ["CH₂", "C₂H₄", 28], ["C₂H₄O", "C₄H₈O₂", 88]]; const [emp, mol, mr] = pick(rng, list); return mcq(rng, `A compound has empirical formula ${emp} and Mᵣ = ${mr}. What is its molecular formula?`, mol, [emp, "C₂H₄O", "C₃H₆O"], "Molecular formula = empirical formula × (Mᵣ / empirical formula mass).", src); },
      (rng) => { const actual = ri(rng, 10, 90); const theoretical = actual + ri(rng, 5, 30); const pct = (actual / theoretical) * 100; return numQ(rng, `The actual yield is ${actual} g and the theoretical yield is ${theoretical} g. What is the percentage yield?`, pct, "%", [theoretical / actual * 100, actual / theoretical, 100 - actual / theoretical * 100], "Percentage yield = actual/theoretical × 100.", src, 1); },
      (rng) => { let h2 = ri(rng, 1, 6); let n2 = ri(rng, 1, 4); if (h2 / 3 === n2) h2 += 1; const lim = h2 / 3 < n2 ? "H₂" : "N₂"; return mcq(rng, `For N₂ + 3H₂ → 2NH₃, ${h2} mol H₂ is mixed with ${n2} mol N₂. Which is the limiting reagent?`, lim, [lim === "H₂" ? "N₂" : "H₂", "NH₃", "Neither"], "Compare the available mole ratio with the stoichiometric ratio 3:1.", src); },
      (rng) => { const m = ri(rng, 1, 20); const V = ri(rng, 2, 20) / 10; const vm = m / (V / 24); return numQ(rng, `${m} g of a gas occupies ${fmt(V, 1)} dm³ at r.t.p. What is its molar mass?`, vm, "g mol⁻¹", [m * V, V / m, m / V], "n = V/24; M = m/n.", src, 1); },
      (rng) => { const pairs = [["CH₂O", 180, "C₆H₁₂O₆"], ["CH", 78, "C₆H₆"], ["CH₂", 42, "C₃H₆"], ["C₂H₄O", 88, "C₄H₈O₂"]]; const [emp, mr, mol] = pick(rng, pairs); return mcq(rng, `The empirical formula is ${emp} and Mᵣ is ${mr}. Which molecular formula is consistent?`, mol, ["C₂H₄O", "C₃H₆O", "C₄H₁₀"], "The molecular formula is a whole-number multiple of the empirical formula.", src); }
    ];
    return build(c, gens);
  }

  function chapterB(c) {
    const src = sourceFor(c);
    const onTable = [
      ["MnO₄⁻", "Mn", 7], ["Cr₂O₇²⁻", "Cr", 6], ["H₂SO₄", "S", 6], ["HNO₃", "N", 5],
      ["ClO₃⁻", "Cl", 5], ["Fe₂O₃", "Fe", 3], ["CO₂", "C", 4], ["SO₂", "S", 4],
      ["H₂O₂", "O", -1], ["NaH", "H", -1], ["NH₃", "N", -3], ["NO₂", "N", 4],
      ["K₂CrO₄", "Cr", 6], ["PCl₅", "P", 5], ["SF₆", "S", 6], ["XeF₄", "Xe", 4],
      ["IO₃⁻", "I", 5], ["S₂O₃²⁻", "S", 2], ["C₂O₄²⁻", "C", 3], ["VO₂⁺", "V", 5],
      ["MnO₂", "Mn", 4], ["FeSO₄", "Fe", 2], ["CuSO₄", "Cu", 2], ["AgNO₃", "Ag", 1],
      ["KMnO₄", "Mn", 7], ["Na₂S₂O₃", "S", 2], ["Cl₂", "Cl", 0], ["O₂", "O", 0],
      ["H₂O", "O", -2], ["CH₄", "C", -4]
    ];
    const electronTable = [
      ["MnO₄⁻ → Mn²⁺", 5], ["Cr₂O₇²⁻ → 2Cr³⁺", 6], ["Fe²⁺ → Fe³⁺", 1],
      ["I⁻ → I₂", 1], ["Cl₂ → 2Cl⁻", 2], ["O₂ → 2O²⁻", 4],
      ["S₂O₃²⁻ → S₄O₆²⁻", 1], ["H₂O₂ → O₂", 2], ["NO₃⁻ → NO", 3],
      ["SO₄²⁻ → SO₂", 2], ["Cu²⁺ → Cu", 2], ["Ag⁺ → Ag", 1],
      ["Zn → Zn²⁺", 2], ["2H⁺ → H₂", 2], ["C → CO₂", 4]
    ];
    const redoxTable = [
      ["Zn + Cu²⁺ → Zn²⁺ + Cu", "Zn", "Cu²⁺"],
      ["Fe + 2Fe³⁺ → 3Fe²⁺", "Fe", "Fe³⁺"],
      ["2I⁻ + Cl₂ → I₂ + 2Cl⁻", "I⁻", "Cl₂"],
      ["Mg + 2H⁺ → Mg²⁺ + H₂", "Mg", "H⁺"],
      ["2Fe²⁺ + Cl₂ → 2Fe³⁺ + 2Cl⁻", "Fe²⁺", "Cl₂"],
      ["Cu + 2Ag⁺ → Cu²⁺ + 2Ag", "Cu", "Ag⁺"],
      ["H₂ + F₂ → 2HF", "H₂", "F₂"],
      ["2Na + O₂ → Na₂O₂", "Na", "O₂"],
      ["Sn²⁺ + 2Fe³⁺ → Sn⁴⁺ + 2Fe²⁺", "Sn²⁺", "Fe³⁺"],
      ["2S₂O₃²⁻ + I₂ → S₄O₆²⁻ + 2I⁻", "S₂O₃²⁻", "I₂"]
    ];
    const gens = [
      (rng, i) => { const [species, el, on] = onTable[i % onTable.length]; return mcq(rng, `What is the oxidation number of ${el} in ${species}?`, `${on > 0 ? "+" : ""}${on}`, [`${on + 1 > 0 ? "+" : ""}${on + 1}`, `${on - 1 > 0 ? "+" : ""}${on - 1}`, `${on + 2 > 0 ? "+" : ""}${on + 2}`], "Use the usual oxidation numbers and make the total equal the charge.", src); },
      (rng, i) => { const [half, n] = electronTable[i % electronTable.length]; return mcq(rng, `How many electrons are transferred in the half-equation ${half}?`, String(n), [String(n + 1), String(n - 1), String(n + 2)], "Balance atoms and charge; the electron count balances the charge difference.", src); },
      (rng, i) => { const [reaction, ox, red] = redoxTable[i % redoxTable.length]; return mcq(rng, `In ${reaction}, which species is oxidised?`, ox, [red, "H₂O", "H⁺"], "Oxidation is an increase in oxidation number.", src); },
      (rng) => { const c = ri(rng, 1, 20) / 100; const v = ri(rng, 10, 50); const n = c * v / 1000; const fe = n * 5; return numQ(rng, `${v} cm³ of ${fmt(c, 3)} mol dm⁻³ KMnO₄ reacts with Fe²⁺ in acid. How many moles of Fe²⁺ react?`, fe, "mol", [n, n * 2, n / 5], "MnO₄⁻ oxidises 5Fe²⁺; n(MnO₄⁻)=cV.", src, 5); },
      (rng) => { const nI2 = ri(rng, 1, 20) / 1000; const nThio = nI2 * 2; return numQ(rng, `How many moles of S₂O₃²⁻ react with ${fmt(nI2, 4)} mol I₂?`, nThio, "mol", [nI2, nI2 / 2, nI2 * 4], "I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻.", src, 5); },
      (rng) => { const v = ri(rng, 10, 50); const c = ri(rng, 1, 20) / 10; const n = c * v / 1000; return numQ(rng, `How many moles of solute are in ${v} cm³ of ${fmt(c, 1)} mol dm⁻³ solution?`, n, "mol", [c * v, c / v, v / c], "n = cV with V in dm³.", src, 4); },
      (rng, i) => { const species = ["MnO₄⁻", "Cr₂O₇²⁻", "H₂O₂", "Cl₂", "Fe³⁺"]; const s = species[i % species.length]; return mcq(rng, `Which species is the oxidising agent when ${s} reacts and is reduced?`, s, ["OH⁻", "H₂O", "Na⁺"], "The oxidising agent is itself reduced.", src); },
      (rng, i) => { const reactions = ["Cl₂ + 2OH⁻ → Cl⁻ + ClO⁻ + H₂O", "2H₂O₂ → 2H₂O + O₂", "3Cl₂ + 6OH⁻ → 5Cl⁻ + ClO₃⁻ + 3H₂O", "2NO₂ + 2OH⁻ → NO₂⁻ + NO₃⁻ + H₂O"]; const r = reactions[i % reactions.length]; return mcq(rng, `Which type of reaction is ${r}?`, "Disproportionation", ["Neutralisation", "Precipitation", "Addition"], "The same element is simultaneously oxidised and reduced.", src); },
      (rng) => { const m = ri(rng, 1, 10); const mr = 56; const n = m / mr; return numQ(rng, `What amount of Fe is in ${m} g of iron (Aᵣ = 56)?`, n, "mol", [m * 56, 56 / m, m / 112], "n = m/Aᵣ.", src); },
      (rng) => { const c = ri(rng, 1, 20) / 100; const v = ri(rng, 10, 50); const n = c * v / 1000; return numQ(rng, `What amount of MnO₄⁻ is in ${v} cm³ of ${fmt(c, 2)} mol dm⁻³ KMnO₄?`, n, "mol", [c * v, c / v, v / c], "n = cV.", src, 5); }
    ];
    return build(c, gens);
  }

  function chapterC(c) {
    const src = sourceFor(c);
    const gens = [
      (rng, i) => { const [sym, Z, A, charge] = elementsC[i % elementsC.length]; const n = A - Z; return mcq(rng, `How many neutrons are in ${sym === "Na⁺" ? "Na-23" : sym === "Mg²⁺" ? "Mg-24" : sym === "Cl⁻" ? "Cl-35" : sym === "O²⁻" ? "O-16" : sym}?`, String(n), [String(Z), String(A), String(n + 1)], "Neutrons = A – Z.", src); },
      (rng, i) => { const [sym, Z, A, charge] = elementsC[i % elementsC.length]; const e = Z - (charge || 0); return mcq(rng, `How many electrons are in ${sym}?`, String(e), [String(Z), String(A), String(e + 1)], "Electrons = Z – charge.", src); },
      (rng, i) => { const [sym, Z, A] = elementsC[i % elementsC.length]; return mcq(rng, `How many protons are in ${sym}?`, String(Z), [String(A), String(A - Z), String(Z + 1)], "Protons = atomic number Z.", src); },
      (rng, i) => { const [sym, Z, A, charge, config] = elementsC[i % elementsC.length]; return mcq(rng, `What is the electronic configuration of ${sym}?`, config, ["1s² 2s² 2p⁶", "1s² 2s² 2p⁶ 3s² 3p⁶", "[Ar] 3d¹⁰"], "Fill orbitals in order and account for the ion charge.", src); },
      (rng) => { const a = ri(rng, 10, 80); const b = 100 - a; const m1 = ri(rng, 10, 40); const m2 = m1 + ri(rng, 1, 4); const ar = (a * m1 + b * m2) / 100; return numQ(rng, `An element is ${a}% isotope ${m1} and ${b}% isotope ${m2}. What is its relative atomic mass?`, ar, "", [m1, m2, (m1 + m2) / 2], "Aᵣ = Σ(abundance × isotopic mass).", src, 2); },
      (rng, i) => { const [sym, Z, A, charge, config, unpaired] = elementsC[i % elementsC.length]; return mcq(rng, `How many unpaired electrons are in ${sym}?`, String(unpaired), [String(unpaired + 1), String(Math.max(0, unpaired - 1)), String(unpaired + 2)], "Apply Hund's rule to the occupied orbitals.", src); },
      (rng) => { const shells = [2, 8, 18, 32]; const n = ri(rng, 1, 4); return mcq(rng, `What is the maximum number of electrons in the ${["1st", "2nd", "3rd", "4th"][n - 1]} shell?`, String(shells[n - 1]), [String(shells[n - 1] / 2), String(shells[n - 1] * 2), String(n * 2)], "Shell capacities follow 2n².", src); },
      (rng) => { const pairs = [["Na⁺", "F⁻"], ["Mg²⁺", "O²⁻"], ["K⁺", "Cl⁻"], ["Ca²⁺", "S²⁻"]]; const [a, b] = pick(rng, pairs); return mcq(rng, `Which is smaller: ${a} or ${b}?`, a, [b, "They are equal", "Cannot be determined"], "For isoelectronic ions, the greater nuclear charge gives the smaller radius.", src); },
      (rng) => { const order = ["1s", "2s", "2p", "3s", "3p", "4s", "3d", "4p"]; const idx = ri(rng, 0, order.length - 2); return mcq(rng, `Which subshell fills immediately after ${order[idx]}?`, order[idx + 1], [order[idx], order[(idx + 2) % order.length], "4f"], "Use the Aufbau order.", src); },
      (rng) => { const pairs = [["Na", "Mg"], ["Cl", "Ar"], ["Li", "Be"]]; const [a, b] = pick(rng, pairs); return mcq(rng, `Which of ${a} and ${b} has the higher first ionisation energy?`, b, [a, "They are equal", "Cannot be determined"], "First ionisation energy generally increases across a period.", src); }
    ];
    return build(c, gens);
  }

  function chapterD(c) {
    const src = sourceFor(c);
    const all = [...period2, ...period3];
    const gens = [
      (rng, i) => { const set = shuffle(rng, all).slice(0, 3); const sorted = set.slice().sort((a, b) => b[1] - a[1]); const correct = sorted.map((x) => x[0]).join(" > "); const wrongs = [set.map((x) => x[0]).join(" > "), set.slice().reverse().map((x) => x[0]).join(" > "), sorted.slice().reverse().map((x) => x[0]).join(" > ")]; return mcq(rng, `Which order shows decreasing atomic radius: ${set.map((x) => x[0]).join(", ")}?`, correct, wrongs, "Atomic radius decreases across a period and increases down a group.", src); },
      (rng) => { const set = shuffle(rng, all).slice(0, 3); const sorted = set.slice().sort((a, b) => b[2] - a[2]); const correct = sorted.map((x) => x[0]).join(" > "); const wrongs = [set.map((x) => x[0]).join(" > "), sorted.slice().reverse().map((x) => x[0]).join(" > "), set.slice().reverse().map((x) => x[0]).join(" > ")]; return mcq(rng, `Which order shows decreasing first ionisation energy: ${set.map((x) => x[0]).join(", ")}?`, correct, wrongs, "First ionisation energy increases across a period and decreases down a group.", src); },
      (rng) => { const set = shuffle(rng, all.filter((x) => x[3] !== null)).slice(0, 3); const sorted = set.slice().sort((a, b) => b[3] - a[3]); const correct = sorted.map((x) => x[0]).join(" > "); const wrongs = [set.map((x) => x[0]).join(" > "), sorted.slice().reverse().map((x) => x[0]).join(" > "), set.slice().reverse().map((x) => x[0]).join(" > ")]; return mcq(rng, `Which order shows decreasing electronegativity: ${set.map((x) => x[0]).join(", ")}?`, correct, wrongs, "Electronegativity increases across a period and decreases down a group.", src); },
      (rng) => { const [a, b] = pick(rng, [["Na⁺", "F⁻"], ["Mg²⁺", "O²⁻"], ["K⁺", "Cl⁻"], ["Ca²⁺", "S²⁻"]]); return mcq(rng, `Which is smaller: ${a} or ${b}?`, a, [b, "They are equal", "Cannot be determined"], "For isoelectronic species, greater nuclear charge means smaller radius.", src); },
      (rng) => { const q = pick(rng, ["Why does atomic radius decrease across Period 3?", "Why does atomic radius decrease from Na to Cl?"]); return mcq(rng, q, "Nuclear charge increases while shielding stays similar.", ["A new shell is added.", "Shielding increases significantly.", "Electron repulsion decreases."], "Effective nuclear attraction increases across the period.", src); },
      (rng) => { const q = pick(rng, ["Why does first ionisation energy decrease down Group 2?", "Why is Ba easier to ionise than Mg?"]); return mcq(rng, q, "The outer electron is further from the nucleus and more shielded.", ["Nuclear charge decreases down the group.", "The atoms lose protons.", "Shielding decreases down the group."], "Distance and shielding reduce effective nuclear attraction.", src); },
      (rng) => { const set = shuffle(rng, all).slice(0, 3); const correct = set.slice().sort((a, b) => b[1] - a[1])[0][0]; return mcq(rng, `Which of ${set.map((x) => x[0]).join(", ")} has the largest atomic radius?`, correct, set.filter((x) => x[0] !== correct).map((x) => x[0]), "Radius increases down a group and decreases across a period.", src); },
      (rng) => { const set = shuffle(rng, all).slice(0, 3); const correct = set.slice().sort((a, b) => b[2] - a[2])[0][0]; return mcq(rng, `Which of ${set.map((x) => x[0]).join(", ")} has the highest first ionisation energy?`, correct, set.filter((x) => x[0] !== correct).map((x) => x[0]), "IE increases across a period and decreases down a group.", src); },
      (rng) => { const [a, b] = pick(rng, [["Na", "Mg"], ["Cl", "Ar"], ["Li", "Be"], ["F", "Ne"]]); return mcq(rng, `Which has the higher first ionisation energy: ${a} or ${b}?`, b, [a, "They are equal", "Cannot be determined"], "IE generally increases across a period.", src); },
      (rng) => { const [a, b] = pick(rng, [["F", "Cl"], ["Cl", "Br"], ["O", "S"], ["N", "P"]]); return mcq(rng, `Which is more electronegative: ${a} or ${b}?`, a, [b, "They are equal", "Cannot be determined"], "Electronegativity decreases down a group.", src); }
    ];
    return build(c, gens);
  }

  function chapterE(c) {
    const src = sourceFor(c);
    const gens = [
      (rng) => { const p1 = ri(rng, 1, 5); const v1 = ri(rng, 1, 10); const p2 = ri(rng, 1, 10); const v2 = (p1 * v1) / p2; return numQ(rng, `A gas at ${p1} atm occupies ${v1} dm³. At constant T, what volume at ${p2} atm?`, v2, "dm³", [p1 * v1 * p2, v1 * p2 / p1, p1 / (v1 * p2)], "P₁V₁ = P₂V₂.", src, 2); },
      (rng) => { const v1 = ri(rng, 1, 10); const t1 = ri(rng, 200, 400); const t2 = ri(rng, 200, 500); const v2 = v1 * t2 / t1; return numQ(rng, `A gas occupies ${v1} dm³ at ${t1} K. At constant P, what volume at ${t2} K?`, v2, "dm³", [v1 * t1 / t2, v1 * t2, v1 + t2], "V₁/T₁ = V₂/T₂.", src, 2); },
      (rng) => { const p1 = ri(rng, 1, 3); const v1 = ri(rng, 1, 5); const t1 = ri(rng, 250, 350); const p2 = ri(rng, 1, 4); const t2 = ri(rng, 250, 450); const v2 = (p1 * v1 * t2) / (t1 * p2); return numQ(rng, `A gas has P=${p1} atm, V=${v1} dm³, T=${t1} K. What is V at P=${p2} atm and T=${t2} K?`, v2, "dm³", [p1 * v1 * t1 / (p2 * t2), p1 * v1 * p2 / (t1 * t2), v1 * t2 / p2], "P₁V₁/T₁ = P₂V₂/T₂.", src, 2); },
      (rng) => { const n = ri(rng, 1, 30) / 10; const t = ri(rng, 250, 400); const p = ri(rng, 1, 4) * 1e5; const v = n * 8.31 * t / p; return numQ(rng, `What volume does ${fmt(n, 1)} mol of gas occupy at ${t} K and ${fmt(p / 1e5, 1)}×10⁵ Pa?`, v, "m³", [n * 8.31 * p / t, p / (n * 8.31 * t), n * t / p], "PV = nRT.", src, 3); },
      (rng) => { const m = ri(rng, 1, 10); const v = ri(rng, 2, 12); const mr = m * 24 / v; return numQ(rng, `${m} g of gas occupies ${v} dm³ at r.t.p. What is its molar mass?`, mr, "g mol⁻¹", [m * v / 24, 24 * v / m, m / v], "n=V/24; M=m/n.", src, 1); },
      (rng) => { const n1 = ri(rng, 1, 8); let n2 = ri(rng, 1, 8); if (n1 === n2) n2 += 1; const pt = ri(rng, 1, 4); const p1 = n1 / (n1 + n2) * pt; return numQ(rng, `A mixture contains ${n1} mol gas A and ${n2} mol gas B at total pressure ${pt} atm. What is the partial pressure of A?`, p1, "atm", [n2 / (n1 + n2) * pt, pt, n1 * pt], "P_A = mole fraction × total pressure.", src, 2); },
      (rng) => { const n = ri(rng, 1, 10); const v = ri(rng, 1, 10); const t = ri(rng, 200, 400); return numQ(rng, `What pressure is exerted by ${n} mol gas in ${v} dm³ at ${t} K? (R=8.31)`, n * 8.31 * t / (v / 1000) / 1e5, "bar", [n * 8.31 * t / v, v / (n * 8.31 * t), n * t / v], "PV=nRT; convert dm³ to m³.", src, 2); },
      (rng) => { const t = ri(rng, 250, 400); return mcq(rng, `Which statement about the kinetic theory of gases is correct?`, "Gas pressure arises from collisions of particles with the walls.", ["Gas particles attract each other strongly.", "Gas particles have negligible kinetic energy.", "Gas particles are fixed in a lattice."], "Kinetic theory assumes random motion and elastic collisions.", src); },
      (rng) => mcq(rng, "At high pressure, which factor causes a real gas to deviate most from ideal behaviour?", "The finite volume of the gas molecules", ["The gas molecules have no mass", "The temperature is absolute zero", "The gas is always monatomic"], "The ideal model assumes point particles with no volume.", src),
      (rng) => mcq(rng, "Which gas is expected to behave most ideally at room temperature and pressure?", "He", ["NH₃", "H₂O", "HCl"], "Noble gases have weak intermolecular forces and small polarisability.", src)
    ];
    return build(c, gens);
  }

  function chapterF(c) {
    const src = sourceFor(c);
    const imf = [
      ["H₂O", "hydrogen bonding"], ["NH₃", "hydrogen bonding"], ["HF", "hydrogen bonding"],
      ["HCl", "permanent dipole–permanent dipole"], ["HBr", "permanent dipole–permanent dipole"],
      ["SO₂", "permanent dipole–permanent dipole"], ["CH₄", "instantaneous dipole–induced dipole"],
      ["CO₂", "instantaneous dipole–induced dipole"], ["I₂", "instantaneous dipole–induced dipole"],
      ["Br₂", "instantaneous dipole–induced dipole"], ["CCl₄", "instantaneous dipole–induced dipole"],
      ["NaCl", "ionic bonding"], ["MgO", "ionic bonding"], ["SiO₂", "giant covalent bonding"],
      ["diamond", "giant covalent bonding"]
    ];
    const bondType = [
      ["NaCl", "ionic"], ["MgO", "ionic"], ["KBr", "ionic"], ["NH₄Cl", "ionic"],
      ["CH₄", "covalent"], ["H₂O", "covalent"], ["HCl", "covalent"], ["Cl₂", "covalent"],
      ["SiO₂", "giant covalent"], ["diamond", "giant covalent"], ["graphite", "giant covalent"],
      ["Cu", "metallic"], ["Fe", "metallic"], ["brass", "metallic"], ["Al₂O₃", "ionic"]
    ];
    const giant = [
      ["diamond", "Each carbon is tetrahedrally bonded to four others; it is very hard and does not conduct."],
      ["graphite", "Each carbon is bonded to three others, leaving delocalised electrons; it conducts."],
      ["SiO₂", "Silicon and oxygen form a giant covalent lattice; it has a high melting point."],
      ["NaCl", "Ions form a giant ionic lattice; it conducts when molten."],
      ["Cu", "Metal cations are surrounded by delocalised electrons; it conducts."],
      ["I₂", "Simple molecular solid held by instantaneous dipole–induced dipole forces."],
      ["CO₂", "Simple molecular solid with weak intermolecular forces."],
      ["MgO", "A giant ionic lattice with strong electrostatic attractions."]
    ];
    const gens = [
      (rng, i) => { const [f, shape] = moleculesF[i % moleculesF.length]; return mcq(rng, `What is the shape of ${f}?`, shape, ["linear", "tetrahedral", "trigonal pyramidal", "octahedral"].filter((s) => s !== shape), "Use VSEPR: count bonding pairs and lone pairs.", src); },
      (rng, i) => {
        const angleMolecules = moleculesF.filter((m) => !m[2].includes("/"));
        const [f, shape, angle] = angleMolecules[i % angleMolecules.length];
        const target = Number(angle.replace(/[~°]/g, ""));
        const wrongs = ["60°", "90°", "120°", "109.5°", "180°"].filter((a) => Math.abs(Number(a.replace("°", "")) - target) > 5);
        return mcq(rng, `What is the approximate bond angle in ${f}?`, angle, wrongs, "The shape determines the ideal bond angle.", src);
      },
      (rng, i) => { const [f, shape, angle, polar] = moleculesF[i % moleculesF.length]; return mcq(rng, `Is ${f} polar or non-polar?`, polar, [polar === "polar" ? "non-polar" : "polar", "It depends only on bond polarity", "Cannot be determined"], "Check whether the bond dipoles cancel by symmetry.", src); },
      (rng, i) => { const [sub, force] = imf[i % imf.length]; return mcq(rng, `What is the strongest attraction holding ${sub} together?`, force, ["instantaneous dipole–induced dipole", "permanent dipole–permanent dipole", "hydrogen bonding", "ionic bonding"].filter((f) => f !== force), "Identify the functional groups and molecular symmetry.", src); },
      (rng, i) => { const [sub, type] = bondType[i % bondType.length]; return mcq(rng, `What is the main type of bonding in ${sub}?`, type, ["ionic", "covalent", "metallic", "giant covalent"].filter((t) => t !== type), "Metals are metallic; ions are ionic; non-metal networks are giant covalent.", src); },
      (rng) => { const [a, b] = pick(rng, [["MgO", "NaCl"], ["CaO", "KCl"], ["LiF", "NaCl"], ["MgO", "CaO"]]); return mcq(rng, `Which has the more exothermic lattice energy: ${a} or ${b}?`, a, [b, "They are equal", "Cannot be determined"], "Higher charges and smaller ions give more exothermic lattice energy.", src); },
      (rng, i) => { const [sub, fact] = giant[i % giant.length]; return mcq(rng, `Which statement best describes the structure/property of ${sub}?`, fact, ["It is a simple molecular solid with weak intermolecular forces.", "It is a gas at room temperature.", "It contains only isolated ions."], "Relate the structure to the property.", src); },
      (rng) => { const [a, b] = pick(rng, [["H₂O", "H₂S"], ["HF", "HCl"], ["NH₃", "PH₃"]]); return mcq(rng, `Which has the stronger hydrogen bonding: ${a} or ${b}?`, a, [b, "They are equal", "Neither has hydrogen bonding"], "N, O and F are the strongly electronegative atoms that form hydrogen bonds.", src); },
      (rng) => { const [a, b] = pick(rng, [["NaCl", "MgO"], ["KCl", "CaO"], ["NaBr", "NaCl"]]); return mcq(rng, `Which has the higher melting point: ${a} or ${b}?`, b, [a, "They are equal", "Cannot be determined"], "Stronger ionic attractions give a higher melting point.", src); },
      (rng) => mcq(rng, "Which molecule is non-polar despite containing polar bonds?", "CO₂", ["H₂O", "NH₃", "SO₂"], "The two C=O dipoles in linear CO₂ cancel.", src)
    ];
    return build(c, gens);
  }

  function chapterG1(c) {
    const src = sourceFor(c);
    const scenarios = [
      ["combustion of methane", "exothermic"], ["melting of ice", "endothermic"],
      ["neutralisation of HCl by NaOH", "exothermic"], ["breaking a covalent bond", "endothermic"],
      ["formation of a bond", "exothermic"], ["photosynthesis", "endothermic"],
      ["freezing of water", "exothermic"], ["boiling of ethanol", "endothermic"],
      ["dissolving NH₄NO₃ in water", "endothermic"], ["burning magnesium", "exothermic"]
    ];
    const defs = [
      ["standard enthalpy of formation", "enthalpy change when one mole of a compound forms from its elements in standard states"],
      ["standard enthalpy of combustion", "enthalpy change when one mole of a substance burns completely in oxygen under standard conditions"],
      ["standard enthalpy of neutralisation", "enthalpy change when one mole of water is formed from H⁺ and OH⁻ under standard conditions"],
      ["standard enthalpy of atomisation", "enthalpy change when one mole of gaseous atoms forms from the element in its standard state"],
      ["bond energy", "average enthalpy change when one mole of a given bond is broken in the gaseous state"],
      ["lattice energy", "enthalpy change when one mole of an ionic solid forms from its gaseous ions"],
      ["enthalpy of hydration", "enthalpy change when one mole of gaseous ions is hydrated"],
      ["enthalpy of solution", "enthalpy change when one mole of a solute dissolves in a solvent"]
    ];
    const gens = [
      (rng, i) => { const [r, type] = scenarios[i % scenarios.length]; return mcq(rng, `Is ${r} exothermic or endothermic?`, type, [type === "exothermic" ? "endothermic" : "exothermic", "Neither", "Both"], "Exothermic releases heat; endothermic absorbs heat.", src); },
      (rng, i) => { const [term, def] = defs[i % defs.length]; return mcq(rng, `Which definition matches ${term}?`, def, ["enthalpy change when one mole of a gas is formed", "energy needed to break one mole of a bond in solution", "heat released when one mole of solid melts"].filter((d) => d !== def), "Use the standard-state definition.", src); },
      (rng) => { const m = ri(rng, 20, 200); const dt = ri(rng, 1, 20); const q = m * 4.18 * dt; return numQ(rng, `What heat is absorbed when ${m} g of water rises by ${dt} K? (c=4.18 J g⁻¹ K⁻¹)`, q, "J", [m * dt, m * 4.18 / dt, q * 2], "q=mcΔT.", src, 0); },
      (rng) => { const m = ri(rng, 50, 250); const dt = ri(rng, 2, 12); const q = m * 4.18 * dt; const n = ri(rng, 1, 5) / 100; const dh = -q / n / 1000; return numQ(rng, `${m} g of solution warms by ${dt} K when ${fmt(n, 2)} mol reacts. What is ΔH per mole? (c=4.18, in kJ mol⁻¹)`, dh, "kJ mol⁻¹", [q / n / 1000, -q / n, -q / 1000], "q=mcΔT; ΔH = –q/n.", src, 1); },
      (rng) => { const hf = ri(rng, -400, -100); const hp = ri(rng, -500, -200); const dh = hp - hf; return numQ(rng, `ΔH_f(products)=${hp} kJ mol⁻¹ and ΔH_f(reactants)=${hf} kJ mol⁻¹. What is ΔH_reaction?`, dh, "kJ mol⁻¹", [hf - hp, hf + hp, -dh], "ΔH = ΣΔH_f(products) – ΣΔH_f(reactants).", src, 0); },
      (rng) => { const broken = ri(rng, 400, 900); const formed = ri(rng, 500, 1000); const dh = broken - formed; return numQ(rng, `Bonds broken total ${broken} kJ mol⁻¹; bonds formed total ${formed} kJ mol⁻¹. What is ΔH?`, dh, "kJ mol⁻¹", [formed - broken, broken + formed, -dh], "ΔH = bonds broken – bonds formed.", src, 0); },
      (rng) => { const [a, b] = pick(rng, [["combustion", "negative"], ["melting", "positive"], ["bond forming", "negative"], ["bond breaking", "positive"]]); return mcq(rng, `What is the sign of ΔH for ${a}?`, b, [b === "positive" ? "negative" : "positive", "zero", "cannot be determined"], "Use the direction of heat flow.", src); },
      (rng) => { const [a, b] = pick(rng, [["MgO", "NaCl"], ["CaO", "KCl"], ["LiF", "NaCl"]]); return mcq(rng, `Which has the more exothermic lattice energy: ${a} or ${b}?`, a, [b, "They are equal", "Cannot be determined"], "High charge and small size increase lattice energy.", src); },
      (rng) => mcq(rng, "Which process is endothermic?", "Atomisation of a solid metal", ["Formation of an ionic lattice", "Combustion of carbon", "Neutralisation"], "Atomisation requires energy to separate atoms.", src),
      (rng) => mcq(rng, "Which equation represents the standard enthalpy of formation of water?", "H₂(g) + ½O₂(g) → H₂O(l)", ["H₂(g) + O(g) → H₂O(l)", "2H₂(g) + O₂(g) → 2H₂O(l)", "H₂O(l) → H₂(g) + ½O₂(g)"], "Formation is from elements in standard states, one mole of product.", src)
    ];
    return build(c, gens);
  }

  function chapterG2(c) {
    const src = sourceFor(c);
    const reactions = [
      ["N₂(g) + 3H₂(g) ⇌ 2NH₃(g)", "negative"], ["CaCO₃(s) → CaO(s) + CO₂(g)", "positive"],
      ["H₂O(l) → H₂O(g)", "positive"], ["2H₂(g) + O₂(g) → 2H₂O(l)", "negative"],
      ["I₂(s) → I₂(g)", "positive"], ["2SO₂(g) + O₂(g) → 2SO₃(g)", "negative"],
      ["NH₄NO₃(s) → NH₄⁺(aq) + NO₃⁻(aq)", "positive"], ["2CO(g) + O₂(g) → 2CO₂(g)", "negative"]
    ];
    const gens = [
      (rng, i) => { const [r, sign] = reactions[i % reactions.length]; return mcq(rng, `What is the sign of ΔS for ${r}?`, sign, [sign === "positive" ? "negative" : "positive", "zero", "cannot be determined"], "Gas moles and disorder determine the sign of ΔS.", src); },
      (rng) => { const dh = ri(rng, -300, 100); const ds = ri(rng, -300, 300) / 1000; const t = ri(rng, 250, 400); const dg = dh - t * ds; return numQ(rng, `ΔH=${dh} kJ mol⁻¹, ΔS=${fmt(ds, 3)} kJ K⁻¹ mol⁻¹, T=${t} K. What is ΔG?`, dg, "kJ mol⁻¹", [dh + t * ds, -dh - t * ds, t * ds - dh], "ΔG=ΔH–TΔS.", src, 1); },
      (rng) => { const dg = ri(rng, -200, 200); return mcq(rng, `If ΔG=${dg} kJ mol⁻¹, is the reaction spontaneous?`, dg < 0 ? "Yes" : "No", [dg < 0 ? "No" : "Yes", "At equilibrium", "Cannot tell"], "Spontaneous when ΔG < 0.", src); },
      (rng) => { const dh = ri(rng, 50, 200); const ds = ri(rng, 100, 500) / 1000; const t = dh / ds; return numQ(rng, `ΔH=${dh} kJ mol⁻¹ and ΔS=${fmt(ds, 3)} kJ K⁻¹ mol⁻¹. At what temperature does ΔG=0?`, t, "K", [dh * ds, ds / dh, 298], "T=ΔH/ΔS.", src, 0); },
      (rng) => mcq(rng, "Which change increases the entropy of a system?", "Melting a solid", ["Freezing a liquid", "Condensing a gas", "Forming a crystal from ions"], "Melting increases disorder.", src),
      (rng) => mcq(rng, "For an endothermic reaction with positive ΔS, when is it spontaneous?", "At high temperature", ["At low temperature", "At all temperatures", "At no temperature"], "TΔS must exceed ΔH.", src),
      (rng) => mcq(rng, "Which reaction is always spontaneous regardless of temperature?", "An exothermic reaction with positive ΔS", ["An endothermic reaction with negative ΔS", "An exothermic reaction with negative ΔS", "An endothermic reaction with positive ΔS"], "ΔH<0 and ΔS>0 give ΔG<0 at all T.", src),
      (rng) => mcq(rng, "What does a negative ΔG indicate?", "The reaction is thermodynamically feasible", ["The reaction is always fast", "The reaction has no activation energy", "The reaction is at equilibrium"], "ΔG concerns feasibility, not rate.", src),
      (rng) => mcq(rng, "Which statement about a catalyst is correct?", "It lowers activation energy without changing ΔG", ["It makes ΔG more negative", "It changes the equilibrium position", "It is consumed in the reaction"], "A catalyst changes the pathway, not the thermodynamics.", src),
      (rng) => mcq(rng, "At equilibrium, what is ΔG?", "0", ["Negative", "Positive", "Equal to ΔH"], "ΔG=0 at equilibrium.", src)
    ];
    return build(c, gens);
  }

  function chapterH(c) {
    const src = sourceFor(c);
    const gens = [
      (rng) => { const c1 = ri(rng, 3, 10) / 10; const c2 = ri(rng, 1, Math.round(c1 * 10) - 1) / 10; const dt = ri(rng, 5, 60); const rate = (c1 - c2) / dt; return numQ(rng, `A concentration falls from ${fmt(c1, 1)} to ${fmt(c2, 1)} mol dm⁻³ in ${dt} s. What is the average rate?`, rate, "mol dm⁻³ s⁻¹", [c1 + c2 / dt, dt / (c1 - c2), (c1 - c2) * dt], "Rate=Δ[ ]/Δt.", src, 4); },
      (rng) => { const a = ri(rng, 1, 3); const b = ri(rng, 0, 2); return mcq(rng, `For rate = k[A]^${a}[B]^${b}, what is the overall order?`, String(a + b), [String(a), String(b), String(a * b + 1)], "Add the individual orders.", src); },
      (rng) => { const order = pick(rng, [0, 1, 2, 3]); const units = ["mol dm⁻³ s⁻¹", "s⁻¹", "dm³ mol⁻¹ s⁻¹", "dm⁶ mol⁻² s⁻¹"]; return mcq(rng, `What are the units of k for an overall order of ${order}?`, units[order], units.filter((u, i) => i !== order), "Use rate = k[A]^n to solve for the units of k.", src); },
      (rng) => mcq(rng, "Why does increasing temperature increase reaction rate?", "A larger fraction of molecules has energy above E_a", ["The activation energy decreases", "The molecules become heavier", "The equilibrium constant always increases"], "The Boltzmann distribution shifts to higher energies.", src),
      (rng) => mcq(rng, "How does a catalyst increase reaction rate?", "It provides an alternative path with lower activation energy", ["It increases the activation energy", "It increases ΔH", "It is consumed"], "Lower E_a means more successful collisions.", src),
      (rng) => mcq(rng, "Which factor does not affect the rate of a heterogeneous reaction?", "The colour of the container", ["Surface area of the solid", "Concentration of a reactant", "Temperature"], "Colour is not a kinetic variable.", src),
      (rng) => { const t12 = ri(rng, 10, 100); return numQ(rng, `A first-order reaction has half-life ${t12} s. What is the rate constant?`, Math.LN2 / t12, "s⁻¹", [t12 / Math.LN2, 1 / t12, t12], "t½ = ln2/k.", src, 4); },
      (rng) => mcq(rng, "What does the rate-determining step control?", "The overall rate of the reaction", ["The equilibrium constant", "The enthalpy change", "The colour of the mixture"], "The slowest step limits the overall rate.", src),
      (rng) => mcq(rng, "Which statement about the Boltzmann distribution is correct?", "The area under the curve is constant with temperature", ["The curve shifts left at higher temperature", "All molecules have the same energy", "Increasing T lowers the most probable energy"], "Higher T broadens the distribution towards higher energies.", src),
      (rng) => mcq(rng, "A reaction is second order in A. By what factor does rate increase if [A] doubles?", "4", ["2", "8", "16"], "Rate ∝ [A]², so 2²=4.", src)
    ];
    return build(c, gens);
  }

  function chapterI(c) {
    const src = sourceFor(c);
    const reactions = [
      ["N₂ + 3H₂ ⇌ 2NH₃", "Kc = [NH₃]²/([N₂][H₂]³)"],
      ["H₂ + I₂ ⇌ 2HI", "Kc = [HI]²/([H₂][I₂])"],
      ["2SO₂ + O₂ ⇌ 2SO₃", "Kc = [SO₃]²/([SO₂]²[O₂])"],
      ["PCl₅ ⇌ PCl₃ + Cl₂", "Kc = [PCl₃][Cl₂]/[PCl₅]"],
      ["N₂O₄ ⇌ 2NO₂", "Kc = [NO₂]²/[N₂O₄]"],
      ["CO + 2H₂ ⇌ CH₃OH", "Kc = [CH₃OH]/([CO][H₂]²)"],
      ["2NO₂ ⇌ N₂O₄", "Kc = [N₂O₄]/[NO₂]²"],
      ["CaCO₃(s) ⇌ CaO(s) + CO₂(g)", "Kc = [CO₂]"],
      ["CH₃COOH ⇌ H⁺ + CH₃COO⁻", "Kc = [H⁺][CH₃COO⁻]/[CH₃COOH]"]
    ];
    const shifts = [
      ["N₂ + 3H₂ ⇌ 2NH₃", "add N₂", "right"],
      ["N₂ + 3H₂ ⇌ 2NH₃", "remove NH₃", "right"],
      ["N₂ + 3H₂ ⇌ 2NH₃", "increase pressure", "right"],
      ["N₂ + 3H₂ ⇌ 2NH₃", "increase temperature (exothermic)", "left"],
      ["2SO₂ + O₂ ⇌ 2SO₃", "increase pressure", "right"],
      ["2SO₂ + O₂ ⇌ 2SO₃", "remove SO₃", "right"],
      ["N₂O₄ ⇌ 2NO₂", "increase pressure", "left"],
      ["H₂ + I₂ ⇌ 2HI", "add catalyst", "no change"],
      ["CH₃COOH ⇌ H⁺ + CH₃COO⁻", "add NaOH", "right"],
      ["AgCl(s) ⇌ Ag⁺ + Cl⁻", "add NaCl", "left"]
    ];
    const gens = [
      (rng, i) => { const [r, expr] = reactions[i % reactions.length]; return mcq(rng, `Which is the correct Kc expression for ${r}?`, expr, ["Kc = [products]/[reactants] without powers", "Kc = [reactants]/[products]", "Kc = 1/[products]"], "Products over reactants, each raised to its stoichiometric coefficient; omit solids.", src); },
      (rng) => { const a = ri(rng, 1, 10) / 10; const b = ri(rng, 1, 10) / 10; const cc = ri(rng, 1, 10) / 10; const k = cc / (a * b); return numQ(rng, `For A+B ⇌ C, equilibrium concentrations are [A]=${fmt(a, 1)}, [B]=${fmt(b, 1)}, [C]=${fmt(cc, 1)} mol dm⁻³. What is Kc?`, k, "", [a * b / cc, a * b * cc, cc / (a + b)], "Kc=[C]/([A][B]).", src, 2); },
      (rng, i) => { const [r, change, dir] = shifts[i % shifts.length]; return mcq(rng, `For ${r}, what happens to the equilibrium position when you ${change}?`, dir, ["left", "right", "no change"].filter((d) => d !== dir), "Le Chatelier: the system opposes the change.", src); },
      (rng) => { const [r, gas1, gas2] = pick(rng, [["N₂+3H₂⇌2NH₃", 4, 2], ["N₂O₄⇌2NO₂", 1, 2], ["2SO₂+O₂⇌2SO₃", 3, 2], ["PCl₅⇌PCl₃+Cl₂", 1, 2]]); return mcq(rng, `For ${r}, which direction is favoured by increasing pressure?`, gas2 < gas1 ? "right" : "left", [gas2 < gas1 ? "left" : "right", "no change", "both directions equally"], "Increasing pressure favours the side with fewer gas moles.", src); },
      (rng) => mcq(rng, "For an exothermic equilibrium, what happens when temperature is increased?", "The equilibrium shifts left", ["The equilibrium shifts right", "Kc increases", "No change"], "Increasing temperature favours the endothermic direction, which is the reverse here.", src),
      (rng) => mcq(rng, "What effect does a catalyst have on an equilibrium?", "It speeds up both directions equally; position unchanged", ["It shifts equilibrium right", "It shifts equilibrium left", "It changes Kc"], "A catalyst does not change the equilibrium position.", src),
      (rng) => mcq(rng, "Which conditions favour a high equilibrium yield of NH₃ in the Haber process?", "High pressure, moderate temperature, iron catalyst", ["Low pressure, high temperature", "High pressure, very high temperature", "Low pressure, low temperature"], "High pressure favours fewer gas moles; moderate T balances rate and exothermic yield.", src),
      (rng) => mcq(rng, "Which conditions favour SO₃ in the Contact process?", "High pressure, moderate temperature, V₂O₅ catalyst", ["Low pressure, high temperature", "High pressure, very high temperature", "Low pressure, low temperature"], "The forward reaction is exothermic and reduces gas moles.", src),
      (rng) => mcq(rng, "Which is the correct Kp expression for N₂ + 3H₂ ⇌ 2NH₃?", "Kp = p(NH₃)²/[p(N₂)p(H₂)³]", ["Kp = p(NH₃)/[p(N₂)p(H₂)]", "Kp = p(N₂)p(H₂)³/p(NH₃)²", "Kp = p(NH₃)²/(p(N₂)p(H₂))"], "Use partial pressures with the stoichiometric powers.", src),
      (rng) => mcq(rng, "What are the units of Kc for A+B ⇌ C if concentrations are in mol dm⁻³?", "dm³ mol⁻¹", ["mol dm⁻³", "dm⁶ mol⁻²", "no units"], "Kc = [C]/([A][B]) gives dm³ mol⁻¹.", src)
    ];
    return build(c, gens);
  }

  function chapterJ(c) {
    const src = sourceFor(c);
    const salts = [
      ["NaCl", "neutral"], ["CH₃COONa", "alkaline"], ["NH₄Cl", "acidic"],
      ["Na₂CO₃", "alkaline"], ["NH₄NO₃", "acidic"], ["KNO₃", "neutral"],
      ["NaHCO₃", "alkaline"], ["NH₄Br", "acidic"], ["Na₂SO₄", "neutral"],
      ["CH₃COONH₄", "neutral"]
    ];
    const conjugates = [
      ["CH₃COOH", "CH₃COO⁻"], ["NH₄⁺", "NH₃"], ["H₂O", "OH⁻"],
      ["HCO₃⁻", "CO₃²⁻"], ["H₃O⁺", "H₂O"], ["H₂SO₄", "HSO₄⁻"],
      ["HSO₄⁻", "SO₄²⁻"], ["C₆H₅OH", "C₆H₅O⁻"]
    ];
    const gens = [
      (rng) => { const c = ri(rng, 1, 100) / 1000; const pH = -Math.log10(c); return numQ(rng, `What is the pH of ${fmt(c, 3)} mol dm⁻³ HCl?`, pH, "", [Math.log10(c), 14 + Math.log10(c), 7], "pH=–log[H⁺] for a strong monoprotic acid.", src, 2); },
      (rng) => { const c = ri(rng, 1, 100) / 1000; const pOH = -Math.log10(c); const pH = 14 - pOH; return numQ(rng, `What is the pH of ${fmt(c, 3)} mol dm⁻³ NaOH?`, pH, "", [pOH, 14 + pOH, -Math.log10(c)], "pOH=–log[OH⁻]; pH=14–pOH.", src, 2); },
      (rng) => { const pH = ri(rng, 1, 13); return numQ(rng, `A solution has pH ${pH}. What is its pOH at 25 °C?`, 14 - pH, "", [pH, 14 + pH, 7], "pH+pOH=14.", src, 0); },
      (rng) => { const ka = Math.pow(10, -ri(rng, 2, 10)); const pka = -Math.log10(ka); return numQ(rng, `An acid has Ka=${fmt(ka, 3)}. What is its pKa?`, pka, "", [Math.log10(ka), -Math.log10(ka) / 2, 14 + Math.log10(ka)], "pKa=–logKa.", src, 1); },
      (rng) => { const c = ri(rng, 1, 10) / 100; const ka = Math.pow(10, -ri(rng, 5, 7)); const h = Math.sqrt(ka * c); const pH = -Math.log10(h); return numQ(rng, `A weak acid has concentration ${fmt(c, 3)} mol dm⁻³ and Ka=${fmt(ka, 3)}. What is its pH?`, pH, "", [-Math.log10(c), -Math.log10(ka), 14 + Math.log10(h)], "[H⁺]≈√(Ka c).", src, 2); },
      (rng, i) => { const [acid, base] = conjugates[i % conjugates.length]; return mcq(rng, `What is the conjugate base of ${acid}?`, base, ["H₃O⁺", "OH⁻", "H₂O"].filter((b) => b !== base), "Remove one H⁺.", src); },
      (rng, i) => { const [salt, type] = salts[i % salts.length]; return mcq(rng, `Is an aqueous solution of ${salt} acidic, alkaline or neutral?`, type, ["acidic", "alkaline", "neutral"].filter((t) => t !== type), "Consider hydrolysis of the cation or anion.", src); },
      (rng) => { const pka = ri(rng, 3, 7); const ratio = ri(rng, 2, 10); const pH = pka + Math.log10(ratio); return numQ(rng, `A buffer has pKa=${pka} and [A⁻]/[HA]=${ratio}. What is its pH?`, pH, "", [pka - Math.log10(ratio), pka + ratio, pka], "pH=pKa+log([A⁻]/[HA]).", src, 2); },
      (rng) => { const oh = Math.pow(10, -ri(rng, 1, 10)); const h = 1e-14 / oh; return numQ(rng, `[OH⁻]=${fmt(oh, 3)} mol dm⁻³ at 25 °C. What is [H⁺]?`, h, "mol dm⁻³", [oh, 1e-14 * oh, 1 / oh], "Kw=[H⁺][OH⁻]=1.0×10⁻¹⁴.", src, 4); },
      (rng) => mcq(rng, "Which indicator is suitable for a strong acid–strong base titration?", "Phenolphthalein (or methyl orange)", ["Only universal indicator", "Litmus only", "No indicator is needed"], "The vertical section is broad; both common indicators work.", src)
    ];
    return build(c, gens);
  }

  function chapterK(c) {
    const src = sourceFor(c);
    const salts = [
      ["AgCl", "Ksp=[Ag⁺][Cl⁻]"], ["PbCl₂", "Ksp=[Pb²⁺][Cl⁻]²"], ["Ag₂CrO₄", "Ksp=[Ag⁺]²[CrO₄²⁻]"],
      ["CaCO₃", "Ksp=[Ca²⁺][CO₃²⁻]"], ["Mg(OH)₂", "Ksp=[Mg²⁺][OH⁻]²"], ["BaSO₄", "Ksp=[Ba²⁺][SO₄²⁻]"],
      ["Fe(OH)₃", "Ksp=[Fe³⁺][OH⁻]³"], ["AgBr", "Ksp=[Ag⁺][Br⁻]"], ["AgI", "Ksp=[Ag⁺][I⁻]"],
      ["CaF₂", "Ksp=[Ca²⁺][F⁻]²"]
    ];
    const gens = [
      (rng, i) => { const [salt, expr] = salts[i % salts.length]; return mcq(rng, `Which is the correct Ksp expression for ${salt}?`, expr, ["Ksp=[cation][anion]", "Ksp=[cation]+[anion]", "Ksp=1/([cation][anion])"], "Raise each ion concentration to its coefficient; omit the solid.", src); },
      (rng) => { const k = ri(rng, 1, 20) * 1e-10; const s = Math.sqrt(k); return numQ(rng, `For AgCl, Ksp=${fmt(k, 2)}. What is its molar solubility?`, s, "mol dm⁻³", [k, k / 2, k * 2], "For AB, Ksp=s².", src, 5); },
      (rng) => { const k = ri(rng, 1, 50) * 1e-12; const s = Math.cbrt(k / 4); return numQ(rng, `For PbCl₂, Ksp=${fmt(k, 2)}. What is its molar solubility?`, s, "mol dm⁻³", [Math.sqrt(k), k / 4, Math.cbrt(k)], "For AB₂, Ksp=4s³.", src, 5); },
      (rng) => { const s = ri(rng, 1, 10) * 1e-5; const k = s * s; return numQ(rng, `The molar solubility of AgCl is ${fmt(s, 2)} mol dm⁻³. What is Ksp?`, k, "", [2 * s, s / 2, s * 4], "Ksp=s² for a 1:1 salt.", src, 5); },
      (rng) => { const s = ri(rng, 1, 10) * 1e-5; const k = 4 * Math.pow(s, 3); return numQ(rng, `The molar solubility of PbCl₂ is ${fmt(s, 2)} mol dm⁻³. What is Ksp?`, k, "", [Math.pow(s, 2), 2 * s, 2 * Math.pow(s, 3)], "Ksp=4s³ for AB₂.", src, 5); },
      (rng) => { const k = ri(rng, 1, 20) * 1e-10; const cl = ri(rng, 1, 10) / 100; const s = k / cl; return numQ(rng, `Ksp(AgCl)=${fmt(k, 2)}. In ${fmt(cl, 2)} mol dm⁻³ Cl⁻, what is the solubility of AgCl?`, s, "mol dm⁻³", [k * cl, k, cl], "Ksp=[Ag⁺][Cl⁻]; [Ag⁺]=s.", src, 5); },
      (rng) => { const q = ri(rng, 1, 20) * 1e-10; const k = ri(rng, 1, 20) * 1e-10; return mcq(rng, `Q=${fmt(q, 2)} and Ksp=${fmt(k, 2)}. What happens?`, q > k ? "Precipitation" : q < k ? "No precipitate" : "Saturated, no net change", ["Precipitation", "No precipitate", "Saturated, no net change"].filter((x) => x !== (q > k ? "Precipitation" : q < k ? "No precipitate" : "Saturated, no net change")), "Compare Q with Ksp.", src); },
      (rng) => mcq(rng, "How does adding a common ion affect solubility?", "It decreases solubility", ["It increases solubility", "It has no effect", "It doubles solubility"], "The dissolution equilibrium shifts left.", src),
      (rng) => mcq(rng, "Which silver salt is least soluble in water?", "AgI", ["AgCl", "AgBr", "Ag₂CrO₄"], "AgI has the smallest Ksp of the silver halides.", src),
      (rng) => mcq(rng, "What is the effect of temperature on Ksp?", "Ksp changes with temperature", ["Ksp is always constant", "Ksp is independent of temperature", "Ksp only depends on pressure"], "Solubility and Ksp are temperature-dependent.", src)
    ];
    return build(c, gens);
  }

  function chapterL1(c) {
    const src = sourceFor(c);
    const gens = [
      (rng) => { const [a, ea] = pick(rng, redoxPotentials); const [b, eb] = pick(rng, redoxPotentials.filter((x) => x[0] !== a)); const high = ea > eb ? [a, ea] : [b, eb]; const low = ea > eb ? [b, eb] : [a, ea]; const e = high[1] - low[1]; return numQ(rng, `E°(${a})=${ea} V and E°(${b})=${eb} V. What is E°cell?`, e, "V", [low[1] - high[1], high[1] + low[1], -e], "E°cell=E°cathode–E°anode.", src, 2); },
      (rng) => { const [a, ea] = pick(rng, redoxPotentials); const [b, eb] = pick(rng, redoxPotentials.filter((x) => x[0] !== a)); const cathode = ea > eb ? a : b; return mcq(rng, `In a cell using ${a} and ${b}, which is the cathode?`, cathode, [cathode === a ? b : a, "Both", "Neither"], "The more positive electrode is the cathode.", src); },
      (rng) => { const e = ri(rng, -200, 200) / 100; return mcq(rng, `A cell has E°cell=${fmt(e, 2)} V. Is the reaction feasible as written?`, e > 0 ? "Yes" : "No", [e > 0 ? "No" : "Yes", "At equilibrium", "Cannot tell"], "A positive E°cell means ΔG<0.", src); },
      (rng) => { const [a, ea] = pick(rng, redoxPotentials); const [b, eb] = pick(rng, redoxPotentials.filter((x) => x[0] !== a)); const anode = ea < eb ? a : b; return mcq(rng, `In a cell using ${a} and ${b}, from which electrode do electrons flow in the external circuit?`, anode, [anode === a ? b : a, "Both", "Neither"], "Electrons flow from anode to cathode.", src); },
      (rng) => mcq(rng, "What is the standard hydrogen electrode potential?", "0.00 V", ["+0.76 V", "–0.76 V", "1.00 V"], "The SHE is the reference by definition.", src),
      (rng) => mcq(rng, "Which is the correct cell notation for a Zn|Cu cell?", "Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s)", ["Cu(s) | Cu²⁺(aq) || Zn²⁺(aq) | Zn(s)", "Zn²⁺(aq) | Zn(s) || Cu(s) | Cu²⁺(aq)", "Zn(s) | Cu(s) || Zn²⁺(aq) | Cu²⁺(aq)"], "Anode on the left, cathode on the right; double line is the salt bridge.", src),
      (rng) => mcq(rng, "What is the role of the salt bridge?", "It maintains electrical neutrality by allowing ion movement", ["It supplies electrons", "It stops all ion movement", "It increases E°cell"], "Ions migrate to balance charge in each half-cell.", src),
      (rng) => mcq(rng, "Which statement about a fuel cell is correct?", "It continuously converts fuel and oxidant into electricity", ["It stores charge like a battery", "It must be recharged", "It produces only CO₂"], "Reactants are supplied continuously.", src),
      (rng) => mcq(rng, "Which electrode is the anode in a galvanic cell?", "The electrode where oxidation occurs", ["The electrode where reduction occurs", "The more positive electrode", "The salt bridge"], "Anode = oxidation.", src),
      (rng) => mcq(rng, "If E°cell is negative, what is true?", "The reaction is non-spontaneous as written", ["The reaction is spontaneous", "ΔG is negative", "The cell has no electrodes"], "Negative E°cell means positive ΔG.", src)
    ];
    return build(c, gens);
  }

  function chapterL2(c) {
    const src = sourceFor(c);
    const molten = [
      ["NaCl", "Na at cathode, Cl₂ at anode"], ["MgCl₂", "Mg at cathode, Cl₂ at anode"],
      ["Al₂O₃", "Al at cathode, O₂ at anode"], ["PbBr₂", "Pb at cathode, Br₂ at anode"],
      ["KCl", "K at cathode, Cl₂ at anode"], ["CaCl₂", "Ca at cathode, Cl₂ at anode"],
      ["LiF", "Li at cathode, F₂ at anode"], ["NaBr", "Na at cathode, Br₂ at anode"]
    ];
    const aqueous = [
      ["CuSO₄ with inert electrodes", "Cu at cathode, O₂ at anode"],
      ["NaCl (concentrated)", "H₂ at cathode, Cl₂ at anode"],
      ["NaCl (dilute)", "H₂ at cathode, O₂ at anode"],
      ["H₂SO₄", "H₂ at cathode, O₂ at anode"],
      ["AgNO₃ with silver electrodes", "Ag deposited at cathode, Ag dissolves at anode"],
      ["CuCl₂", "Cu at cathode, Cl₂ at anode"]
    ];
    const metals = [["Cu", 2, 64], ["Ag", 1, 108], ["Zn", 2, 65], ["Fe", 3, 56], ["Al", 3, 27], ["Ni", 2, 59]];
    const gens = [
      (rng, i) => { const [salt, prod] = molten[i % molten.length]; return mcq(rng, `What is produced at the electrodes when molten ${salt} is electrolysed?`, prod, ["H₂ at cathode, O₂ at anode", "Na at cathode, Cl₂ at anode", "Cu at cathode, O₂ at anode"].filter((p) => p !== prod), "In a molten salt, the cation is reduced and the anion is oxidised.", src); },
      (rng, i) => { const [sys, prod] = aqueous[i % aqueous.length]; return mcq(rng, `What is produced during electrolysis of ${sys}?`, prod, ["H₂ at cathode, O₂ at anode", "Cu at cathode, Cl₂ at anode", "Na at cathode, O₂ at anode"].filter((p) => p !== prod), "Use preferential discharge and electrode material.", src); },
      (rng) => { const q = ri(rng, 965, 96500); const n = q / 96500; return numQ(rng, `How many moles of electrons pass when ${q} C flows? (F=96500 C mol⁻¹)`, n, "mol", [q * 96500, 96500 / q, q / 2 / 96500], "n=Q/F.", src, 4); },
      (rng, i) => { const [m, z, ar] = metals[i % metals.length]; const nE = ri(rng, 1, 50) / 100; const mass = (nE / z) * ar; return numQ(rng, `How much ${m} is deposited when ${fmt(nE, 2)} mol electrons flow? (Aᵣ=${ar}, charge=${z})`, mass, "g", [nE * ar, nE * z * ar, nE / ar], "n(metal)=n(e)/charge; mass=nM.", src, 2); },
      (rng) => { const i = ri(rng, 1, 20) / 10; const t = ri(rng, 30, 600); return numQ(rng, `A current of ${fmt(i, 1)} A flows for ${t} s. What charge passes?`, i * t, "C", [i / t, t / i, i * t * 2], "Q=It.", src, 0); },
      (rng) => mcq(rng, "In aqueous electrolysis, which species is preferentially discharged at the cathode?", "The species that is easier to reduce", ["The species that is easier to oxidise", "The most abundant anion", "Water always"], "Reduction occurs at the cathode; the more positive reduction potential wins.", src),
      (rng) => mcq(rng, "Why is cryolite added in the electrolysis of alumina?", "To lower the melting point and save energy", ["To increase the melting point", "To oxidise aluminium", "To produce chlorine"], "Cryolite dissolves alumina at a lower temperature.", src),
      (rng) => mcq(rng, "What is the anode in copper purification?", "Impure copper", ["Pure copper", "Platinum", "Graphite"], "Impure copper is oxidised and dissolves.", src),
      (rng) => mcq(rng, "What is anodising?", "Thickening the protective oxide layer on aluminium by electrolysis", ["Coating aluminium with copper", "Melting aluminium", "Producing chlorine"], "The aluminium object is made the anode in an electrolyte.", src),
      (rng) => mcq(rng, "Which product forms at the cathode when molten NaCl is electrolysed?", "Na", ["Cl₂", "NaOH", "H₂"], "Na⁺ is reduced at the cathode.", src)
    ];
    return build(c, gens);
  }

  function chapterM(c) {
    const src = sourceFor(c);
    const configs = [["Fe²⁺", "[Ar] 3d⁶"], ["Fe³⁺", "[Ar] 3d⁵"], ["Cu²⁺", "[Ar] 3d⁹"], ["Zn²⁺", "[Ar] 3d¹⁰"], ["Cr³⁺", "[Ar] 3d³"], ["Mn²⁺", "[Ar] 3d⁵"], ["Co²⁺", "[Ar] 3d⁷"], ["Ni²⁺", "[Ar] 3d⁸"], ["Cu⁺", "[Ar] 3d¹⁰"], ["Ti⁴⁺", "[Ar] 3d⁰"]];
    const complexes = [
      ["[Cu(NH₃)₄]²⁺", "Cu", 2, 4, "NH₃"], ["[Fe(CN)₆]³⁻", "Fe", 3, 6, "CN⁻"],
      ["[Ag(NH₃)₂]⁺", "Ag", 1, 2, "NH₃"], ["[Zn(OH)₄]²⁻", "Zn", 2, 4, "OH⁻"],
      ["[CuCl₄]²⁻", "Cu", 2, 4, "Cl⁻"], ["[Fe(H₂O)₆]³⁺", "Fe", 3, 6, "H₂O"],
      ["[Cr(NH₃)₆]³⁺", "Cr", 3, 6, "NH₃"], ["[Ni(CN)₄]²⁻", "Ni", 2, 4, "CN⁻"],
      ["[Co(NH₃)₆]³⁺", "Co", 3, 6, "NH₃"], ["[Pt(NH₃)₂Cl₂]", "Pt", 2, 4, "NH₃/Cl⁻"]
    ];
    const ionOx = [
      ["Fe²⁺", 2], ["Fe³⁺", 3], ["Cu²⁺", 2], ["Cu⁺", 1], ["Mn²⁺", 2], ["MnO₄⁻", 7],
      ["Cr³⁺", 3], ["Cr₂O₇²⁻", 6], ["CrO₄²⁻", 6], ["VO₂⁺", 5], ["TiO₂", 4],
      ["Ni²⁺", 2], ["Co³⁺", 3], ["Ag⁺", 1], ["Zn²⁺", 2], ["Fe(CN)₆⁴⁻", 2]
    ];
    const ligandDent = [["NH₃", "monodentate"], ["H₂O", "monodentate"], ["Cl⁻", "monodentate"], ["CN⁻", "monodentate"], ["CO", "monodentate"], ["OH⁻", "monodentate"], ["ethane-1,2-diamine (en)", "bidentate"], ["EDTA", "hexadentate"]];
    const colours = [["[Cu(H₂O)₆]²⁺", "blue"], ["[Cu(NH₃)₄]²⁺", "deep blue"], ["[Fe(SCN)]²⁺", "blood red"], ["[Fe(CN)₆]³⁻", "yellow"], ["[Ni(H₂O)₆]²⁺", "green"], ["Cr₂O₇²⁻", "orange"], ["MnO₄⁻", "purple"], ["[Co(H₂O)₆]²⁺", "pink"]];
    const catalysts = [["Fe", "Haber process"], ["V₂O₅", "Contact process"], ["Ni", "hydrogenation of alkenes"], ["MnO₂", "decomposition of H₂O₂"], ["Pt/Rh", "catalytic converter"], ["Rh", "hydroformylation"]];
    const gens = [
      (rng, i) => { const [ion, ox] = ionOx[i % ionOx.length]; return mcq(rng, `What is the oxidation state of the metal in ${ion}?`, `${ox > 0 ? "+" : ""}${ox}`, [`${ox + 1 > 0 ? "+" : ""}${ox + 1}`, `${ox - 1 > 0 ? "+" : ""}${ox - 1}`, `${ox + 2 > 0 ? "+" : ""}${ox + 2}`], "Use the overall charge and ligand charges.", src); },
      (rng, i) => { const [ligand, dent] = ligandDent[i % ligandDent.length]; return mcq(rng, `How is ${ligand} classified as a ligand?`, dent, ["monodentate", "bidentate", "hexadentate"].filter((x) => x !== dent), "Count the donor atoms that bind to the metal.", src); },
      (rng, i) => { const [complex, colour] = colours[i % colours.length]; return mcq(rng, `What colour is ${complex}?`, colour, ["blue", "green", "yellow", "purple"].filter((x) => x !== colour), "Recall the characteristic colours of common complexes.", src); },
      (rng, i) => { const [metal, process] = catalysts[i % catalysts.length]; return mcq(rng, `For which process is ${metal} used as a catalyst?`, process, ["Contact process", "Haber process", "hydrogenation of alkenes", "catalytic converter"].filter((x) => x !== process), "Recall the industrial catalyst.", src); },
      (rng) => mcq(rng, "Which complex is paramagnetic?", "[Fe(CN)₆]³⁻", ["[Zn(NH₃)₄]²⁺", "[Cu(CN)₄]³⁻", "[Ag(NH₃)₂]⁺"], "Unpaired d electrons give paramagnetism.", src),
      (rng) => mcq(rng, "Which complex has a coordination number of 6?", "[Fe(H₂O)₆]³⁺", ["[Ag(NH₃)₂]⁺", "[CuCl₄]²⁻", "[Pt(NH₃)₂Cl₂]"], "Six ligands are bonded to the metal.", src),
      (rng) => mcq(rng, "What is the charge on [Fe(CN)₆]⁴⁻?", "–4", ["–2", "–3", "–6"], "The overall charge is shown in the formula.", src),
      (rng) => mcq(rng, "What is the charge on [Cu(NH₃)₄]²⁺?", "+2", ["+1", "+3", "0"], "The overall charge is shown in the formula.", src),
      (rng) => mcq(rng, "What is the definition of a ligand?", "A species that donates a lone pair to a metal ion", ["A metal ion", "An electron-pair acceptor", "A neutral molecule only"], "Ligands are Lewis bases.", src),
      (rng) => mcq(rng, "Which transition metal ion has the configuration [Ar]3d⁵?", "Fe³⁺", ["Fe²⁺", "Cu²⁺", "Zn²⁺"], "Fe³⁺ loses three electrons from Fe.", src),
      (rng) => mcq(rng, "Which property is not typical of transition metals?", "They form only one oxidation state", ["They form coloured compounds", "They act as catalysts", "They form complex ions"], "Variable oxidation states are typical.", src),
      (rng) => mcq(rng, "Which ligand is hexadentate?", "EDTA", ["NH₃", "en", "Cl⁻"], "EDTA has six donor atoms.", src),
      (rng) => mcq(rng, "Which complex is used in the test for Fe³⁺ with SCN⁻?", "[Fe(SCN)]²⁺", ["[Fe(CN)₆]³⁻", "[Cu(NH₃)₄]²⁺", "[Ag(NH₃)₂]⁺"], "The blood-red complex confirms Fe³⁺.", src),
      (rng) => mcq(rng, "What is the oxidation state of Cr in Cr₂O₇²⁻?", "+6", ["+3", "+7", "+2"], "2x + 7(–2)=–2.", src),
      (rng) => mcq(rng, "What is the oxidation state of Mn in MnO₄⁻?", "+7", ["+4", "+6", "+2"], "x + 4(–2)=–1.", src),
      (rng) => mcq(rng, "Which ion is colourless?", "Zn²⁺", ["Cu²⁺", "Fe²⁺", "Ni²⁺"], "Zn²⁺ is 3d¹⁰; no d–d transition is possible.", src),
      (rng) => mcq(rng, "Which transition metal is used in the Haber process?", "Fe", ["Cu", "Ag", "Zn"], "Iron catalyses ammonia synthesis.", src),
      (rng) => mcq(rng, "Which transition metal compound catalyses the decomposition of hydrogen peroxide?", "MnO₂", ["FeCl₃", "CuSO₄", "ZnO"], "MnO₂ is a common heterogeneous catalyst.", src),
      (rng) => mcq(rng, "Which complex has a tetrahedral geometry?", "[CuCl₄]²⁻", ["[Fe(CN)₆]³⁻", "[Ag(NH₃)₂]⁺", "[Pt(NH₃)₂Cl₂]"], "Four-coordinate complexes can be tetrahedral or square planar.", src),
      (rng) => mcq(rng, "Which complex is square planar?", "[Pt(NH₃)₂Cl₂]", ["[Fe(H₂O)₆]³⁺", "[Ag(NH₃)₂]⁺", "[CuCl₄]²⁻"], "Pt(II) complexes are typically square planar.", src)
      ,
      (rng) => mcq(rng, "Which ion has three unpaired electrons?", "Cr³⁺", ["Zn²⁺", "Cu²⁺", "Ni²⁺"], "Cr³⁺ is 3d³, giving three unpaired electrons.", src),
      (rng) => mcq(rng, "Which complex has a coordination number of 2?", "[Ag(NH₃)₂]⁺", ["[Fe(CN)₆]³⁻", "[CuCl₄]²⁻", "[Fe(H₂O)₆]³⁺"], "Two NH₃ ligands coordinate to Ag⁺.", src),
      (rng) => mcq(rng, "Which d-block element is not a typical transition metal?", "Zn", ["Fe", "Cu", "Mn"], "Zn²⁺ has a full 3d¹⁰ configuration.", src),
      (rng) => mcq(rng, "Which species cannot act as a ligand?", "Na⁺", ["NH₃", "Cl⁻", "CN⁻"], "Na⁺ has no lone pair to donate.", src),
      (rng) => mcq(rng, "What is the definition of a transition metal?", "A d-block element that forms at least one ion with a partially filled d subshell", ["Any d-block element", "Any metal in Period 4", "A metal that forms only one ion"], "The partially filled d subshell is the key definition.", src),
      (rng, i) => { const [ion, conf] = configs[i % configs.length]; return mcq(rng, `What is the electron configuration of ${ion}?`, conf, ["[Ar] 3d¹⁰", "[Ar] 4s² 3d⁸", "[Ar] 3d⁰"].filter((x) => x !== conf), "Remove electrons from 4s before 3d when forming ions.", src); },
      (rng) => { const [ion, metal, ox, cn, ligand] = pick(rng, complexes); return mcq(rng, `What is the oxidation state of ${metal} in ${ion}?`, `${ox > 0 ? "+" : ""}${ox}`, [`${ox + 1 > 0 ? "+" : ""}${ox + 1}`, `${ox - 1 > 0 ? "+" : ""}${ox - 1}`, `${ox + 2 > 0 ? "+" : ""}${ox + 2}`], "Use the overall charge and ligand charges.", src); },
      (rng) => { const [ion, metal, ox, cn, ligand] = pick(rng, complexes); return mcq(rng, `What is the coordination number in ${ion}?`, String(cn), [String(cn + 1), String(cn - 1), String(cn + 2)], "Count the dative bonds from ligands to the metal.", src); },
      (rng) => { const [ion, metal, ox, cn, ligand] = pick(rng, complexes); if (ligand.includes("/")) return mcq(rng, `How many ligands are bonded to the metal in ${ion}?`, String(cn), [String(cn + 1), String(cn - 1), String(cn + 2)], "Count the dative bonds from ligands to the metal.", src); return mcq(rng, `Which ligand is present in ${ion}?`, ligand, ["CO", "EDTA", "NH₃", "Cl⁻"].filter((l) => l !== ligand), "Identify the species donating lone pairs.", src); },
      (rng) => mcq(rng, "Why are many transition metal complexes coloured?", "d–d electron transitions absorb visible light", ["They contain only s electrons", "They are always ionic", "They have no ligands"], "The absorbed wavelength is removed; the complementary colour is seen.", src),
      (rng) => mcq(rng, "Which property makes transition metals good catalysts?", "They can change oxidation state and provide surfaces", ["They have full d subshells only", "They are always gases", "They cannot form complexes"], "Variable oxidation states and surface adsorption help catalysis.", src),
      (rng) => mcq(rng, "Which ion is diamagnetic?", "Zn²⁺", ["Fe²⁺", "Cu²⁺", "Mn²⁺"], "Zn²⁺ is 3d¹⁰ with all electrons paired.", src),
      (rng) => mcq(rng, "Which is a bidentate ligand?", "Ethane-1,2-diamine (en)", ["NH₃", "Cl⁻", "CN⁻"], "en has two nitrogen donor atoms.", src),
      (rng) => mcq(rng, "Which oxidation state is common for both Fe and Mn in their compounds?", "+2", ["+7 only", "+6 only", "+1 only"], "Fe²⁺ and Mn²⁺ are common; Mn also shows +7.", src)
    ];
    return build(c, gens);
  }

  function chapterP(c) {
    const src = sourceFor(c);
    const oxides = [
      ["Na₂O", "basic"], ["MgO", "basic"], ["Al₂O₃", "amphoteric"], ["SiO₂", "acidic"],
      ["P₄O₁₀", "acidic"], ["SO₂", "acidic"], ["SO₃", "acidic"], ["Cl₂O₇", "acidic"],
      ["CO₂", "acidic"], ["CaO", "basic"]
    ];
    const hydroxides = [
      ["NaOH", "strong base"], ["Mg(OH)₂", "weak base"], ["Al(OH)₃", "amphoteric"],
      ["H₂SiO₃", "weak acid"], ["H₃PO₄", "acid"], ["H₂SO₄", "strong acid"], ["HClO₄", "strong acid"]
    ];
    const chlorides = [
      ["NaCl", "neutral"], ["MgCl₂", "slightly acidic"], ["AlCl₃", "acidic"],
      ["SiCl₄", "acidic"], ["PCl₅", "acidic"], ["S₂Cl₂", "acidic"], ["Cl₂", "acidic"]
    ];
    const oxideWater = [["Na₂O", "NaOH"], ["MgO", "Mg(OH)₂ (slight)"], ["Al₂O₃", "no reaction"], ["SiO₂", "no reaction"], ["P₄O₁₀", "H₃PO₄"], ["SO₂", "H₂SO₃"], ["SO₃", "H₂SO₄"], ["Cl₂O₇", "HClO₄"]];
    const chlorideHydrolysis = [["NaCl", "neutral solution"], ["MgCl₂", "slightly acidic solution"], ["AlCl₃", "acidic solution and HCl fumes"], ["SiCl₄", "SiO₂ and HCl fumes"], ["PCl₅", "H₃PO₄ and HCl fumes"], ["SOCl₂", "SO₂ and HCl fumes"], ["Cl₂", "HCl and HClO"]];
    const thermalPairs = [["MgCO₃", "BaCO₃"], ["CaCO₃", "SrCO₃"], ["BeCO₃", "MgCO₃"], ["Mg(NO₃)₂", "Ba(NO₃)₂"], ["Ca(NO₃)₂", "Sr(NO₃)₂"], ["MgCO₃", "CaCO₃"], ["SrCO₃", "BaCO₃"], ["BeCO₃", "CaCO₃"], ["Mg(NO₃)₂", "Ca(NO₃)₂"], ["CaCO₃", "BaCO₃"]];
    const solubilityPairs = [["Mg(OH)₂", "Ba(OH)₂"], ["Ca(OH)₂", "Sr(OH)₂"], ["MgSO₄", "BaSO₄"], ["CaSO₄", "BaSO₄"], ["SrSO₄", "BaSO₄"], ["MgSO₄", "CaSO₄"], ["Be(OH)₂", "Mg(OH)₂"], ["Ca(OH)₂", "Ba(OH)₂"], ["MgSO₄", "SrSO₄"], ["CaSO₄", "SrSO₄"]];
    const uses = [["Mg(OH)₂", "antacid"], ["MgSO₄", "Epsom salts / magnesium supplement"], ["CaCO₃", "limestone / cement"], ["CaSO₄", "plaster of Paris"], ["BaSO₄", "barium meal X-ray"], ["CaO", "quicklime / drying agent"]];
    const melting = [["NaCl", "ionic lattice, high m.p."], ["MgO", "ionic lattice, very high m.p."], ["Al₂O₃", "ionic/covalent network, very high m.p."], ["SiO₂", "giant covalent, high m.p."], ["P₄O₁₀", "simple molecular, low m.p."], ["SO₂", "simple molecular, low m.p."], ["Cl₂", "simple molecular, low m.p."], ["Ar", "monatomic, very low m.p."]];
    const oxideReaction = [["Na₂O", "HCl", "NaCl + H₂O"], ["MgO", "HCl", "MgCl₂ + H₂O"], ["Al₂O₃", "HCl", "AlCl₃ + H₂O"], ["Al₂O₃", "NaOH", "NaAlO₂ + H₂O"], ["SiO₂", "NaOH", "Na₂SiO₃ + H₂O"], ["SO₂", "NaOH", "Na₂SO₃ + H₂O"], ["SO₃", "NaOH", "Na₂SO₄ + H₂O"], ["CO₂", "NaOH", "Na₂CO₃ + H₂O"]];
    const hydroxideReaction = [["NaOH", "acid"], ["Mg(OH)₂", "acid"], ["Al(OH)₃", "both acid and base"], ["H₂SiO₃", "base"], ["H₃PO₄", "base"], ["H₂SO₄", "base"], ["HClO₄", "base"]];
    const period3Mp = [["Na", 98], ["Mg", 650], ["Al", 660], ["Si", 1414], ["P", 44], ["S", 115], ["Cl", -101], ["Ar", -189]];
    const gens = [
      (rng, i) => { const [oxide, reagent, product] = oxideReaction[i % oxideReaction.length]; return mcq(rng, `What is the product when ${oxide} reacts with ${reagent}?`, product, ["NaCl + H₂O", "Na₂SO₄ + H₂O", "no reaction"].filter((x) => x !== product), "Basic oxides react with acids; acidic oxides react with bases; amphoteric oxides react with both.", src); },
      (rng, i) => { const [hydroxide, type] = hydroxideReaction[i % hydroxideReaction.length]; return mcq(rng, `Does ${hydroxide} react with an acid, a base, or both?`, type, ["acid", "base", "both acid and base"].filter((x) => x !== type), "Metal hydroxides are basic; non-metal hydroxides are acidic; Al(OH)₃ is amphoteric.", src); },
      (rng) => { const set = shuffle(rng, period3Mp).slice(0, 3); const sorted = set.slice().sort((a, b) => b[1] - a[1]); return mcq(rng, `Which order shows decreasing melting point: ${set.map((x) => x[0]).join(", ")}?`, sorted.map((x) => x[0]).join(" > "), [set.map((x) => x[0]).join(" > "), sorted.slice().reverse().map((x) => x[0]).join(" > "), set.slice().reverse().map((x) => x[0]).join(" > ")], "Melting point depends on structure and bonding across Period 3.", src); },
      (rng, i) => { const [oxide, product] = oxideWater[i % oxideWater.length]; return mcq(rng, `What is formed when ${oxide} reacts with water?`, product, ["NaOH", "H₂SO₄", "no reaction", "HCl"].filter((x) => x !== product), "Period 3 oxides range from basic to acidic.", src); },
      (rng, i) => { const [chloride, product] = chlorideHydrolysis[i % chlorideHydrolysis.length]; return mcq(rng, `What is the approximate behaviour of ${chloride} in water?`, product, ["neutral solution", "acidic solution and HCl fumes", "alkaline solution"].filter((x) => x !== product), "Covalent chlorides hydrolyse; ionic chlorides simply dissolve.", src); },
      (rng, i) => { const [a, b] = thermalPairs[i % thermalPairs.length]; return mcq(rng, `Which is more thermally stable: ${a} or ${b}?`, b, [a, "They are equal", "Cannot be determined"], "Thermal stability increases down Group 2.", src); },
      (rng, i) => { const [a, b] = solubilityPairs[i % solubilityPairs.length]; const answer = a.includes("SO₄") ? a : b; return mcq(rng, `Which is more soluble in water: ${a} or ${b}?`, answer, [answer === a ? b : a, "They are equal", "Neither is soluble"], "Hydroxides become more soluble down Group 2; sulfates become less soluble.", src); },
      (rng, i) => { const [compound, use] = uses[i % uses.length]; return mcq(rng, `What is a common use of ${compound}?`, use, ["antacid", "Epsom salts", "cement", "barium meal"].filter((x) => x !== use), "Recall the everyday/medical uses of Group 2 compounds.", src); },
      (rng, i) => { const [sub, property] = melting[i % melting.length]; return mcq(rng, `Which description best fits the structure and melting point of ${sub}?`, property, ["simple molecular, low m.p.", "giant covalent, high m.p.", "ionic lattice, high m.p."].filter((x) => x !== property), "Structure determines melting point.", src); },
      (rng) => mcq(rng, "Why is BeCl₂ covalent?", "Be²⁺ is small and highly polarising", ["Be is a non-metal", "Be has a full d subshell", "BeCl₂ is ionic"], "High polarising power gives covalent character.", src),
      (rng) => mcq(rng, "Which oxide is amphoteric?", "Al₂O₃", ["Na₂O", "MgO", "SO₂"], "Al₂O₃ reacts with both acids and bases.", src),
      (rng) => mcq(rng, "Which hydroxide is amphoteric?", "Al(OH)₃", ["NaOH", "Mg(OH)₂", "H₂SO₄"], "Al(OH)₃ reacts with acids and alkalis.", src),
      (rng) => mcq(rng, "Which Period 3 oxide is basic?", "Na₂O", ["SO₂", "CO₂", "Cl₂O₇"], "Metal oxides on the left are basic.", src),
      (rng) => mcq(rng, "Which Period 3 chloride hydrolyses to SiO₂ and HCl?", "SiCl₄", ["NaCl", "MgCl₂", "Cl₂"], "Silicon tetrachloride hydrolyses to silicon dioxide and hydrogen chloride.", src),
      (rng, i) => { const [oxide, type] = oxides[i % oxides.length]; return mcq(rng, `Is ${oxide} acidic, basic or amphoteric?`, type, ["acidic", "basic", "amphoteric"].filter((t) => t !== type), "Acid–base character changes across Period 3.", src); },
      (rng, i) => { const [hydroxide, type] = hydroxides[i % hydroxides.length]; return mcq(rng, `Is ${hydroxide} a base, an acid or amphoteric?`, type, ["strong base", "weak base", "amphoteric", "acid"].filter((t) => t !== type), "Use the metal character and oxidation state.", src); },
      (rng, i) => { const [chloride, type] = chlorides[i % chlorides.length]; return mcq(rng, `What is the approximate pH of aqueous ${chloride}?`, type, ["neutral", "slightly acidic", "acidic", "alkaline"].filter((t) => t !== type), "Covalent chlorides hydrolyse to acidic solutions.", src); },
      (rng) => { const [a, b] = pick(rng, [["MgCO₃", "BaCO₃"], ["CaCO₃", "SrCO₃"], ["BeCO₃", "MgCO₃"]]); return mcq(rng, `Which carbonate is more thermally stable: ${a} or ${b}?`, b, [a, "They are equal", "Cannot be determined"], "Thermal stability increases down Group 2.", src); },
      (rng) => { const [a, b] = pick(rng, [["Mg(OH)₂", "Ba(OH)₂"], ["Ca(OH)₂", "Sr(OH)₂"], ["MgSO₄", "BaSO₄"]]); return mcq(rng, `Which is more soluble in water: ${a} or ${b}?`, a.includes("SO₄") ? a : b, [a.includes("SO₄") ? b : a, "They are equal", "Neither is soluble"], "Hydroxide solubility increases down Group 2; sulfate solubility decreases.", src); },
      (rng) => mcq(rng, "Why is BeCl₂ covalent?", "Be²⁺ is very small and strongly polarising", ["Be is a non-metal", "Be has a full d subshell", "BeCl₂ is ionic"], "High polarising power distorts the anion and gives covalent character.", src),
      (rng) => mcq(rng, "Which is the anomalous Group 2 element?", "Be", ["Mg", "Ca", "Ba"], "Beryllium forms largely covalent compounds.", src),
      (rng) => mcq(rng, "Why does SiCl₄ fume in moist air?", "It hydrolyses to HCl and SiO₂", ["It is ionic", "It is a base", "It does not react with water"], "Covalent chlorides hydrolyse vigorously.", src),
      (rng) => mcq(rng, "Which oxide is amphoteric?", "Al₂O₃", ["Na₂O", "MgO", "SO₂"], "Al₂O₃ reacts with both acids and bases.", src),
      (rng) => mcq(rng, "Which Group 2 compound is used to treat magnesium deficiency?", "MgSO₄", ["BaSO₄", "CaCO₃", "NaCl"], "Magnesium sulfate is used medicinally.", src)
    ];
    return build(c, gens);
  }

  /* ---------------- builder ---------------- */

  function build(chapter, generators, target = 100) {
    const rng = lcg([...chapter.code].reduce((a, ch) => a + ch.charCodeAt(0), 17) * 7919);
    const out = [];
    const seen = new Set();
    const counters = generators.map(() => 0);
    let i = 0;
    let attempts = 0;
    while (out.length < target && attempts < target * 300) {
      const gi = i % generators.length;
      const gen = generators[gi];
      const q = gen(rng, counters[gi]++);
      i += 1;
      attempts += 1;
      if (!q || !Array.isArray(q.options) || q.options.length !== 4) continue;
      if (typeof q.answer !== "number" || q.answer < 0 || q.answer >= 4) continue;
      const key = norm(q.question);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ ...q, id: `${chapter.code}-${out.length + 1}`, chapter: chapter.code });
    }
    if (out.length < target) throw new Error(`${chapter.code}: only generated ${out.length} questions`);
    return out;
  }

  /* ---------------- attach ---------------- */

  EXP.chapters.forEach((chapter) => {
    const builders = { A: chapterA, B: chapterB, C: chapterC, D: chapterD, E: chapterE, F: chapterF, G1: chapterG1, G2: chapterG2, H: chapterH, I: chapterI, J: chapterJ, K: chapterK, L1: chapterL1, L2: chapterL2, M: chapterM, P: chapterP };
    if (builders[chapter.code]) chapter.questions = builders[chapter.code](chapter);
  });
})();
