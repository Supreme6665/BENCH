/* BENCH — Physical & Inorganic expansion (documents A–P).
   Tutorial content for every chapter. Question banks are generated from
   chapter-specific templates in expansion-questions.js. */

(() => {
  const S = (title, body, example) => ({ title, body: Array.isArray(body) ? body : [body], example });

  const chapters = [
    {
      id: "A", code: "A", title: "Mole Concept", subtitle: "Amount of substance · formulae · yield",
      sections: [
        S("The mole and Avogadro's constant", [
          "One mole contains 6.02 × 10²³ particles. The number of particles, amount and Avogadro constant are linked by n = N / N_A.",
          "Molar mass is the mass of one mole in g mol⁻¹; numerically it equals A_r or M_r."
        ], { prompt: "How many molecules are in 0.25 mol of CO₂?", answer: "1.505 × 10²³", explanation: "N = nN_A = 0.25 × 6.02 × 10²³." }),
        S("Mass, gas volume and molar volume", [
          "n = m / M. At room temperature and pressure, one mole of gas occupies about 24 dm³; at s.t.p. it occupies 22.4 dm³.",
          "These relationships convert between mass, moles, particles and gas volume."
        ], { prompt: "What volume does 0.50 mol of gas occupy at r.t.p.?", answer: "12 dm³", explanation: "V = n × 24 = 0.50 × 24." }),
        S("Empirical and molecular formulae", [
          "An empirical formula is the simplest whole-number ratio of atoms. A molecular formula is a whole-number multiple of it.",
          "Percentage composition and combustion data are used to find the empirical formula; M_r then gives the molecular formula."
        ], { prompt: "A compound is 40% C, 6.7% H and 53.3% O by mass. What is its empirical formula?", answer: "CH₂O", explanation: "Divide each percentage by A_r: C 3.33, H 6.7, O 3.33 → ratio 1:2:1." }),
        S("Reacting masses and limiting reagents", [
          "Use the balanced equation to convert moles of one substance to moles of another.",
          "The limiting reagent is the reactant that is used up first; it determines the maximum amount of product."
        ], { prompt: "2 mol H₂ reacts with 1 mol O₂. Which is limiting if you have 3 mol H₂ and 2 mol O₂?", answer: "H₂", explanation: "3 mol H₂ needs 1.5 mol O₂; O₂ is in excess, so H₂ limits." }),
        S("Concentration, dilution, yield and purity", [
          "Concentration c = n / V, with V in dm³. Dilution obeys c₁V₁ = c₂V₂.",
          "Percentage yield = actual / theoretical × 100. Percentage purity = mass of pure substance / mass of sample × 100."
        ], { prompt: "20.0 cm³ of 0.100 mol dm⁻³ HCl is diluted to 100 cm³. What is the new concentration?", answer: "0.0200 mol dm⁻³", explanation: "c₂ = c₁V₁ / V₂ = 0.100 × 20 / 100." })
      ]
    },
    {
      id: "B", code: "B", title: "Volumetric Analysis", subtitle: "Redox · oxidation numbers · titrations",
      sections: [
        S("Oxidation numbers", [
          "Oxidation number tracks the apparent charge on an atom. Elements have O.N. 0; oxygen is usually –2; hydrogen is +1 with non-metals and –1 with metals.",
          "The sum of oxidation numbers equals the overall charge on the species."
        ], { prompt: "What is the oxidation number of Mn in MnO₄⁻?", answer: "+7", explanation: "x + 4(–2) = –1, so x = +7." }),
        S("Oxidation and reduction", [
          "Oxidation is an increase in oxidation number (loss of electrons); reduction is a decrease (gain of electrons).",
          "An oxidising agent is reduced; a reducing agent is oxidised."
        ], { prompt: "In Zn + Cu²⁺ → Zn²⁺ + Cu, which species is oxidised?", answer: "Zn", explanation: "Zn goes from 0 to +2, so it loses electrons and is oxidised." }),
        S("Balancing redox equations", [
          "Split the reaction into half-equations, balance atoms, balance oxygen with H₂O, balance hydrogen with H⁺, then balance charge with electrons.",
          "Multiply the half-equations so the electrons cancel, then add them."
        ], { prompt: "How many electrons are gained when MnO₄⁻ is reduced to Mn²⁺ in acid?", answer: "5", explanation: "Mn goes from +7 to +2, a change of 5." }),
        S("Manganate(VII) titrations", [
          "Acidified KMnO₄ is a strong oxidant and its purple colour acts as its own indicator.",
          "In acid, MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O. One MnO₄⁻ oxidises five Fe²⁺ ions."
        ], { prompt: "25.0 cm³ of 0.0200 mol dm⁻³ KMnO₄ reacts with Fe²⁺. What amount of Fe²⁺ reacts?", answer: "2.50 × 10⁻³ mol", explanation: "n(MnO₄⁻)=0.0200×0.0250=5.00×10⁻⁴ mol; ×5 = 2.50×10⁻³ mol." }),
        S("Iodine–thiosulfate titrations", [
          "Iodine is titrated with sodium thiosulfate: I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻.",
          "Starch is added near the endpoint; the blue-black colour disappears at the end."
        ], { prompt: "1 mol of I₂ reacts with how many moles of S₂O₃²⁻?", answer: "2 mol", explanation: "The balanced equation has a 1:2 ratio." })
      ]
    },
    {
      id: "C", code: "C", title: "Atomic Structure", subtitle: "Subatomic particles · isotopes · orbitals",
      sections: [
        S("Protons, neutrons and electrons", [
          "The proton number Z gives the element; the nucleon number A is protons + neutrons. Atoms are neutral, so electrons = protons.",
          "Ions have extra or missing electrons; the proton and neutron numbers do not change."
        ], { prompt: "How many neutrons are in ³⁷Cl?", answer: "20", explanation: "A – Z = 37 – 17 = 20." }),
        S("Isotopes and relative atomic mass", [
          "Isotopes have the same proton number but different neutron numbers.",
          "Relative atomic mass is the weighted mean of isotopic masses using relative abundances."
        ], { prompt: "An element is 75% isotope 35 and 25% isotope 37. What is A_r?", answer: "35.5", explanation: "(0.75×35)+(0.25×37)=35.5." }),
        S("Electronic configuration", [
          "Electrons fill orbitals in order of increasing energy: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p.",
          "Hund's rule and the Pauli exclusion principle determine the arrangement within subshells."
        ], { prompt: "What is the electronic configuration of Mg (Z = 12)?", answer: "1s² 2s² 2p⁶ 3s²", explanation: "Twelve electrons fill 1s, 2s, 2p and 3s." }),
        S("Ionisation energy", [
          "First ionisation energy is the energy needed to remove one mole of electrons from one mole of gaseous atoms.",
          "Successive ionisation energies jump when a new shell is broken into; this reveals the shell structure."
        ], { prompt: "Why is the first ionisation energy of Mg higher than that of Na?", answer: "Mg has a greater nuclear charge with the same shielding, so the outer electron is held more strongly.", explanation: "Across Period 3, effective nuclear attraction increases." }),
        S("Atomic models and orbitals", [
          "An orbital is a region of space where an electron is likely to be found. s, p and d orbitals have different shapes.",
          "The quantum model replaces definite orbits with probability distributions."
        ], { prompt: "How many electrons can a p subshell hold?", answer: "6", explanation: "Three p orbitals, each holding two electrons." })
      ]
    },
    {
      id: "D", code: "D", title: "Physical Periodicity", subtitle: "Nuclear charge · radius · ionisation energy",
      sections: [
        S("Nuclear charge and shielding", [
          "Effective nuclear attraction depends on nuclear charge and shielding by inner electrons.",
          "Across a period, nuclear charge increases while shielding stays similar, so the outer electrons are pulled closer."
        ], { prompt: "Why does atomic radius decrease across Period 3?", answer: "Nuclear charge increases while shielding is similar, so the outer shell is pulled closer.", explanation: "Effective nuclear attraction increases." }),
        S("Atomic radius", [
          "Atomic radius decreases across a period and increases down a group.",
          "Down a group, a new shell is added and shielding increases, outweighing the increase in nuclear charge."
        ], { prompt: "Which is larger: Na or Mg?", answer: "Na", explanation: "Mg has a greater nuclear charge with the same shell, so it is smaller." }),
        S("Ionic radius and isoelectronic species", [
          "Cations are smaller than their parent atoms; anions are larger.",
          "For isoelectronic species, the one with the greatest nuclear charge is smallest."
        ], { prompt: "Which is smaller: Na⁺ or F⁻?", answer: "Na⁺", explanation: "Both have 10 electrons; Na has the greater nuclear charge." }),
        S("Ionisation energy trends", [
          "First ionisation energy generally increases across a period and decreases down a group.",
          "Exceptions occur at group boundaries and where a half-filled or full subshell is involved."
        ], { prompt: "Which has the higher first ionisation energy: Na or Mg?", answer: "Mg", explanation: "Mg has a greater effective nuclear charge." }),
        S("Electronegativity and electron affinity", [
          "Electronegativity increases across a period and decreases down a group.",
          "Electron affinity is the enthalpy change when an electron is added to a gaseous atom."
        ], { prompt: "Which is more electronegative: Cl or Br?", answer: "Cl", explanation: "Electronegativity decreases down a group." })
      ]
    },
    {
      id: "E", code: "E", title: "Gases", subtitle: "Gas laws · ideal gas · partial pressures",
      sections: [
        S("The gas laws", [
          "Boyle's law: PV = constant at constant T. Charles's law: V/T = constant at constant P.",
          "The combined gas law is P₁V₁/T₁ = P₂V₂/T₂; temperature must be in kelvin."
        ], { prompt: "A gas at 1.0 atm and 2.0 dm³ is compressed to 4.0 atm at constant T. What is the new volume?", answer: "0.50 dm³", explanation: "P₁V₁ = P₂V₂ → 1.0×2.0 = 4.0×V₂." }),
        S("The ideal gas equation", [
          "PV = nRT, with P in Pa, V in m³ and T in K. R = 8.31 J K⁻¹ mol⁻¹.",
          "At r.t.p., one mole occupies about 24 dm³; at s.t.p., 22.4 dm³."
        ], { prompt: "What is the volume of 2.0 mol of gas at 300 K and 1.0×10⁵ Pa?", answer: "0.0499 m³", explanation: "V=nRT/P=2.0×8.31×300/1.0×10⁵." }),
        S("Molar mass and gas density", [
          "Rearranging PV = nRT gives M = mRT / PV.",
          "Gas density ρ = m/V, so M = ρRT/P."
        ], { prompt: "0.44 g of a gas occupies 240 cm³ at r.t.p. What is its molar mass?", answer: "44 g mol⁻¹", explanation: "n=0.240/24=0.010 mol; M=0.44/0.010=44." }),
        S("Partial pressures and mole fraction", [
          "Dalton's law: total pressure is the sum of partial pressures.",
          "Partial pressure = mole fraction × total pressure."
        ], { prompt: "A mixture has 0.20 mol N₂ and 0.30 mol O₂ at 1.0 atm. What is the partial pressure of N₂?", answer: "0.40 atm", explanation: "Mole fraction N₂ = 0.20/0.50 = 0.40; P=0.40×1.0." }),
        S("Kinetic theory and real gases", [
          "The kinetic theory assumes point particles, no intermolecular forces and elastic collisions.",
          "Real gases deviate most at high pressure and low temperature, where attractions and molecular volume matter."
        ], { prompt: "Why does a real gas deviate from ideal behaviour at high pressure?", answer: "Intermolecular attractions and the finite volume of molecules become significant.", explanation: "The ideal model ignores both." })
      ]
    },
    {
      id: "F", code: "F", title: "Chemical Bonding", subtitle: "Ionic · covalent · VSEPR · intermolecular forces",
      sections: [
        S("Types of bonding", [
          "Metallic bonding involves a lattice of cations in a sea of delocalised electrons. Ionic bonding is electrostatic attraction between ions. Covalent bonding shares electron pairs.",
          "The type of bonding determines melting point, conductivity and solubility."
        ], { prompt: "Why does NaCl conduct electricity when molten but not when solid?", answer: "Molten NaCl has mobile ions; in the solid lattice the ions are fixed.", explanation: "Conduction requires mobile charge carriers." }),
        S("Ionic bonding and lattice energy", [
          "Lattice energy becomes more exothermic with higher ionic charges and smaller ionic radii.",
          "Born–Haber cycles connect lattice energy to formation, atomisation, ionisation and electron affinity."
        ], { prompt: "Which has the more exothermic lattice energy: MgO or NaCl?", answer: "MgO", explanation: "Mg²⁺/O²⁻ have higher charges and smaller radii than Na⁺/Cl⁻." }),
        S("VSEPR shapes", [
          "Electron pairs repel and arrange themselves as far apart as possible. Lone pairs repel more strongly than bonding pairs.",
          "Common shapes: linear, trigonal planar, tetrahedral, trigonal pyramidal, bent, trigonal bipyramidal and octahedral."
        ], { prompt: "What is the shape of NH₃?", answer: "Trigonal pyramidal", explanation: "Three bonding pairs and one lone pair on N give a trigonal pyramidal shape." }),
        S("Polarity and intermolecular forces", [
          "A molecule is polar if its bond dipoles do not cancel. Symmetrical molecules can be non-polar despite polar bonds.",
          "Intermolecular forces increase: instantaneous dipole–induced dipole < permanent dipole–permanent dipole < hydrogen bonding."
        ], { prompt: "Which has the stronger intermolecular forces: H₂O or H₂S?", answer: "H₂O", explanation: "Water forms hydrogen bonds; H₂S has weaker dipole–dipole forces." }),
        S("Giant covalent and metallic structures", [
          "Diamond, graphite and silicon dioxide are giant covalent structures with high melting points.",
          "Graphite conducts because each carbon has a delocalised electron; diamond does not."
        ], { prompt: "Why does graphite conduct electricity?", answer: "Each carbon is bonded to three others, leaving a delocalised electron.", explanation: "The delocalised electrons are mobile." })
      ]
    },
    {
      id: "G1", code: "G1", title: "Energetics", subtitle: "Enthalpy · Hess law · bond energy",
      sections: [
        S("Enthalpy change", [
          "ΔH is the heat change at constant pressure. Exothermic reactions release heat (ΔH negative); endothermic reactions absorb heat (ΔH positive).",
          "Standard conditions are 298 K and 1 bar, with all substances in their standard states."
        ], { prompt: "Is combustion exothermic or endothermic?", answer: "Exothermic", explanation: "Combustion releases heat, so ΔH is negative." }),
        S("Standard enthalpy definitions", [
          "ΔH_f° is the enthalpy change when one mole of a compound forms from its elements in standard states.",
          "ΔH_c° is complete combustion of one mole of a substance; ΔH_neut° is neutralisation of one mole of water."
        ], { prompt: "What is the standard enthalpy of formation of an element in its standard state?", answer: "0", explanation: "No change is involved in forming the element from itself." }),
        S("Calorimetry", [
          "Heat exchanged q = mcΔT, where m is the mass of solution and c is its specific heat capacity.",
          "For aqueous solutions, c ≈ 4.18 J g⁻¹ K⁻¹. Divide q by moles to get ΔH."
        ], { prompt: "50.0 g of water rises by 6.0 K. How much heat is absorbed? (c = 4.18)", answer: "1254 J", explanation: "q = 50.0 × 4.18 × 6.0." }),
        S("Hess's law", [
          "The enthalpy change of a reaction is independent of the route.",
          "Use formation enthalpies: ΔH = ΣΔH_f(products) – ΣΔH_f(reactants)."
        ], { prompt: "If a route has ΔH₁ = –200 kJ and ΔH₂ = +50 kJ, what is the direct ΔH?", answer: "–150 kJ", explanation: "Hess's law adds the steps: –200 + 50." }),
        S("Bond energy and lattice energy", [
          "ΔH = bonds broken – bonds formed. Bond breaking is endothermic; bond forming is exothermic.",
          "Lattice energy is the enthalpy change when one mole of an ionic solid forms from gaseous ions."
        ], { prompt: "Breaking bonds is...?", answer: "Endothermic", explanation: "Energy is required to break a bond." })
      ]
    },
    {
      id: "G2", code: "G2", title: "Thermodynamics", subtitle: "Entropy · Gibbs free energy · spontaneity",
      sections: [
        S("Spontaneous change", [
          "A spontaneous change occurs without continuous external work. It may still be slow if the activation energy is high.",
          "Spontaneity depends on both enthalpy and entropy."
        ], { prompt: "Is a spontaneous reaction always fast?", answer: "No", explanation: "Thermodynamics says whether a reaction can occur; kinetics says how fast." }),
        S("Entropy", [
          "Entropy is a measure of disorder or the number of ways energy can be distributed.",
          "ΔS is positive when gas moles increase, a solid melts or a liquid boils, or temperature rises."
        ], { prompt: "Does ice melting have a positive or negative ΔS?", answer: "Positive", explanation: "Liquid water is more disordered than ice." }),
        S("Gibbs free energy", [
          "ΔG = ΔH – TΔS. A reaction is spontaneous when ΔG < 0.",
          "ΔG = 0 at equilibrium."
        ], { prompt: "If ΔH = –100 kJ and TΔS = –20 kJ, what is ΔG?", answer: "–80 kJ", explanation: "ΔG = –100 – (–20) = –80 kJ." }),
        S("Temperature and spontaneity", [
          "When ΔH and ΔS have opposite signs, temperature determines spontaneity.",
          "The threshold is T = ΔH / ΔS; above or below it, the sign of ΔG changes."
        ], { prompt: "For an endothermic reaction with positive ΔS, is it spontaneous at high or low T?", answer: "High T", explanation: "TΔS becomes large enough to make ΔG negative." }),
        S("Feasibility versus rate", [
          "A negative ΔG means thermodynamic feasibility, not a guaranteed fast reaction.",
          "Diamond → graphite is thermodynamically favourable but kinetically extremely slow."
        ], { prompt: "What does a negative ΔG predict?", answer: "The reaction is thermodynamically feasible.", explanation: "It does not predict the rate." })
      ]
    },
    {
      id: "H", code: "H", title: "Kinetics", subtitle: "Rates · orders · collision theory · catalysis",
      sections: [
        S("Measuring rate", [
          "Rate is the change in concentration per unit time. Average rate uses a time interval; instantaneous rate is the tangent to the curve.",
          "Rate can be followed by gas volume, mass loss, colour or titration."
        ], { prompt: "A concentration falls from 0.80 to 0.40 mol dm⁻³ in 20 s. What is the average rate?", answer: "0.020 mol dm⁻³ s⁻¹", explanation: "(0.80–0.40)/20." }),
        S("Collision theory", [
          "Particles must collide with at least the activation energy and the correct orientation.",
          "Most collisions are unsuccessful; only a small fraction have enough energy."
        ], { prompt: "Why does a small temperature increase greatly increase rate?", answer: "A much larger fraction of molecules has energy above E_a.", explanation: "The Boltzmann distribution shifts towards higher energies." }),
        S("Factors affecting rate", [
          "Increasing concentration or pressure increases collision frequency. Increasing surface area helps heterogeneous reactions.",
          "Catalysts provide an alternative pathway with lower activation energy."
        ], { prompt: "How does a catalyst increase rate?", answer: "It lowers the activation energy.", explanation: "More collisions now have enough energy." }),
        S("Rate equations and order", [
          "Rate = k[A]^m[B]^n. The order with respect to each reactant is determined experimentally.",
          "The overall order is m + n. The units of k depend on the overall order."
        ], { prompt: "For rate = k[A]², what is the overall order?", answer: "2", explanation: "The exponent on A is 2." }),
        S("Mechanisms and rate-determining step", [
          "The rate equation reflects the species involved up to and including the rate-determining step.",
          "A catalyst may appear in the rate equation if it is involved before the slow step."
        ], { prompt: "Which step controls the overall rate?", answer: "The slowest step", explanation: "It is the rate-determining step." })
      ]
    },
    {
      id: "I", code: "I", title: "Chemical Equilibrium", subtitle: "Kc · Kp · Le Chatelier · industrial equilibria",
      sections: [
        S("Dynamic equilibrium", [
          "At equilibrium, forward and reverse rates are equal and concentrations remain constant.",
          "The reaction has not stopped; both directions continue at the same rate."
        ], { prompt: "At equilibrium, are the rates of forward and reverse reactions equal?", answer: "Yes", explanation: "That is the definition of dynamic equilibrium." }),
        S("Equilibrium constants", [
          "For aA + bB ⇌ cC + dD, Kc = [C]^c[D]^d / [A]^a[B]^b.",
          "Kp uses partial pressures instead of concentrations. Solids and pure liquids are omitted."
        ], { prompt: "Write Kc for H₂ + I₂ ⇌ 2HI.", answer: "Kc = [HI]² / ([H₂][I₂])", explanation: "Products over reactants, each raised to its coefficient." }),
        S("Calculating K and ICE tables", [
          "Set up initial, change and equilibrium amounts. Use the stoichiometric ratio for the change.",
          "Substitute equilibrium concentrations into the Kc expression."
        ], { prompt: "If Kc is large, does equilibrium favour products or reactants?", answer: "Products", explanation: "A large Kc means products dominate." }),
        S("Le Chatelier's principle", [
          "If a system at equilibrium is disturbed, the position shifts to oppose the change.",
          "Adding reactant shifts right; increasing pressure shifts towards fewer gas moles; changing temperature changes K itself."
        ], { prompt: "Which direction does the Haber equilibrium shift when pressure increases?", answer: "Towards NH₃ (fewer gas moles)", explanation: "N₂ + 3H₂ ⇌ 2NH₃: 4 gas moles → 2." }),
        S("Industrial equilibria", [
          "Haber process: N₂ + 3H₂ ⇌ 2NH₃, exothermic, favoured by high pressure and moderate temperature with an iron catalyst.",
          "Contact process: 2SO₂ + O₂ ⇌ 2SO₃, favoured by high pressure and moderate temperature with V₂O₅."
        ], { prompt: "Why is the Haber process not run at very high temperature?", answer: "The forward reaction is exothermic, so high temperature lowers yield.", explanation: "A compromise temperature is used for rate and yield." })
      ]
    },
    {
      id: "J", code: "J", title: "Acid–Base Equilibrium", subtitle: "Ka · Kw · pH · buffers · salt hydrolysis",
      sections: [
        S("Brønsted–Lowry acids and bases", [
          "An acid donates a proton; a base accepts a proton. A conjugate acid–base pair differs by one H⁺.",
          "Strong acids dissociate completely; weak acids dissociate partially."
        ], { prompt: "What is the conjugate base of CH₃COOH?", answer: "CH₃COO⁻", explanation: "Remove one H⁺." }),
        S("Ka, pKa and acid strength", [
          "For HA ⇌ H⁺ + A⁻, Ka = [H⁺][A⁻]/[HA]. A larger Ka means a stronger acid.",
          "pKa = –log₁₀Ka; a smaller pKa means a stronger acid."
        ], { prompt: "Which is the stronger acid: one with pKa 3 or one with pKa 5?", answer: "pKa 3", explanation: "A smaller pKa means a larger Ka." }),
        S("Kw, pH and pOH", [
          "Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 25 °C. pH = –log[H⁺] and pH + pOH = 14.",
          "For a strong acid, [H⁺] equals the acid concentration (one H⁺ per molecule)."
        ], { prompt: "What is the pH of 0.010 mol dm⁻³ HCl?", answer: "2.00", explanation: "pH = –log(0.010)=2.00." }),
        S("Salt hydrolysis", [
          "Salts of weak acids and strong bases give alkaline solutions; salts of strong acids and weak bases give acidic solutions.",
          "Salts of strong acids and strong bases are neutral."
        ], { prompt: "Is aqueous sodium ethanoate acidic, neutral or alkaline?", answer: "Alkaline", explanation: "The ethanoate ion hydrolyses to produce OH⁻." }),
        S("Buffers and titration curves", [
          "A buffer resists pH change when small amounts of acid or base are added. It contains a weak acid and its conjugate base.",
          "The buffer pH is given by pH = pKa + log([A⁻]/[HA])."
        ], { prompt: "What two components make an acidic buffer?", answer: "A weak acid and its conjugate base", explanation: "For example, CH₃COOH and CH₃COO⁻." })
      ]
    },
    {
      id: "K", code: "K", title: "Solubility Equilibrium", subtitle: "Ksp · molar solubility · common ion effect",
      sections: [
        S("Saturated solutions and solubility", [
          "A saturated solution is in equilibrium with undissolved solid. Solubility is the maximum amount that dissolves at a given temperature.",
          "Solubility can be expressed in g dm⁻³ or mol dm⁻³."
        ], { prompt: "What is the equilibrium in a saturated solution of AgCl?", answer: "AgCl(s) ⇌ Ag⁺(aq) + Cl⁻(aq)", explanation: "The solid is in equilibrium with its ions." }),
        S("The solubility product", [
          "For A_xB_y(s) ⇌ xA^m+ + yB^n−, Ksp = [A]^x[B]^y.",
          "Ksp is constant at a fixed temperature; it does not include the solid."
        ], { prompt: "Write Ksp for PbCl₂.", answer: "Ksp = [Pb²⁺][Cl⁻]²", explanation: "The solid is omitted and the chloride concentration is squared." }),
        S("Calculating molar solubility", [
          "If s mol dm⁻³ dissolves, the ion concentrations are expressed in terms of s.",
          "Substitute into Ksp and solve for s. For AB, Ksp = s²; for AB₂, Ksp = 4s³."
        ], { prompt: "For AgCl, Ksp = 2.0 × 10⁻¹⁰. What is s?", answer: "1.4 × 10⁻⁵ mol dm⁻³", explanation: "s = √(2.0×10⁻¹⁰)." }),
        S("Common ion effect", [
          "Adding a common ion shifts the dissolution equilibrium left, reducing solubility.",
          "The Ksp expression still holds; the added ion concentration is included."
        ], { prompt: "How does adding NaCl affect the solubility of AgCl?", answer: "It decreases it", explanation: "Cl⁻ is a common ion; equilibrium shifts left." }),
        S("Precipitation and Q versus Ksp", [
          "Calculate the reaction quotient Q using the current ion concentrations.",
          "If Q > Ksp, precipitation occurs; if Q < Ksp, the solution is unsaturated; if Q = Ksp, it is saturated."
        ], { prompt: "If Q > Ksp, what happens?", answer: "A precipitate forms", explanation: "The system is supersaturated and shifts towards solid." })
      ]
    },
    {
      id: "L1", code: "L1", title: "Electrochemical Cells", subtitle: "Electrode potentials · E°cell · batteries",
      sections: [
        S("Redox and electrode potentials", [
          "A galvanic cell converts chemical energy into electrical energy. Oxidation occurs at the anode; reduction at the cathode.",
          "Standard electrode potentials are measured relative to the standard hydrogen electrode."
        ], { prompt: "At which electrode does oxidation occur?", answer: "Anode", explanation: "Oxidation is loss of electrons at the anode." }),
        S("The standard hydrogen electrode", [
          "The SHE has E° = 0.00 V: Pt | H₂(g, 1 bar) | H⁺(aq, 1 mol dm⁻³).",
          "It is the reference against which other electrode potentials are measured."
        ], { prompt: "What is the standard potential of the hydrogen electrode?", answer: "0.00 V", explanation: "It is the reference by definition." }),
        S("Calculating E°cell", [
          "E°cell = E°cathode – E°anode. A positive E°cell means the reaction is feasible.",
          "The more positive electrode is the cathode."
        ], { prompt: "E°(Cu²⁺/Cu)=+0.34 V and E°(Zn²⁺/Zn)=–0.76 V. What is E°cell for Zn|Cu?", answer: "+1.10 V", explanation: "0.34 – (–0.76)=1.10 V." }),
        S("Cell diagrams and electron flow", [
          "Cell notation: anode | anode ion || cathode ion | cathode. Electrons flow from anode to cathode in the external circuit.",
          "The salt bridge maintains electrical neutrality."
        ], { prompt: "In Zn|Cu, which way do electrons flow?", answer: "From Zn to Cu", explanation: "Zn is oxidised at the anode and Cu²⁺ is reduced at the cathode." }),
        S("Batteries and fuel cells", [
          "Primary cells are not rechargeable; secondary cells are. Fuel cells continuously supply reactants.",
          "The hydrogen–oxygen fuel cell produces water and has a high energy density."
        ], { prompt: "What is the product of the hydrogen–oxygen fuel cell?", answer: "Water", explanation: "H₂ is oxidised and O₂ is reduced to water." })
      ]
    },
    {
      id: "L2", code: "L2", title: "Electrolytic Cells", subtitle: "Electrolysis · preferential discharge · Faraday",
      sections: [
        S("Electrolytic versus galvanic cells", [
          "Electrolysis uses an external power supply to drive a non-spontaneous reaction.",
          "Oxidation still occurs at the anode and reduction at the cathode."
        ], { prompt: "What is the anode reaction in electrolysis?", answer: "Oxidation", explanation: "Anions or the anode material lose electrons." }),
        S("Molten salts", [
          "In a molten salt, the ions are mobile. The cation is reduced at the cathode and the anion is oxidised at the anode.",
          "For molten NaCl, Na is produced at the cathode and Cl₂ at the anode."
        ], { prompt: "What is produced at the cathode when molten NaCl is electrolysed?", answer: "Sodium metal", explanation: "Na⁺ gains an electron." }),
        S("Aqueous solutions and preferential discharge", [
          "In aqueous solution, water competes with the ions. The species that is easier to oxidise or reduce is discharged.",
          "Concentration and electrode material affect the products."
        ], { prompt: "What is produced at the cathode when aqueous CuSO₄ is electrolysed with inert electrodes?", answer: "Copper metal", explanation: "Cu²⁺ is reduced in preference to water." }),
        S("Faraday calculations", [
          "Charge Q = It. Moles of electrons = Q/F, where F = 96500 C mol⁻¹.",
          "The mass deposited follows the stoichiometry of the electrode half-equation."
        ], { prompt: "How many moles of electrons pass when 9650 C flows?", answer: "0.100 mol", explanation: "n = Q/F = 9650/96500." }),
        S("Applications of electrolysis", [
          "Electrolysis is used for extraction, purification, electroplating and anodising.",
          "In copper purification, impure copper is the anode and pure copper is the cathode."
        ], { prompt: "Which electrode is impure copper in copper purification?", answer: "Anode", explanation: "The impure copper is oxidised and dissolves." })
      ]
    },
    {
      id: "M", code: "M", title: "Transition Metals", subtitle: "d-block · oxidation states · complexes · colour",
      sections: [
        S("What is a transition metal?", [
          "A transition metal is a d-block element that forms at least one ion with a partially filled d subshell.",
          "Scandium and zinc are d-block but not typical transition metals by this definition."
        ], { prompt: "Why is Zn not a typical transition metal?", answer: "Zn²⁺ has a full 3d subshell (3d¹⁰).", explanation: "It has no partially filled d orbitals in its common ion." }),
        S("Electron configurations", [
          "Transition metals fill 4s before 3d, but electrons are lost from 4s first when forming ions.",
          "Cr and Cu have anomalous configurations because half-filled or full subshells are more stable."
        ], { prompt: "What is the electron configuration of Fe³⁺?", answer: "[Ar] 3d⁵", explanation: "Fe is [Ar]3d⁶4s²; remove three electrons." }),
        S("Variable oxidation states", [
          "Transition metals show several oxidation states because 3d and 4s electrons have similar energies.",
          "Common examples: Fe²⁺/Fe³⁺, Mn²⁺/MnO₄⁻, Cr³⁺/Cr₂O₇²⁻, Cu⁺/Cu²⁺."
        ], { prompt: "What is the oxidation state of Mn in MnO₄⁻?", answer: "+7", explanation: "x + 4(–2)=–1." }),
        S("Complex ions and ligands", [
          "A complex consists of a central metal ion surrounded by ligands. Ligands donate lone pairs to form dative bonds.",
          "Coordination number is the number of dative bonds. Common shapes are octahedral (6), tetrahedral (4) and linear (2)."
        ], { prompt: "What is the coordination number of [Cu(NH₃)₄]²⁺?", answer: "4", explanation: "Four NH₃ ligands are bonded to Cu²⁺." }),
        S("Colour, UV–Vis and catalysis", [
          "Complexes are coloured when d–d transitions absorb visible light. The colour observed is complementary to the light absorbed.",
          "Transition metals and their compounds are good catalysts because they can change oxidation state and provide surfaces."
        ], { prompt: "Why are transition metal complexes coloured?", answer: "d–d electron transitions absorb visible light.", explanation: "The transmitted light is the complementary colour." })
      ]
    },
    {
      id: "P", code: "P", title: "Periodic Table", subtitle: "Period 3 oxides · chlorides · Group 2 trends",
      sections: [
        S("Period 3 oxides", [
          "Na₂O and MgO are basic; Al₂O₃ is amphoteric; SiO₂ is acidic; P₄O₁₀, SO₂/SO₃ and Cl₂O₇ are acidic.",
          "The acid–base character changes from basic to acidic across the period."
        ], { prompt: "Is Al₂O₃ acidic, basic or amphoteric?", answer: "Amphoteric", explanation: "It reacts with both acids and bases." }),
        S("Period 3 hydroxides", [
          "NaOH and Mg(OH)₂ are basic; Al(OH)₃ is amphoteric; Si(OH)₄ and the higher oxoacids are acidic.",
          "The trend follows the increasing electronegativity and covalent character across the period."
        ], { prompt: "Which hydroxide is amphoteric?", answer: "Al(OH)₃", explanation: "It reacts with both acids and alkalis." }),
        S("Period 3 chlorides", [
          "NaCl and MgCl₂ are ionic and dissolve to give neutral or slightly acidic solutions.",
          "AlCl₃, SiCl₄, PCl₅ and other covalent chlorides hydrolyse in water, producing acidic solutions and fumes."
        ], { prompt: "Why does SiCl₄ fume in moist air?", answer: "It hydrolyses to HCl and SiO₂.", explanation: "The covalent chloride reacts vigorously with water." }),
        S("Group 2 trends", [
          "Thermal stability of carbonates and nitrates increases down Group 2.",
          "Solubility of hydroxides increases down the group; solubility of sulfates decreases."
        ], { prompt: "Which is more thermally stable: MgCO₃ or BaCO₃?", answer: "BaCO₃", explanation: "Thermal stability increases down Group 2." }),
        S("Beryllium anomaly and uses", [
          "Beryllium differs from the rest of Group 2: its compounds are largely covalent and BeCl₂ is polymeric.",
          "Group 2 compounds are used in agriculture, medicine and construction; transition metals are used as catalysts and alloys."
        ], { prompt: "Why is BeCl₂ covalent?", answer: "Be²⁺ is very small and highly polarising.", explanation: "High polarising power gives covalent character." })
      ]
    }
  ];

  const cases = [
    {
      id: "physical",
      name: "Physical Chemistry Case",
      tagline: "Moles, gases, energy, rates and equilibria",
      cost: 30,
      items: [
        { id: "water", name: "Water", formula: "H₂O", rarity: "common", weight: 200, blurb: "The solvent behind concentration, pH, Ksp and almost every aqueous equilibrium.", source: "A–K" },
        { id: "carbon-dioxide", name: "Carbon dioxide", formula: "CO₂", rarity: "common", weight: 200, blurb: "A gas-law regular and the product of complete combustion.", source: "E Gases; A Mole Concept" },
        { id: "ammonia", name: "Ammonia", formula: "NH₃", rarity: "uncommon", weight: 150, blurb: "The Haber process product and a weak base with a familiar equilibrium.", source: "I Chemical Equilibrium; J Acid–Base" },
        { id: "hydrogen-chloride", name: "Hydrogen chloride", formula: "HCl", rarity: "uncommon", weight: 150, blurb: "A strong acid: complete dissociation and a pH you can calculate directly.", source: "J Acid–Base Equilibrium" },
        { id: "potassium-manganate", name: "Potassium manganate(VII)", formula: "KMnO₄", rarity: "rare", weight: 100, blurb: "The purple oxidant of redox titrations.", source: "B Volumetric Analysis" },
        { id: "sodium-thiosulfate", name: "Sodium thiosulfate", formula: "Na₂S₂O₃", rarity: "rare", weight: 100, blurb: "The iodine-titration partner with the starch endpoint.", source: "B Volumetric Analysis" },
        { id: "sulfuric-acid", name: "Sulfuric acid", formula: "H₂SO₄", rarity: "epic", weight: 70, blurb: "A strong diprotic acid and a dehydrating agent.", source: "J Acid–Base; G1 Energetics" },
        { id: "iodine", name: "Iodine", formula: "I₂", rarity: "legendary", weight: 30, blurb: "The deep-purple halogen at the centre of iodometric titrations.", source: "B Volumetric Analysis" }
      ]
    },
    {
      id: "inorganic",
      name: "Inorganic & Electrochemistry Case",
      tagline: "Atoms, bonding, cells and transition metals",
      cost: 30,
      items: [
        { id: "sodium-chloride", name: "Sodium chloride", formula: "NaCl", rarity: "common", weight: 200, blurb: "The ionic lattice that conducts only when molten.", source: "F Chemical Bonding; L2 Electrolytic Cells" },
        { id: "magnesium-oxide", name: "Magnesium oxide", formula: "MgO", rarity: "common", weight: 200, blurb: "A high-charge, small-ion lattice with a very exothermic lattice energy.", source: "F Chemical Bonding; G1 Energetics" },
        { id: "copper", name: "Copper", formula: "Cu", rarity: "uncommon", weight: 150, blurb: "The metal of the Daniell cell and copper purification.", source: "L1 Electrochemical Cells; L2 Electrolytic Cells" },
        { id: "zinc", name: "Zinc", formula: "Zn", rarity: "uncommon", weight: 150, blurb: "The anode of the classic zinc–copper galvanic cell.", source: "L1 Electrochemical Cells" },
        { id: "silver-chloride", name: "Silver chloride", formula: "AgCl", rarity: "rare", weight: 100, blurb: "A sparingly soluble salt and a Ksp favourite.", source: "K Solubility Equilibrium" },
        { id: "copper-ammine", name: "Tetraamminecopper(II)", formula: "[Cu(NH₃)₄]²⁺", rarity: "rare", weight: 100, blurb: "The deep-blue complex formed when ammonia is added to Cu²⁺.", source: "M Transition Metals" },
        { id: "dichromate", name: "Dichromate(VI)", formula: "Cr₂O₇²⁻", rarity: "epic", weight: 70, blurb: "The orange oxidant that turns green as Cr(III) forms.", source: "B Volumetric Analysis; M Transition Metals" },
        { id: "cisplatin", name: "cis-Platin", formula: "[Pt(NH₃)₂Cl₂]", rarity: "legendary", weight: 30, blurb: "A square-planar platinum complex with cis-trans isomerism.", source: "M Transition Metals" }
      ]
    }
  ];

  window.BENCH_DATA.expansion = { chapters, cases };
})();
