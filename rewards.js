/* BENCH — reward economy.
   Correct Concept Lab answers earn research points; 30 points opens one case.
   The case pool is weighted by rarity. Duplicates refund a small number of points.
   Calibration: ~57 cases to complete the 16-item collection, ≈10.3 h at 150 correct
   questions/hour (see tests/economy.mjs). */

(() => {
  if (!window.BENCH_DATA) return;

  const rarities = [
    { id: "common", label: "Common", color: "#8b929d", order: 1 },
    { id: "uncommon", label: "Uncommon", color: "#2f6fb2", order: 2 },
    { id: "rare", label: "Rare", color: "#7a4f9e", order: 3 },
    { id: "epic", label: "Epic", color: "#b23a78", order: 4 },
    { id: "legendary", label: "Legendary", color: "#b8860b", order: 5 }
  ];

  const items = [
    {
      id: "ethanol",
      name: "Ethanol",
      formula: "C₂H₆O",
      smiles: "CCO",
      rarity: "common",
      weight: 700,
      blurb: "The two-carbon alcohol. The gateway to aldehydes, acids, esters and ethene.",
      source: "7A Alcohol"
    },
    {
      id: "ethanoic-acid",
      name: "Ethanoic acid",
      formula: "C₂H₄O₂",
      smiles: "CC(=O)O",
      rarity: "common",
      weight: 700,
      blurb: "Vinegar's acid. A weak acid, and the parent of ethanoyl chloride and ethanamide.",
      source: "9 Carboxylic Acids"
    },
    {
      id: "benzene",
      name: "Benzene",
      formula: "C₆H₆",
      smiles: "c1ccccc1",
      rarity: "common",
      weight: 700,
      blurb: "Six delocalised π electrons. It would rather substitute than add.",
      source: "5 Arene"
    },
    {
      id: "propene",
      name: "Propene",
      formula: "C₃H₆",
      smiles: "CC=C",
      rarity: "common",
      weight: 700,
      blurb: "An unsymmetrical alkene. Markovnikov's rule lives here.",
      source: "4 Alkene"
    },
    {
      id: "bromoethane",
      name: "Bromoethane",
      formula: "C₂H₅Br",
      smiles: "CCBr",
      rarity: "common",
      weight: 700,
      blurb: "A primary halogenoalkane: SN2, elimination, cyanide or ammonia, your choice.",
      source: "6 Halogen Derivatives"
    },
    {
      id: "phenol",
      name: "Phenol",
      formula: "C₆H₆O",
      smiles: "Oc1ccccc1",
      rarity: "uncommon",
      weight: 700,
      blurb: "A weakly acidic –OH on an activated ring. Violet with FeCl₃, white with Br₂.",
      source: "7B Phenol"
    },
    {
      id: "propanone",
      name: "Propanone",
      formula: "C₃H₆O",
      smiles: "CC(=O)C",
      rarity: "uncommon",
      weight: 700,
      blurb: "The smallest ketone. Resists oxidation; gives a cyanohydrin and the iodoform test.",
      source: "8 Carbonyl Compounds"
    },
    {
      id: "ethanoyl-chloride",
      name: "Ethanoyl chloride",
      formula: "C₂H₃ClO",
      smiles: "CC(=O)Cl",
      rarity: "uncommon",
      weight: 700,
      blurb: "Acylating agent with a serious fume. Water, alcohol or ammonia—it reacts.",
      source: "9 Carboxylic Derivatives"
    },
    {
      id: "propan-1-ol",
      name: "Propan-1-ol",
      formula: "C₃H₈O",
      smiles: "CCCO",
      rarity: "uncommon",
      weight: 700,
      blurb: "A primary alcohol that can be stopped at propanal or pushed to propanoic acid.",
      source: "7A Alcohol"
    },
    {
      id: "methyl-benzoate",
      name: "Methyl benzoate",
      formula: "C₈H₈O₂",
      smiles: "COC(=O)c1ccccc1",
      rarity: "rare",
      weight: 600,
      blurb: "A sweet-smelling aromatic ester made from benzoic acid and methanol.",
      source: "9 Carboxylic Derivatives"
    },
    {
      id: "phenylamine",
      name: "Phenylamine",
      formula: "C₆H₇N",
      smiles: "Nc1ccccc1",
      rarity: "rare",
      weight: 600,
      blurb: "The aromatic amine. A weak base, a strong ring activator, and a white precipitate with Br₂.",
      source: "10 Nitrogen Compounds"
    },
    {
      id: "n-phenylethanamide",
      name: "N-Phenylethanamide",
      formula: "C₈H₉NO",
      smiles: "CC(=O)Nc1ccccc1",
      rarity: "rare",
      weight: 600,
      blurb: "Acetanilide. The amide that links phenylamine and ethanoyl chloride.",
      source: "10 Nitrogen Compounds"
    },
    {
      id: "tribromophenol",
      name: "2,4,6-Tribromophenol",
      formula: "C₆H₃Br₃O",
      smiles: "Oc1c(Br)cc(Br)cc1Br",
      rarity: "epic",
      weight: 467,
      blurb: "Three bromines, one activated ring. The white precipitate that proves phenol.",
      source: "7B Phenol"
    },
    {
      id: "hydroxy-methyl-propanoic-acid",
      name: "2-Hydroxy-2-methylpropanoic acid",
      formula: "C₄H₈O₃",
      smiles: "CC(C)(O)C(=O)O",
      rarity: "epic",
      weight: 467,
      blurb: "An α-hydroxy acid from a ketone cyanohydrin. Three steps, one stereocentre-free target.",
      source: "8 Carbonyl Compounds; 9 Carboxylic Derivatives"
    },
    {
      id: "butanedioic-acid",
      name: "Butanedioic acid",
      formula: "C₄H₆O₄",
      smiles: "O=C(O)CCC(=O)O",
      rarity: "epic",
      weight: 467,
      blurb: "Succinic acid. Two nitrile hydrolyses away from 1,2-dibromoethane.",
      source: "6 Halogen Derivatives; 9 Carboxylic Derivatives"
    },
    {
      id: "trinitrophenol",
      name: "2,4,6-Trinitrophenol",
      formula: "C₆H₃N₃O₇",
      smiles: "Oc1c([N+](=O)[O-])cc([N+](=O)[O-])cc1[N+](=O)[O-]",
      rarity: "legendary",
      weight: 499,
      blurb: "Picric acid. The fully nitrated phenol—three nitro groups on a strongly activated ring.",
      source: "7B Phenol"
    }
  ];

  window.BENCH_DATA.rewards = {
    case: {
      id: "organic-case",
      name: "The Organic Chemistry Case",
      tagline: "16 compounds · 5 rarities · one bench",
      cost: 30,
      duplicateRefunds: {
        common: 2,
        uncommon: 3,
        rare: 5,
        epic: 8,
        legendary: 15
      }
    },
    rarities,
    items
  };
})();
