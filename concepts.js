/* BENCH — additional Concept Lab questions.
   Loaded after data.js; appends to window.BENCH_DATA.concepts.
   Every question is based on the H2 organic chemistry notes in this folder. */

(() => {
  if (!window.BENCH_DATA || !Array.isArray(window.BENCH_DATA.concepts)) return;

  const D = (smiles, label) => ({ smiles, label });

  window.BENCH_DATA.concepts.push(
    /* ---------- alkanes & isomerism (8) ---------- */
    {
      id: "c21",
      topic: "Nomenclature",
      question: "What is the IUPAC name of CH₃CH(CH₃)CH₂CH₃?",
      options: ["2-methylbutane", "3-methylbutane", "2-methylpropane", "pentane"],
      answer: 0,
      explanation: "The longest chain has four carbons (butane). Numbering from the end nearer the branch puts the methyl group on C2, so the name is 2-methylbutane.",
      source: "1 Introduction to Organic Chemistry; 3 Alkane"
    },
    {
      id: "c22",
      topic: "Isomerism",
      question: "How many structural isomers have the molecular formula C₄H₁₀?",
      options: ["1", "2", "3", "4"],
      answer: 1,
      explanation: "There are two: butane (a straight chain) and 2-methylpropane (a branched chain).",
      source: "2 Isomerism"
    },
    {
      id: "c23",
      topic: "Isomerism",
      question: "Which pair are chain isomers?",
      options: [
        "butane and 2-methylpropane",
        "propan-1-ol and propan-2-ol",
        "ethene and ethane",
        "ethanol and ethanal"
      ],
      answer: 0,
      explanation: "Chain isomers have the same molecular formula but different carbon skeletons. Butane and 2-methylpropane are both C₄H₁₀, but one is straight-chain and one is branched.",
      source: "2 Isomerism"
    },
    {
      id: "c24",
      topic: "Isomerism",
      question: "Which pair are position isomers?",
      options: [
        "propan-1-ol and propan-2-ol",
        "butane and 2-methylpropane",
        "ethanol and dimethyl ether",
        "propanal and propanone"
      ],
      answer: 0,
      explanation: "Position isomers have the same functional group in a different position on the same carbon skeleton. Propan-1-ol and propan-2-ol both have –OH, but on C1 and C2 respectively.",
      source: "2 Isomerism"
    },
    {
      id: "c25",
      topic: "Isomerism",
      question: "Which pair are functional group isomers?",
      options: [
        "ethanol and dimethyl ether",
        "propan-1-ol and propan-2-ol",
        "but-1-ene and but-2-ene",
        "1-bromopropane and 2-bromopropane"
      ],
      answer: 0,
      explanation: "Ethanol (an alcohol) and dimethyl ether (an ether) both have molecular formula C₂H₆O but different functional groups.",
      source: "2 Isomerism"
    },
    {
      id: "c26",
      topic: "Isomerism",
      question: "Which compound contains a chiral carbon?",
      options: ["2-chlorobutane", "1-chlorobutane", "2-chloropropane", "chloromethane"],
      answer: 0,
      explanation: "In 2-chlorobutane, C2 is bonded to H, Cl, CH₃ and CH₂CH₃ — four different groups. The other compounds have at least two identical groups on the halogen-bearing carbon.",
      source: "2 Isomerism",
    },
    {
      id: "c27",
      topic: "Isomerism",
      question: "Which statement describes a racemic mixture?",
      options: [
        "Equal amounts of two enantiomers, so the mixture is optically inactive.",
        "Equal amounts of two structural isomers, so the mixture is optically active.",
        "Only one enantiomer, so the mixture is optically active.",
        "A mixture of cis and trans isomers."
      ],
      answer: 0,
      explanation: "Enantiomers rotate plane-polarised light equally but in opposite directions. An equimolar mixture therefore has zero net rotation and is optically inactive.",
      source: "2 Isomerism; 6 Halogen Derivatives §6.3.3"
    },
    {
      id: "c28",
      topic: "Alkanes",
      question: "What is the organic product of the monobromination of ethane with Br₂ under UV light?",
      options: ["bromoethane", "1,2-dibromoethane", "ethene", "ethanol"],
      answer: 0,
      explanation: "UV light initiates free-radical substitution. With limited Br₂, one H is replaced by Br to give bromoethane; further substitution can give dibromo products.",
      source: "3 Alkane; 6 Halogen Derivatives §6.2.1"
    },

    /* ---------- alkenes (11) ---------- */
    {
      id: "c29",
      topic: "Alkenes",
      question: "Which reagent distinguishes an alkene from an alkane at room temperature?",
      options: ["Br₂ in CCl₄", "NaHCO₃(aq)", "Tollens' reagent", "2,4-DNPH"],
      answer: 0,
      explanation: "The alkene decolourises orange-red Br₂ in CCl₄ by electrophilic addition; the alkane does not react without UV light.",
      source: "4 Alkene §4.4.3; 3 Alkane"
    },
    {
      id: "c30",
      topic: "Alkenes",
      question: "What is the major product when but-1-ene reacts with HBr(g)?",
      options: ["1-bromobutane", "2-bromobutane", "1,2-dibromobutane", "butan-2-ol"],
      answer: 1,
      explanation: "Markovnikov addition: H adds to C1 so the more stable secondary carbocation forms at C2; Br⁻ then attacks C2, giving 2-bromobutane.",
      source: "4 Alkene §4.4.3",
      diagrams: [D("CCC=C", "but-1-ene")]
    },
    {
      id: "c31",
      topic: "Alkenes",
      question: "What is the major product when propene reacts with Br₂(aq)?",
      options: ["1,2-dibromopropane", "1-bromo-2-propanol", "2-bromo-1-propanol", "propan-2-ol"],
      answer: 1,
      explanation: "Water competes with Br⁻ in the second step. Br adds to the carbon with more H, and water attacks the more substituted carbocation, giving 1-bromo-2-propanol.",
      source: "4 Alkene §4.4.3",
      diagrams: [D("CC=C", "propene")]
    },
    {
      id: "c32",
      topic: "Alkenes",
      question: "What is the organic product of ethene with cold, dilute alkaline KMnO₄?",
      options: ["ethane-1,2-diol", "ethanoic acid", "ethanal", "carbon dioxide and water"],
      answer: 0,
      explanation: "Cold alkaline KMnO₄ breaks only the π bond, adding two –OH groups across the C=C to form a diol. Purple MnO₄⁻ is decolourised and brown MnO₂ forms.",
      source: "4 Alkene §4.4.4",
      diagrams: [D("C=C", "ethene")]
    },
    {
      id: "c33",
      topic: "Alkenes",
      question: "What is the product of ethene with hot acidified KMnO₄?",
      options: ["carbon dioxide and water", "ethane-1,2-diol", "ethanol", "ethanal"],
      answer: 0,
      explanation: "Hot acidified KMnO₄ cleaves both the σ and π bonds of C=C. Each =CH₂ fragment is oxidised through H₂CO₃ to CO₂ and H₂O.",
      source: "4 Alkene §4.4.4",
      diagrams: [D("C=C", "ethene")]
    },
    {
      id: "c34",
      topic: "Alkenes",
      question: "Which alkene gives propanone and ethanoic acid on vigorous oxidation with hot acidified KMnO₄?",
      options: ["2-methylbut-2-ene", "but-2-ene", "2-methylpropene", "pent-1-ene"],
      answer: 0,
      explanation: "2-methylbut-2-ene, (CH₃)₂C=CHCH₃, cleaves to give (CH₃)₂C=O (propanone) from the dimethyl end and CH₃CO₂H (ethanoic acid) from the other end.",
      source: "4 Alkene §4.4.4",
    },
    {
      id: "c35",
      topic: "Alkenes",
      question: "Which alkene gives only CO₂ and H₂O on vigorous oxidation?",
      options: ["ethene", "propene", "but-2-ene", "2-methylpropene"],
      answer: 0,
      explanation: "Both carbons of ethene are =CH₂. Each =CH₂ fragment is oxidised ultimately to CO₂ and H₂O, so no organic fragment remains.",
      source: "4 Alkene §4.4.4",
    },
    {
      id: "c36",
      topic: "Alkenes",
      question: "Which reagent converts propene to propane?",
      options: ["H₂(g), Ni catalyst", "Br₂ in CCl₄", "HBr(g)", "KMnO₄, H₂SO₄(aq), heat"],
      answer: 0,
      explanation: "Catalytic hydrogenation adds H₂ across the C=C bond. One mole of H₂ reacts with one mole of propene to give propane.",
      source: "4 Alkene §4.4.2",
      diagrams: [D("CC=C", "propene")]
    },
    {
      id: "c37",
      topic: "Alkenes",
      question: "What is the major product of propene with steam and an H₃PO₄ catalyst?",
      options: ["propan-1-ol", "propan-2-ol", "propane", "propanone"],
      answer: 1,
      explanation: "Hydration follows Markovnikov's rule: the more stable secondary carbocation forms, so –OH ends up on the middle carbon and the product is propan-2-ol.",
      source: "4 Alkene §4.4.3",
      diagrams: [D("CC=C", "propene")]
    },
    {
      id: "c38",
      topic: "Alkenes",
      question: "Why does Markovnikov's rule predict the major product of HX addition?",
      options: [
        "The more stable carbocation forms faster in the rate-determining step.",
        "The less substituted carbocation is more stable.",
        "H always adds to the more substituted carbon.",
        "X⁻ always attacks the carbon with more hydrogen atoms."
      ],
      answer: 0,
      explanation: "The rate-determining step is carbocation formation. The more stable carbocation (more alkyl groups, or resonance-stabilised) forms faster, so the nucleophile attacks that carbon.",
      source: "4 Alkene §4.4.3"
    },
    {
      id: "c39",
      topic: "Isomerism",
      question: "Which compound can exist as cis-trans isomers?",
      options: ["but-2-ene", "but-1-ene", "propane", "ethanol"],
      answer: 0,
      explanation: "Each carbon of the C=C in but-2-ene carries two different groups (H and CH₃). Restricted rotation about the double bond therefore allows cis and trans isomers. But-1-ene has two H on one carbon, so it cannot.",
      source: "2 Isomerism; 4 Alkene"
    },

    /* ---------- arenes (10) ---------- */
    {
      id: "c40",
      topic: "Arenes",
      question: "Cyclohexene and benzene are tested separately with Br₂ in CCl₄. What is observed?",
      options: [
        "Cyclohexene decolourises the bromine; benzene does not react without a catalyst.",
        "Both decolourise the bromine equally quickly.",
        "Benzene decolourises the bromine; cyclohexene does not.",
        "Neither reacts."
      ],
      answer: 0,
      explanation: "Cyclohexene has a localised C=C and undergoes electrophilic addition. Benzene's delocalised π electrons are less available; it needs a Lewis-acid catalyst and undergoes substitution.",
      source: "5 Arene §5.3–5.5; 4 Alkene",
      diagrams: [D("C1=CCCCC1", "cyclohexene"), D("c1ccccc1", "benzene")]
    },
    {
      id: "c41",
      topic: "Arenes",
      question: "Which species is the electrophile in the nitration of benzene?",
      options: ["NO₂⁺", "NO₃⁻", "HSO₄⁻", "H⁺"],
      answer: 0,
      explanation: "Conc. H₂SO₄ protonates HNO₃, which loses water to generate the nitronium ion, NO₂⁺. This attacks the electron-rich ring.",
      source: "5 Arene §5.5"
    },
    {
      id: "c42",
      topic: "Arenes",
      question: "Why is benzene less reactive than ethene towards Br₂?",
      options: [
        "Delocalisation of the π electrons makes them less available for electrophilic attack.",
        "Benzene has no π electrons.",
        "Benzene's C–H bonds are stronger than ethene's C=C bond.",
        "Benzene is a polar molecule."
      ],
      answer: 0,
      explanation: "The six π electrons are delocalised over the ring, lowering the electron density available to an electrophile compared with a localised alkene π bond.",
      source: "5 Arene §5.3"
    },
    {
      id: "c43",
      topic: "Arenes",
      question: "Which substituent is 2,4-directing?",
      options: ["–OH", "–NO₂", "–CO₂H", "–CN"],
      answer: 0,
      explanation: "–OH has lone pairs that donate electron density into the ring by resonance. It is strongly activating and directs the next electrophile to the 2- and 4-positions.",
      source: "5 Arene §5.6.2"
    },
    {
      id: "c44",
      topic: "Arenes",
      question: "Which substituent is 3-directing?",
      options: ["–NO₂", "–CH₃", "–OH", "–NH₂"],
      answer: 0,
      explanation: "–NO₂ is strongly electron-withdrawing by both induction and resonance. It deactivates the ring and directs the next electrophile to the 3-position.",
      source: "5 Arene §5.6.2"
    },
    {
      id: "c45",
      topic: "Arenes",
      question: "At what temperature is methylbenzene normally nitrated with conc. HNO₃ and conc. H₂SO₄?",
      options: ["30 °C", "50 °C", "100 °C", "room temperature"],
      answer: 0,
      explanation: "Alkylbenzenes are more reactive than benzene and are nitrated at about 30 °C. Benzene itself needs about 50 °C.",
      source: "5 Arene §5.6.3"
    },
    {
      id: "c46",
      topic: "Arenes",
      question: "What is the major organic product of the mononitration of methylbenzene?",
      options: ["4-nitromethylbenzene", "2-nitromethylbenzene", "3-nitromethylbenzene", "benzoic acid"],
      answer: 0,
      explanation: "The methyl group is weakly activating and 2,4-directing. The 4-isomer is the major product; some 2-isomer also forms.",
      source: "5 Arene §5.6.3",
      diagrams: [D("Cc1ccccc1", "methylbenzene")]
    },
    {
      id: "c47",
      topic: "Arenes",
      question: "What is the main organic product when methylbenzene reacts with Cl₂ under UV light?",
      options: ["chloromethylbenzene", "4-chloromethylbenzene", "benzyl alcohol", "benzoic acid"],
      answer: 0,
      explanation: "UV light initiates free-radical substitution in the alkyl side chain, not the ring. The first product is chloromethylbenzene (benzyl chloride).",
      source: "5 Arene §5.6.3",
      diagrams: [D("Cc1ccccc1", "methylbenzene")]
    },
    {
      id: "c48",
      topic: "Arenes",
      question: "What is the major organic product when methylbenzene reacts with Br₂ and anhydrous FeBr₃?",
      options: ["4-bromomethylbenzene", "bromomethylbenzene", "4-bromobenzoic acid", "benzyl bromide"],
      answer: 0,
      explanation: "FeBr₃ catalyses electrophilic aromatic substitution. The methyl group directs Br to the 2- and 4-positions; the 4-isomer is major.",
      source: "5 Arene §5.6.3",
      diagrams: [D("Cc1ccccc1", "methylbenzene")]
    },
    {
      id: "c49",
      topic: "Arenes",
      question: "Which sequence gives 3-bromonitrobenzene from benzene?",
      options: [
        "Nitrate first, then brominate with Br₂/FeBr₃.",
        "Brominate first, then nitrate with conc. HNO₃/H₂SO₄.",
        "Brominate first, then oxidise the ring.",
        "Nitrate first, then reduce with Sn/conc. HCl."
      ],
      answer: 0,
      explanation: "–NO₂ is 3-directing. Nitrate first so the nitro group controls the position of the later bromination. If –Br is present first, its 2,4-directing effect leads to 2-/4-bromonitrobenzene.",
      source: "5 Arene §5.6.2; 10 Nitrogen Compounds tutorial Q5"
    },

    /* ---------- halogenoalkanes (10) ---------- */
    {
      id: "c50",
      topic: "Halogenoalkanes",
      question: "How is 2-bromopropane classified?",
      options: ["primary", "secondary", "tertiary", "aryl"],
      answer: 1,
      explanation: "The carbon bearing Br is bonded to two other carbon atoms, so it is a secondary halogenoalkane.",
      source: "6 Halogen Derivatives §6.1.1",
      diagrams: [D("CC(Br)C", "2-bromopropane")]
    },
    {
      id: "c51",
      topic: "Halogenoalkanes",
      question: "How is 2-bromo-2-methylpropane classified?",
      options: ["primary", "secondary", "tertiary", "aryl"],
      answer: 2,
      explanation: "The carbon bearing Br is bonded to three other carbon atoms, so it is tertiary.",
      source: "6 Halogen Derivatives §6.1.1",
      diagrams: [D("CC(C)(C)Br", "2-bromo-2-methylpropane")]
    },
    {
      id: "c52",
      topic: "Halogenoalkanes",
      question: "Which reagent converts bromoethane to ethanol?",
      options: ["NaOH(aq), heat", "NaOH in ethanol, heat", "KCN in ethanol, heat", "Br₂, UV light"],
      answer: 0,
      explanation: "Aqueous NaOH with heat promotes nucleophilic substitution: OH⁻ replaces Br⁻. Ethanolic NaOH would instead promote elimination to ethene.",
      source: "6 Halogen Derivatives §6.3.2"
    },
    {
      id: "c53",
      topic: "Halogenoalkanes",
      question: "Which reagent converts bromoethane to ethene?",
      options: ["NaOH in ethanol, heat", "NaOH(aq), heat", "KCN in ethanol, heat", "excess NH₃ in ethanol"],
      answer: 0,
      explanation: "In ethanol, OH⁻ acts as a base and removes HBr from adjacent carbons, forming the alkene. This is elimination, not substitution.",
      source: "6 Halogen Derivatives §6.3.1"
    },
    {
      id: "c54",
      topic: "Halogenoalkanes",
      question: "Which reagent converts bromoethane to propanenitrile?",
      options: ["KCN in ethanol, heat", "NaOH(aq), heat", "NH₃ in ethanol, heat", "HBr(g)"],
      answer: 0,
      explanation: "CN⁻ is the nucleophile and substitutes Br⁻. The carbon chain is extended by one carbon: bromoethane (C₂) → propanenitrile (C₃).",
      source: "6 Halogen Derivatives §6.3.2"
    },
    {
      id: "c55",
      topic: "Halogenoalkanes",
      question: "A hydrolysis reaction has rate = k[halogenoalkane]. Which mechanism is operating?",
      options: ["SN1", "SN2", "E2", "free-radical substitution"],
      answer: 0,
      explanation: "The rate depends only on the halogenoalkane, so the rate-determining step involves only one species: unimolecular SN1, via a carbocation.",
      source: "6 Halogen Derivatives §6.3.3"
    },
    {
      id: "c56",
      topic: "Halogenoalkanes",
      question: "Which is the best leaving group among the following?",
      options: ["Br⁻", "Cl⁻", "OH⁻", "F⁻"],
      answer: 0,
      explanation: "Leaving-group ability increases down the halogens: I⁻ > Br⁻ > Cl⁻. OH⁻ and F⁻ are poor leaving groups; that is why alcohols need HX, PCl₅ or SOCl₂ to be converted to halogenoalkanes.",
      source: "6 Halogen Derivatives §6.1; 7A Alcohol §7A.4.3"
    },
    {
      id: "c57",
      topic: "Halogenoarenes",
      question: "Why is chlorobenzene resistant to nucleophilic substitution compared with chloroethane?",
      options: [
        "The C–Cl bond has partial double-bond character because the Cl lone pair is delocalised into the ring.",
        "The C–Cl bond in chlorobenzene is non-polar.",
        "Chlorobenzene has no π electrons.",
        "Chlorine is a better leaving group in chlorobenzene."
      ],
      answer: 0,
      explanation: "The Cl p orbital overlaps with the delocalised π system, giving the C–Cl bond partial double-bond character and making it stronger. The electron-rich ring also repels nucleophiles.",
      source: "6 Halogen Derivatives §6.1.2; 9 Carboxylic Derivatives §9B.3.1"
    },
    {
      id: "c58",
      topic: "Halogenoalkanes",
      question: "1-Iodobutane is hydrolysed with NaOH(aq), cooled, acidified with dilute HNO₃ and treated with AgNO₃(aq). What is observed?",
      options: ["Yellow precipitate of AgI", "White precipitate of AgCl", "Cream precipitate of AgBr", "No precipitate"],
      answer: 0,
      explanation: "Hydrolysis releases I⁻, which gives a yellow precipitate of AgI. AgCl is white and AgBr is cream.",
      source: "6 Halogen Derivatives §6.3.2; Summary §Section C"
    },
    {
      id: "c59",
      topic: "Halogenoalkanes",
      question: "What is the organic product of 2-bromopropane with NaOH in ethanol under heat?",
      options: ["propene", "propan-2-ol", "propanenitrile", "propan-2-amine"],
      answer: 0,
      explanation: "Ethanolic NaOH promotes elimination of HBr, giving propene. Aqueous NaOH would give propan-2-ol by substitution.",
      source: "6 Halogen Derivatives §6.3.1",
      diagrams: [D("CC(Br)C", "2-bromopropane")]
    },

    /* ---------- alcohols (10) ---------- */
    {
      id: "c60",
      topic: "Alcohols",
      question: "How is propan-2-ol classified?",
      options: ["primary", "secondary", "tertiary", "phenolic"],
      answer: 1,
      explanation: "The carbon bearing –OH is bonded to two other carbon atoms, so propan-2-ol is a secondary alcohol.",
      source: "7A Alcohol §7A.1",
      diagrams: [D("CC(O)C", "propan-2-ol")]
    },
    {
      id: "c61",
      topic: "Alcohols",
      question: "How is 2-methylpropan-2-ol classified?",
      options: ["primary", "secondary", "tertiary", "phenolic"],
      answer: 2,
      explanation: "The carbon bearing –OH is bonded to three other carbon atoms, so it is a tertiary alcohol.",
      source: "7A Alcohol §7A.1",
      diagrams: [D("CC(C)(C)O", "2-methylpropan-2-ol")]
    },
    {
      id: "c62",
      topic: "Alcohols",
      question: "Which alcohol is resistant to oxidation by acidified K₂Cr₂O₇?",
      options: ["2-methylpropan-2-ol", "propan-1-ol", "propan-2-ol", "ethanol"],
      answer: 0,
      explanation: "Tertiary alcohols have no hydrogen on the carbon bearing –OH, so they cannot be oxidised under these conditions; the dichromate colour remains orange.",
      source: "7A Alcohol §7A.4.4",
    },
    {
      id: "c63",
      topic: "Alcohols",
      question: "Which conditions oxidise ethanol to ethanal without over-oxidising it?",
      options: [
        "K₂Cr₂O₇, H₂SO₄(aq), heat with immediate distillation",
        "KMnO₄, H₂SO₄(aq), heat under reflux",
        "conc. H₂SO₄, heat",
        "LiAlH₄ in dry ether"
      ],
      answer: 0,
      explanation: "Acidified dichromate is milder, and distilling the volatile aldehyde out as it forms removes it from the oxidising mixture before it can become ethanoic acid.",
      source: "7A Alcohol §7A.4.4",
      diagrams: [D("CCO", "ethanol")]
    },
    {
      id: "c64",
      topic: "Alcohols",
      question: "Which conditions oxidise ethanol all the way to ethanoic acid?",
      options: [
        "KMnO₄, H₂SO₄(aq), heat under reflux",
        "K₂Cr₂O₇, H₂SO₄(aq), heat with immediate distillation",
        "conc. H₂SO₄, heat",
        "Na(s), room temperature"
      ],
      answer: 0,
      explanation: "Hot acidified KMnO₄ is a strong oxidant and the aldehyde is not removed, so oxidation continues to the carboxylic acid.",
      source: "7A Alcohol §7A.4.4",
      diagrams: [D("CCO", "ethanol")]
    },
    {
      id: "c65",
      topic: "Alcohols",
      question: "What is the organic product of propan-2-ol with hot acidified KMnO₄?",
      options: ["propanone", "propanal", "propanoic acid", "propene"],
      answer: 0,
      explanation: "A secondary alcohol is oxidised to a ketone. Propan-2-ol gives propanone, which resists further oxidation.",
      source: "7A Alcohol §7A.4.4",
      diagrams: [D("CC(O)C", "propan-2-ol")]
    },
    {
      id: "c66",
      topic: "Phenols",
      question: "Which reagent gives a violet colour with phenol but not with ethanol?",
      options: ["neutral FeCl₃(aq)", "NaHCO₃(aq)", "Tollens' reagent", "2,4-DNPH"],
      answer: 0,
      explanation: "Phenol forms a violet complex with neutral aqueous iron(III) chloride. Ethanol does not give this test.",
      source: "7B Phenol §7B.4",
      diagrams: [D("Oc1ccccc1", "phenol"), D("CCO", "ethanol")]
    },
    {
      id: "c67",
      topic: "Alcohols",
      question: "Which alcohol gives a positive iodoform test with I₂/NaOH on warming?",
      options: ["butan-2-ol", "butan-1-ol", "2-methylpropan-1-ol", "2-methylpropan-2-ol"],
      answer: 0,
      explanation: "Butan-2-ol contains the CH₃CH(OH)– feature (a methyl carbinol). It is oxidised to a methyl ketone and then gives yellow CHI₃. The other alcohols lack this feature.",
      source: "7A Alcohol §7A.4.4",
    },
    {
      id: "c68",
      topic: "Alcohols",
      question: "Which reagent converts ethanol to bromoethane?",
      options: ["HBr(g)", "Br₂ in CCl₄", "NaBr(aq)", "Br₂, UV light"],
      answer: 0,
      explanation: "HBr(g) protonates the –OH group, making water a good leaving group; Br⁻ then substitutes it. Br₂/CCl₄ does not substitute an alcohol, and NaBr(aq) is not reactive enough.",
      source: "7A Alcohol §7A.4.3"
    },
    {
      id: "c69",
      topic: "Alcohols",
      question: "Why is ethanol neutral in aqueous solution?",
      options: [
        "Ethoxide is less stable than hydroxide because the alkyl group intensifies the negative charge.",
        "Ethanol has no O–H bond.",
        "Ethanol is a strong acid.",
        "Ethanol reacts completely with water to give H₃O⁺."
      ],
      answer: 0,
      explanation: "Ethanol's Ka is smaller than water's. The electron-donating alkyl group destabilises the ethoxide ion, so ethanol dissociates less than water and its solution is neutral.",
      source: "7A Alcohol §7A.4.2"
    },

    /* ---------- phenols (6) ---------- */
    {
      id: "c70",
      topic: "Phenols",
      question: "Phenol and ethanol are tested separately with Br₂(aq). What is observed?",
      options: [
        "Phenol gives a white precipitate; ethanol does not.",
        "Ethanol gives a white precipitate; phenol does not.",
        "Both give a white precipitate.",
        "Neither reacts."
      ],
      answer: 0,
      explanation: "Phenol is strongly activated and tri-brominates at the 2,4,6-positions, giving a white precipitate of 2,4,6-tribromophenol. Ethanol does not react with aqueous bromine.",
      source: "7B Phenol §7B.3.4",
      diagrams: [D("Oc1ccccc1", "phenol"), D("CCO", "ethanol")]
    },
    {
      id: "c71",
      topic: "Phenols",
      question: "What is the product of phenol with NaOH(aq)?",
      options: ["sodium phenoxide and water", "phenyl ethanoate", "2,4,6-tribromophenol", "no reaction"],
      answer: 0,
      explanation: "Phenol is weakly acidic and is neutralised by NaOH to sodium phenoxide. The phenoxide ion is more nucleophilic than phenol.",
      source: "7B Phenol §7B.3.3"
    },
    {
      id: "c72",
      topic: "Phenols",
      question: "What is observed when phenol is shaken with NaHCO₃(aq)?",
      options: ["No reaction", "Effervescence of CO₂", "A white precipitate", "A violet colour"],
      answer: 0,
      explanation: "Phenol is a weaker acid than carbonic acid, so it cannot react with NaHCO₃ to release CO₂. Carboxylic acids do give CO₂ with NaHCO₃, which distinguishes them from phenols.",
      source: "7B Phenol §7B.3.3; 9 Carboxylic Derivatives §9A.3.2"
    },
    {
      id: "c73",
      topic: "Phenols",
      question: "What is the organic product of phenol with excess Br₂(aq)?",
      options: ["2,4,6-tribromophenol", "2-bromophenol", "4-bromophenol", "phenyl ethanoate"],
      answer: 0,
      explanation: "Aqueous bromine tri-brominates the strongly activated phenol ring at the 2-, 4- and 6-positions, giving a white precipitate.",
      source: "7B Phenol §7B.3.4",
      diagrams: [D("Oc1ccccc1", "phenol")]
    },
    {
      id: "c74",
      topic: "Phenols",
      question: "Why is phenol more acidic than ethanol?",
      options: [
        "The phenoxide ion is stabilised by delocalisation of the negative charge into the benzene ring.",
        "Phenol has more hydrogen atoms.",
        "Ethanol has no O–H bond.",
        "Phenol is an aldehyde."
      ],
      answer: 0,
      explanation: "Loss of H⁺ from phenol gives a phenoxide ion whose negative charge is delocalised into the ring. This stabilises the conjugate base, so phenol dissociates more than ethanol.",
      source: "7B Phenol §7B.2"
    },
    {
      id: "c75",
      topic: "Phenols",
      question: "Which reagent converts phenol to phenyl ethanoate?",
      options: ["ethanoyl chloride", "ethanoic acid with conc. H₂SO₄", "ethanol with conc. H₂SO₄", "NaOH(aq) only"],
      answer: 0,
      explanation: "Phenol is a poor nucleophile and does not undergo Fischer esterification with carboxylic acids. It reacts with the more reactive ethanoyl chloride; converting it to phenoxide first makes the reaction faster.",
      source: "7B Phenol §7B.3.3; 9 Carboxylic Derivatives §9B.3.1"
    },

    /* ---------- carbonyls (8) ---------- */
    {
      id: "c76",
      topic: "Carbonyls",
      question: "Which compound is a ketone?",
      options: ["propanone", "propanal", "ethanal", "ethanoic acid"],
      answer: 0,
      explanation: "In propanone, the carbonyl carbon is bonded to two carbon atoms. In an aldehyde at least one side is H; a carboxylic acid has –OH on the carbonyl carbon.",
      source: "8 Carbonyl Compounds §8.1",
    },
    {
      id: "c77",
      topic: "Carbonyls",
      question: "Which pair of tests gives a positive result with propanal but not with propanone?",
      options: [
        "Tollens' reagent and Fehling's solution",
        "2,4-DNPH and NaHCO₃(aq)",
        "Br₂ in CCl₄ and Na(s)",
        "neutral FeCl₃(aq) and NaHCO₃(aq)"
      ],
      answer: 0,
      explanation: "Both Tollens' reagent and Fehling's solution oxidise aldehydes, giving a silver mirror and a brick-red precipitate respectively. Ketones do not react. 2,4-DNPH reacts with both.",
      source: "8 Carbonyl Compounds §8.5.4"
    },
    {
      id: "c78",
      topic: "Carbonyls",
      question: "What is the product of ethanal with HCN (cold, trace NaOH)?",
      options: ["2-hydroxypropanenitrile", "propanenitrile", "ethanol", "propanoic acid"],
      answer: 0,
      explanation: "HCN adds across the C=O bond. CN⁻ attacks the carbonyl carbon, and protonation of the alkoxide gives CH₃CH(OH)CN, a cyanohydrin.",
      source: "8 Carbonyl Compounds §8.4.4",
      diagrams: [D("CC=O", "ethanal")]
    },
    {
      id: "c79",
      topic: "Carbonyls",
      question: "Which reagent converts propanone to propan-2-ol?",
      options: ["H₂(g), Ni catalyst", "KMnO₄, H₂SO₄(aq), heat", "Tollens' reagent", "Br₂ in CCl₄"],
      answer: 0,
      explanation: "Catalytic hydrogenation reduces the ketone C=O to a secondary alcohol. KMnO₄ would not reduce a ketone, and Tollens'/Br₂ do not reduce it either.",
      source: "8 Carbonyl Compounds §8.5.3",
      diagrams: [D("CC(=O)C", "propanone")]
    },
    {
      id: "c80",
      topic: "Carbonyls",
      question: "What is the organic product of ethanal with LiAlH₄ in dry ether?",
      options: ["ethanol", "ethanoic acid", "ethane", "ethanenitrile"],
      answer: 0,
      explanation: "LiAlH₄ supplies hydride to the electrophilic carbonyl carbon. An aldehyde is reduced to a primary alcohol, so ethanal gives ethanol.",
      source: "8 Carbonyl Compounds §8.5.3",
      diagrams: [D("CC=O", "ethanal")]
    },
    {
      id: "c81",
      topic: "Carbonyls",
      question: "What are the organic products of propanone with I₂ and NaOH(aq) on warming?",
      options: [
        "sodium ethanoate and triiodomethane",
        "propan-2-ol and sodium iodide",
        "propanoic acid and water",
        "ethanal and sodium hydroxide"
      ],
      answer: 0,
      explanation: "Propanone has the CH₃CO– feature. The iodoform reaction gives yellow CHI₃ and converts the rest of the molecule to the ethanoate ion.",
      source: "8 Carbonyl Compounds §8.4.5",
      diagrams: [D("CC(=O)C", "propanone")]
    },
    {
      id: "c82",
      topic: "Carbonyls",
      question: "What is observed when an aldehyde or ketone is treated with 2,4-DNPH?",
      options: [
        "An orange precipitate forms with either an aldehyde or a ketone.",
        "A silver mirror forms only with an aldehyde.",
        "A brick-red precipitate forms only with an aldehyde.",
        "A yellow precipitate forms only with a methyl ketone."
      ],
      answer: 0,
      explanation: "2,4-DNPH condenses with the carbonyl group to give an orange hydrazone precipitate. It confirms a carbonyl but does not distinguish aldehyde from ketone.",
      source: "8 Carbonyl Compounds §8.5.2"
    },
    {
      id: "c83",
      topic: "Carbonyls",
      question: "Benzaldehyde gives a silver mirror with Tollens' reagent but no brick-red precipitate with Fehling's solution. Which statement explains this?",
      options: [
        "Benzaldehyde is an aldehyde, so it reduces Tollens' reagent; it is aromatic, so it does not react with Fehling's solution.",
        "Benzaldehyde is a ketone, so it reacts with Tollens' reagent only.",
        "Benzaldehyde is a carboxylic acid, so it reacts with both tests.",
        "Benzaldehyde is an alcohol, so it reacts with neither test."
      ],
      answer: 0,
      explanation: "Tollens' reagent oxidises all aldehydes, including benzaldehyde. Fehling's solution reacts with aliphatic aldehydes but not with benzaldehyde and its derivatives.",
      source: "8 Carbonyl Compounds §8.5.4",
      diagrams: [D("O=Cc1ccccc1", "benzaldehyde")]
    },

    /* ---------- carboxylic acids & derivatives (9) ---------- */
    {
      id: "c84",
      topic: "Carboxylic acids",
      question: "Which reagent gives effervescence with ethanoic acid?",
      options: ["NaHCO₃(aq)", "NaOH(aq)", "Tollens' reagent", "Br₂ in CCl₄"],
      answer: 0,
      explanation: "Carboxylic acids are strong enough to displace CO₂ from hydrogencarbonate. Ethanoic acid + NaHCO₃ gives sodium ethanoate, CO₂ and water.",
      source: "9 Carboxylic Derivatives §9A.3.2",
      diagrams: [D("CC(=O)O", "ethanoic acid")]
    },
    {
      id: "c85",
      topic: "Carboxylic acids",
      question: "What is the organic product of ethanoic acid with LiAlH₄ in dry ether?",
      options: ["ethanol", "ethanal", "ethane", "ethanoyl chloride"],
      answer: 0,
      explanation: "LiAlH₄ is the only reducing agent in the syllabus that reduces –CO₂H. The carboxylic acid is reduced all the way to the primary alcohol, ethanol.",
      source: "9 Carboxylic Derivatives §9A.3.4",
      diagrams: [D("CC(=O)O", "ethanoic acid")]
    },
    {
      id: "c86",
      topic: "Carboxylic derivatives",
      question: "Which reagent is best for converting benzoic acid to benzoyl chloride?",
      options: ["SOCl₂, anhydrous", "HCl(aq)", "NaOH(aq)", "ethanol, conc. H₂SO₄"],
      answer: 0,
      explanation: "SOCl₂ converts –CO₂H to –COCl under anhydrous conditions. The by-products SO₂ and HCl are gases, so the acyl chloride is easily separated.",
      source: "9 Carboxylic Derivatives §9A.3.2",
      diagrams: [D("O=C(O)c1ccccc1", "benzoic acid")]
    },
    {
      id: "c87",
      topic: "Carboxylic derivatives",
      question: "What is the organic product of ethanoyl chloride with ethanol?",
      options: ["ethyl ethanoate", "ethanoic acid", "ethanamide", "sodium ethanoate"],
      answer: 0,
      explanation: "The alcohol attacks the acyl chloride and HCl is eliminated, forming an ester. This condensation is rapid at room temperature and needs no catalyst.",
      source: "9 Carboxylic Derivatives §9B.3.1",
      diagrams: [D("CC(=O)Cl", "ethanoyl chloride"), D("CCO", "ethanol")]
    },
    {
      id: "c88",
      topic: "Carboxylic derivatives",
      question: "What is the organic product of ethanoyl chloride with NH₃(g)?",
      options: ["ethanamide", "ethylamine", "ethanoic acid", "ammonium ethanoate"],
      answer: 0,
      explanation: "Ammonia attacks the acyl carbon and HCl is eliminated, giving the primary amide ethanamide. A carboxylic acid plus ammonia would give only the ammonium salt.",
      source: "9 Carboxylic Derivatives §9B.3.1",
      diagrams: [D("CC(=O)Cl", "ethanoyl chloride")]
    },
    {
      id: "c89",
      topic: "Amides",
      question: "What is the organic product of ethanamide with LiAlH₄ in dry ether?",
      options: ["ethylamine", "ethanoic acid", "ethanol", "ethanenitrile"],
      answer: 0,
      explanation: "LiAlH₄ reduces the amide C=O all the way to CH₂, giving the primary amine. Catalytic H₂ cannot reduce an amide.",
      source: "10 Nitrogen Compounds §10B.3.2",
      diagrams: [D("CC(=O)N", "ethanamide")]
    },
    {
      id: "c90",
      topic: "Esters",
      question: "What are the products of ethyl ethanoate with NaOH(aq) under heat?",
      options: [
        "sodium ethanoate and ethanol",
        "ethanoic acid and ethanol",
        "ethanoyl chloride and ethanol",
        "sodium ethanoate and ethene"
      ],
      answer: 0,
      explanation: "Alkaline hydrolysis of an ester gives the carboxylate salt and the alcohol. The reaction is irreversible because the carboxylate is formed.",
      source: "9 Carboxylic Derivatives §9B.3.2",
      diagrams: [D("CCOC(=O)C", "ethyl ethanoate")]
    },
    {
      id: "c91",
      topic: "Carboxylic derivatives",
      question: "What is observed when ethanoyl chloride is added to water at room temperature?",
      options: [
        "Dense white fumes of HCl and a solution of ethanoic acid",
        "No reaction",
        "A silver mirror",
        "A yellow precipitate"
      ],
      answer: 0,
      explanation: "Acyl chlorides hydrolyse readily: CH₃COCl + H₂O → CH₃CO₂H + HCl. The HCl fumes are a useful test for an acyl chloride.",
      source: "9 Carboxylic Derivatives §9B.3.1",
      diagrams: [D("CC(=O)Cl", "ethanoyl chloride")]
    },
    {
      id: "c92",
      topic: "Carboxylic derivatives",
      question: "Which order correctly compares the ease of hydrolysis of these acid derivatives?",
      options: [
        "acyl chloride > ester > amide",
        "amide > ester > acyl chloride",
        "ester > acyl chloride > amide",
        "amide > acyl chloride > ester"
      ],
      answer: 0,
      explanation: "Acyl chlorides are most reactive because Cl⁻ is an excellent leaving group and the carbonyl carbon is very electrophilic. Amides are least reactive because the nitrogen lone pair delocalises into the carbonyl, stabilising the amide.",
      source: "9 Carboxylic Derivatives §9B.3.1; 10 Nitrogen Compounds §10B.1.2"
    },

    /* ---------- nitrogen compounds (5) ---------- */
    {
      id: "c93",
      topic: "Amines",
      question: "Which order shows increasing base strength in aqueous solution?",
      options: [
        "phenylamine < ammonia < ethylamine",
        "ethylamine < ammonia < phenylamine",
        "ammonia < phenylamine < ethylamine",
        "phenylamine < ethylamine < ammonia"
      ],
      answer: 0,
      explanation: "The ethyl group is electron-donating, making the N lone pair more available than in ammonia. In phenylamine, the lone pair is delocalised into the ring, so it is the weakest base.",
      source: "10 Nitrogen Compounds §10A.3.1"
    },
    {
      id: "c94",
      topic: "Amines",
      question: "What is the product of phenylamine with HCl(aq)?",
      options: ["phenylammonium chloride", "chlorobenzene", "N-phenylethanamide", "2,4,6-tribromophenylamine"],
      answer: 0,
      explanation: "The lone pair on nitrogen accepts H⁺, forming the phenylammonium ion; with chloride counter-ion, the salt is phenylammonium chloride.",
      source: "10 Nitrogen Compounds §10A.3.1"
    },
    {
      id: "c95",
      topic: "Amines",
      question: "What is the organic product of phenylamine with excess Br₂(aq)?",
      options: ["2,4,6-tribromophenylamine", "2-bromophenylamine", "4-bromophenylamine", "N-phenylethanamide"],
      answer: 0,
      explanation: "The –NH₂ group strongly activates the ring, so aqueous bromine tri-brominates at the 2-, 4- and 6-positions, giving a white precipitate. No Lewis-acid catalyst is needed.",
      source: "10 Nitrogen Compounds §10A.3.3",
      diagrams: [D("Nc1ccccc1", "phenylamine")]
    },
    {
      id: "c96",
      topic: "Nitriles",
      question: "What is the organic product of propanenitrile with H₂ and a Ni catalyst?",
      options: ["propylamine", "propanoic acid", "propan-1-ol", "propanamide"],
      answer: 0,
      explanation: "Catalytic hydrogenation reduces the C≡N bond to –CH₂NH₂. Two moles of H₂ are needed per nitrile, giving the primary amine propylamine.",
      source: "10 Nitrogen Compounds §10A.2.1",
      diagrams: [D("CCC#N", "propanenitrile")]
    },
    {
      id: "c97",
      topic: "Amides",
      question: "What is the organic product of phenylamine with ethanoyl chloride?",
      options: ["N-phenylethanamide", "phenylammonium chloride", "2,4,6-tribromophenylamine", "ethylamine"],
      answer: 0,
      explanation: "The amine attacks the acyl chloride; HCl is eliminated, forming the amide N-phenylethanamide (acetanilide).",
      source: "10 Nitrogen Compounds §10A.3.2; §10B.2",
      diagrams: [D("Nc1ccccc1", "phenylamine")]
    },

    /* ---------- polymers (3) ---------- */
    {
      id: "c98",
      topic: "Polymers",
      question: "Which monomer gives poly(propene)?",
      options: ["propene", "ethene", "chloroethene", "phenylethene"],
      answer: 0,
      explanation: "Poly(propene) is an addition polymer of propene. The C=C opens to form the polymer backbone, with a methyl group on every repeat unit.",
      source: "11 Polymers §11.2.1",
    },
    {
      id: "c99",
      topic: "Polymers",
      question: "Which pair of monomers forms a polyamide?",
      options: [
        "hexanedioic acid and 1,6-diaminohexane",
        "ethane-1,2-diol and benzene-1,4-dicarboxylic acid",
        "ethene and propene",
        "chloroethene and phenylethene"
      ],
      answer: 0,
      explanation: "A polyamide is formed by condensation of a dicarboxylic acid and a diamine. Hexanedioic acid + 1,6-diaminohexane gives nylon-6,6.",
      source: "11 Polymers §11.2.2",
    },
    {
      id: "c100",
      topic: "Polymers",
      question: "Which pair of monomers forms PET?",
      options: [
        "benzene-1,4-dicarboxylic acid and ethane-1,2-diol",
        "hexanedioic acid and 1,6-diaminohexane",
        "ethene and propene",
        "chloroethene and phenylethene"
      ],
      answer: 0,
      explanation: "PET is a polyester formed by condensation of a dicarboxylic acid and a diol, with loss of water. The monomers are benzene-1,4-dicarboxylic acid and ethane-1,2-diol.",
      source: "11 Polymers §11.2.2",
    }
  );

  /* Give the original 20 questions skeletal diagrams too, where a structure helps. */
  const augment = {
    c01: [D("CC(=O)O", "ethanoic acid")],
    c05: [D("Oc1ccccc1", "phenol"), D("O=C(O)c1ccccc1", "benzoic acid")],
    c06: [D("CCBr", "bromoethane")],
    c07: [D("CC(C)(C)Br", "2-bromo-2-methylpropane")],
    c08: [D("CC=C", "propene")],
    c09: [D("CC(O)CC", "butan-2-ol")],
    c10: [D("c1ccccc1", "benzene")],
    c11: [D("CC(=O)N", "ethanamide")],
    c12: [D("O=[N+]([O-])c1ccccc1", "nitrobenzene")],
    c13: [D("CC(=O)C", "propanone")],
    c14: [D("CC(=O)O", "ethanoic acid")],
    c17: [D("Oc1ccccc1", "phenol")],
    c18: [D("Cc1ccccc1", "methylbenzene")],
    c20: [D("CCOC(=O)C", "ethyl ethanoate")]
  };
  window.BENCH_DATA.concepts.forEach((concept) => {
    if (augment[concept.id]) concept.diagrams = augment[concept.id];
  });
})();
