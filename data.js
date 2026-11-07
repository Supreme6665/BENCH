/* BENCH — data compiled from the H2 Organic Chemistry notes in this folder.
   Every compound, reagent, reaction, mission and concept question below is traceable
   to the 14 PDFs. The source chapter is noted on mission debriefs and concept answers. */

window.BENCH_DATA = {
  compounds: {
    benzene: {
      name: "benzene",
      formula: "C₆H₆",
      structure: "a planar six-membered ring with delocalised π electrons",
      groups: ["arene"],
      note: "Aromatic and electron-rich, but less reactive than an alkene: it undergoes electrophilic substitution, not addition, to preserve aromaticity."
    },
    ethane: {
      name: "ethane",
      formula: "C₂H₆",
      structure: "CH₃–CH₃",
      groups: ["alkane"],
      note: "A saturated hydrocarbon. It only reacts with halogens under UV light (free-radical substitution)."
    },
    ethene: {
      name: "ethene",
      formula: "C₂H₄",
      structure: "CH₂=CH₂",
      groups: ["alkene"],
      note: "An electron-rich C=C bond; it undergoes electrophilic addition."
    },
    propane: {
      name: "propane",
      formula: "C₃H₈",
      structure: "CH₃CH₂CH₃",
      groups: ["alkane"],
      note: "A saturated hydrocarbon, inert to polar reagents."
    },
    propene: {
      name: "propene",
      formula: "C₃H₆",
      structure: "CH₃–CH=CH₂",
      groups: ["alkene"],
      note: "An unsymmetrical alkene. Additions follow Markovnikov's rule."
    },
    bromoethane: {
      name: "bromoethane",
      formula: "C₂H₅Br",
      structure: "CH₃CH₂–Br",
      groups: ["halogenoalkane"],
      note: "A primary halogenoalkane. The C–Br bond is polar and open to nucleophilic substitution."
    },
    chloroethane: {
      name: "chloroethane",
      formula: "C₂H₅Cl",
      structure: "CH₃CH₂–Cl",
      groups: ["halogenoalkane"],
      note: "A primary halogenoalkane."
    },
    iodoethane: {
      name: "iodoethane",
      formula: "C₂H₅I",
      structure: "CH₃CH₂–I",
      groups: ["halogenoalkane"],
      note: "A primary halogenoalkane; the C–I bond is the weakest of the three halides."
    },
    "1-bromopropane": {
      name: "1-bromopropane",
      formula: "C₃H₇Br",
      structure: "CH₃CH₂CH₂–Br",
      groups: ["halogenoalkane"],
      note: "A primary halogenoalkane."
    },
    "2-bromopropane": {
      name: "2-bromopropane",
      formula: "C₃H₇Br",
      structure: "CH₃–CH(Br)–CH₃",
      groups: ["halogenoalkane"],
      note: "A secondary halogenoalkane. It can hydrolyse by SN1 or SN2."
    },
    "1-chloropropane": {
      name: "1-chloropropane",
      formula: "C₃H₇Cl",
      structure: "CH₃CH₂CH₂–Cl",
      groups: ["halogenoalkane"],
      note: "A primary halogenoalkane."
    },
    "2-chloropropane": {
      name: "2-chloropropane",
      formula: "C₃H₇Cl",
      structure: "CH₃–CH(Cl)–CH₃",
      groups: ["halogenoalkane"],
      note: "A secondary halogenoalkane."
    },
    "1,2-dibromoethane": {
      name: "1,2-dibromoethane",
      formula: "C₂H₄Br₂",
      structure: "BrCH₂–CH₂Br",
      groups: ["halogenoalkane"],
      note: "Two C–Br bonds; both can undergo nucleophilic substitution."
    },
    "1,2-dibromopropane": {
      name: "1,2-dibromopropane",
      formula: "C₃H₆Br₂",
      structure: "CH₃–CH(Br)–CH₂Br",
      groups: ["halogenoalkane"],
      note: "The dibromide formed by addition of Br₂ to propene."
    },
    "2-bromoethanol": {
      name: "2-bromoethanol",
      formula: "C₂H₅BrO",
      structure: "BrCH₂–CH₂OH",
      groups: ["halogenoalkane", "alcohol"],
      note: "The major bromohydrin from ethene and aqueous bromine."
    },
    "1-bromo-2-propanol": {
      name: "1-bromo-2-propanol",
      formula: "C₃H₇BrO",
      structure: "CH₃–CH(OH)–CH₂Br",
      groups: ["halogenoalkane", "alcohol"],
      note: "The Markovnikov bromohydrin from propene and aqueous bromine."
    },
    chloromethylbenzene: {
      name: "chloromethylbenzene (benzyl chloride)",
      formula: "C₇H₇Cl",
      structure: "C₆H₅–CH₂Cl",
      groups: ["halogenoalkane", "arene"],
      note: "The side-chain chlorination product of methylbenzene."
    },
    bromomethylbenzene: {
      name: "bromomethylbenzene (benzyl bromide)",
      formula: "C₇H₇Br",
      structure: "C₆H₅–CH₂Br",
      groups: ["halogenoalkane", "arene"],
      note: "The side-chain bromination product of methylbenzene."
    },
    ethanol: {
      name: "ethanol",
      formula: "C₂H₆O",
      structure: "CH₃CH₂–OH",
      groups: ["alcohol"],
      note: "A primary alcohol. The O–H bond can be cleaved (redox, esterification) or the C–O bond can be cleaved (substitution, elimination)."
    },
    "propan-1-ol": {
      name: "propan-1-ol",
      formula: "C₃H₈O",
      structure: "CH₃CH₂CH₂–OH",
      groups: ["alcohol"],
      note: "A primary alcohol."
    },
    "propan-2-ol": {
      name: "propan-2-ol",
      formula: "C₃H₈O",
      structure: "CH₃–CH(OH)–CH₃",
      groups: ["alcohol"],
      note: "A secondary alcohol."
    },
    "ethane-1,2-diol": {
      name: "ethane-1,2-diol",
      formula: "C₂H₆O₂",
      structure: "HOCH₂–CH₂OH",
      groups: ["alcohol"],
      note: "The diol formed by mild oxidation of ethene."
    },
    "propane-1,2-diol": {
      name: "propane-1,2-diol",
      formula: "C₃H₈O₂",
      structure: "CH₃–CH(OH)–CH₂OH",
      groups: ["alcohol"],
      note: "The diol formed by mild oxidation of propene."
    },
    "2-methylpropan-2-ol": {
      name: "2-methylpropan-2-ol",
      formula: "C₄H₁₀O",
      structure: "(CH₃)₃C–OH",
      groups: ["alcohol"],
      note: "A tertiary alcohol; resistant to oxidation."
    },
    phenol: {
      name: "phenol",
      formula: "C₆H₆O",
      structure: "C₆H₅–OH",
      groups: ["phenol"],
      note: "The –OH lone pair is delocalised into the ring. Phenol is weakly acidic and the ring is strongly activated."
    },
    "sodium phenoxide": {
      name: "sodium phenoxide",
      formula: "C₆H₅ONa",
      structure: "C₆H₅–O⁻Na⁺",
      groups: ["phenoxide"],
      note: "The conjugate base of phenol. The oxygen is more electron-rich, so it is a stronger nucleophile than phenol."
    },
    "sodium ethoxide": {
      name: "sodium ethoxide",
      formula: "C₂H₅ONa",
      structure: "C₂H₅–O⁻Na⁺",
      groups: ["alkoxide"],
      note: "Formed when sodium reacts with ethanol; H₂ is liberated."
    },
    ethanal: {
      name: "ethanal",
      formula: "C₂H₄O",
      structure: "CH₃–CHO",
      groups: ["aldehyde"],
      note: "An aldehyde. It is easily oxidised to ethanoic acid and gives a positive Tollens' and Fehling's test."
    },
    propanal: {
      name: "propanal",
      formula: "C₃H₆O",
      structure: "CH₃CH₂–CHO",
      groups: ["aldehyde"],
      note: "An aliphatic aldehyde."
    },
    propanone: {
      name: "propanone",
      formula: "C₃H₆O",
      structure: "CH₃–CO–CH₃",
      groups: ["ketone"],
      note: "A ketone. It resists oxidation but is reduced to propan-2-ol and gives a positive iodoform test."
    },
    benzaldehyde: {
      name: "benzaldehyde",
      formula: "C₇H₆O",
      structure: "C₆H₅–CHO",
      groups: ["aldehyde", "arene"],
      note: "An aromatic aldehyde. It gives a Tollens' mirror but not a Fehling's precipitate."
    },
    "ethanoic acid": {
      name: "ethanoic acid",
      formula: "C₂H₄O₂",
      structure: "CH₃–CO₂H",
      groups: ["carboxylic acid"],
      note: "A weak carboxylic acid. It reacts with NaHCO₃/Na₂CO₃ to give CO₂."
    },
    "propanoic acid": {
      name: "propanoic acid",
      formula: "C₃H₆O₂",
      structure: "CH₃CH₂–CO₂H",
      groups: ["carboxylic acid"],
      note: "A carboxylic acid."
    },
    "butanoic acid": {
      name: "butanoic acid",
      formula: "C₄H₈O₂",
      structure: "CH₃CH₂CH₂–CO₂H",
      groups: ["carboxylic acid"],
      note: "A carboxylic acid."
    },
    "benzoic acid": {
      name: "benzoic acid",
      formula: "C₇H₆O₂",
      structure: "C₆H₅–CO₂H",
      groups: ["carboxylic acid", "arene"],
      note: "An aromatic carboxylic acid. The –CO₂H group is meta-directing and deactivating."
    },
    "2-hydroxypropanoic acid": {
      name: "2-hydroxypropanoic acid (lactic acid)",
      formula: "C₃H₆O₃",
      structure: "CH₃–CH(OH)–CO₂H",
      groups: ["carboxylic acid", "alcohol"],
      note: "An α-hydroxy acid formed by hydrolysing a cyanohydrin."
    },
    "2-hydroxybutanoic acid": {
      name: "2-hydroxybutanoic acid",
      formula: "C₄H₈O₃",
      structure: "CH₃CH₂–CH(OH)–CO₂H",
      groups: ["carboxylic acid", "alcohol"],
      note: "An α-hydroxy acid."
    },
    "2-hydroxy-2-methylpropanoic acid": {
      name: "2-hydroxy-2-methylpropanoic acid",
      formula: "C₄H₈O₃",
      structure: "(CH₃)₂C(OH)–CO₂H",
      groups: ["carboxylic acid", "alcohol"],
      note: "The α-hydroxy acid from propanone cyanohydrin."
    },
    "mandelic acid": {
      name: "mandelic acid",
      formula: "C₈H₈O₃",
      structure: "C₆H₅–CH(OH)–CO₂H",
      groups: ["carboxylic acid", "alcohol", "arene"],
      note: "The α-hydroxy acid from benzaldehyde cyanohydrin."
    },
    "butanedioic acid": {
      name: "butanedioic acid",
      formula: "C₄H₆O₄",
      structure: "HO₂C–CH₂–CH₂–CO₂H",
      groups: ["carboxylic acid"],
      note: "A dicarboxylic acid made by hydrolysing butanedinitrile."
    },
    "4-nitrobenzoic acid": {
      name: "4-nitrobenzoic acid",
      formula: "C₇H₅NO₄",
      structure: "4-O₂N–C₆H₄–CO₂H",
      groups: ["carboxylic acid", "arene"],
      note: "The –NO₂ group is meta-directing; the –CO₂H is para to it in this product."
    },
    "ethanoyl chloride": {
      name: "ethanoyl chloride",
      formula: "C₂H₃ClO",
      structure: "CH₃–COCl",
      groups: ["acyl chloride"],
      note: "A highly reactive acyl chloride. It fumes in moist air and hydrolyses readily."
    },
    "propanoyl chloride": {
      name: "propanoyl chloride",
      formula: "C₃H₅ClO",
      structure: "CH₃CH₂–COCl",
      groups: ["acyl chloride"],
      note: "An acyl chloride."
    },
    "benzoyl chloride": {
      name: "benzoyl chloride",
      formula: "C₇H₅ClO",
      structure: "C₆H₅–COCl",
      groups: ["acyl chloride", "arene"],
      note: "An aromatic acyl chloride."
    },
    ethanamide: {
      name: "ethanamide",
      formula: "C₂H₅NO",
      structure: "CH₃–CONH₂",
      groups: ["amide"],
      note: "A primary amide. It is neutral and is hydrolysed by hot aqueous acid or alkali."
    },
    propanamide: {
      name: "propanamide",
      formula: "C₃H₇NO",
      structure: "CH₃CH₂–CONH₂",
      groups: ["amide"],
      note: "A primary amide."
    },
    benzamide: {
      name: "benzamide",
      formula: "C₇H₇NO",
      structure: "C₆H₅–CONH₂",
      groups: ["amide", "arene"],
      note: "An aromatic amide."
    },
    "N-phenylethanamide": {
      name: "N-phenylethanamide (acetanilide)",
      formula: "C₈H₉NO",
      structure: "C₆H₅–NH–CO–CH₃",
      groups: ["amide", "arene"],
      note: "The amide formed when phenylamine is acylated by ethanoyl chloride."
    },
    "N-ethylethanamide": {
      name: "N-ethylethanamide",
      formula: "C₄H₉NO",
      structure: "CH₃–CO–NH–CH₂CH₃",
      groups: ["amide"],
      note: "A secondary amide."
    },
    "ethyl ethanoate": {
      name: "ethyl ethanoate",
      formula: "C₄H₈O₂",
      structure: "CH₃–CO₂–CH₂CH₃",
      groups: ["ester"],
      note: "An ester with a sweet fruity smell."
    },
    "methyl ethanoate": {
      name: "methyl ethanoate",
      formula: "C₃H₆O₂",
      structure: "CH₃–CO₂–CH₃",
      groups: ["ester"],
      note: "An ester."
    },
    "methyl benzoate": {
      name: "methyl benzoate",
      formula: "C₈H₈O₂",
      structure: "C₆H₅–CO₂–CH₃",
      groups: ["ester", "arene"],
      note: "An aromatic ester."
    },
    "ethyl benzoate": {
      name: "ethyl benzoate",
      formula: "C₉H₁₀O₂",
      structure: "C₆H₅–CO₂–CH₂CH₃",
      groups: ["ester", "arene"],
      note: "An aromatic ester."
    },
    "phenyl ethanoate": {
      name: "phenyl ethanoate (phenyl acetate)",
      formula: "C₈H₈O₂",
      structure: "CH₃–CO₂–C₆H₅",
      groups: ["ester", "arene"],
      note: "A phenyl ester. It is made from phenoxide and an acyl chloride, not from phenol and a carboxylic acid."
    },
    propanenitrile: {
      name: "propanenitrile",
      formula: "C₃H₅N",
      structure: "CH₃CH₂–C≡N",
      groups: ["nitrile"],
      note: "A nitrile. Hydrolysis gives propanoic acid; reduction gives propylamine."
    },
    butanenitrile: {
      name: "butanenitrile",
      formula: "C₄H₇N",
      structure: "CH₃CH₂CH₂–C≡N",
      groups: ["nitrile"],
      note: "A nitrile."
    },
    "2-methylpropanenitrile": {
      name: "2-methylpropanenitrile",
      formula: "C₄H₇N",
      structure: "(CH₃)₂CH–C≡N",
      groups: ["nitrile"],
      note: "A branched nitrile."
    },
    butanedinitrile: {
      name: "butanedinitrile",
      formula: "C₄H₄N₂",
      structure: "N≡C–CH₂–CH₂–C≡N",
      groups: ["nitrile"],
      note: "A dinitrile. Hydrolysis gives butanedioic acid."
    },
    "2-hydroxypropanenitrile": {
      name: "2-hydroxypropanenitrile",
      formula: "C₃H₅NO",
      structure: "CH₃–CH(OH)–C≡N",
      groups: ["nitrile", "alcohol"],
      note: "The cyanohydrin from ethanal."
    },
    "2-hydroxybutanenitrile": {
      name: "2-hydroxybutanenitrile",
      formula: "C₄H₇NO",
      structure: "CH₃CH₂–CH(OH)–C≡N",
      groups: ["nitrile", "alcohol"],
      note: "The cyanohydrin from propanal."
    },
    "2-hydroxy-2-methylpropanenitrile": {
      name: "2-hydroxy-2-methylpropanenitrile",
      formula: "C₄H₇NO",
      structure: "(CH₃)₂C(OH)–C≡N",
      groups: ["nitrile", "alcohol"],
      note: "The cyanohydrin from propanone."
    },
    mandelonitrile: {
      name: "mandelonitrile",
      formula: "C₈H₇NO",
      structure: "C₆H₅–CH(OH)–C≡N",
      groups: ["nitrile", "alcohol", "arene"],
      note: "The cyanohydrin from benzaldehyde."
    },
    ethylamine: {
      name: "ethylamine",
      formula: "C₂H₇N",
      structure: "CH₃CH₂–NH₂",
      groups: ["amine"],
      note: "A primary aliphatic amine. The lone pair on N makes it basic and nucleophilic."
    },
    propylamine: {
      name: "propylamine",
      formula: "C₃H₉N",
      structure: "CH₃CH₂CH₂–NH₂",
      groups: ["amine"],
      note: "A primary aliphatic amine."
    },
    "propan-2-amine": {
      name: "propan-2-amine",
      formula: "C₃H₉N",
      structure: "CH₃–CH(NH₂)–CH₃",
      groups: ["amine"],
      note: "A primary aliphatic amine."
    },
    benzylamine: {
      name: "benzylamine",
      formula: "C₇H₉N",
      structure: "C₆H₅–CH₂–NH₂",
      groups: ["amine", "arene"],
      note: "A primary amine."
    },
    phenylamine: {
      name: "phenylamine (aniline)",
      formula: "C₆H₇N",
      structure: "C₆H₅–NH₂",
      groups: ["amine", "arene"],
      note: "An aromatic amine. The N lone pair is delocalised into the ring: it is a weaker base than ammonia but strongly activates the ring."
    },
    "phenylammonium chloride": {
      name: "phenylammonium chloride",
      formula: "C₆H₈ClN",
      structure: "C₆H₅–NH₃⁺Cl⁻",
      groups: ["ammonium salt"],
      note: "The salt formed when phenylamine reacts with HCl."
    },
    "phenylammonium nitrate": {
      name: "phenylammonium nitrate",
      formula: "C₆H₈N₂O₃",
      structure: "C₆H₅–NH₃⁺NO₃⁻",
      groups: ["ammonium salt"],
      note: "The salt formed when phenylamine acts as a base towards nitric acid; this is acid–base chemistry, not ring nitration."
    },
    "ethylammonium chloride": {
      name: "ethylammonium chloride",
      formula: "C₂H₈ClN",
      structure: "CH₃CH₂–NH₃⁺Cl⁻",
      groups: ["ammonium salt"],
      note: "The salt formed when ethylamine reacts with HCl."
    },
    "tetraethylammonium bromide": {
      name: "tetraethylammonium bromide",
      formula: "C₈H₂₀BrN",
      structure: "(CH₃CH₂)₄N⁺Br⁻",
      groups: ["quaternary ammonium salt"],
      note: "The quaternary salt formed when excess bromoethane reacts with ethylamine."
    },
    nitrobenzene: {
      name: "nitrobenzene",
      formula: "C₆H₅NO₂",
      structure: "C₆H₅–NO₂",
      groups: ["arene"],
      note: "The –NO₂ group is strongly deactivating and meta-directing."
    },
    "3-bromonitrobenzene": {
      name: "3-bromonitrobenzene",
      formula: "C₆H₄BrNO₂",
      structure: "3-Br–C₆H₄–NO₂",
      groups: ["arene"],
      note: "The meta product from brominating nitrobenzene."
    },
    "4-bromonitrobenzene": {
      name: "4-bromonitrobenzene",
      formula: "C₆H₄BrNO₂",
      structure: "4-Br–C₆H₄–NO₂",
      groups: ["arene"],
      note: "The major product from nitrating bromobenzene; Br is 2,4-directing."
    },
    "1,3-dinitrobenzene": {
      name: "1,3-dinitrobenzene",
      formula: "C₆H₄N₂O₄",
      structure: "1,3-C₆H₄(NO₂)₂",
      groups: ["arene"],
      note: "A second nitro group enters meta to the first because –NO₂ is meta-directing."
    },
    bromobenzene: {
      name: "bromobenzene",
      formula: "C₆H₅Br",
      structure: "C₆H₅–Br",
      groups: ["arene", "halogenoarene"],
      note: "The halogen is attached directly to the ring; the C–Br bond is resistant to hydrolysis."
    },
    chlorobenzene: {
      name: "chlorobenzene",
      formula: "C₆H₅Cl",
      structure: "C₆H₅–Cl",
      groups: ["arene", "halogenoarene"],
      note: "The C–Cl bond has partial double-bond character; hydrolysis is very difficult."
    },
    methylbenzene: {
      name: "methylbenzene (toluene)",
      formula: "C₇H₈",
      structure: "C₆H₅–CH₃",
      groups: ["arene", "alkane"],
      note: "The methyl group is weakly activating and 2,4-directing; the side chain can be oxidised or halogenated."
    },
    "4-nitromethylbenzene": {
      name: "4-nitromethylbenzene",
      formula: "C₇H₇NO₂",
      structure: "4-O₂N–C₆H₄–CH₃",
      groups: ["arene", "alkane"],
      note: "The major nitration product of methylbenzene; the methyl group is 2,4-directing."
    },
    "2-nitromethylbenzene": {
      name: "2-nitromethylbenzene",
      formula: "C₇H₇NO₂",
      structure: "2-O₂N–C₆H₄–CH₃",
      groups: ["arene", "alkane"],
      note: "The minor nitration product of methylbenzene."
    },
    "4-bromomethylbenzene": {
      name: "4-bromomethylbenzene",
      formula: "C₇H₇Br",
      structure: "4-Br–C₆H₄–CH₃",
      groups: ["arene", "halogenoarene"],
      note: "The major ring-bromination product of methylbenzene."
    },
    "4-chloromethylbenzene": {
      name: "4-chloromethylbenzene",
      formula: "C₇H₇Cl",
      structure: "4-Cl–C₆H₄–CH₃",
      groups: ["arene", "halogenoarene"],
      note: "The major ring-chlorination product of methylbenzene."
    },
    "2,4,6-tribromophenol": {
      name: "2,4,6-tribromophenol",
      formula: "C₆H₃Br₃O",
      structure: "2,4,6-Br₃–C₆H₂–OH",
      groups: ["phenol", "halogenoarene"],
      note: "A white precipitate formed when phenol reacts with aqueous bromine."
    },
    "2,4,6-tribromophenylamine": {
      name: "2,4,6-tribromophenylamine",
      formula: "C₆H₄Br₃N",
      structure: "2,4,6-Br₃–C₆H₂–NH₂",
      groups: ["amine", "halogenoarene"],
      note: "A white precipitate formed when phenylamine reacts with aqueous bromine."
    },
    "4-bromophenol": {
      name: "4-bromophenol",
      formula: "C₆H₅BrO",
      structure: "4-Br–C₆H₄–OH",
      groups: ["phenol", "halogenoarene"],
      note: "A monobromination product of phenol in an organic solvent."
    },
    "4-bromophenylamine": {
      name: "4-bromophenylamine",
      formula: "C₆H₆BrN",
      structure: "4-Br–C₆H₄–NH₂",
      groups: ["amine", "halogenoarene"],
      note: "A monobromination product of phenylamine in an organic solvent."
    },
    phenylacetonitrile: {
      name: "phenylacetonitrile",
      formula: "C₈H₇N",
      structure: "C₆H₅–CH₂–C≡N",
      groups: ["nitrile", "arene"],
      note: "The nitrile formed by substituting the benzylic chloride with cyanide."
    },
    "2-chloro-2-methylpropane": {
      name: "2-chloro-2-methylpropane",
      formula: "C₄H₉Cl",
      structure: "(CH₃)₃C–Cl",
      groups: ["halogenoalkane"],
      note: "A tertiary halogenoalkane, formed by SN1 substitution of the tertiary alcohol."
    },
    "sodium butanedioate": {
      name: "sodium butanedioate",
      formula: "C₄H₄Na₂O₄",
      structure: "⁻O₂C–CH₂–CH₂–CO₂⁻Na₂⁺",
      groups: ["carboxylate salt"],
      note: "The dicarboxylate salt formed by alkaline hydrolysis of butanedinitrile."
    },
    "N-propylethanamide": {
      name: "N-propylethanamide",
      formula: "C₅H₁₁NO",
      structure: "CH₃–CO–NH–CH₂CH₂CH₃",
      groups: ["amide"],
      note: "The secondary amide formed from propan-1-amine and ethanoyl chloride."
    },
    "2-nitrophenol": {
      name: "2-nitrophenol",
      formula: "C₆H₅NO₃",
      structure: "2-O₂N–C₆H₄–OH",
      groups: ["phenol", "arene"],
      note: "A mononitration product of phenol."
    },
    "4-nitrophenol": {
      name: "4-nitrophenol",
      formula: "C₆H₅NO₃",
      structure: "4-O₂N–C₆H₄–OH",
      groups: ["phenol", "arene"],
      note: "A mononitration product of phenol."
    },
    "2,4,6-trinitrophenol": {
      name: "2,4,6-trinitrophenol (picric acid)",
      formula: "C₆H₃N₃O₇",
      structure: "2,4,6-(NO₂)₃–C₆H₂–OH",
      groups: ["phenol", "arene"],
      note: "The tri-nitration product of phenol with concentrated nitric acid."
    },
    "sodium ethanoate": {
      name: "sodium ethanoate",
      formula: "C₂H₃NaO₂",
      structure: "CH₃CO₂⁻Na⁺",
      groups: ["carboxylate salt"],
      note: "The salt formed when ethanoic acid is neutralised or when an ethanoate ester/amide is hydrolysed in alkali."
    },
    "sodium propanoate": {
      name: "sodium propanoate",
      formula: "C₃H₅NaO₂",
      structure: "CH₃CH₂CO₂⁻Na⁺",
      groups: ["carboxylate salt"],
      note: "The salt formed by alkaline hydrolysis of propanenitrile."
    },
    "sodium benzoate": {
      name: "sodium benzoate",
      formula: "C₇H₅NaO₂",
      structure: "C₆H₅CO₂⁻Na⁺",
      groups: ["carboxylate salt"],
      note: "The salt formed when benzoic acid is neutralised."
    },
    "ammonium ethanoate": {
      name: "ammonium ethanoate",
      formula: "C₂H₇NO₂",
      structure: "CH₃CO₂⁻NH₄⁺",
      groups: ["ammonium salt"],
      note: "The salt formed when ethanoic acid reacts with ammonia; no amide is formed."
    },
    "ammonium benzoate": {
      name: "ammonium benzoate",
      formula: "C₇H₇NO₂",
      structure: "C₆H₅CO₂⁻NH₄⁺",
      groups: ["ammonium salt"],
      note: "The salt formed when benzoic acid reacts with ammonia."
    },
    "benzyl alcohol": {
      name: "benzyl alcohol",
      formula: "C₇H₈O",
      structure: "C₆H₅–CH₂OH",
      groups: ["alcohol", "arene"],
      note: "The primary alcohol formed by reducing benzaldehyde."
    }
  },

  /* SMILES used to render the skeletal structure diagrams. Only compounds
     that appear as a current vessel or target in a mission need an entry. */
  smiles: {
    "ethanol": "CCO",
    "ethanal": "CC=O",
    "ethanoic acid": "CC(=O)O",
    "ethanoyl chloride": "CC(=O)Cl",
    "ethanamide": "CC(=O)N",
    "propene": "CC=C",
    "2-bromopropane": "CC(Br)C",
    "propan-2-ol": "CC(O)C",
    "benzene": "c1ccccc1",
    "nitrobenzene": "O=[N+]([O-])c1ccccc1",
    "3-bromonitrobenzene": "O=[N+]([O-])c1cc(Br)ccc1",
    "phenol": "Oc1ccccc1",
    "2,4,6-tribromophenol": "Oc1c(Br)cc(Br)cc1Br",
    "methylbenzene": "Cc1ccccc1",
    "benzoic acid": "O=C(O)c1ccccc1",
    "methyl benzoate": "COC(=O)c1ccccc1",
    "bromoethane": "CCBr",
    "propanenitrile": "CCC#N",
    "propanoic acid": "CCC(=O)O",
    "phenylamine": "Nc1ccccc1",
    "2,4,6-tribromophenylamine": "Nc1c(Br)cc(Br)cc1Br",
    "propanone": "CC(=O)C",
    "2-hydroxy-2-methylpropanenitrile": "CC(C)(O)C#N",
    "2-hydroxy-2-methylpropanoic acid": "CC(C)(O)C(=O)O",
    "N-phenylethanamide": "CC(=O)Nc1ccccc1",
    "1,2-dibromoethane": "BrCCBr",
    "butanedinitrile": "N#CCCC#N",
    "butanedioic acid": "O=C(O)CCC(=O)O",
    "4-nitromethylbenzene": "Cc1ccc([N+](=O)[O-])cc1",
    "4-nitrobenzoic acid": "O=C(O)c1ccc([N+](=O)[O-])cc1",
    "sodium phenoxide": "[Na+].[O-]c1ccccc1",
    "phenyl ethanoate": "CC(=O)Oc1ccccc1"
  },

  reagents: {
    oxid_kmno4_acid_hot: {
      label: "KMnO₄, H₂SO₄(aq), heat under reflux",
      short: "hot acidified KMnO₄",
      family: "Oxidation",
      aliases: ["kmno4 acid", "hot acidified kmno4", "acidified potassium manganate", "kmno4 h2so4 heat", "kmno4"],
      fail: "Hot acidified KMnO₄ is a strong oxidant. It cleaves C=C and over-oxidises aldehydes and primary alcohols to carboxylic acids."
    },
    oxid_k2cr2o7_heat: {
      label: "K₂Cr₂O₇, H₂SO₄(aq), heat under reflux",
      short: "hot acidified dichromate",
      family: "Oxidation",
      aliases: ["k2cr2o7 acid", "acidified dichromate", "k2cr2o7 h2so4 heat", "dichromate", "k2cr2o7"],
      fail: "Acidified dichromate under reflux is a strong oxidation. It will not stop at an aldehyde."
    },
    oxid_k2cr2o7_distil: {
      label: "K₂Cr₂O₇, H₂SO₄(aq), heat with immediate distillation",
      short: "controlled dichromate oxidation",
      family: "Oxidation",
      aliases: ["k2cr2o7 distillation", "acidified dichromate distillation", "distil", "distillation", "k2cr2o7 distil"],
      fail: "This is the controlled oxidation set-up: it is used to isolate an aldehyde from a primary alcohol before it is oxidised further."
    },
    oxid_kmno4_naoh_cold: {
      label: "KMnO₄, NaOH(aq), cold",
      short: "cold alkaline KMnO₄",
      family: "Oxidation",
      aliases: ["cold alkaline kmno4", "dilute kmno4 naoh", "kmno4 naoh cold", "mild oxidation"],
      fail: "Cold alkaline KMnO₄ oxidises C=C to a diol. It does not substitute or hydrolyse."
    },
    oxid_kmno4_naoh_hot: {
      label: "KMnO₄, NaOH(aq), heat; then H₂SO₄(aq)",
      short: "hot alkaline KMnO₄, then acidify",
      family: "Oxidation",
      aliases: ["alkaline kmno4 heat", "kmno4 naoh heat", "side chain oxidation alkaline", "kmno4 naoh hot"],
      fail: "Hot alkaline KMnO₄ oxidises an alkyl side-chain to the benzoate salt. You must acidify afterwards to get the acid."
    },
    red_h2_ni: {
      label: "H₂(g), Ni catalyst, heat",
      short: "catalytic hydrogenation",
      family: "Reduction",
      aliases: ["h2 ni", "hydrogen nickel", "catalytic hydrogenation", "h2 pt", "h2 palladium", "h2"],
      fail: "H₂/Ni reduces C=C, C=O and C≡N, but it does not reduce –CO₂H, amides or nitrobenzene."
    },
    red_lialh4: {
      label: "LiAlH₄ in dry ether",
      short: "lithium aluminium hydride",
      family: "Reduction",
      aliases: ["lialh4", "lithium aluminium hydride", "lialh4 dry ether", "lialh4 ether"],
      fail: "LiAlH₄ reduces polar C=O, C≡N, –CO₂H and amides, but not C=C and not nitrobenzene."
    },
    red_sn_hcl: {
      label: "Sn, conc. HCl, heat; then excess NaOH(aq)",
      short: "tin and concentrated HCl",
      family: "Reduction",
      aliases: ["sn hcl", "tin hydrochloric acid", "sn conc hcl", "nitro reduction"],
      fail: "Sn/conc. HCl is the nitrobenzene → phenylamine reduction. It does nothing to C=O or C=C."
    },
    na_metal: {
      label: "Na(s), room temperature",
      short: "sodium metal",
      family: "Redox / acid–base",
      aliases: ["na", "sodium", "sodium metal", "na s"],
      fail: "Na(s) reacts with –OH or –CO₂H to liberate H₂. It does not oxidise or reduce a carbon skeleton."
    },
    naoh_aq: {
      label: "NaOH(aq), room temperature",
      short: "aqueous sodium hydroxide",
      family: "Acid–base / hydrolysis",
      aliases: ["naoh aq", "aqueous naoh", "naoh", "sodium hydroxide", "koh aq"],
      fail: "Aqueous NaOH neutralises acids and phenols. Without heat it will not hydrolyse an ester, amide or halogenoalkane."
    },
    naoh_aq_heat: {
      label: "NaOH(aq), heat",
      short: "aqueous NaOH with heat",
      family: "Nucleophilic substitution / hydrolysis",
      aliases: ["naoh aq heat", "aqueous naoh heat", "alkaline hydrolysis", "naoh heat", "koh aq heat"],
      fail: "Aqueous NaOH + heat does nucleophilic substitution or hydrolysis. It is not the elimination recipe."
    },
    naoh_etoh_heat: {
      label: "NaOH in ethanol, heat",
      short: "ethanolic NaOH",
      family: "Elimination",
      aliases: ["naoh etoh", "ethanolic naoh", "koh ethanol", "alcoholic koh", "naoh in ethanol"],
      fail: "Ethanolic NaOH + heat is the elimination recipe: it removes HX and gives an alkene."
    },
    hbr_gas: {
      label: "HBr(g)",
      short: "hydrogen bromide gas",
      family: "Electrophilic addition / substitution",
      aliases: ["hbr", "hydrogen bromide", "hbr gas", "hbr g"],
      fail: "HBr(g) adds across C=C or substitutes an alcohol –OH. It is not an oxidant or reductant."
    },
    hcl_gas: {
      label: "HCl(g)",
      short: "hydrogen chloride gas",
      family: "Electrophilic addition / substitution",
      aliases: ["hcl", "hydrogen chloride", "hcl gas", "hcl g"],
      fail: "HCl(g) adds across C=C or substitutes an alcohol –OH. It will not convert a carboxylic acid to an acyl chloride."
    },
    pcl5: {
      label: "PCl₅, anhydrous, room temperature",
      short: "phosphorus pentachloride",
      family: "Substitution",
      aliases: ["pcl5", "phosphorus pentachloride", "pcl5 anhydrous"],
      fail: "PCl₅ converts –OH to –Cl in alcohols and carboxylic acids. Anhydrous conditions are required."
    },
    pcl3: {
      label: "PCl₃, anhydrous, room temperature",
      short: "phosphorus trichloride",
      family: "Substitution",
      aliases: ["pcl3", "phosphorus trichloride", "pcl3 anhydrous"],
      fail: "PCl₃ converts –OH to –Cl in alcohols and carboxylic acids. Anhydrous conditions are required."
    },
    socl2: {
      label: "SOCl₂, anhydrous, room temperature",
      short: "thionyl chloride",
      family: "Substitution",
      aliases: ["socl2", "thionyl chloride", "socl2 anhydrous"],
      fail: "SOCl₂ converts –OH to –Cl in alcohols and carboxylic acids. Anhydrous conditions are required."
    },
    br2_ccl4: {
      label: "Br₂ in CCl₄",
      short: "bromine in an inert solvent",
      family: "Electrophilic addition / substitution",
      aliases: ["br2 ccl4", "bromine ccl4", "br2 in ccl4", "bromine in ccl4"],
      fail: "Br₂ in CCl₄ adds across C=C. Arenes need a Lewis-acid catalyst; phenol and phenylamine need no catalyst but give substitution."
    },
    br2_water: {
      label: "Br₂(aq)",
      short: "bromine water",
      family: "Electrophilic addition / substitution",
      aliases: ["br2 aq", "bromine water", "aqueous bromine", "br2 water"],
      fail: "Aqueous Br₂ adds to C=C (bromohydrin) and tri-brominates activated arenes. It is also the test for unsaturation."
    },
    br2_uv: {
      label: "Br₂, UV light",
      short: "bromine under UV",
      family: "Free-radical substitution",
      aliases: ["br2 uv", "bromine uv", "br2 light", "uv bromine"],
      fail: "UV light starts free-radical substitution at a C–H bond. It does not do electrophilic aromatic substitution."
    },
    cl2_uv: {
      label: "Cl₂(g), UV light",
      short: "chlorine under UV",
      family: "Free-radical substitution",
      aliases: ["cl2 uv", "chlorine uv", "cl2 light", "uv chlorine"],
      fail: "UV light starts free-radical substitution at an alkane or alkyl side-chain C–H bond."
    },
    br2_febr3: {
      label: "Br₂, anhydrous FeBr₃, heat",
      short: "bromine with iron(III) bromide",
      family: "Electrophilic aromatic substitution",
      aliases: ["br2 febr3", "bromine febr3", "br2 fe br3", "bromine iron bromide"],
      fail: "Br₂/FeBr₃ is electrophilic aromatic substitution. It needs an arene, not an alkene or alcohol."
    },
    cl2_fecl3: {
      label: "Cl₂, anhydrous FeCl₃",
      short: "chlorine with iron(III) chloride",
      family: "Electrophilic aromatic substitution",
      aliases: ["cl2 fecl3", "chlorine fecl3", "cl2 alcl3", "chlorine iron chloride"],
      fail: "Cl₂/FeCl₃ is electrophilic aromatic substitution. It needs an arene, not an alkene or alcohol."
    },
    hno3_h2so4_50: {
      label: "conc. HNO₃ + conc. H₂SO₄, 50 °C",
      short: "nitrating mixture at 50 °C",
      family: "Electrophilic aromatic substitution",
      aliases: ["hno3 h2so4 50", "nitrating mixture 50", "conc nitric sulfuric 50", "nitration 50"],
      fail: "This is the benzene nitration mixture at 50 °C. Alkylbenzenes are nitrated at 30 °C."
    },
    hno3_h2so4_30: {
      label: "conc. HNO₃ + conc. H₂SO₄, 30 °C",
      short: "nitrating mixture at 30 °C",
      family: "Electrophilic aromatic substitution",
      aliases: ["hno3 h2so4 30", "nitrating mixture 30", "conc nitric sulfuric 30", "nitration 30"],
      fail: "30 °C is the alkylbenzene nitration condition. Benzene needs 50 °C."
    },
    hno3_dilute: {
      label: "dilute HNO₃, room temperature",
      short: "dilute nitric acid",
      family: "Electrophilic aromatic substitution",
      aliases: ["dilute hno3", "dilute nitric acid", "hno3 dilute", "dilute nitric"],
      fail: "Dilute HNO₃ nitrates phenol under mild conditions. It is not the general nitrating mixture for benzene."
    },
    hno3_conc: {
      label: "conc. HNO₃, room temperature",
      short: "concentrated nitric acid",
      family: "Electrophilic aromatic substitution",
      aliases: ["conc hno3", "concentrated nitric acid", "hno3 conc", "conc nitric"],
      fail: "Conc. HNO₃ alone tri-nitrates phenol. Benzene needs conc. H₂SO₄ to generate NO₂⁺."
    },
    steam_h3po4: {
      label: "H₂O(g), H₃PO₄ catalyst, heat",
      short: "steam and phosphoric acid",
      family: "Electrophilic addition",
      aliases: ["steam h3po4", "h2o h3po4", "steam phosphoric acid", "hydration", "h3po4 steam"],
      fail: "Steam/H₃PO₄ hydrates C=C to an alcohol. It does not add HBr or oxidise."
    },
    h2so4_conc_heat: {
      label: "conc. H₂SO₄, heat",
      short: "concentrated sulfuric acid with heat",
      family: "Elimination / condensation",
      aliases: ["h2so4 conc heat", "conc h2so4 heat", "concentrated sulfuric acid heat", "h2so4 heat", "conc sulfuric heat"],
      fail: "Conc. H₂SO₄ + heat dehydrates an alcohol to an alkene or catalyses esterification. It is not an oxidant."
    },
    h3po4_heat: {
      label: "conc. H₃PO₄, heat",
      short: "concentrated phosphoric acid with heat",
      family: "Elimination",
      aliases: ["h3po4 heat", "conc h3po4", "phosphoric acid heat", "h3po4"],
      fail: "Conc. H₃PO₄ + heat dehydrates an alcohol to an alkene."
    },
    al2o3_heat: {
      label: "Al₂O₃(s), heat",
      short: "alumina with heat",
      family: "Elimination",
      aliases: ["al2o3", "alumina", "al2o3 heat", "aluminium oxide heat"],
      fail: "Al₂O₃ + heat dehydrates an alcohol to an alkene."
    },
    kcn_etoh: {
      label: "KCN (or NaCN) in ethanol, heat",
      short: "ethanolic potassium cyanide",
      family: "Nucleophilic substitution",
      aliases: ["kcn etoh", "ethanolic kcn", "kcn ethanol", "nacn ethanol", "kcn", "nacn", "cyanide"],
      fail: "Ethanolic KCN/NaCN does SN2 on a halogenoalkane (C–X → C–CN), extending the chain by one carbon."
    },
    nh3_etoh_sealed: {
      label: "excess NH₃ in ethanol, heat in sealed tube",
      short: "ethanolic ammonia",
      family: "Nucleophilic substitution",
      aliases: ["nh3 etoh", "ethanolic ammonia", "ammonia ethanol", "nh3 sealed tube", "ammonia sealed tube"],
      fail: "Excess ethanolic NH₃ in a sealed tube substitutes a halogenoalkane. It is not the reagent for acyl chlorides."
    },
    nh3_gas: {
      label: "NH₃(g)",
      short: "ammonia gas",
      family: "Condensation / acid–base",
      aliases: ["nh3 gas", "ammonia gas", "nh3 g", "ammonia"],
      fail: "NH₃(g) reacts with an acyl chloride to form an amide. With a carboxylic acid it only gives the ammonium salt."
    },
    ethylamine: {
      label: "ethylamine, room temperature",
      short: "ethylamine",
      family: "Condensation / acid–base",
      aliases: ["ethylamine", "ethanamine", "c2h5nh2", "rnh2"],
      fail: "An amine reacts with an acyl chloride to form an amide. With a carboxylic acid it only forms a salt."
    },
    hcn_cold: {
      label: "HCN, cold, trace NaOH",
      short: "hydrogen cyanide with a trace of base",
      family: "Nucleophilic addition",
      aliases: ["hcn", "hydrogen cyanide", "hcn cold", "hcn trace naoh", "cyanohydrin"],
      fail: "HCN with a trace of base adds to a carbonyl (C=O) to give a cyanohydrin. It does not hydrolyse nitriles."
    },
    tollens: {
      label: "Tollens' reagent, warm",
      short: "ammoniacal silver nitrate",
      family: "Test / oxidation",
      aliases: ["tollens", "tollens reagent", "silver mirror", "ammoniacal silver nitrate"],
      fail: "Tollens' reagent is an aldehyde test (silver mirror). It does not synthesise esters or amides."
    },
    fehling: {
      label: "Fehling's solution, warm",
      short: "alkaline copper(II) tartrate",
      family: "Test / oxidation",
      aliases: ["fehling", "fehlings", "fehling solution", "copper tartrate"],
      fail: "Fehling's solution is an aliphatic aldehyde test (brick-red Cu₂O). Benzaldehyde does not react."
    },
    dnph: {
      label: "2,4-DNPH",
      short: "2,4-dinitrophenylhydrazine",
      family: "Test",
      aliases: ["dnph", "2 4 dnph", "dinitrophenylhydrazine", "brady reagent"],
      fail: "2,4-DNPH condenses with aldehydes and ketones to give an orange precipitate. It is a test, not a synthesis step."
    },
    i2_naoh: {
      label: "I₂, NaOH(aq), warm",
      short: "alkaline iodine",
      family: "Test / redox",
      aliases: ["i2 naoh", "alkaline iodine", "iodoform", "triiodomethane", "i2"],
      fail: "I₂/NaOH is the iodoform test for CH₃CO– or CH₃CH(OH)–. It cleaves the molecule."
    },
    water_rt: {
      label: "H₂O(l), room temperature",
      short: "water",
      family: "Hydrolysis",
      aliases: ["water", "h2o", "h2o room temp", "water room temperature"],
      fail: "Water alone hydrolyses acyl chlorides at room temperature. It does not hydrolyse esters, amides or nitriles without acid/base and heat."
    },
    h2so4_aq_heat: {
      label: "H₂SO₄(aq), heat",
      short: "aqueous sulfuric acid with heat",
      family: "Hydrolysis",
      aliases: ["h2so4 aq heat", "aqueous h2so4 heat", "dilute h2so4 heat", "acid hydrolysis", "h2so4 aq"],
      fail: "Aqueous H₂SO₄ + heat hydrolyses nitriles, amides and esters. It does not reduce them."
    },
    hcl_aq: {
      label: "HCl(aq)",
      short: "hydrochloric acid",
      family: "Acid–base",
      aliases: ["hcl aq", "dilute hcl", "hydrochloric acid", "hcl solution"],
      fail: "HCl(aq) protonates amines or acidifies carboxylates. It is not the reagent for amide formation."
    },
    na2co3_aq: {
      label: "Na₂CO₃(aq) or NaHCO₃(aq)",
      short: "sodium carbonate / hydrogencarbonate",
      family: "Acid–base",
      aliases: ["na2co3", "nahco3", "sodium carbonate", "sodium bicarbonate", "sodium hydrogencarbonate", "carbonate"],
      fail: "Na₂CO₃/NaHCO₃ reacts with carboxylic acids (CO₂) and acid chlorides, but not with phenols or alcohols."
    },
    methanol_h2so4: {
      label: "methanol (excess), conc. H₂SO₄, heat under reflux",
      short: "Fischer esterification with methanol",
      family: "Condensation",
      aliases: ["methanol h2so4", "methanol sulfuric", "methyl esterification", "methanol ester"],
      fail: "Methanol + conc. H₂SO₄ is the Fischer esterification recipe for a methyl ester."
    },
    ethanol_h2so4: {
      label: "ethanol (excess), conc. H₂SO₄, heat under reflux",
      short: "Fischer esterification with ethanol",
      family: "Condensation",
      aliases: ["ethanol h2so4", "ethanol sulfuric", "ethyl esterification", "ethanol ester"],
      fail: "Ethanol + conc. H₂SO₄ is the Fischer esterification recipe for an ethyl ester."
    },
    ethanoic_acid_h2so4: {
      label: "ethanoic acid, conc. H₂SO₄, heat under reflux",
      short: "ethanoic acid with acid catalyst",
      family: "Condensation / acid–base",
      aliases: ["ethanoic acid h2so4", "acetic acid sulfuric", "ethanoic acid esterification"],
      fail: "Ethanoic acid + conc. H₂SO₄ esterifies an alcohol. With an amine it only forms a salt."
    },
    ethanoyl_chloride: {
      label: "ethanoyl chloride (CH₃COCl), room temperature",
      short: "ethanoyl chloride",
      family: "Condensation",
      aliases: ["ethanoyl chloride", "acetyl chloride", "ch3cocl", "ethanoyl"],
      fail: "Ethanoyl chloride acylates –OH or –NH₂ at room temperature. It is not an oxidant."
    },
    ethanol_rt: {
      label: "ethanol, room temperature",
      short: "ethanol",
      family: "Condensation",
      aliases: ["ethanol rt", "ethanol room temperature", "ethanol"],
      fail: "Ethanol at room temperature reacts with acyl chlorides (ester), but not with carboxylic acids without a catalyst."
    },
    methanol_rt: {
      label: "methanol, room temperature",
      short: "methanol",
      family: "Condensation",
      aliases: ["methanol rt", "methanol room temperature", "methanol"],
      fail: "Methanol at room temperature reacts with acyl chlorides (ester), but not with carboxylic acids without a catalyst."
    },
    alcl3_ch3cl: {
      label: "CH₃Cl, anhydrous AlCl₃",
      short: "Friedel–Crafts methylation",
      family: "Electrophilic aromatic substitution",
      aliases: ["alcl3 ch3cl", "ch3cl alcl3", "friedel crafts", "methyl chloride aluminium chloride"],
      fail: "CH₃Cl/AlCl₃ is Friedel–Crafts alkylation on an arene. It does not nitrate or oxidise."
    },
    excess_bromoethane: {
      label: "excess bromoethane, heat",
      short: "excess bromoethane",
      family: "Nucleophilic substitution",
      aliases: ["excess bromoethane", "bromoethane excess", "excess c2h5br"],
      fail: "Excess bromoethane alkylates an amine all the way to a quaternary ammonium salt."
    },
    fecl3: {
      label: "neutral FeCl₃(aq)",
      short: "iron(III) chloride test",
      family: "Test",
      aliases: ["fecl3", "iron iii chloride", "neutral fecl3", "phenol test"],
      fail: "Neutral FeCl₃(aq) is the phenol test (violet complex). It is not a synthesis reagent."
    }
  },

  reactions: [
    /* ---------- ALKANES / FREE RADICAL SUBSTITUTION ---------- */
    { from: "ethane", reagent: "br2_uv", to: "bromoethane", type: "Free-radical substitution",
      eq: "CH₃CH₃ + Br₂ → CH₃CH₂Br + HBr",
      note: "UV light produces Br radicals. Mono-substitution is favoured with limited Br₂, but a mixture is inevitable." },
    { from: "ethane", reagent: "cl2_uv", to: "chloroethane", type: "Free-radical substitution",
      eq: "CH₃CH₃ + Cl₂ → CH₃CH₂Cl + HCl",
      note: "Free-radical substitution; a mixture of mono- and poly-substituted products is formed." },
    { from: "methylbenzene", reagent: "cl2_uv", to: "chloromethylbenzene", type: "Free-radical substitution",
      eq: "C₆H₅CH₃ + Cl₂ → C₆H₅CH₂Cl + HCl",
      note: "UV light attacks the alkyl side chain, not the ring. With excess Cl₂, further side-chain substitution occurs." },
    { from: "methylbenzene", reagent: "br2_uv", to: "bromomethylbenzene", type: "Free-radical substitution",
      eq: "C₆H₅CH₃ + Br₂ → C₆H₅CH₂Br + HBr",
      note: "Side-chain free-radical substitution." },

    /* ---------- ALKENES ---------- */
    { from: "ethene", reagent: "red_h2_ni", to: "ethane", type: "Reduction (catalytic hydrogenation)",
      eq: "CH₂=CH₂ + H₂ → CH₃CH₃",
      note: "One mole of H₂ adds across the C=C bond." },
    { from: "ethene", reagent: "br2_ccl4", to: "1,2-dibromoethane", type: "Electrophilic addition",
      eq: "CH₂=CH₂ + Br₂ → BrCH₂CH₂Br",
      note: "The orange-red Br₂ colour is decolourised. The inert CCl₄ solvent does not participate." },
    { from: "ethene", reagent: "br2_water", to: "2-bromoethanol", type: "Electrophilic addition",
      eq: "CH₂=CH₂ + Br₂(aq) → BrCH₂CH₂OH + HBr",
      note: "Water competes with Br⁻ as the nucleophile in the second step, so the bromohydrin is the major product." },
    { from: "ethene", reagent: "hbr_gas", to: "bromoethane", type: "Electrophilic addition",
      eq: "CH₂=CH₂ + HBr → CH₃CH₂Br",
      note: "The π bond attacks H⁺, then Br⁻ attacks the carbocation." },
    { from: "ethene", reagent: "hcl_gas", to: "chloroethane", type: "Electrophilic addition",
      eq: "CH₂=CH₂ + HCl → CH₃CH₂Cl",
      note: "Hydrohalogenation of an alkene." },
    { from: "ethene", reagent: "steam_h3po4", to: "ethanol", type: "Electrophilic addition",
      eq: "CH₂=CH₂ + H₂O(g) → CH₃CH₂OH",
      note: "Industrial hydration of ethene using steam and a phosphoric acid catalyst." },
    { from: "ethene", reagent: "oxid_kmno4_naoh_cold", to: "ethane-1,2-diol", type: "Mild oxidation",
      eq: "CH₂=CH₂ + H₂O + [O] → HOCH₂CH₂OH",
      note: "Cold alkaline KMnO₄ breaks only the π bond, giving a diol; purple MnO₄⁻ is decolourised and brown MnO₂ forms." },
    { from: "propene", reagent: "red_h2_ni", to: "propane", type: "Reduction (catalytic hydrogenation)",
      eq: "CH₃CH=CH₂ + H₂ → CH₃CH₂CH₃",
      note: "One mole of H₂ per C=C." },
    { from: "propene", reagent: "br2_ccl4", to: "1,2-dibromopropane", type: "Electrophilic addition",
      eq: "CH₃CH=CH₂ + Br₂ → CH₃CH(Br)CH₂Br",
      note: "Anti-addition of Br₂ across the double bond." },
    { from: "propene", reagent: "br2_water", to: "1-bromo-2-propanol", type: "Electrophilic addition",
      eq: "CH₃CH=CH₂ + Br₂(aq) → CH₃CH(OH)CH₂Br + HBr",
      note: "Br adds to the carbon with more H; water attacks the more substituted carbocation, giving the Markovnikov bromohydrin." },
    { from: "propene", reagent: "hbr_gas", to: "2-bromopropane", type: "Electrophilic addition",
      eq: "CH₃CH=CH₂ + HBr → CH₃CH(Br)CH₃",
      note: "Markovnikov addition: H goes to the CH₂ carbon, forming the more stable 2° carbocation. 2-bromopropane is the major product." },
    { from: "propene", reagent: "hcl_gas", to: "2-chloropropane", type: "Electrophilic addition",
      eq: "CH₃CH=CH₂ + HCl → CH₃CH(Cl)CH₃",
      note: "Markovnikov addition via the more stable 2° carbocation." },
    { from: "propene", reagent: "steam_h3po4", to: "propan-2-ol", type: "Electrophilic addition",
      eq: "CH₃CH=CH₂ + H₂O(g) → CH₃CH(OH)CH₃",
      note: "Markovnikov hydration: the OH ends up on the more substituted carbon." },
    { from: "propene", reagent: "oxid_kmno4_naoh_cold", to: "propane-1,2-diol", type: "Mild oxidation",
      eq: "CH₃CH=CH₂ + H₂O + [O] → CH₃CH(OH)CH₂OH",
      note: "Cold alkaline KMnO₄ converts the C=C into a 1,2-diol." },

    /* ---------- ARENES ---------- */
    { from: "benzene", reagent: "hno3_h2so4_50", to: "nitrobenzene", type: "Electrophilic aromatic substitution",
      eq: "C₆H₆ + HNO₃ → C₆H₅NO₂ + H₂O",
      note: "Conc. H₂SO₄ protonates HNO₃ to generate the nitronium ion, NO₂⁺. Benzene is nitrated at 50 °C." },
    { from: "benzene", reagent: "br2_febr3", to: "bromobenzene", type: "Electrophilic aromatic substitution",
      eq: "C₆H₆ + Br₂ → C₆H₅Br + HBr",
      note: "FeBr₃ is a Lewis acid; it generates Br⁺ (or a polarised Br–Br) and is regenerated." },
    { from: "benzene", reagent: "cl2_fecl3", to: "chlorobenzene", type: "Electrophilic aromatic substitution",
      eq: "C₆H₆ + Cl₂ → C₆H₅Cl + HCl",
      note: "Anhydrous FeCl₃ is required; water would destroy the Lewis acid." },
    { from: "benzene", reagent: "alcl3_ch3cl", to: "methylbenzene", type: "Electrophilic aromatic substitution (Friedel–Crafts)",
      eq: "C₆H₆ + CH₃Cl → C₆H₅CH₃ + HCl",
      note: "AlCl₃ generates CH₃⁺ (or a polarised CH₃–Cl), which attacks the ring." },
    { from: "methylbenzene", reagent: "hno3_h2so4_30", to: "4-nitromethylbenzene", type: "Electrophilic aromatic substitution",
      eq: "C₆H₅CH₃ + HNO₃ → 4-O₂NC₆H₄CH₃ + H₂O",
      note: "The methyl group is weakly activating and 2,4-directing; the 4-isomer is the major product. Alkylbenzenes are nitrated at 30 °C." },
    { from: "methylbenzene", reagent: "br2_febr3", to: "4-bromomethylbenzene", type: "Electrophilic aromatic substitution",
      eq: "C₆H₅CH₃ + Br₂ → 4-BrC₆H₄CH₃ + HBr",
      note: "Ring bromination; the methyl group directs the incoming Br to the 2- and 4-positions." },
    { from: "methylbenzene", reagent: "cl2_fecl3", to: "4-chloromethylbenzene", type: "Electrophilic aromatic substitution",
      eq: "C₆H₅CH₃ + Cl₂ → 4-ClC₆H₄CH₃ + HCl",
      note: "Ring chlorination with a Lewis-acid catalyst." },
    { from: "methylbenzene", reagent: "oxid_kmno4_acid_hot", to: "benzoic acid", type: "Oxidation (side-chain)",
      eq: "C₆H₅CH₃ + 3[O] → C₆H₅CO₂H + H₂O",
      note: "The C directly attached to the ring has H atoms, so the whole side chain is oxidised to –CO₂H. Purple KMnO₄ decolourises." },
    { from: "methylbenzene", reagent: "oxid_kmno4_naoh_hot", to: "benzoic acid", type: "Oxidation (side-chain)",
      eq: "C₆H₅CH₃ + 3[O] + OH⁻ → C₆H₅CO₂⁻ + 2H₂O; then H⁺ → C₆H₅CO₂H",
      note: "Hot alkaline KMnO₄ gives the benzoate salt; acidification liberates benzoic acid. Brown MnO₂ is observed." },
    { from: "nitrobenzene", reagent: "red_sn_hcl", to: "phenylamine", type: "Reduction",
      eq: "C₆H₅NO₂ + 6[H] → C₆H₅NH₂ + 2H₂O",
      note: "Sn/conc. HCl reduces –NO₂ to –NH₂; the amine is protonated as C₆H₅NH₃⁺, so excess NaOH is added to liberate phenylamine." },
    { from: "nitrobenzene", reagent: "br2_febr3", to: "3-bromonitrobenzene", type: "Electrophilic aromatic substitution",
      eq: "C₆H₅NO₂ + Br₂ → 3-BrC₆H₄NO₂ + HBr",
      note: "–NO₂ is meta-directing and strongly deactivating, so the ring needs a Lewis acid and heat; Br enters the 3-position." },
    { from: "nitrobenzene", reagent: "hno3_h2so4_50", to: "1,3-dinitrobenzene", type: "Electrophilic aromatic substitution",
      eq: "C₆H₅NO₂ + HNO₃ → 1,3-C₆H₄(NO₂)₂ + H₂O",
      note: "The first –NO₂ is meta-directing, so a second nitro group enters the 3-position." },
    { from: "bromobenzene", reagent: "hno3_h2so4_50", to: "4-bromonitrobenzene", type: "Electrophilic aromatic substitution",
      eq: "C₆H₅Br + HNO₃ → 4-BrC₆H₄NO₂ + H₂O",
      note: "Br is 2,4-directing, so nitration gives mainly the 4-isomer (plus some 2-isomer), not the 3-isomer." },
    { from: "bromobenzene", reagent: "br2_febr3", to: "bromobenzene", type: "No net reaction",
      eq: "C₆H₅Br + Br₂ → no net reaction",
      note: "The ring is already brominated and deactivated; further bromination is not a useful synthesis step." },
    { from: "phenol", reagent: "br2_water", to: "2,4,6-tribromophenol", type: "Electrophilic aromatic substitution",
      eq: "C₆H₅OH + 3Br₂(aq) → 2,4,6-Br₃C₆H₂OH + 3HBr",
      note: "–OH strongly activates the ring. No Lewis-acid catalyst is needed; aqueous Br₂ is decolourised and a white precipitate forms." },
    { from: "phenol", reagent: "br2_ccl4", to: "4-bromophenol", type: "Electrophilic aromatic substitution",
      eq: "C₆H₅OH + Br₂ → 4-BrC₆H₄OH + HBr",
      note: "In an organic solvent, mono-substitution dominates; a mixture of 2- and 4-bromophenol is formed." },
    { from: "phenol", reagent: "hno3_dilute", to: "4-nitrophenol", type: "Electrophilic aromatic substitution",
      eq: "C₆H₅OH + HNO₃(aq) → 4-O₂NC₆H₄OH + H₂O",
      note: "Dilute HNO₃ mononitrates phenol at room temperature; a mixture of 2- and 4-nitrophenol is formed." },
    { from: "phenol", reagent: "hno3_conc", to: "2,4,6-trinitrophenol", type: "Electrophilic aromatic substitution",
      eq: "C₆H₅OH + 3HNO₃ → 2,4,6-(NO₂)₃C₆H₂OH + 3H₂O",
      note: "The strongly activated ring is tri-nitrated by concentrated nitric acid at room temperature." },
    { from: "phenol", reagent: "naoh_aq", to: "sodium phenoxide", type: "Acid–base (neutralisation)",
      eq: "C₆H₅OH + NaOH → C₆H₅O⁻Na⁺ + H₂O",
      note: "Phenol is weakly acidic. The phenoxide ion is more electron-rich and a stronger nucleophile than phenol." },
    { from: "phenol", reagent: "na_metal", to: "sodium phenoxide", type: "Redox / acid–base",
      eq: "C₆H₅OH + Na → C₆H₅O⁻Na⁺ + ½H₂",
      note: "Effervescence of H₂ confirms the acidic –OH proton." },
    { from: "phenol", reagent: "ethanoyl_chloride", to: "phenyl ethanoate", type: "Condensation",
      eq: "C₆H₅OH + CH₃COCl → CH₃CO₂C₆H₅ + HCl",
      note: "Phenol is a weak nucleophile, so it needs the more reactive acyl chloride; the reaction is faster after conversion to phenoxide." },
    { from: "sodium phenoxide", reagent: "ethanoyl_chloride", to: "phenyl ethanoate", type: "Condensation",
      eq: "C₆H₅O⁻Na⁺ + CH₃COCl → CH₃CO₂C₆H₅ + NaCl",
      note: "Phenoxide is a stronger nucleophile than phenol, so it attacks the acyl chloride readily." },
    { from: "sodium phenoxide", reagent: "hcl_aq", to: "phenol", type: "Acid–base",
      eq: "C₆H₅O⁻Na⁺ + HCl → C₆H₅OH + NaCl",
      note: "A strong acid reprotonates the phenoxide ion." },
    { from: "phenylamine", reagent: "br2_water", to: "2,4,6-tribromophenylamine", type: "Electrophilic aromatic substitution",
      eq: "C₆H₅NH₂ + 3Br₂(aq) → 2,4,6-Br₃C₆H₂NH₂ + 3HBr",
      note: "–NH₂ strongly activates the ring; no catalyst is needed. Orange Br₂ is decolourised and a white precipitate forms." },
    { from: "phenylamine", reagent: "br2_ccl4", to: "4-bromophenylamine", type: "Electrophilic aromatic substitution",
      eq: "C₆H₅NH₂ + Br₂ → 4-BrC₆H₄NH₂ + HBr",
      note: "In an organic solvent, mono-substitution dominates; 2- and 4-bromophenylamine are formed." },
    { from: "phenylamine", reagent: "ethanoyl_chloride", to: "N-phenylethanamide", type: "Condensation",
      eq: "C₆H₅NH₂ + CH₃COCl → C₆H₅NHCOCH₃ + HCl",
      note: "The amine is a nucleophile and attacks the acyl chloride; HCl fumes are evolved." },
    { from: "phenylamine", reagent: "hcl_aq", to: "phenylammonium chloride", type: "Acid–base",
      eq: "C₆H₅NH₂ + HCl → C₆H₅NH₃⁺Cl⁻",
      note: "Phenylamine is basic; the salt is ionic and water-soluble." },
    { from: "phenylammonium chloride", reagent: "naoh_aq", to: "phenylamine", type: "Acid–base",
      eq: "C₆H₅NH₃⁺Cl⁻ + NaOH → C₆H₅NH₂ + NaCl + H₂O",
      note: "A strong base removes H⁺ from the ammonium ion, liberating the free amine." },
    { from: "phenylamine", reagent: "hno3_dilute", to: "phenylammonium nitrate", type: "Acid–base (not nitration)",
      eq: "C₆H₅NH₂ + HNO₃ → C₆H₅NH₃⁺NO₃⁻",
      note: "Phenylamine reacts with acids as a base, not by electrophilic substitution. Nitration of the ring is not achieved this way." },

    /* ---------- HALOGENOALKANES ---------- */
    { from: "bromoethane", reagent: "naoh_aq_heat", to: "ethanol", type: "Nucleophilic substitution",
      eq: "CH₃CH₂Br + OH⁻ → CH₃CH₂OH + Br⁻",
      note: "Aqueous NaOH + heat: OH⁻ is the nucleophile. The C–Br bond is broken." },
    { from: "bromoethane", reagent: "naoh_etoh_heat", to: "ethene", type: "Elimination",
      eq: "CH₃CH₂Br + OH⁻ → CH₂=CH₂ + H₂O + Br⁻",
      note: "Ethanolic NaOH + heat: OH⁻ acts as a base, removing H from the adjacent carbon and forming the alkene." },
    { from: "bromoethane", reagent: "kcn_etoh", to: "propanenitrile", type: "Nucleophilic substitution",
      eq: "CH₃CH₂Br + CN⁻ → CH₃CH₂CN + Br⁻",
      note: "The cyanide carbon attacks the halogen-bearing carbon. The chain is extended by one carbon." },
    { from: "bromoethane", reagent: "nh3_etoh_sealed", to: "ethylamine", type: "Nucleophilic substitution",
      eq: "CH₃CH₂Br + 2NH₃ → CH₃CH₂NH₂ + NH₄Br",
      note: "Excess ammonia in ethanol, heated in a sealed tube, gives the primary amine." },
    { from: "chloroethane", reagent: "naoh_aq_heat", to: "ethanol", type: "Nucleophilic substitution",
      eq: "CH₃CH₂Cl + OH⁻ → CH₃CH₂OH + Cl⁻",
      note: "Alkaline hydrolysis of a primary halogenoalkane." },
    { from: "chloroethane", reagent: "naoh_etoh_heat", to: "ethene", type: "Elimination",
      eq: "CH₃CH₂Cl + OH⁻ → CH₂=CH₂ + H₂O + Cl⁻",
      note: "Ethanolic NaOH promotes elimination." },
    { from: "chloroethane", reagent: "kcn_etoh", to: "propanenitrile", type: "Nucleophilic substitution",
      eq: "CH₃CH₂Cl + CN⁻ → CH₃CH₂CN + Cl⁻",
      note: "One-carbon chain extension." },
    { from: "chloroethane", reagent: "nh3_etoh_sealed", to: "ethylamine", type: "Nucleophilic substitution",
      eq: "CH₃CH₂Cl + 2NH₃ → CH₃CH₂NH₂ + NH₄Cl",
      note: "Excess ammonia gives the primary amine." },
    { from: "1-bromopropane", reagent: "naoh_aq_heat", to: "propan-1-ol", type: "Nucleophilic substitution",
      eq: "CH₃CH₂CH₂Br + OH⁻ → CH₃CH₂CH₂OH + Br⁻",
      note: "Aqueous NaOH + heat." },
    { from: "1-bromopropane", reagent: "naoh_etoh_heat", to: "propene", type: "Elimination",
      eq: "CH₃CH₂CH₂Br + OH⁻ → CH₃CH=CH₂ + H₂O + Br⁻",
      note: "Ethanolic NaOH + heat." },
    { from: "1-bromopropane", reagent: "kcn_etoh", to: "butanenitrile", type: "Nucleophilic substitution",
      eq: "CH₃CH₂CH₂Br + CN⁻ → CH₃CH₂CH₂CN + Br⁻",
      note: "One-carbon chain extension." },
    { from: "1-bromopropane", reagent: "nh3_etoh_sealed", to: "propylamine", type: "Nucleophilic substitution",
      eq: "CH₃CH₂CH₂Br + 2NH₃ → CH₃CH₂CH₂NH₂ + NH₄Br",
      note: "Excess ammonia in ethanol." },
    { from: "2-bromopropane", reagent: "naoh_aq_heat", to: "propan-2-ol", type: "Nucleophilic substitution",
      eq: "CH₃CH(Br)CH₃ + OH⁻ → CH₃CH(OH)CH₃ + Br⁻",
      note: "A secondary halogenoalkane; hydrolysis can proceed by SN1 or SN2 depending on conditions." },
    { from: "2-bromopropane", reagent: "naoh_etoh_heat", to: "propene", type: "Elimination",
      eq: "CH₃CH(Br)CH₃ + OH⁻ → CH₃CH=CH₂ + H₂O + Br⁻",
      note: "Ethanolic NaOH + heat. Only one alkene is possible here." },
    { from: "2-bromopropane", reagent: "kcn_etoh", to: "2-methylpropanenitrile", type: "Nucleophilic substitution",
      eq: "CH₃CH(Br)CH₃ + CN⁻ → (CH₃)₂CHCN + Br⁻",
      note: "SN2 attack is hindered at a secondary carbon, but the chain is still extended by one carbon." },
    { from: "2-bromopropane", reagent: "nh3_etoh_sealed", to: "propan-2-amine", type: "Nucleophilic substitution",
      eq: "CH₃CH(Br)CH₃ + 2NH₃ → CH₃CH(NH₂)CH₃ + NH₄Br",
      note: "Excess ammonia in ethanol." },
    { from: "1,2-dibromoethane", reagent: "kcn_etoh", to: "butanedinitrile", type: "Nucleophilic substitution",
      eq: "BrCH₂CH₂Br + 2CN⁻ → NCCH₂CH₂CN + 2Br⁻",
      note: "Both C–Br bonds are substituted; two cyanide ions add two carbons." },
    { from: "1,2-dibromoethane", reagent: "naoh_aq_heat", to: "ethane-1,2-diol", type: "Nucleophilic substitution",
      eq: "BrCH₂CH₂Br + 2OH⁻ → HOCH₂CH₂OH + 2Br⁻",
      note: "Both ends are hydrolysed." },
    { from: "chloromethylbenzene", reagent: "naoh_aq_heat", to: "benzyl alcohol", type: "Nucleophilic substitution",
      eq: "C₆H₅CH₂Cl + OH⁻ → C₆H₅CH₂OH + Cl⁻",
      note: "The benzylic C–Cl bond is readily hydrolysed." },
    { from: "chloromethylbenzene", reagent: "kcn_etoh", to: "phenylacetonitrile", type: "Nucleophilic substitution",
      eq: "C₆H₅CH₂Cl + CN⁻ → C₆H₅CH₂CN + Cl⁻",
      note: "Benzylic substitution extends the chain by one carbon." },

    /* ---------- ALCOHOLS ---------- */
    { from: "ethanol", reagent: "oxid_k2cr2o7_distil", to: "ethanal", type: "Oxidation",
      eq: "CH₃CH₂OH + [O] → CH₃CHO + H₂O",
      note: "Acidified K₂Cr₂O₇ is a milder oxidant; distilling the volatile aldehyde out as it forms prevents further oxidation to the acid." },
    { from: "ethanol", reagent: "oxid_k2cr2o7_heat", to: "ethanoic acid", type: "Oxidation",
      eq: "CH₃CH₂OH + 2[O] → CH₃CO₂H + H₂O",
      note: "Heating under reflux keeps the aldehyde in the oxidising mixture, so it is oxidised all the way to the carboxylic acid." },
    { from: "ethanol", reagent: "oxid_kmno4_acid_hot", to: "ethanoic acid", type: "Oxidation",
      eq: "CH₃CH₂OH + 2[O] → CH₃CO₂H + H₂O",
      note: "Hot acidified KMnO₄ is a stronger oxidant; the aldehyde cannot be isolated." },
    { from: "ethanol", reagent: "h2so4_conc_heat", to: "ethene", type: "Elimination",
      eq: "CH₃CH₂OH → CH₂=CH₂ + H₂O",
      note: "Conc. H₂SO₄ + heat dehydrates the alcohol. The –OH and an H on the adjacent carbon are removed." },
    { from: "ethanol", reagent: "h3po4_heat", to: "ethene", type: "Elimination",
      eq: "CH₃CH₂OH → CH₂=CH₂ + H₂O",
      note: "Conc. H₃PO₄ + heat is an alternative dehydration method." },
    { from: "ethanol", reagent: "al2o3_heat", to: "ethene", type: "Elimination",
      eq: "CH₃CH₂OH → CH₂=CH₂ + H₂O",
      note: "Passing ethanol vapour over hot Al₂O₃ dehydrates it." },
    { from: "ethanol", reagent: "pcl5", to: "chloroethane", type: "Nucleophilic substitution",
      eq: "CH₃CH₂OH + PCl₅ → CH₃CH₂Cl + POCl₃ + HCl",
      note: "Anhydrous PCl₅ replaces –OH with –Cl; white fumes of HCl are observed." },
    { from: "ethanol", reagent: "pcl3", to: "chloroethane", type: "Nucleophilic substitution",
      eq: "3CH₃CH₂OH + PCl₃ → 3CH₃CH₂Cl + H₃PO₃",
      note: "Anhydrous PCl₃ replaces –OH with –Cl." },
    { from: "ethanol", reagent: "socl2", to: "chloroethane", type: "Nucleophilic substitution",
      eq: "CH₃CH₂OH + SOCl₂ → CH₃CH₂Cl + SO₂ + HCl",
      note: "SOCl₂ is preferred because the by-products SO₂ and HCl are gases and easily separated." },
    { from: "ethanol", reagent: "hbr_gas", to: "bromoethane", type: "Nucleophilic substitution",
      eq: "CH₃CH₂OH + HBr → CH₃CH₂Br + H₂O",
      note: "Gaseous HBr protonates –OH, making water a good leaving group; Br⁻ then substitutes it." },
    { from: "ethanol", reagent: "na_metal", to: "sodium ethoxide", type: "Redox",
      eq: "CH₃CH₂OH + Na → CH₃CH₂O⁻Na⁺ + ½H₂",
      note: "Effervescence of H₂; the alcohol is a weak acid." },
    { from: "ethanol", reagent: "ethanoic_acid_h2so4", to: "ethyl ethanoate", type: "Condensation (esterification)",
      eq: "CH₃CO₂H + CH₃CH₂OH ⇌ CH₃CO₂CH₂CH₃ + H₂O",
      note: "Conc. H₂SO₄ catalyses the reaction and removes water; heat under reflux is required." },
    { from: "ethanol", reagent: "ethanoyl_chloride", to: "ethyl ethanoate", type: "Condensation",
      eq: "CH₃COCl + CH₃CH₂OH → CH₃CO₂CH₂CH₃ + HCl",
      note: "Acyl chlorides are more reactive than carboxylic acids; the reaction is rapid at room temperature." },
    { from: "propan-1-ol", reagent: "oxid_k2cr2o7_distil", to: "propanal", type: "Oxidation",
      eq: "CH₃CH₂CH₂OH + [O] → CH₃CH₂CHO + H₂O",
      note: "Controlled oxidation with immediate distillation isolates the aldehyde." },
    { from: "propan-1-ol", reagent: "oxid_k2cr2o7_heat", to: "propanoic acid", type: "Oxidation",
      eq: "CH₃CH₂CH₂OH + 2[O] → CH₃CH₂CO₂H + H₂O",
      note: "Reflux gives complete oxidation to the acid." },
    { from: "propan-1-ol", reagent: "oxid_kmno4_acid_hot", to: "propanoic acid", type: "Oxidation",
      eq: "CH₃CH₂CH₂OH + 2[O] → CH₃CH₂CO₂H + H₂O",
      note: "Hot acidified KMnO₄ gives the carboxylic acid." },
    { from: "propan-1-ol", reagent: "h2so4_conc_heat", to: "propene", type: "Elimination",
      eq: "CH₃CH₂CH₂OH → CH₃CH=CH₂ + H₂O",
      note: "Dehydration of a primary alcohol." },
    { from: "propan-1-ol", reagent: "pcl5", to: "1-chloropropane", type: "Nucleophilic substitution",
      eq: "CH₃CH₂CH₂OH + PCl₅ → CH₃CH₂CH₂Cl + POCl₃ + HCl",
      note: "Anhydrous PCl₅ substitutes –OH with –Cl." },
    { from: "propan-1-ol", reagent: "socl2", to: "1-chloropropane", type: "Nucleophilic substitution",
      eq: "CH₃CH₂CH₂OH + SOCl₂ → CH₃CH₂CH₂Cl + SO₂ + HCl",
      note: "SOCl₂ gives gaseous by-products." },
    { from: "propan-1-ol", reagent: "hbr_gas", to: "1-bromopropane", type: "Nucleophilic substitution",
      eq: "CH₃CH₂CH₂OH + HBr → CH₃CH₂CH₂Br + H₂O",
      note: "Gaseous HBr substitutes the –OH group." },
    { from: "propan-2-ol", reagent: "oxid_k2cr2o7_heat", to: "propanone", type: "Oxidation",
      eq: "CH₃CH(OH)CH₃ + [O] → CH₃COCH₃ + H₂O",
      note: "A secondary alcohol is oxidised to a ketone; the ketone cannot be oxidised further." },
    { from: "propan-2-ol", reagent: "oxid_kmno4_acid_hot", to: "propanone", type: "Oxidation",
      eq: "CH₃CH(OH)CH₃ + [O] → CH₃COCH₃ + H₂O",
      note: "A secondary alcohol gives a ketone with hot acidified KMnO₄." },
    { from: "propan-2-ol", reagent: "oxid_k2cr2o7_distil", to: "propanone", type: "Oxidation",
      eq: "CH₃CH(OH)CH₃ + [O] → CH₃COCH₃ + H₂O",
      note: "Distillation does not stop a secondary alcohol at an aldehyde; it still gives the ketone." },
    { from: "propan-2-ol", reagent: "h2so4_conc_heat", to: "propene", type: "Elimination",
      eq: "CH₃CH(OH)CH₃ → CH₃CH=CH₂ + H₂O",
      note: "Dehydration gives propene." },
    { from: "propan-2-ol", reagent: "pcl5", to: "2-chloropropane", type: "Nucleophilic substitution",
      eq: "CH₃CH(OH)CH₃ + PCl₅ → CH₃CH(Cl)CH₃ + POCl₃ + HCl",
      note: "Anhydrous PCl₅ substitutes –OH with –Cl." },
    { from: "propan-2-ol", reagent: "socl2", to: "2-chloropropane", type: "Nucleophilic substitution",
      eq: "CH₃CH(OH)CH₃ + SOCl₂ → CH₃CH(Cl)CH₃ + SO₂ + HCl",
      note: "SOCl₂ substitutes –OH with –Cl." },
    { from: "propan-2-ol", reagent: "hbr_gas", to: "2-bromopropane", type: "Nucleophilic substitution",
      eq: "CH₃CH(OH)CH₃ + HBr → CH₃CH(Br)CH₃ + H₂O",
      note: "Gaseous HBr substitutes the –OH group." },
    { from: "2-methylpropan-2-ol", reagent: "hcl_gas", to: "2-chloro-2-methylpropane", type: "Nucleophilic substitution",
      eq: "(CH₃)₃COH + HCl → (CH₃)₃CCl + H₂O",
      note: "A tertiary alcohol reacts by SN1 via a stable tertiary carbocation." },

    /* ---------- CARBONYLS ---------- */
    { from: "ethanal", reagent: "red_h2_ni", to: "ethanol", type: "Reduction",
      eq: "CH₃CHO + H₂ → CH₃CH₂OH",
      note: "An aldehyde is reduced to a primary alcohol." },
    { from: "ethanal", reagent: "red_lialh4", to: "ethanol", type: "Reduction",
      eq: "CH₃CHO + 2[H] → CH₃CH₂OH",
      note: "LiAlH₄ supplies hydride to the electrophilic carbonyl carbon." },
    { from: "ethanal", reagent: "oxid_kmno4_acid_hot", to: "ethanoic acid", type: "Oxidation",
      eq: "CH₃CHO + [O] → CH₃CO₂H",
      note: "Aldehydes are easily oxidised to carboxylic acids." },
    { from: "ethanal", reagent: "oxid_k2cr2o7_heat", to: "ethanoic acid", type: "Oxidation",
      eq: "CH₃CHO + [O] → CH₃CO₂H",
      note: "Acidified dichromate oxidises the aldehyde to the acid." },
    { from: "ethanal", reagent: "hcn_cold", to: "2-hydroxypropanenitrile", type: "Nucleophilic addition",
      eq: "CH₃CHO + HCN → CH₃CH(OH)CN",
      note: "CN⁻ attacks the δ+ carbonyl carbon; protonation of the alkoxide gives the cyanohydrin." },
    { from: "propanal", reagent: "red_h2_ni", to: "propan-1-ol", type: "Reduction",
      eq: "CH₃CH₂CHO + H₂ → CH₃CH₂CH₂OH",
      note: "Aldehyde → primary alcohol." },
    { from: "propanal", reagent: "red_lialh4", to: "propan-1-ol", type: "Reduction",
      eq: "CH₃CH₂CHO + 2[H] → CH₃CH₂CH₂OH",
      note: "LiAlH₄ reduces the carbonyl group." },
    { from: "propanal", reagent: "oxid_kmno4_acid_hot", to: "propanoic acid", type: "Oxidation",
      eq: "CH₃CH₂CHO + [O] → CH₃CH₂CO₂H",
      note: "Aldehyde → carboxylic acid." },
    { from: "propanal", reagent: "hcn_cold", to: "2-hydroxybutanenitrile", type: "Nucleophilic addition",
      eq: "CH₃CH₂CHO + HCN → CH₃CH₂CH(OH)CN",
      note: "Cyanohydrin formation." },
    { from: "propanone", reagent: "red_h2_ni", to: "propan-2-ol", type: "Reduction",
      eq: "CH₃COCH₃ + H₂ → CH₃CH(OH)CH₃",
      note: "A ketone is reduced to a secondary alcohol." },
    { from: "propanone", reagent: "red_lialh4", to: "propan-2-ol", type: "Reduction",
      eq: "CH₃COCH₃ + 2[H] → CH₃CH(OH)CH₃",
      note: "LiAlH₄ reduces the ketone." },
    { from: "propanone", reagent: "hcn_cold", to: "2-hydroxy-2-methylpropanenitrile", type: "Nucleophilic addition",
      eq: "CH₃COCH₃ + HCN → (CH₃)₂C(OH)CN",
      note: "The ketone gives a tertiary cyanohydrin." },
    { from: "propanone", reagent: "i2_naoh", to: "sodium ethanoate", type: "Redox (iodoform)",
      eq: "CH₃COCH₃ + 3I₂ + 4OH⁻ → CH₃CO₂⁻ + CHI₃ + 3I⁻ + 3H₂O",
      note: "A methyl ketone gives a yellow precipitate of CHI₃; the rest of the molecule becomes the carboxylate." },
    { from: "benzaldehyde", reagent: "red_h2_ni", to: "benzyl alcohol", type: "Reduction",
      eq: "C₆H₅CHO + H₂ → C₆H₅CH₂OH",
      note: "Aromatic aldehyde → primary alcohol." },
    { from: "benzaldehyde", reagent: "red_lialh4", to: "benzyl alcohol", type: "Reduction",
      eq: "C₆H₅CHO + 2[H] → C₆H₅CH₂OH",
      note: "LiAlH₄ reduces the aldehyde." },
    { from: "benzaldehyde", reagent: "oxid_kmno4_acid_hot", to: "benzoic acid", type: "Oxidation",
      eq: "C₆H₅CHO + [O] → C₆H₅CO₂H",
      note: "Benzaldehyde is oxidised to benzoic acid." },
    { from: "benzaldehyde", reagent: "hcn_cold", to: "mandelonitrile", type: "Nucleophilic addition",
      eq: "C₆H₅CHO + HCN → C₆H₅CH(OH)CN",
      note: "Cyanohydrin formation." },

    /* ---------- CARBOXYLIC ACIDS ---------- */
    { from: "ethanoic acid", reagent: "socl2", to: "ethanoyl chloride", type: "Substitution (acyl chloride formation)",
      eq: "CH₃CO₂H + SOCl₂ → CH₃COCl + SO₂ + HCl",
      note: "SOCl₂ is preferred because SO₂ and HCl are gases; anhydrous conditions are essential." },
    { from: "ethanoic acid", reagent: "pcl5", to: "ethanoyl chloride", type: "Substitution",
      eq: "CH₃CO₂H + PCl₅ → CH₃COCl + POCl₃ + HCl",
      note: "PCl₅ also converts the acid to the acyl chloride." },
    { from: "ethanoic acid", reagent: "pcl3", to: "ethanoyl chloride", type: "Substitution",
      eq: "3CH₃CO₂H + PCl₃ → 3CH₃COCl + H₃PO₃",
      note: "PCl₃ converts the acid to the acyl chloride." },
    { from: "ethanoic acid", reagent: "red_lialh4", to: "ethanol", type: "Reduction",
      eq: "CH₃CO₂H + 4[H] → CH₃CH₂OH + H₂O",
      note: "LiAlH₄ is the only reducing agent in the syllabus that reduces a carboxylic acid to a primary alcohol." },
    { from: "ethanoic acid", reagent: "ethanol_h2so4", to: "ethyl ethanoate", type: "Condensation (esterification)",
      eq: "CH₃CO₂H + CH₃CH₂OH ⇌ CH₃CO₂CH₂CH₃ + H₂O",
      note: "Conc. H₂SO₄ catalyses the reaction; reflux and removal of water improve the yield." },
    { from: "ethanoic acid", reagent: "naoh_aq", to: "sodium ethanoate", type: "Acid–base",
      eq: "CH₃CO₂H + NaOH → CH₃CO₂⁻Na⁺ + H₂O",
      note: "A simple neutralisation." },
    { from: "ethanoic acid", reagent: "na2co3_aq", to: "sodium ethanoate", type: "Acid–base",
      eq: "2CH₃CO₂H + Na₂CO₃ → 2CH₃CO₂⁻Na⁺ + CO₂ + H₂O",
      note: "Effervescence of CO₂ is a test for a carboxylic acid." },
    { from: "ethanoic acid", reagent: "nh3_gas", to: "ammonium ethanoate", type: "Acid–base",
      eq: "CH₃CO₂H + NH₃ → CH₃CO₂⁻NH₄⁺",
      note: "Ammonia is a base here; no amide is formed. An acyl chloride is needed for the amide." },
    { from: "benzoic acid", reagent: "socl2", to: "benzoyl chloride", type: "Substitution",
      eq: "C₆H₅CO₂H + SOCl₂ → C₆H₅COCl + SO₂ + HCl",
      note: "Carboxylic acid → acyl chloride." },
    { from: "benzoic acid", reagent: "pcl5", to: "benzoyl chloride", type: "Substitution",
      eq: "C₆H₅CO₂H + PCl₅ → C₆H₅COCl + POCl₃ + HCl",
      note: "Carboxylic acid → acyl chloride." },
    { from: "benzoic acid", reagent: "red_lialh4", to: "benzyl alcohol", type: "Reduction",
      eq: "C₆H₅CO₂H + 4[H] → C₆H₅CH₂OH + H₂O",
      note: "LiAlH₄ reduces the aromatic acid to the primary alcohol." },
    { from: "benzoic acid", reagent: "methanol_h2so4", to: "methyl benzoate", type: "Condensation (esterification)",
      eq: "C₆H₅CO₂H + CH₃OH ⇌ C₆H₅CO₂CH₃ + H₂O",
      note: "Fischer esterification with methanol and conc. H₂SO₄ under reflux." },
    { from: "benzoic acid", reagent: "ethanol_h2so4", to: "ethyl benzoate", type: "Condensation (esterification)",
      eq: "C₆H₅CO₂H + CH₃CH₂OH ⇌ C₆H₅CO₂CH₂CH₃ + H₂O",
      note: "Fischer esterification with ethanol." },
    { from: "benzoic acid", reagent: "naoh_aq", to: "sodium benzoate", type: "Acid–base",
      eq: "C₆H₅CO₂H + NaOH → C₆H₅CO₂⁻Na⁺ + H₂O",
      note: "Neutralisation." },
    { from: "benzoic acid", reagent: "nh3_gas", to: "ammonium benzoate", type: "Acid–base",
      eq: "C₆H₅CO₂H + NH₃ → C₆H₅CO₂⁻NH₄⁺",
      note: "Acid–base only; no amide." },

    /* ---------- ACYL CHLORIDES / ESTERS / AMIDES ---------- */
    { from: "ethanoyl chloride", reagent: "water_rt", to: "ethanoic acid", type: "Hydrolysis",
      eq: "CH₃COCl + H₂O → CH₃CO₂H + HCl",
      note: "Acyl chlorides hydrolyse readily at room temperature; dense white fumes of HCl are observed." },
    { from: "ethanoyl chloride", reagent: "ethanol_rt", to: "ethyl ethanoate", type: "Condensation",
      eq: "CH₃COCl + CH₃CH₂OH → CH₃CO₂CH₂CH₃ + HCl",
      note: "Rapid, room-temperature esterification; no catalyst or heating needed." },
    { from: "ethanoyl chloride", reagent: "methanol_rt", to: "methyl ethanoate", type: "Condensation",
      eq: "CH₃COCl + CH₃OH → CH₃CO₂CH₃ + HCl",
      note: "Rapid esterification with methanol." },
    { from: "ethanoyl chloride", reagent: "nh3_gas", to: "ethanamide", type: "Condensation",
      eq: "CH₃COCl + 2NH₃ → CH₃CONH₂ + NH₄Cl",
      note: "Ammonia attacks the acyl carbon; the amide is formed. HCl fumes are observed." },
    { from: "ethanoyl chloride", reagent: "ethylamine", to: "N-ethylethanamide", type: "Condensation",
      eq: "CH₃COCl + CH₃CH₂NH₂ → CH₃CONHCH₂CH₃ + HCl",
      note: "A primary amine gives a secondary amide." },
    { from: "benzoyl chloride", reagent: "nh3_gas", to: "benzamide", type: "Condensation",
      eq: "C₆H₅COCl + 2NH₃ → C₆H₅CONH₂ + NH₄Cl",
      note: "Acyl chloride + ammonia → primary amide." },
    { from: "benzoyl chloride", reagent: "water_rt", to: "benzoic acid", type: "Hydrolysis",
      eq: "C₆H₅COCl + H₂O → C₆H₅CO₂H + HCl",
      note: "Rapid hydrolysis; white fumes of HCl." },
    { from: "benzoyl chloride", reagent: "methanol_rt", to: "methyl benzoate", type: "Condensation",
      eq: "C₆H₅COCl + CH₃OH → C₆H₅CO₂CH₃ + HCl",
      note: "Acyl chloride + alcohol → ester." },
    { from: "ethanamide", reagent: "naoh_aq_heat", to: "sodium ethanoate", type: "Alkaline hydrolysis",
      eq: "CH₃CONH₂ + OH⁻ → CH₃CO₂⁻ + NH₃",
      note: "Pungent ammonia gas is evolved; it turns moist red litmus blue. This is a useful test for an amide." },
    { from: "ethanamide", reagent: "h2so4_aq_heat", to: "ethanoic acid", type: "Acidic hydrolysis",
      eq: "CH₃CONH₂ + H⁺ + H₂O → CH₃CO₂H + NH₄⁺",
      note: "Acid hydrolysis gives the carboxylic acid and ammonium ion." },
    { from: "ethanamide", reagent: "red_lialh4", to: "ethylamine", type: "Reduction",
      eq: "CH₃CONH₂ + 4[H] → CH₃CH₂NH₂ + H₂O",
      note: "LiAlH₄ reduces the amide to the amine. Catalytic H₂ cannot do this." },
    { from: "benzamide", reagent: "red_lialh4", to: "benzylamine", type: "Reduction",
      eq: "C₆H₅CONH₂ + 4[H] → C₆H₅CH₂NH₂ + H₂O",
      note: "Amide → amine." },
    { from: "benzamide", reagent: "naoh_aq_heat", to: "sodium benzoate", type: "Alkaline hydrolysis",
      eq: "C₆H₅CONH₂ + OH⁻ → C₆H₅CO₂⁻ + NH₃",
      note: "Ammonia is evolved." },
    { from: "ethyl ethanoate", reagent: "naoh_aq_heat", to: "ethanol", type: "Alkaline hydrolysis",
      eq: "CH₃CO₂CH₂CH₃ + OH⁻ → CH₃CO₂⁻ + CH₃CH₂OH",
      note: "Alkaline hydrolysis is irreversible; the products are the carboxylate salt and the alcohol." },
    { from: "ethyl ethanoate", reagent: "h2so4_aq_heat", to: "ethanoic acid", type: "Acidic hydrolysis",
      eq: "CH₃CO₂CH₂CH₃ + H₂O ⇌ CH₃CO₂H + CH₃CH₂OH",
      note: "Acid hydrolysis is reversible and gives the carboxylic acid and alcohol." },
    { from: "ethyl ethanoate", reagent: "red_lialh4", to: "ethanol", type: "Reduction",
      eq: "CH₃CO₂CH₂CH₃ + 4[H] → 2CH₃CH₂OH",
      note: "LiAlH₄ can reduce an ester to alcohols; the question context must support it." },
    { from: "methyl benzoate", reagent: "naoh_aq_heat", to: "sodium benzoate", type: "Alkaline hydrolysis",
      eq: "C₆H₅CO₂CH₃ + OH⁻ → C₆H₅CO₂⁻ + CH₃OH",
      note: "Ester hydrolysis gives the benzoate salt and methanol." },
    { from: "methyl benzoate", reagent: "h2so4_aq_heat", to: "benzoic acid", type: "Acidic hydrolysis",
      eq: "C₆H₅CO₂CH₃ + H₂O ⇌ C₆H₅CO₂H + CH₃OH",
      note: "Acid hydrolysis gives benzoic acid and methanol." },
    { from: "methyl benzoate", reagent: "red_lialh4", to: "benzyl alcohol", type: "Reduction",
      eq: "C₆H₅CO₂CH₃ + 4[H] → C₆H₅CH₂OH + CH₃OH",
      note: "LiAlH₄ reduces the ester to benzyl alcohol and methanol." },
    { from: "phenyl ethanoate", reagent: "naoh_aq_heat", to: "sodium phenoxide", type: "Alkaline hydrolysis",
      eq: "CH₃CO₂C₆H₅ + 2OH⁻ → CH₃CO₂⁻ + C₆H₅O⁻ + H₂O",
      note: "Both the carboxylate and the phenoxide are formed in alkaline solution." },
    { from: "phenyl ethanoate", reagent: "h2so4_aq_heat", to: "phenol", type: "Acidic hydrolysis",
      eq: "CH₃CO₂C₆H₅ + H₂O ⇌ CH₃CO₂H + C₆H₅OH",
      note: "Acid hydrolysis gives ethanoic acid and phenol." },

    /* ---------- NITRILES ---------- */
    { from: "propanenitrile", reagent: "h2so4_aq_heat", to: "propanoic acid", type: "Acidic hydrolysis",
      eq: "CH₃CH₂CN + 2H₂O + H⁺ → CH₃CH₂CO₂H + NH₄⁺",
      note: "Hydrolysis of the nitrile gives the carboxylic acid; the oxidation state of carbon does not change, so no oxidant is needed." },
    { from: "propanenitrile", reagent: "naoh_aq_heat", to: "sodium propanoate", type: "Alkaline hydrolysis",
      eq: "CH₃CH₂CN + OH⁻ + H₂O → CH₃CH₂CO₂⁻ + NH₃",
      note: "Alkaline hydrolysis gives the carboxylate salt and ammonia." },
    { from: "propanenitrile", reagent: "red_h2_ni", to: "propylamine", type: "Reduction",
      eq: "CH₃CH₂CN + 2H₂ → CH₃CH₂CH₂NH₂",
      note: "Two moles of H₂ per nitrile; the C≡N is reduced to –CH₂NH₂." },
    { from: "propanenitrile", reagent: "red_lialh4", to: "propylamine", type: "Reduction",
      eq: "CH₃CH₂CN + 4[H] → CH₃CH₂CH₂NH₂",
      note: "LiAlH₄ reduces the nitrile to the primary amine." },
    { from: "butanenitrile", reagent: "h2so4_aq_heat", to: "butanoic acid", type: "Acidic hydrolysis",
      eq: "CH₃CH₂CH₂CN + 2H₂O + H⁺ → CH₃CH₂CH₂CO₂H + NH₄⁺",
      note: "Nitrile → carboxylic acid." },
    { from: "butanedinitrile", reagent: "h2so4_aq_heat", to: "butanedioic acid", type: "Acidic hydrolysis",
      eq: "NCCH₂CH₂CN + 4H₂O + 2H⁺ → HO₂CCH₂CH₂CO₂H + 2NH₄⁺",
      note: "Both nitrile groups are hydrolysed to carboxylic acids." },
    { from: "butanedinitrile", reagent: "naoh_aq_heat", to: "sodium butanedioate", type: "Alkaline hydrolysis",
      eq: "NCCH₂CH₂CN + 2OH⁻ + 2H₂O → ⁻O₂CCH₂CH₂CO₂⁻ + 2NH₃",
      note: "Alkaline hydrolysis gives the dicarboxylate salt." },
    { from: "2-hydroxypropanenitrile", reagent: "h2so4_aq_heat", to: "2-hydroxypropanoic acid", type: "Acidic hydrolysis",
      eq: "CH₃CH(OH)CN + 2H₂O + H⁺ → CH₃CH(OH)CO₂H + NH₄⁺",
      note: "Cyanohydrin hydrolysis gives an α-hydroxy acid." },
    { from: "2-hydroxybutanenitrile", reagent: "h2so4_aq_heat", to: "2-hydroxybutanoic acid", type: "Acidic hydrolysis",
      eq: "CH₃CH₂CH(OH)CN + 2H₂O + H⁺ → CH₃CH₂CH(OH)CO₂H + NH₄⁺",
      note: "Cyanohydrin → α-hydroxy acid." },
    { from: "2-hydroxy-2-methylpropanenitrile", reagent: "h2so4_aq_heat", to: "2-hydroxy-2-methylpropanoic acid", type: "Acidic hydrolysis",
      eq: "(CH₃)₂C(OH)CN + 2H₂O + H⁺ → (CH₃)₂C(OH)CO₂H + NH₄⁺",
      note: "Cyanohydrin → α-hydroxy acid." },
    { from: "mandelonitrile", reagent: "h2so4_aq_heat", to: "mandelic acid", type: "Acidic hydrolysis",
      eq: "C₆H₅CH(OH)CN + 2H₂O + H⁺ → C₆H₅CH(OH)CO₂H + NH₄⁺",
      note: "Cyanohydrin → mandelic acid." },

    /* ---------- NITROGEN ---------- */
    { from: "ethylamine", reagent: "ethanoyl_chloride", to: "N-ethylethanamide", type: "Condensation",
      eq: "CH₃CH₂NH₂ + CH₃COCl → CH₃CONHCH₂CH₃ + HCl",
      note: "The amine is the nucleophile; an amide is formed." },
    { from: "ethylamine", reagent: "hcl_aq", to: "ethylammonium chloride", type: "Acid–base",
      eq: "CH₃CH₂NH₂ + HCl → CH₃CH₂NH₃⁺Cl⁻",
      note: "The lone pair on N accepts H⁺." },
    { from: "ethylamine", reagent: "excess_bromoethane", to: "tetraethylammonium bromide", type: "Nucleophilic substitution",
      eq: "CH₃CH₂NH₂ + 4C₂H₅Br → (C₂H₅)₄N⁺Br⁻ + 3HBr",
      note: "With excess halogenoalkane, successive substitutions give secondary, tertiary amines and finally the quaternary ammonium salt." },
    { from: "propylamine", reagent: "ethanoyl_chloride", to: "N-propylethanamide", type: "Condensation",
      eq: "CH₃CH₂CH₂NH₂ + CH₃COCl → CH₃CONHCH₂CH₂CH₃ + HCl",
      note: "Amine + acyl chloride → amide." },

    /* ---------- SIDE-CHAIN / NITROARENE ---------- */
    { from: "4-nitromethylbenzene", reagent: "oxid_kmno4_acid_hot", to: "4-nitrobenzoic acid", type: "Oxidation (side-chain)",
      eq: "4-O₂NC₆H₄CH₃ + 3[O] → 4-O₂NC₆H₄CO₂H + H₂O",
      note: "The methyl side chain is oxidised to –CO₂H; the nitro group survives." },
    { from: "4-nitromethylbenzene", reagent: "oxid_kmno4_naoh_hot", to: "4-nitrobenzoic acid", type: "Oxidation (side-chain)",
      eq: "4-O₂NC₆H₄CH₃ + 3[O] + OH⁻ → 4-O₂NC₆H₄CO₂⁻; then H⁺ → 4-O₂NC₆H₄CO₂H",
      note: "Hot alkaline KMnO₄ gives the carboxylate; acidification gives the acid." }
  ],

  missions: [
    {
      id: "m01",
      number: 1,
      title: "Controlled Burn",
      topic: "Alcohols · controlled oxidation",
      start: "ethanol",
      target: "ethanal",
      difficulty: "Starter",
      brief: "A flavour house needs ethanal, not vinegar. You have ethanol and a shelf of oxidants. Stop the oxidation at the aldehyde.",
      objective: "Convert ethanol to ethanal in one step. Do not over-oxidise.",
      debrief: "Acidified K₂Cr₂O₇ is a milder oxidant than hot acidified KMnO₄. The aldehyde has a lower boiling point than ethanol, so distilling it out as it forms removes it from the oxidising mixture before it can be oxidised again. Heating under reflux would keep it in the flask and give ethanoic acid.",
      source: "7A Alcohol, §7A.4.4; Summary §Section A",
      hints: [
        "The product is an aldehyde. Which oxidation stops at the aldehyde?",
        "Use a dichromate(VI) oxidant, and remove the product as it forms.",
        "The answer is on the shelf: K₂Cr₂O₇ / H₂SO₄ with immediate distillation."
      ],
      steps: [
        {
          from: "ethanol", to: "ethanal",
          title: "Stop at the aldehyde",
          prompt: "Oxidise ethanol to ethanal without going all the way to ethanoic acid.",
          shelf: ["oxid_k2cr2o7_distil", "oxid_k2cr2o7_heat", "oxid_kmno4_acid_hot", "h2so4_conc_heat", "red_h2_ni", "red_lialh4", "hbr_gas", "pcl5", "na_metal", "naoh_aq"],
          wrong: {
            oxid_k2cr2o7_heat: "That is the reflux set-up. The aldehyde stays in the oxidising mixture and is oxidised all the way to ethanoic acid.",
            oxid_kmno4_acid_hot: "KMnO₄ is the stronger oxidant. It takes a primary alcohol straight to the carboxylic acid; the aldehyde cannot be isolated.",
            h2so4_conc_heat: "Conc. H₂SO₄ + heat dehydrates ethanol to ethene; it does not oxidise it.",
            red_h2_ni: "H₂/Ni is a reducing agent. Ethanol is already at the alcohol oxidation level; there is nothing to reduce.",
            red_lialh4: "LiAlH₄ reduces carbonyls and acids; it will not oxidise an alcohol.",
            hbr_gas: "HBr substitutes the –OH group to give bromoethane. That is substitution, not oxidation.",
            pcl5: "PCl₅ converts the –OH to –Cl, giving chloroethane. It is not an oxidant.",
            na_metal: "Sodium liberates H₂ from the –OH group. That is a redox test, not a controlled oxidation.",
            naoh_aq: "Aqueous NaOH does not oxidise ethanol. Alcohols are neutral and do not react with NaOH."
          }
        }
      ]
    },
    {
      id: "m02",
      number: 2,
      title: "The Amide Trail",
      topic: "Carboxylic acids · acyl chlorides · amides",
      start: "ethanol",
      target: "ethanamide",
      difficulty: "Core",
      brief: "Three steps from ethanol to ethanamide. The acid is an intermediate, not the final product. Think about what makes an acyl chloride more reactive than a carboxylic acid.",
      objective: "Convert ethanol to ethanamide in three steps.",
      debrief: "The route is ethanol → ethanoic acid (strong oxidation) → ethanoyl chloride (SOCl₂, PCl₅ or PCl₃) → ethanamide (NH₃(g)). An acyl chloride is far more reactive than a carboxylic acid because Cl⁻ is a much better leaving group than OH⁻/H₂O. Ammonia with a carboxylic acid only gives the ammonium salt; the amide needs the acyl chloride.",
      source: "7A Alcohol §7A.4.4; 9 Carboxylic Derivatives §9A.3.2, §9B.3.1; 10 Nitrogen Compounds §10B.2",
      hints: [
        "First get to a carboxylic acid. Which oxidant takes a primary alcohol all the way?",
        "Then convert –CO₂H to –COCl. SOCl₂ or PCl₅, anhydrous.",
        "Finally, use NH₃(g), not aqueous ammonia, on the acyl chloride."
      ],
      steps: [
        {
          from: "ethanol", to: "ethanoic acid",
          title: "Oxidise to the acid",
          prompt: "Take ethanol to ethanoic acid. This time you want complete oxidation.",
          shelf: ["oxid_kmno4_acid_hot", "oxid_k2cr2o7_heat", "oxid_k2cr2o7_distil", "red_lialh4", "h2so4_conc_heat", "pcl5", "socl2", "naoh_aq", "na2co3_aq", "hbr_gas"],
          wrong: {
            oxid_k2cr2o7_distil: "That is the controlled oxidation. Distilling the aldehyde out stops the reaction at ethanal; the brief needs the acid.",
            red_lialh4: "LiAlH₄ reduces; it does not oxidise ethanol.",
            h2so4_conc_heat: "That dehydrates ethanol to ethene.",
            pcl5: "PCl₅ substitutes –OH; it does not oxidise the carbon.",
            socl2: "SOCl₂ substitutes –OH; it does not oxidise the carbon.",
            naoh_aq: "NaOH is a base, not an oxidant.",
            na2co3_aq: "Na₂CO₃ is a base. It would neutralise an acid, not create one.",
            hbr_gas: "HBr gives bromoethane by substitution."
          }
        },
        {
          from: "ethanoic acid", to: "ethanoyl chloride",
          title: "Activate the acid",
          prompt: "Convert ethanoic acid to ethanoyl chloride.",
          shelf: ["socl2", "pcl5", "pcl3", "hcl_gas", "hbr_gas", "ethanol_h2so4", "red_lialh4", "naoh_aq", "nh3_gas", "water_rt"],
          wrong: {
            hcl_gas: "HCl(g) does not convert a carboxylic acid to an acyl chloride. The HO–CO bond is too strong, and any acyl chloride formed would be hydrolysed by the water produced.",
            hbr_gas: "HBr is not the reagent for acyl chloride formation; it would give an acyl bromide only under different conditions, and the syllabus route uses PCl₅/PCl₃/SOCl₂.",
            ethanol_h2so4: "That is esterification: it gives ethyl ethanoate, not the acyl chloride.",
            red_lialh4: "LiAlH₄ reduces the acid to ethanol; it does not replace –OH with –Cl.",
            naoh_aq: "NaOH neutralises the acid to sodium ethanoate.",
            nh3_gas: "NH₃ with the acid gives the ammonium salt, not the acyl chloride.",
            water_rt: "Water does not convert the acid to an acyl chloride; it is the reagent that hydrolyses acyl chlorides."
          }
        },
        {
          from: "ethanoyl chloride", to: "ethanamide",
          title: "Ammonia attacks",
          prompt: "Convert ethanoyl chloride to ethanamide.",
          shelf: ["nh3_gas", "nh3_etoh_sealed", "water_rt", "ethanol_rt", "ethylamine", "naoh_aq", "hcl_aq", "na2co3_aq", "red_h2_ni", "dnph"],
          wrong: {
            nh3_etoh_sealed: "That is the halogenoalkane recipe. Acyl chlorides are much more reactive; use NH₃(g) directly. Ammonia in water would also hydrolyse the acyl chloride.",
            water_rt: "Water hydrolyses the acyl chloride to ethanoic acid and HCl. That is the wrong functional group.",
            ethanol_rt: "Ethanol gives ethyl ethanoate by condensation, not the amide.",
            ethylamine: "Ethylamine gives N-ethylethanamide, not ethanamide.",
            naoh_aq: "NaOH hydrolyses the acyl chloride to the carboxylate salt.",
            hcl_aq: "HCl does not convert the acyl chloride to an amide.",
            na2co3_aq: "Carbonate hydrolyses/neutralises the acyl chloride; it does not give the amide.",
            red_h2_ni: "H₂/Ni is a reduction, not a condensation with ammonia.",
            dnph: "2,4-DNPH is a carbonyl test; it does not react with an acyl chloride to give an amide."
          }
        }
      ]
    },
    {
      id: "m03",
      number: 3,
      title: "Markovnikov's Call",
      topic: "Alkenes · electrophilic addition · substitution",
      start: "propene",
      target: "propan-2-ol",
      difficulty: "Core",
      brief: "The plant has no steam-hydration unit. Make propan-2-ol from propene via a halogenoalkane. The first step decides the regiochemistry.",
      objective: "Convert propene to propan-2-ol in two steps, passing through a bromide.",
      debrief: "HBr adds to propene by Markovnikov's rule: H goes to the CH₂ carbon so that the more stable 2° carbocation is formed, giving 2-bromopropane as the major product. Hydrolysis with aqueous NaOH and heat then replaces Br with OH, giving propan-2-ol. The direct steam/H₃PO₄ route would be one step, but this brief deliberately routes through the bromide.",
      source: "4 Alkene §4.4.3; 6 Halogen Derivatives §6.3.2",
      hints: [
        "First add HBr across the C=C. Which carbon gets the Br?",
        "Markovnikov: the Br ends up on the more substituted carbon, giving 2-bromopropane.",
        "Then hydrolyse the bromide with NaOH(aq), heat."
      ],
      steps: [
        {
          from: "propene", to: "2-bromopropane",
          title: "Add HBr the Markovnikov way",
          prompt: "Convert propene to the major bromoalkane.",
          shelf: ["hbr_gas", "hcl_gas", "br2_ccl4", "br2_water", "steam_h3po4", "red_h2_ni", "oxid_kmno4_naoh_cold", "oxid_kmno4_acid_hot", "naoh_aq", "h2so4_conc_heat"],
          wrong: {
            hcl_gas: "HCl gives 2-chloropropane, not the bromide. The brief asks for a bromide intermediate.",
            br2_ccl4: "Br₂ adds two Br atoms across C=C, giving 1,2-dibromopropane. You need HBr, not Br₂.",
            br2_water: "Aqueous bromine gives the bromohydrin, not 2-bromopropane.",
            steam_h3po4: "That is the direct hydration route. It gives propan-2-ol in one step, but the brief requires the bromide route.",
            red_h2_ni: "Hydrogenation gives propane; it removes the C=C instead of adding HBr.",
            oxid_kmno4_naoh_cold: "Cold alkaline KMnO₄ gives propane-1,2-diol, not a bromide.",
            oxid_kmno4_acid_hot: "Hot acidified KMnO₄ cleaves the C=C; it is not an addition of HBr.",
            naoh_aq: "NaOH does not add across a C=C bond.",
            h2so4_conc_heat: "Conc. H₂SO₄ + heat is a dehydration recipe; there is no alcohol here to dehydrate."
          }
        },
        {
          from: "2-bromopropane", to: "propan-2-ol",
          title: "Hydrolyse the bromide",
          prompt: "Convert 2-bromopropane to propan-2-ol.",
          shelf: ["naoh_aq_heat", "naoh_etoh_heat", "kcn_etoh", "nh3_etoh_sealed", "water_rt", "red_h2_ni", "na_metal", "hbr_gas", "socl2", "oxid_kmno4_acid_hot"],
          wrong: {
            naoh_etoh_heat: "Ethanolic NaOH promotes elimination: it gives propene, not propan-2-ol.",
            kcn_etoh: "Cyanide substitutes Br with CN, giving 2-methylpropanenitrile.",
            nh3_etoh_sealed: "Ammonia gives propan-2-amine, not the alcohol.",
            water_rt: "Water alone is not a good enough nucleophile; the C–Br bond needs OH⁻ and heat to hydrolyse at a useful rate.",
            red_h2_ni: "H₂/Ni does not replace Br with OH.",
            na_metal: "Sodium does not hydrolyse a halogenoalkane.",
            hbr_gas: "HBr would not convert the bromide to an alcohol; it is the reverse direction.",
            socl2: "SOCl₂ converts alcohols to chlorides; it does not hydrolyse a bromide.",
            oxid_kmno4_acid_hot: "KMnO₄ oxidises the alcohol once formed; it does not hydrolyse the C–Br bond."
          }
        }
      ]
    },
    {
      id: "m04",
      number: 4,
      title: "Meta Logic",
      topic: "Arenes · directing effects · multi-step synthesis",
      start: "benzene",
      target: "3-bromonitrobenzene",
      difficulty: "Hard",
      brief: "You need the meta isomer. The order of the two substitutions is the whole puzzle. One group is 2,4-directing; the other is 3-directing.",
      objective: "Convert benzene to 3-bromonitrobenzene in two steps. The order matters.",
      debrief: "Nitrate first. –NO₂ is meta-directing and strongly deactivating, so the later bromination goes to the 3-position (with FeBr₃ and heat). If you brominate first, –Br is 2,4-directing; nitration then gives 2- and 4-bromonitrobenzene, not the 3-isomer. This is the classic order-of-substitution question.",
      source: "5 Arene §5.6.2, Checkpoint 3; 10 Nitrogen Compounds tutorial Q5",
      hints: [
        "Which substituent directs the second electrophile to the 3-position?",
        "–NO₂ is meta-directing. Put it on first.",
        "Step 1: nitrating mixture, 50 °C. Step 2: Br₂ / anhydrous FeBr₃, heat."
      ],
      steps: [
        {
          from: "benzene", to: "nitrobenzene",
          title: "Install the meta director",
          prompt: "Which first substitution sets up the 3-position for the second?",
          shelf: ["hno3_h2so4_50", "hno3_h2so4_30", "hno3_dilute", "br2_febr3", "cl2_fecl3", "alcl3_ch3cl", "br2_ccl4", "h2so4_conc_heat", "naoh_aq", "oxid_kmno4_acid_hot"],
          wrong: {
            hno3_h2so4_30: "30 °C is the alkylbenzene nitration condition. Benzene needs the nitrating mixture at about 50 °C.",
            hno3_dilute: "Dilute HNO₃ is used for phenol, not benzene. Benzene needs conc. HNO₃ and conc. H₂SO₄ to generate NO₂⁺.",
            br2_febr3: "Bromination gives bromobenzene. That works, but –Br is 2,4-directing: a later nitration would give 2-/4-bromonitrobenzene, not the 3-isomer. Nitrate first.",
            cl2_fecl3: "Chlorination gives chlorobenzene; –Cl is 2,4-directing, so the later nitration would not give the 3-isomer.",
            alcl3_ch3cl: "Friedel–Crafts gives methylbenzene; the methyl group is 2,4-directing, not meta-directing.",
            br2_ccl4: "Benzene needs a Lewis-acid catalyst for bromination. Br₂ in CCl₄ alone does not react.",
            h2so4_conc_heat: "Conc. H₂SO₄ + heat does not nitrate benzene; the nitrating mixture needs HNO₃ as well.",
            naoh_aq: "Benzene is not acidic and does not react with aqueous NaOH.",
            oxid_kmno4_acid_hot: "Benzene is resistant to oxidation; there is no side chain to oxidise."
          }
        },
        {
          from: "nitrobenzene", to: "3-bromonitrobenzene",
          title: "Brominate the deactivated ring",
          prompt: "Now put the bromine in the 3-position.",
          shelf: ["br2_febr3", "br2_ccl4", "br2_water", "cl2_fecl3", "hno3_h2so4_50", "red_sn_hcl", "oxid_kmno4_acid_hot", "naoh_aq_heat", "red_h2_ni", "alcl3_ch3cl"],
          wrong: {
            br2_ccl4: "Br₂ in CCl₄ has no Lewis-acid catalyst. Nitrobenzene is deactivated and needs FeBr₃ and heat.",
            br2_water: "Aqueous bromine is for activated rings such as phenol or phenylamine; it will not brominate deactivated nitrobenzene.",
            cl2_fecl3: "Chlorination would give 3-chloronitrobenzene, not the bromide.",
            hno3_h2so4_50: "A second nitration gives 1,3-dinitrobenzene, not the bromo compound.",
            red_sn_hcl: "That reduces the nitro group to an amine; it does not brominate the ring.",
            oxid_kmno4_acid_hot: "There is no side chain to oxidise, and KMnO₄ does not brominate the ring.",
            naoh_aq_heat: "Nitrobenzene does not undergo nucleophilic substitution with NaOH.",
            red_h2_ni: "H₂/Ni does not reduce nitrobenzene in the syllabus, and it does not brominate.",
            alcl3_ch3cl: "Nitrobenzene is strongly deactivated, so Friedel–Crafts alkylation does not work well on it. In any case it would not give the bromide."
          }
        }
      ]
    },
    {
      id: "m05",
      number: 5,
      title: "Three Seats",
      topic: "Phenols · activated aromatic substitution",
      start: "phenol",
      target: "2,4,6-tribromophenol",
      difficulty: "Starter",
      brief: "Phenol is a strongly activated ring. You want all three activated positions filled—without a Lewis-acid catalyst.",
      objective: "Convert phenol to 2,4,6-tribromophenol in one step.",
      debrief: "The –OH group donates electron density into the ring by resonance, so phenol is much more reactive than benzene. Aqueous bromine at room temperature gives tri-substitution at the 2,4,6-positions without any catalyst. Orange Br₂ is decolourised and a white precipitate of 2,4,6-tribromophenol forms. In CCl₄, mono-substitution dominates instead.",
      source: "7B Phenol §7B.3.4; Summary §Section F",
      hints: [
        "The ring is strongly activated. How many positions can the –OH direct?",
        "Use aqueous bromine; no FeBr₃ is needed.",
        "Br₂(aq) gives the 2,4,6-tribromo product as a white precipitate."
      ],
      steps: [
        {
          from: "phenol", to: "2,4,6-tribromophenol",
          title: "Fill the activated positions",
          prompt: "Brominate phenol all the way to the tribromo product.",
          shelf: ["br2_water", "br2_ccl4", "br2_febr3", "hno3_dilute", "hno3_conc", "naoh_aq", "ethanoyl_chloride", "na2co3_aq", "fecl3", "red_h2_ni"],
          wrong: {
            br2_ccl4: "In CCl₄, mono-substitution dominates: you get a mixture of 2- and 4-bromophenol, not the tribromo product.",
            br2_febr3: "No Lewis-acid catalyst is needed. The –OH group activates the ring; aqueous Br₂ is enough, and it tri-brominates.",
            hno3_dilute: "Dilute HNO₃ gives mono-nitrophenols, not bromination.",
            hno3_conc: "Conc. HNO₃ gives 2,4,6-trinitrophenol, not the bromo compound.",
            naoh_aq: "NaOH forms sodium phenoxide; it does not brominate the ring.",
            ethanoyl_chloride: "Ethanoyl chloride acylates the –OH group to give phenyl ethanoate.",
            na2co3_aq: "Phenol is too weak an acid to react with Na₂CO₃; no bromination occurs.",
            fecl3: "Neutral FeCl₃ is the violet phenol test; it does not brominate.",
            red_h2_ni: "H₂/Ni does not brominate the ring."
          }
        }
      ]
    },
    {
      id: "m06",
      number: 6,
      title: "Toluene's Two Faces",
      topic: "Arenes · side-chain oxidation · esterification",
      start: "methylbenzene",
      target: "methyl benzoate",
      difficulty: "Core",
      brief: "Methylbenzene has two reactive sites: the ring and the methyl side chain. This route uses the side chain first, then makes an ester.",
      objective: "Convert methylbenzene to methyl benzoate in two steps.",
      debrief: "Hot acidified KMnO₄ oxidises the methyl side chain to –CO₂H because the carbon directly attached to the ring bears H atoms. The ring is untouched. The resulting benzoic acid is then esterified with methanol and conc. H₂SO₄ under reflux. Fischer esterification is reversible; the acid catalyst also removes water to improve the yield.",
      source: "5 Arene §5.6.3; 9 Carboxylic Derivatives §9A.3.2",
      hints: [
        "First oxidise the methyl group. Which reagent attacks the side chain, not the ring?",
        "Hot acidified KMnO₄ gives benzoic acid.",
        "Then esterify with methanol and conc. H₂SO₄ under reflux."
      ],
      steps: [
        {
          from: "methylbenzene", to: "benzoic acid",
          title: "Oxidise the side chain",
          prompt: "Convert methylbenzene to benzoic acid.",
          shelf: ["oxid_kmno4_acid_hot", "oxid_kmno4_naoh_hot", "oxid_k2cr2o7_heat", "br2_febr3", "hno3_h2so4_30", "cl2_uv", "red_h2_ni", "naoh_aq", "h2so4_conc_heat", "alcl3_ch3cl"],
          wrong: {
            oxid_k2cr2o7_heat: "The side-chain oxidation in the notes uses hot acidified KMnO₄. Dichromate is not the reagent specified for this transformation.",
            br2_febr3: "That brominates the ring, not the side chain.",
            hno3_h2so4_30: "That nitrates the ring; the methyl group remains.",
            cl2_uv: "UV chlorination substitutes the side-chain H atoms; it does not oxidise the methyl group to –CO₂H.",
            red_h2_ni: "There is no C=C or C=O to reduce; the ring is not hydrogenated under these conditions.",
            naoh_aq: "NaOH does not oxidise the methyl group.",
            h2so4_conc_heat: "Conc. H₂SO₄ + heat does not oxidise the side chain.",
            alcl3_ch3cl: "Friedel–Crafts alkylation adds another alkyl group; it does not oxidise the existing methyl group."
          }
        },
        {
          from: "benzoic acid", to: "methyl benzoate",
          title: "Make the methyl ester",
          prompt: "Convert benzoic acid to methyl benzoate.",
          shelf: ["methanol_h2so4", "ethanol_h2so4", "socl2", "red_lialh4", "naoh_aq", "na2co3_aq", "nh3_gas", "water_rt", "pcl5", "h2so4_conc_heat"],
          wrong: {
            ethanol_h2so4: "Ethanol gives ethyl benzoate, not the methyl ester.",
            socl2: "SOCl₂ converts benzoic acid to benzoyl chloride, not to an ester.",
            red_lialh4: "LiAlH₄ reduces benzoic acid to benzyl alcohol.",
            naoh_aq: "NaOH neutralises benzoic acid to sodium benzoate.",
            na2co3_aq: "Na₂CO₃ neutralises the acid to sodium benzoate and releases CO₂.",
            nh3_gas: "Ammonia gives ammonium benzoate by acid–base reaction, not the ester.",
            water_rt: "Water does not esterify the acid.",
            pcl5: "PCl₅ converts the acid to benzoyl chloride.",
            h2so4_conc_heat: "Conc. H₂SO₄ alone is a catalyst, but you need methanol as the other reactant. The shelf option with methanol is the complete recipe."
          }
        }
      ]
    },
    {
      id: "m07",
      number: 7,
      title: "One Carbon Longer",
      topic: "Halogenoalkanes · nitriles · chain extension",
      start: "bromoethane",
      target: "propanoic acid",
      difficulty: "Core",
      brief: "You need to add exactly one carbon to the chain, then turn the new group into a carboxylic acid. Cyanide is the key.",
      objective: "Convert bromoethane to propanoic acid in two steps.",
      debrief: "Ethanolic KCN substitutes Br⁻ with CN⁻, extending the chain by one carbon to propanenitrile. Acidic hydrolysis of the nitrile then gives propanoic acid. The oxidation state of the nitrile carbon is the same as the acid carbon, so no oxidising agent is needed for the hydrolysis—only H⁺ and water with heat.",
      source: "6 Halogen Derivatives §6.3.2; 9 Carboxylic Derivatives §9A.3.1",
      hints: [
        "To add one carbon, use cyanide as the nucleophile.",
        "Ethanolic KCN, heat, gives propanenitrile.",
        "Hydrolyse the nitrile with H₂SO₄(aq) and heat."
      ],
      steps: [
        {
          from: "bromoethane", to: "propanenitrile",
          title: "Extend the chain",
          prompt: "Add one carbon to bromoethane.",
          shelf: ["kcn_etoh", "naoh_aq_heat", "naoh_etoh_heat", "nh3_etoh_sealed", "red_h2_ni", "red_lialh4", "hbr_gas", "water_rt", "na_metal", "oxid_kmno4_acid_hot"],
          wrong: {
            naoh_aq_heat: "Aqueous NaOH gives ethanol by hydrolysis; it does not add a carbon.",
            naoh_etoh_heat: "Ethanolic NaOH eliminates HBr to give ethene.",
            nh3_etoh_sealed: "Ammonia gives ethylamine; it adds nitrogen, not carbon.",
            red_h2_ni: "H₂/Ni does not react with a halogenoalkane under these conditions.",
            red_lialh4: "LiAlH₄ does not substitute the halogen.",
            hbr_gas: "HBr does not add a carbon; it is already the halogen acid.",
            water_rt: "Water alone does not hydrolyse the bromide at a useful rate.",
            na_metal: "Sodium does not extend the chain here.",
            oxid_kmno4_acid_hot: "KMnO₄ does not substitute Br with CN; it is an oxidant."
          }
        },
        {
          from: "propanenitrile", to: "propanoic acid",
          title: "Hydrolyse the nitrile",
          prompt: "Convert propanenitrile to propanoic acid.",
          shelf: ["h2so4_aq_heat", "naoh_aq_heat", "red_h2_ni", "red_lialh4", "water_rt", "hcl_aq", "oxid_kmno4_acid_hot", "na2co3_aq", "pcl5", "socl2"],
          wrong: {
            naoh_aq_heat: "Alkaline hydrolysis gives sodium propanoate, not the free acid. You would need a separate acidification step; the brief allows two steps, so use acid hydrolysis.",
            red_h2_ni: "Hydrogenation reduces the nitrile to propylamine, not the acid.",
            red_lialh4: "LiAlH₄ reduces the nitrile to propylamine.",
            water_rt: "Nitrile hydrolysis is extremely slow in neutral water; it needs acid or alkali and heat.",
            hcl_aq: "Dilute HCl alone at room temperature is not the standard hydrolysis condition; use H₂SO₄(aq) with heat.",
            oxid_kmno4_acid_hot: "No oxidant is needed: the nitrile carbon is already at the carboxylic acid oxidation level. KMnO₄ would not do this cleanly.",
            na2co3_aq: "Carbonate is a base; it does not hydrolyse the nitrile.",
            pcl5: "PCl₅ does not hydrolyse a nitrile.",
            socl2: "SOCl₂ does not hydrolyse a nitrile."
          }
        }
      ]
    },
    {
      id: "m08",
      number: 8,
      title: "Nitro to Amine",
      topic: "Nitrogen compounds · reduction · activated arenes",
      start: "nitrobenzene",
      target: "2,4,6-tribromophenylamine",
      difficulty: "Core",
      brief: "First reduce the nitro group, then use the newly activated ring. The second step should need no catalyst at all.",
      objective: "Convert nitrobenzene to 2,4,6-tribromophenylamine in two steps.",
      debrief: "Nitrobenzene is reduced by Sn/conc. HCl with heat; the product is initially the phenylammonium salt, so excess NaOH is added to liberate phenylamine. The –NH₂ group strongly activates the ring, so aqueous bromine gives 2,4,6-tribromophenylamine as a white precipitate without a Lewis-acid catalyst. Common reducing agents such as H₂/Ni and LiAlH₄ cannot reduce nitrobenzene.",
      source: "10 Nitrogen Compounds §10A.2.2, §10A.3.3; Summary §Section B/F",
      hints: [
        "Nitrobenzene needs a special reduction: Sn with conc. HCl, then NaOH.",
        "The product is phenylamine. Its –NH₂ group strongly activates the ring.",
        "Use Br₂(aq); no catalyst. The white precipitate is the tribromoamine."
      ],
      steps: [
        {
          from: "nitrobenzene", to: "phenylamine",
          title: "Reduce the nitro group",
          prompt: "Convert nitrobenzene to phenylamine.",
          shelf: ["red_sn_hcl", "red_h2_ni", "red_lialh4", "naoh_aq", "hcl_aq", "na_metal", "h2so4_aq_heat", "br2_water", "oxid_kmno4_acid_hot", "water_rt"],
          wrong: {
            red_h2_ni: "H₂/Ni cannot reduce nitrobenzene in the syllabus. Use Sn with concentrated HCl, heat, then NaOH.",
            red_lialh4: "LiAlH₄ does not reduce nitrobenzene either; the nitro group is resistant to these hydride reagents.",
            naoh_aq: "NaOH alone does not reduce –NO₂.",
            hcl_aq: "HCl alone does not reduce –NO₂; it only protonates the amine once formed.",
            na_metal: "Sodium metal does not reduce nitrobenzene under these conditions.",
            h2so4_aq_heat: "Aqueous acid + heat does not reduce the nitro group.",
            br2_water: "Bromine water would brominate the ring; it does not reduce –NO₂.",
            oxid_kmno4_acid_hot: "KMnO₄ is an oxidant; it will not reduce nitrobenzene.",
            water_rt: "Water does not reduce nitrobenzene."
          }
        },
        {
          from: "phenylamine", to: "2,4,6-tribromophenylamine",
          title: "Brominate the activated ring",
          prompt: "Convert phenylamine to 2,4,6-tribromophenylamine.",
          shelf: ["br2_water", "br2_ccl4", "br2_febr3", "hno3_dilute", "hno3_h2so4_50", "ethanoyl_chloride", "red_sn_hcl", "naoh_aq", "hcl_aq", "fecl3"],
          wrong: {
            br2_ccl4: "In CCl₄, mono-substitution dominates; you get 2-/4-bromophenylamine, not the tribromo product.",
            br2_febr3: "No Lewis-acid catalyst is needed. The –NH₂ group is strongly activating; aqueous Br₂ tri-brominates the ring.",
            hno3_dilute: "Phenylamine reacts with acids as a base (forming a salt), not by ring nitration. Use Br₂(aq) for the tribromo product.",
            hno3_h2so4_50: "The amine is protonated by the acid, and nitration is not the target reaction here.",
            ethanoyl_chloride: "That acylates the –NH₂ group to give N-phenylethanamide; it does not brominate the ring.",
            red_sn_hcl: "That is the reduction step, not bromination.",
            naoh_aq: "NaOH does not brominate the ring.",
            hcl_aq: "HCl protonates the amine; it does not brominate.",
            fecl3: "FeCl₃ is the phenol test; it does not brominate phenylamine."
          }
        }
      ]
    },
    {
      id: "m09",
      number: 9,
      title: "Cyanohydrin",
      topic: "Carbonyls · nucleophilic addition · alpha-hydroxy acids",
      start: "propan-2-ol",
      target: "2-hydroxy-2-methylpropanoic acid",
      difficulty: "Hard",
      brief: "Three steps: oxidise the alcohol to a ketone, add HCN across the C=O, then hydrolyse the nitrile. The product is an α-hydroxy acid.",
      objective: "Convert propan-2-ol to 2-hydroxy-2-methylpropanoic acid in three steps.",
      debrief: "Propan-2-ol is a secondary alcohol, so oxidation gives propanone. HCN with a trace of base adds to the carbonyl carbon, giving the cyanohydrin (CH₃)₂C(OH)CN. Acidic hydrolysis of the nitrile then gives the α-hydroxy acid (CH₃)₂C(OH)CO₂H. The cyanohydrin step is a nucleophilic addition, not a substitution.",
      source: "8 Carbonyl Compounds §8.4.4; 9 Carboxylic Derivatives §9A.3.1",
      hints: [
        "A secondary alcohol oxidises to a ketone.",
        "HCN adds to the C=O to give a cyanohydrin.",
        "Hydrolyse the nitrile with H₂SO₄(aq) and heat."
      ],
      steps: [
        {
          from: "propan-2-ol", to: "propanone",
          title: "Oxidise the secondary alcohol",
          prompt: "Convert propan-2-ol to propanone.",
          shelf: ["oxid_k2cr2o7_heat", "oxid_kmno4_acid_hot", "oxid_k2cr2o7_distil", "red_h2_ni", "red_lialh4", "h2so4_conc_heat", "pcl5", "socl2", "hbr_gas", "na_metal"],
          wrong: {
            red_h2_ni: "H₂/Ni would reduce a carbonyl, but you are starting from an alcohol. It does not oxidise propan-2-ol.",
            red_lialh4: "LiAlH₄ is a reductant; it cannot oxidise the alcohol.",
            h2so4_conc_heat: "Conc. H₂SO₄ + heat dehydrates propan-2-ol to propene.",
            pcl5: "PCl₅ substitutes –OH with –Cl, giving 2-chloropropane.",
            socl2: "SOCl₂ substitutes –OH with –Cl.",
            hbr_gas: "HBr substitutes –OH with –Br, giving 2-bromopropane.",
            na_metal: "Sodium liberates H₂ from the alcohol; it does not oxidise it."
          }
        },
        {
          from: "propanone", to: "2-hydroxy-2-methylpropanenitrile",
          title: "Add HCN across C=O",
          prompt: "Convert propanone to its cyanohydrin.",
          shelf: ["hcn_cold", "red_h2_ni", "red_lialh4", "naoh_aq", "water_rt", "i2_naoh", "dnph", "tollens", "kcn_etoh", "h2so4_aq_heat"],
          wrong: {
            red_h2_ni: "Hydrogenation reduces the ketone to propan-2-ol; it does not add HCN.",
            red_lialh4: "LiAlH₄ reduces the ketone to propan-2-ol.",
            naoh_aq: "NaOH alone does not add HCN. A trace of base is used with HCN, but the reagent must include HCN.",
            water_rt: "Water does not add across the C=O to give a cyanohydrin.",
            i2_naoh: "I₂/NaOH is the iodoform test. It cleaves the methyl ketone to ethanoate and CHI₃; it does not give the cyanohydrin.",
            dnph: "2,4-DNPH gives an orange hydrazone precipitate; it is a test, not a cyanohydrin synthesis.",
            tollens: "Tollens' reagent oxidises aldehydes, not ketones. Propanone gives no silver mirror.",
            kcn_etoh: "Ethanolic KCN is the reagent for substituting a halogenoalkane. For a carbonyl you need HCN with a trace of base.",
            h2so4_aq_heat: "Aqueous acid + heat does not add HCN; it would hydrolyse a nitrile if one were already present."
          }
        },
        {
          from: "2-hydroxy-2-methylpropanenitrile", to: "2-hydroxy-2-methylpropanoic acid",
          title: "Hydrolyse the cyanohydrin",
          prompt: "Convert the cyanohydrin to the α-hydroxy acid.",
          shelf: ["h2so4_aq_heat", "naoh_aq_heat", "red_h2_ni", "red_lialh4", "water_rt", "hcl_aq", "oxid_kmno4_acid_hot", "pcl5", "socl2", "na2co3_aq"],
          wrong: {
            naoh_aq_heat: "Alkaline hydrolysis gives the carboxylate salt; you would need a separate acidification step. Use acid hydrolysis.",
            red_h2_ni: "Reduction of the nitrile gives an amine, not the acid.",
            red_lialh4: "LiAlH₄ reduces the nitrile to an amine.",
            water_rt: "Neutral water is too slow; nitrile hydrolysis needs acid or base and heat.",
            hcl_aq: "Dilute HCl at room temperature is not the standard hydrolysis condition; use H₂SO₄(aq) with heat.",
            oxid_kmno4_acid_hot: "No oxidant is needed; the nitrile carbon is already at the carboxylic acid oxidation level.",
            pcl5: "PCl₅ does not hydrolyse the nitrile.",
            socl2: "SOCl₂ does not hydrolyse the nitrile.",
            na2co3_aq: "Carbonate does not hydrolyse the nitrile."
          }
        }
      ]
    },
    {
      id: "m10",
      number: 10,
      title: "The Anilide",
      topic: "Arenes · reduction · acylation",
      start: "benzene",
      target: "N-phenylethanamide",
      difficulty: "Hard",
      brief: "Three steps from benzene: nitrate, reduce, acylate. The last step must use an acyl chloride, not a carboxylic acid.",
      objective: "Convert benzene to N-phenylethanamide in three steps.",
      debrief: "Benzene is nitrated with conc. HNO₃/conc. H₂SO₄ at 50 °C. Sn/conc. HCl reduces the nitro group; excess NaOH liberates phenylamine. Finally, ethanoyl chloride acylates the amine at room temperature. A carboxylic acid plus an amine would only give an acid–base salt, not the amide—so the acyl chloride is essential.",
      source: "5 Arene §5.5; 10 Nitrogen Compounds §10A.2.2, §10A.3.2, §10B.2",
      hints: [
        "Start with nitration of benzene (50 °C).",
        "Reduce nitrobenzene with Sn/conc. HCl, then NaOH.",
        "Acylate phenylamine with ethanoyl chloride, room temperature."
      ],
      steps: [
        {
          from: "benzene", to: "nitrobenzene",
          title: "Nitrate the ring",
          prompt: "Convert benzene to nitrobenzene.",
          shelf: ["hno3_h2so4_50", "hno3_h2so4_30", "hno3_dilute", "br2_febr3", "cl2_fecl3", "alcl3_ch3cl", "br2_ccl4", "h2so4_conc_heat", "naoh_aq", "oxid_kmno4_acid_hot"],
          wrong: {
            hno3_h2so4_30: "30 °C is for alkylbenzenes. Benzene needs the nitrating mixture at about 50 °C.",
            hno3_dilute: "Dilute HNO₃ is for phenol; benzene needs conc. HNO₃ + conc. H₂SO₄.",
            br2_febr3: "That brominates the ring; it does not nitrate it.",
            cl2_fecl3: "That chlorinates the ring.",
            alcl3_ch3cl: "Friedel–Crafts gives methylbenzene, not nitrobenzene.",
            br2_ccl4: "Benzene needs a Lewis-acid catalyst; Br₂/CCl₄ alone does not react.",
            h2so4_conc_heat: "Conc. H₂SO₄ alone is not the nitrating mixture; you need HNO₃.",
            naoh_aq: "Benzene does not react with NaOH.",
            oxid_kmno4_acid_hot: "Benzene is resistant to oxidation."
          }
        },
        {
          from: "nitrobenzene", to: "phenylamine",
          title: "Reduce to the amine",
          prompt: "Convert nitrobenzene to phenylamine.",
          shelf: ["red_sn_hcl", "red_h2_ni", "red_lialh4", "naoh_aq", "hcl_aq", "na_metal", "h2so4_aq_heat", "br2_water", "oxid_kmno4_acid_hot", "water_rt"],
          wrong: {
            red_h2_ni: "H₂/Ni cannot reduce nitrobenzene in the syllabus; use Sn/conc. HCl, heat, then NaOH.",
            red_lialh4: "LiAlH₄ does not reduce nitrobenzene.",
            naoh_aq: "NaOH alone does not reduce –NO₂.",
            hcl_aq: "HCl alone does not reduce –NO₂.",
            na_metal: "Sodium does not reduce nitrobenzene here.",
            h2so4_aq_heat: "Aqueous acid + heat does not reduce –NO₂.",
            br2_water: "Bromine water brominates the ring; it does not reduce –NO₂.",
            oxid_kmno4_acid_hot: "KMnO₄ is an oxidant.",
            water_rt: "Water does not reduce nitrobenzene."
          }
        },
        {
          from: "phenylamine", to: "N-phenylethanamide",
          title: "Acylate the amine",
          prompt: "Convert phenylamine to N-phenylethanamide.",
          shelf: ["ethanoyl_chloride", "ethanoic_acid_h2so4", "nh3_gas", "br2_water", "hno3_dilute", "hcl_aq", "naoh_aq", "red_sn_hcl", "dnph", "water_rt"],
          wrong: {
            ethanoic_acid_h2so4: "Carboxylic acid + amine gives an acid–base salt, not an amide. You need the more reactive ethanoyl chloride.",
            nh3_gas: "Ammonia does not acylate phenylamine; it would compete as a nucleophile and give ethanamide if an acyl chloride were present.",
            br2_water: "Bromine water tri-brominates the activated ring; it does not acylate the amine.",
            hno3_dilute: "Nitric acid protonates the amine (acid–base), not acylation.",
            hcl_aq: "HCl gives the phenylammonium salt, not the amide.",
            naoh_aq: "NaOH is a base; it does not acylate the amine.",
            red_sn_hcl: "That is the reduction step, not acylation.",
            dnph: "2,4-DNPH is a carbonyl test; it does not acylate amines.",
            water_rt: "Water does not acylate the amine."
          }
        }
      ]
    },
    {
      id: "m11",
      number: 11,
      title: "Double Substitution",
      topic: "Halogenoalkanes · dinitriles · diacids",
      start: "1,2-dibromoethane",
      target: "butanedioic acid",
      difficulty: "Core",
      brief: "Two ends, two substitutions, then two hydrolyses. Each cyanide adds one carbon, so the chain grows from two carbons to four.",
      objective: "Convert 1,2-dibromoethane to butanedioic acid in two steps.",
      debrief: "Both C–Br bonds undergo SN2 with cyanide, giving butanedinitrile (NC–CH₂–CH₂–CN). Acidic hydrolysis of both nitriles then gives butanedioic acid (HO₂C–CH₂–CH₂–CO₂H). The nitrile carbons are already at the acid oxidation level, so no oxidant is needed for the hydrolysis.",
      source: "6 Halogen Derivatives tutorial Q4(e); 9 Carboxylic Derivatives §9A.3.1",
      hints: [
        "Both ends can be substituted by cyanide.",
        "Ethanolic KCN, heat, gives the dinitrile.",
        "Hydrolyse both nitriles with H₂SO₄(aq), heat."
      ],
      steps: [
        {
          from: "1,2-dibromoethane", to: "butanedinitrile",
          title: "Substitute both ends",
          prompt: "Convert 1,2-dibromoethane to butanedinitrile.",
          shelf: ["kcn_etoh", "naoh_aq_heat", "naoh_etoh_heat", "nh3_etoh_sealed", "red_h2_ni", "red_lialh4", "hbr_gas", "water_rt", "na_metal", "oxid_kmno4_acid_hot"],
          wrong: {
            naoh_aq_heat: "Aqueous NaOH hydrolyses both C–Br bonds to give ethane-1,2-diol, not the dinitrile.",
            naoh_etoh_heat: "Ethanolic NaOH eliminates HBr; it does not add two cyanide groups.",
            nh3_etoh_sealed: "Ammonia gives a diamine, not a dinitrile.",
            red_h2_ni: "H₂/Ni does not substitute the bromide.",
            red_lialh4: "LiAlH₄ does not substitute the bromide.",
            hbr_gas: "HBr does not add cyanide; it is already a halogen acid.",
            water_rt: "Water alone is too slow; it does not give the dinitrile.",
            na_metal: "Sodium does not substitute the bromide here.",
            oxid_kmno4_acid_hot: "KMnO₄ is an oxidant; it does not install –CN."
          }
        },
        {
          from: "butanedinitrile", to: "butanedioic acid",
          title: "Hydrolyse both nitriles",
          prompt: "Convert butanedinitrile to butanedioic acid.",
          shelf: ["h2so4_aq_heat", "naoh_aq_heat", "red_h2_ni", "red_lialh4", "water_rt", "hcl_aq", "oxid_kmno4_acid_hot", "pcl5", "socl2", "na2co3_aq"],
          wrong: {
            naoh_aq_heat: "Alkaline hydrolysis gives the dicarboxylate salt; you would need a separate acidification step. Use acid hydrolysis for the free diacid.",
            red_h2_ni: "Hydrogenation reduces the nitriles to amines, not acids.",
            red_lialh4: "LiAlH₄ reduces the nitriles to amines.",
            water_rt: "Neutral water is too slow; nitrile hydrolysis needs acid or base and heat.",
            hcl_aq: "Dilute HCl at room temperature is not the standard hydrolysis condition; use H₂SO₄(aq) with heat.",
            oxid_kmno4_acid_hot: "No oxidant is needed; the nitrile carbons are already at the acid oxidation level.",
            pcl5: "PCl₅ does not hydrolyse nitriles.",
            socl2: "SOCl₂ does not hydrolyse nitriles.",
            na2co3_aq: "Carbonate does not hydrolyse nitriles."
          }
        }
      ]
    },
    {
      id: "m12",
      number: 12,
      title: "Capstone: 4-Nitrobenzoic Acid",
      topic: "Arenes · directing effects · side-chain oxidation",
      start: "methylbenzene",
      target: "4-nitrobenzoic acid",
      difficulty: "Hard",
      brief: "Two steps, two lessons: nitration of an alkylbenzene at the right temperature, then oxidation of the methyl group without touching the nitro group.",
      objective: "Convert methylbenzene to 4-nitrobenzoic acid in two steps.",
      debrief: "Methylbenzene is nitrated at 30 °C with conc. HNO₃/conc. H₂SO₄. The methyl group is 2,4-directing, so the major product is 4-nitromethylbenzene (some 2-isomer also forms). Hot acidified KMnO₄ then oxidises the methyl group to –CO₂H while leaving the nitro group intact, giving 4-nitrobenzoic acid.",
      source: "5 Arene §5.6.3; 10 Nitrogen Compounds tutorial Q5 (sequence logic)",
      hints: [
        "Nitrate methylbenzene at 30 °C, not 50 °C.",
        "The methyl group directs to the 2- and 4-positions; the 4-isomer is major.",
        "Oxidise the methyl group with hot acidified KMnO₄."
      ],
      steps: [
        {
          from: "methylbenzene", to: "4-nitromethylbenzene",
          title: "Nitrate at the alkylbenzene temperature",
          prompt: "Convert methylbenzene to 4-nitromethylbenzene.",
          shelf: ["hno3_h2so4_30", "hno3_h2so4_50", "hno3_dilute", "hno3_conc", "br2_febr3", "cl2_fecl3", "cl2_uv", "oxid_kmno4_acid_hot", "alcl3_ch3cl", "h2so4_conc_heat"],
          wrong: {
            hno3_h2so4_50: "50 °C is the benzene nitration temperature. Alkylbenzenes are nitrated at about 30 °C; higher temperatures risk over-nitration/oxidation.",
            hno3_dilute: "Dilute HNO₃ is the phenol nitration condition; it is not the nitrating mixture for methylbenzene.",
            hno3_conc: "Conc. HNO₃ alone lacks the H₂SO₄ needed to generate NO₂⁺ efficiently.",
            br2_febr3: "That brominates the ring; it does not nitrate the ring.",
            cl2_fecl3: "That chlorinates the ring.",
            cl2_uv: "UV chlorination attacks the methyl side chain, not the ring.",
            oxid_kmno4_acid_hot: "That oxidises the methyl group to –CO₂H; it does not nitrate the ring.",
            alcl3_ch3cl: "Friedel–Crafts adds another alkyl group; it does not nitrate.",
            h2so4_conc_heat: "Conc. H₂SO₄ alone is not the nitrating mixture."
          }
        },
        {
          from: "4-nitromethylbenzene", to: "4-nitrobenzoic acid",
          title: "Oxidise the methyl group",
          prompt: "Convert 4-nitromethylbenzene to 4-nitrobenzoic acid.",
          shelf: ["oxid_kmno4_acid_hot", "oxid_kmno4_naoh_hot", "oxid_k2cr2o7_heat", "br2_febr3", "hno3_h2so4_30", "cl2_uv", "red_h2_ni", "naoh_aq", "h2so4_conc_heat", "alcl3_ch3cl"],
          wrong: {
            oxid_k2cr2o7_heat: "The side-chain oxidation in the notes uses hot acidified KMnO₄, not dichromate.",
            br2_febr3: "That brominates the ring; it does not oxidise the methyl group.",
            hno3_h2so4_30: "A second nitration would add another nitro group; it does not oxidise the methyl group.",
            cl2_uv: "UV chlorination substitutes the side-chain hydrogens; it does not give –CO₂H.",
            red_h2_ni: "There is no C=C or C=O to reduce; the nitro group is not reduced by H₂/Ni under these conditions.",
            naoh_aq: "NaOH does not oxidise the methyl group.",
            h2so4_conc_heat: "Conc. H₂SO₄ + heat does not oxidise the side chain.",
            alcl3_ch3cl: "Friedel–Crafts alkylation does not oxidise the methyl group."
          }
        }
      ]
    },
    {
      id: "m13",
      number: 13,
      title: "Phenol Ester",
      topic: "Phenols · nucleophiles · acyl chlorides",
      start: "phenol",
      target: "phenyl ethanoate",
      difficulty: "Core",
      brief: "Phenol is a poor nucleophile, and carboxylic acids will not esterify it. Convert it to the phenoxide first, then use an acyl chloride.",
      objective: "Convert phenol to phenyl ethanoate in two steps.",
      debrief: "Phenol is neutralised by NaOH (or Na) to sodium phenoxide. The phenoxide ion is more electron-rich and a stronger nucleophile than phenol, so it attacks ethanoyl chloride to give phenyl ethanoate. Phenol itself does not react with carboxylic acids to form esters, which is why the acyl chloride is required.",
      source: "7B Phenol §7B.3.3; 9 Carboxylic Derivatives §9B.3.1",
      hints: [
        "First make the phenoxide ion with NaOH (or Na).",
        "Phenoxide is a stronger nucleophile than phenol.",
        "React it with ethanoyl chloride at room temperature."
      ],
      steps: [
        {
          from: "phenol", to: "sodium phenoxide",
          title: "Make the phenoxide",
          prompt: "Convert phenol to sodium phenoxide.",
          shelf: ["naoh_aq", "na_metal", "br2_water", "hno3_dilute", "ethanoyl_chloride", "na2co3_aq", "fecl3", "red_h2_ni", "h2so4_conc_heat", "oxid_kmno4_acid_hot"],
          wrong: {
            br2_water: "Bromine water tri-brominates the ring; it does not deprotonate phenol.",
            hno3_dilute: "Dilute HNO₃ nitrates the ring; it does not form the phenoxide.",
            ethanoyl_chloride: "Ethanoyl chloride can esterify phenol directly, but the brief's first step is to make the phenoxide. Also, without base the reaction is slower.",
            na2co3_aq: "Phenol is too weak an acid to react with Na₂CO₃; no phenoxide is formed.",
            fecl3: "FeCl₃ is the violet phenol test; it does not deprotonate phenol.",
            red_h2_ni: "H₂/Ni does not deprotonate phenol.",
            h2so4_conc_heat: "Conc. H₂SO₄ + heat does not form the phenoxide.",
            oxid_kmno4_acid_hot: "KMnO₄ oxidises the ring/side chain; it does not simply deprotonate phenol."
          }
        },
        {
          from: "sodium phenoxide", to: "phenyl ethanoate",
          title: "Acylate the phenoxide",
          prompt: "Convert sodium phenoxide to phenyl ethanoate.",
          shelf: ["ethanoyl_chloride", "ethanoic_acid_h2so4", "methanol_h2so4", "pcl5", "socl2", "nh3_gas", "water_rt", "hcl_aq", "naoh_aq", "br2_water"],
          wrong: {
            ethanoic_acid_h2so4: "Carboxylic acids do not esterify phenol. The phenoxide would just be protonated back to phenol; an acyl chloride is needed.",
            methanol_h2so4: "Methanol + acid is a Fischer esterification recipe for a carboxylic acid; it does not acylate the phenoxide.",
            pcl5: "PCl₅ converts –OH to –Cl; it is not the acylating agent that forms the phenyl ester.",
            socl2: "SOCl₂ converts –OH to –Cl; it does not acylate the phenoxide. You need ethanoyl chloride.",
            nh3_gas: "Ammonia is a nucleophile but does not acylate the phenoxide to the ester.",
            water_rt: "Water is not an acylating agent. It will not convert the phenoxide to the ester.",
            hcl_aq: "HCl protonates the phenoxide back to phenol.",
            naoh_aq: "NaOH keeps it as the phenoxide; it does not acylate.",
            br2_water: "Bromine water brominates the ring; it does not form the ester."
          }
        }
      ]
    }
  ],

  concepts: [
    {
      id: "c01",
      topic: "Reduction",
      question: "Which reagent is the only one in the syllabus that can reduce a carboxylic acid, RCO₂H, to a primary alcohol?",
      options: ["H₂(g), Ni catalyst", "LiAlH₄ in dry ether", "Sn, conc. HCl, heat", "Na(s), room temperature"],
      answer: 1,
      explanation: "LiAlH₄ is the only reducing agent that reduces –CO₂H. H₂/Ni does not reduce carboxylic acids, amides or nitrobenzene.",
      source: "7A Alcohol §7A.3.1; 9 Carboxylic Derivatives §9A.3.4"
    },
    {
      id: "c02",
      topic: "Tests",
      question: "Which compound gives a silver mirror when warmed with Tollens' reagent?",
      options: ["propanone", "ethanol", "ethanal", "ethanoic acid"],
      answer: 2,
      explanation: "Tollens' reagent oxidises aldehydes to carboxylates and deposits Ag(s). Ketones, alcohols and carboxylic acids (except methanoic acid) do not give a silver mirror.",
      source: "8 Carbonyl Compounds §8.5.4"
    },
    {
      id: "c03",
      topic: "Tests",
      question: "Which compound gives a brick-red precipitate with Fehling's solution?",
      options: ["propanal", "benzaldehyde", "propanone", "ethanol"],
      answer: 0,
      explanation: "Fehling's solution reacts with aliphatic aldehydes, reducing Cu²⁺ to Cu₂O (brick-red). Benzaldehyde and its derivatives do not react.",
      source: "8 Carbonyl Compounds §8.5.4"
    },
    {
      id: "c04",
      topic: "Tests",
      question: "Which compound gives a yellow precipitate with I₂ and NaOH(aq) on warming?",
      options: ["propan-1-ol", "ethanol", "propanal", "ethanoic acid"],
      answer: 1,
      explanation: "The iodoform test is positive for CH₃CH(OH)– (methyl carbinol) and CH₃CO– (methyl carbonyl). Ethanol is the simplest positive alcohol; propan-1-ol and propanal do not have the required feature.",
      source: "7A Alcohol §7A.4.4; 8 Carbonyl Compounds §8.4.5"
    },
    {
      id: "c05",
      topic: "Distinguishing tests",
      question: "You have phenol and benzoic acid. Which observation correctly distinguishes them?",
      options: [
        "Phenol gives a white precipitate with Br₂(aq); benzoic acid does not.",
        "Benzoic acid gives a white precipitate with Br₂(aq); phenol does not.",
        "Both give a white precipitate with Br₂(aq).",
        "Phenol gives effervescence with NaHCO₃(aq); benzoic acid does not."
      ],
      answer: 0,
      explanation: "Phenol is strongly activated and reacts with aqueous bromine to give 2,4,6-tribromophenol (white ppt). Benzoic acid is deactivated and does not brominate under these conditions. Conversely, only benzoic acid gives CO₂ with NaHCO₃.",
      source: "7B Phenol §7B.3.4; 9 Carboxylic Derivatives §9A.3.2"
    },
    {
      id: "c06",
      topic: "Mechanisms",
      question: "A primary halogenoalkane reacts with OH⁻(aq) under heat. Which mechanism is favoured?",
      options: ["SN1", "SN2", "Electrophilic addition", "Free-radical substitution"],
      answer: 1,
      explanation: "Primary halogenoalkanes have little steric hindrance at the carbon bearing the halogen, so SN2 (bimolecular, one-step, inversion) is favoured. Tertiary halogenoalkanes favour SN1.",
      source: "6 Halogen Derivatives §6.3.3"
    },
    {
      id: "c07",
      topic: "Mechanisms",
      question: "A tertiary halogenoalkane is hydrolysed. Which mechanism and stereochemical outcome are expected?",
      options: ["SN2; inversion of configuration", "SN1; racemic mixture", "SN2; racemic mixture", "SN1; retention of configuration"],
      answer: 1,
      explanation: "Tertiary halogenoalkanes ionise to a stable tertiary carbocation (SN1). The planar carbocation can be attacked from either face, giving a racemic mixture if the product is chiral.",
      source: "6 Halogen Derivatives §6.3.3"
    },
    {
      id: "c08",
      topic: "Alkenes",
      question: "What is the major product when propene reacts with HBr(g)?",
      options: ["1-bromopropane", "2-bromopropane", "1,2-dibromopropane", "propan-2-ol"],
      answer: 1,
      explanation: "Markovnikov addition: H adds to the CH₂ carbon so that the more stable 2° carbocation forms; Br⁻ then attacks to give 2-bromopropane.",
      source: "4 Alkene §4.4.3"
    },
    {
      id: "c09",
      topic: "Elimination",
      question: "Butan-2-ol is heated with conc. H₂SO₄. Which is the major alkene product?",
      options: ["but-1-ene", "but-2-ene", "butane", "butan-2-one"],
      answer: 1,
      explanation: "Zaitsev's rule: the more highly substituted alkene is more stable and is the major elimination product. Butan-2-ol gives but-2-ene as the major product.",
      source: "7A Alcohol §7A.4.3; 4 Alkene §4.3"
    },
    {
      id: "c10",
      topic: "Arenes",
      question: "Why does benzene prefer electrophilic substitution rather than addition?",
      options: [
        "The C–H bonds are stronger than the C–C bonds.",
        "Addition would destroy the delocalised π system and lose aromatic stability.",
        "Benzene has no π electrons.",
        "Benzene is electron-poor and repels nucleophiles."
      ],
      answer: 1,
      explanation: "Benzene's six delocalised π electrons give it aromatic stability. Addition across a C=C would break the delocalised ring; substitution preserves it, so substitution is favoured.",
      source: "5 Arene §5.3–5.4"
    },
    {
      id: "c11",
      topic: "Amides",
      question: "Which reagent converts an amide to an amine?",
      options: ["H₂(g), Ni catalyst", "LiAlH₄ in dry ether", "NaOH(aq), heat", "Br₂(aq)"],
      answer: 1,
      explanation: "LiAlH₄ reduces the amide C=O to CH₂, giving the amine. Catalytic H₂ cannot reduce amides; NaOH(aq) hydrolyses them.",
      source: "10 Nitrogen Compounds §10B.3.2"
    },
    {
      id: "c12",
      topic: "Nitrogen compounds",
      question: "Which reagents convert nitrobenzene to phenylamine?",
      options: [
        "H₂(g), Ni catalyst",
        "LiAlH₄ in dry ether",
        "Sn, conc. HCl, heat; then excess NaOH(aq)",
        "Br₂(aq), room temperature"
      ],
      answer: 2,
      explanation: "Nitrobenzene is reduced by Sn/conc. HCl with heat. The amine is initially protonated as C₆H₅NH₃⁺, so excess NaOH is added to liberate phenylamine. H₂/Ni and LiAlH₄ do not reduce nitrobenzene.",
      source: "10 Nitrogen Compounds §10A.2.2"
    },
    {
      id: "c13",
      topic: "Carbonyls",
      question: "What is the product of propanone and HCN (cold, trace NaOH)?",
      options: ["propan-2-ol", "2-hydroxy-2-methylpropanenitrile", "propanenitrile", "2-methylpropanoic acid"],
      answer: 1,
      explanation: "HCN adds across the C=O bond. The cyanide ion attacks the carbonyl carbon; protonation of the alkoxide gives the cyanohydrin (CH₃)₂C(OH)CN.",
      source: "8 Carbonyl Compounds §8.4.4"
    },
    {
      id: "c14",
      topic: "Acyl chlorides",
      question: "Which is the best reagent to convert ethanoic acid to ethanoyl chloride?",
      options: ["HCl(g)", "SOCl₂, anhydrous", "NaOH(aq)", "ethanol, conc. H₂SO₄"],
      answer: 1,
      explanation: "SOCl₂ (or PCl₅/PCl₃) converts –CO₂H to –COCl under anhydrous conditions. HCl(g) does not work because the HO–CO bond is too strong and the acyl chloride would be hydrolysed by the water formed.",
      source: "9 Carboxylic Derivatives §9A.3.2"
    },
    {
      id: "c15",
      topic: "Polymers",
      question: "Which of these is a condensation polymer?",
      options: ["poly(ethene)", "poly(propene)", "poly(vinyl chloride)", "poly(ethylene terephthalate) (PET)"],
      answer: 3,
      explanation: "PET is a polyester formed by condensation of ethane-1,2-diol and benzene-1,4-dicarboxylic acid, with loss of water. The others are addition polymers of alkenes.",
      source: "11 Polymers §11.2"
    },
    {
      id: "c16",
      topic: "Polymers",
      question: "Which monomer gives poly(vinyl chloride), PVC?",
      options: ["ethene", "propene", "chloroethene", "phenylethene"],
      answer: 2,
      explanation: "PVC is the addition polymer of chloroethene, CH₂=CHCl. The C=C opens to form the polymer backbone.",
      source: "11 Polymers §11.2.1"
    },
    {
      id: "c17",
      topic: "Phenols",
      question: "Phenol reacts with aqueous bromine. What is observed?",
      options: [
        "Orange Br₂ is decolourised and a white precipitate forms.",
        "Orange Br₂ is decolourised and a yellow precipitate forms.",
        "No reaction without FeBr₃.",
        "A silver mirror forms."
      ],
      answer: 0,
      explanation: "Phenol is strongly activated; Br₂(aq) tri-brominates the ring to give 2,4,6-tribromophenol, a white precipitate. No Lewis-acid catalyst is needed.",
      source: "7B Phenol §7B.3.4"
    },
    {
      id: "c18",
      topic: "Arenes",
      question: "Which reagent oxidises methylbenzene to benzoic acid?",
      options: ["KMnO₄, H₂SO₄(aq), heat", "Br₂, FeBr₃", "conc. HNO₃, conc. H₂SO₄, 30 °C", "H₂, Ni catalyst"],
      answer: 0,
      explanation: "Hot acidified KMnO₄ oxidises the methyl side chain to –CO₂H because the carbon attached to the ring bears H atoms. The ring itself is resistant to oxidation.",
      source: "5 Arene §5.6.3"
    },
    {
      id: "c19",
      topic: "Selectivity",
      question: "Which reagent reduces an aldehyde to a primary alcohol without reducing a C=C bond?",
      options: ["H₂(g), Ni catalyst", "LiAlH₄ in dry ether", "Br₂ in CCl₄", "KMnO₄, H₂SO₄(aq), heat"],
      answer: 1,
      explanation: "LiAlH₄ is a nucleophilic hydride donor: it reduces the polar C=O bond but not the electron-rich C=C. H₂/Ni would reduce both.",
      source: "7A Alcohol §7A.3.1; 8 Carbonyl Compounds §8.5.3"
    },
    {
      id: "c20",
      topic: "Hydrolysis",
      question: "Which statement about ester hydrolysis is correct?",
      options: [
        "Acidic hydrolysis is irreversible; alkaline hydrolysis is reversible.",
        "Alkaline hydrolysis is irreversible because the carboxylate salt is formed.",
        "Both acidic and alkaline hydrolysis give the carboxylic acid directly.",
        "Esters do not hydrolyse without a catalyst."
      ],
      answer: 1,
      explanation: "Alkaline hydrolysis consumes OH⁻ and forms the carboxylate salt, so it is irreversible. Acidic hydrolysis is reversible and gives the carboxylic acid plus alcohol.",
      source: "9 Carboxylic Derivatives §9B.3.2"
    }
  ],

  reference: [
    {
      title: "Oxidation ladder",
      items: [
        "1° alcohol → aldehyde → carboxylic acid. Use K₂Cr₂O₇/H₂SO₄ with immediate distillation to stop at the aldehyde; reflux goes to the acid.",
        "Hot acidified KMnO₄ is stronger: a 1° alcohol goes straight to the acid; an aldehyde is oxidised to the acid.",
        "2° alcohol → ketone. Ketones resist further oxidation.",
        "3° alcohol → no reaction with acidified K₂Cr₂O₇ or KMnO₄.",
        "Alkene + cold dilute alkaline KMnO₄ → diol (brown MnO₂).",
        "Alkene + hot acidified KMnO₄ → oxidative cleavage: =CH₂ gives CO₂; =CHR gives RCO₂H; =CR₂ gives a ketone.",
        "Alkylbenzene side chain with a benzylic H → benzoic acid with hot acidified KMnO₄."
      ],
      source: "7A Alcohol §7A.4.4; 4 Alkene §4.4.4; 5 Arene §5.6.3"
    },
    {
      title: "Reduction",
      items: [
        "H₂/Ni or H₂/Pt: reduces C=C, aldehydes, ketones and nitriles. Does not reduce –CO₂H, amides or nitrobenzene.",
        "LiAlH₄ in dry ether: reduces aldehydes, ketones, nitriles, –CO₂H and amides. Does not reduce C=C or nitrobenzene.",
        "Aldehyde → 1° alcohol; ketone → 2° alcohol; nitrile → amine; amide → amine; –CO₂H → 1° alcohol.",
        "Nitrobenzene → phenylamine: Sn, conc. HCl, heat; then excess NaOH(aq)."
      ],
      source: "7A Alcohol §7A.3.1; 10 Nitrogen Compounds §10A.2"
    },
    {
      title: "Substitution vs elimination",
      items: [
        "Halogenoalkane + NaOH(aq), heat → alcohol (nucleophilic substitution).",
        "Halogenoalkane + NaOH in ethanol, heat → alkene (elimination).",
        "Halogenoalkane + KCN/NaCN in ethanol, heat → nitrile (one-carbon chain extension).",
        "Halogenoalkane + excess NH₃ in ethanol, sealed tube, heat → primary amine.",
        "Alcohol + HBr(g) → bromoalkane; alcohol + PCl₅/PCl₃/SOCl₂ (anhydrous) → chloroalkane.",
        "Carboxylic acid + SOCl₂/PCl₅/PCl₃ (anhydrous) → acyl chloride.",
        "Acyl chloride + H₂O → carboxylic acid; + alcohol → ester; + NH₃ → amide."
      ],
      source: "6 Halogen Derivatives §6.3; 7A Alcohol §7A.4.3; 9 Carboxylic Derivatives §9B.3.1"
    },
    {
      title: "Aromatic directing",
      items: [
        "Strongly activating, 2,4-directing: –OH, –NH₂, –NHR, –OR.",
        "Weakly activating, 2,4-directing: alkyl groups such as –CH₃.",
        "Weakly deactivating, 2,4-directing: halogens –Cl, –Br.",
        "Strongly deactivating, 3-directing: –NO₂, –CHO, –COR, –CO₂H, –CN.",
        "Benzene nitration: conc. HNO₃ + conc. H₂SO₄, 50 °C. Alkylbenzene: 30 °C.",
        "Halogenation of benzene: Br₂/FeBr₃ or Cl₂/FeCl₃, anhydrous.",
        "Phenol/phenylamine bromination: Br₂(aq), no catalyst, tri-substitution at 2,4,6."
      ],
      source: "5 Arene §5.6.2; 7B Phenol §7B.3.4; 10 Nitrogen Compounds §10A.3.3"
    },
    {
      title: "Tests",
      items: [
        "Tollens' reagent (warm): aldehydes give a silver mirror; ketones do not.",
        "Fehling's solution (warm): aliphatic aldehydes give brick-red Cu₂O; benzaldehyde does not.",
        "2,4-DNPH: aldehydes and ketones give an orange precipitate (cannot distinguish them).",
        "I₂/NaOH (warm): CH₃CO– or CH₃CH(OH)– gives yellow CHI₃.",
        "Br₂(aq): alkenes decolourise it; phenol gives a white precipitate of 2,4,6-tribromophenol; phenylamine gives a white precipitate of 2,4,6-tribromophenylamine.",
        "NaHCO₃/Na₂CO₃: carboxylic acids give CO₂ effervescence; phenols do not.",
        "Neutral FeCl₃(aq): phenol gives a violet complex.",
        "Na(s): alcohols, phenols and carboxylic acids give H₂ effervescence."
      ],
      source: "7A Alcohol §7A.5; 7B Phenol §7B.4; 8 Carbonyl Compounds §8.5; 9 Carboxylic Derivatives §9A.3"
    },
    {
      title: "Mechanisms",
      items: [
        "SN2: one step, rate = k[RX][Nu], primary RX, inversion of configuration.",
        "SN1: two steps, rate = k[RX], tertiary RX, planar carbocation, racemic product if chiral.",
        "Electrophilic addition to C=C: π bond attacks electrophile; Markovnikov product via the more stable carbocation.",
        "Electrophilic aromatic substitution: catalyst generates a strong electrophile (NO₂⁺, Br⁺); arenium intermediate; loss of H⁺ restores aromaticity.",
        "Nucleophilic addition to C=O: CN⁻ attacks the δ+ carbonyl carbon; protonation gives the cyanohydrin.",
        "Free-radical substitution: initiation (UV), propagation, termination."
      ],
      source: "6 Halogen Derivatives §6.3.3; 4 Alkene §4.4; 5 Arene §5.5; 8 Carbonyl Compounds §8.4"
    },
    {
      title: "Polymers",
      items: [
        "Addition polymerisation: alkene monomers, C=C opens; repeat unit has the same molecular formula as the monomer.",
        "Examples: poly(ethene), poly(propene), PVC from chloroethene, polystyrene from phenylethene.",
        "Condensation polymerisation: two functional groups react with loss of a small molecule (H₂O or HCl).",
        "Polyamide: nylon-6,6 from hexanedioic acid + 1,6-diaminohexane.",
        "Polyester: PET from benzene-1,4-dicarboxylic acid + ethane-1,2-diol."
      ],
      source: "11 Polymers §11.2"
    }
  ]
};
