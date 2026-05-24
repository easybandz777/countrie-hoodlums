/**
 * DIRT ROAD HEIRLOOMS / VOL. 01 — capsule data
 * Source of truth for the /capsule-01 page, the Charter Roll preview,
 * and any future Printful sync product generator.
 *
 * Locked specs from 10 design agents + 7 round-2 deep-dive agents.
 * Variant IDs verified against live Printful catalog.
 */

export const CAPSULE_01_META = {
  name: "DIRT ROAD HEIRLOOMS",
  volume: "VOL. 01",
  tagline: "Built to outlast the night that earned it.",
  thesis:
    "The most expensive thing isn't new — it's earned. Every piece is engineered to look like it already has a story before it leaves the box.",
  totalPieces: 11,
  totalUnits: 4500,
  waveICount: 6,
  waveIICount: 5,
  paletteHexes: ["#0A0A0A", "#C9A227", "#F5F0E1", "#4B5320"],
  paletteNames: ["Bonfire Black", "Antique Gold", "Creek Cream", "Tobacco Olive"],
};

export interface CapsulePiece {
  /** Display number: "0a", "0b", "1"–"9". 0a/0b are the add-on hat + pin set. */
  number: string;
  conceptName: string;
  blankBrand: string;
  blankModel: string;
  colorway: string;
  technique: string;
  cap: number;
  retail: number;
  wave: "I" | "II" | "drop-in";
  type: "tee" | "hoodie" | "crew" | "hat" | "accessory";
  designSummary: string;
  lever: string;
  igHook: string;
  printfulProductId?: number;
  /** Whether this piece routes through Printful (Path B) or off-platform (Path C). */
  fulfillmentPath: "printful-with-finishing" | "off-platform";
  /** Mockup or artwork image path under /public. Render as preview if present. */
  previewImage?: string;
  /** True = real Printful product mockup; false = raw artwork on transparent/white. */
  previewIsProductMockup?: boolean;
}

export const CAPSULE_01_PIECES: CapsulePiece[] = [
  {
    number: "0a",
    conceptName: "Bullion CH Cap",
    blankBrand: "Custom 6-panel",
    blankModel: "TBD",
    colorway: "Bonfire Black",
    technique: "Bullion gold CH monogram + hand-stamped sweatband",
    cap: 300,
    retail: 68,
    wave: "I",
    type: "hat",
    designSummary:
      "The same bullion-stitch skull-cowboy from Piece 6, shrunk to a hat-front crest. Hand-stamped edition number printed on the inside sweatband.",
    lever: "Tribal Identity — the entry-point brand recognizer.",
    igHook: "The hat that signals everything else without saying anything.",
    fulfillmentPath: "off-platform",
  },
  {
    number: "0b",
    conceptName: "Pin Set + Member Card",
    blankBrand: "Enameled pins",
    blankModel: "—",
    colorway: "Antique gold on Bonfire Black",
    technique: "Hard-enamel pins + kraft member card with hand-stamped number",
    cap: 1000,
    retail: 24,
    wave: "I",
    type: "accessory",
    designSummary:
      "Three enameled pins: CH monogram, skull-cowboy mascot, EST 2024 oval. Backed on a numbered kraft member card.",
    lever: "Scarcity — sub-$50 entry to the Charter Roll for buyers who can't reach the tee tier.",
    igHook: "$24 says you were here.",
    fulfillmentPath: "off-platform",
  },
  {
    number: "1",
    conceptName: "Member Number 001",
    blankBrand: "Comfort Colors",
    blankModel: "1717",
    colorway: "Pepper (washed near-black)",
    technique: "Discharge print, gold + cream",
    cap: 700,
    retail: 78,
    wave: "I",
    type: "tee",
    designSummary:
      "Tiny gold hem stamp up front; full typographic charter crest across the back — no illustrations, type only. The whisper-and-shout tee.",
    lever: "Visual Hierarchy + Status — front whispers, back declares.",
    igHook: "Every member gets a number. Yours is 001. So is everyone else's. That's the joke. That's the point.",
    printfulProductId: 586,
    fulfillmentPath: "printful-with-finishing",
    previewImage: "/images/products/capsule-01/piece-01-member-001.jpg",
    previewIsProductMockup: true,
  },
  {
    number: "2",
    conceptName: "Patron Saint of Bad Decisions",
    blankBrand: "AS Colour",
    blankModel: "5082",
    colorway: "Faded Bone",
    technique: "Discharge base + 3-pass spot screenprint + metallic gold halo",
    cap: 100,
    retail: 88,
    wave: "II",
    type: "tee",
    designSummary:
      "Religious santo-card portrait of the skull-cowboy mascot reframed as a saint, full antique-gold halo with sun-rays terminating in tiny scene-objects. Tiny faux-woven label print at the nape.",
    lever: "Status + Tribal Identity — owning one inducts you into the church of bad decisions.",
    igHook: "Patron saint of bad decisions, hand-numbered to 100. If you have to ask which one's yours, it isn't.",
    printfulProductId: 713,
    fulfillmentPath: "off-platform",
    previewImage: "/images/products/capsule-01/piece-02-patron-saint.jpg",
    previewIsProductMockup: true,
  },
  {
    number: "3",
    conceptName: "Last Light, County Line",
    blankBrand: "Shaka Wear",
    blankModel: "SHHTDS",
    colorway: "Black / Creek Cream tie-dye",
    technique: "Discharge directly into the tie-dye — the dye chaos becomes the sky",
    cap: 250,
    retail: 84,
    wave: "I",
    type: "tee",
    designSummary:
      "Tiny edition stamp at left chest; massive back panel of a cinematic sunset scene — lifted truck on a ridge, bonfire, oak tree, two figures on the tailgate. Album-cover energy.",
    lever: "Emotional Resonance + Visual Hierarchy — a memory every country kid has actually lived.",
    igHook: "Tailgate down, sun going, phone off. 250 made. That's it.",
    printfulProductId: 515,
    fulfillmentPath: "off-platform",
  },
  {
    number: "4",
    conceptName: "Order of the Hoodlum",
    blankBrand: "Independent Trading Co.",
    blankModel: "PRM4500",
    colorway: "Pigment Black",
    technique: "Embroidered chest medallion + 4-color discharge shield back",
    cap: 200,
    retail: 248,
    wave: "II",
    type: "hoodie",
    designSummary:
      "FLAGSHIP. Two-color tonal embroidered medallion on the chest; heraldic shield back with rope border, crossed longneck + horseshoe X, skull-cowboy face, hand-numbered NO. ___ OF 200.",
    lever: "Tribal Identity + Status + Scarcity, stacked. Buyer becomes a charter member of a secret society.",
    igHook: "Only 200 get inducted. The rest just hear about it.",
    printfulProductId: 542,
    fulfillmentPath: "off-platform",
    previewImage: "/artwork/capsule-01/piece-04-back.png",
    previewIsProductMockup: false,
  },
  {
    number: "5",
    conceptName: "HOODLUMS ONLY",
    blankBrand: "Comfort Colors",
    blankModel: "1567",
    colorway: "Pepper",
    technique: "Discharge print: hood-top + chest crest, clean back",
    cap: 600,
    retail: 148,
    wave: "I",
    type: "hoodie",
    designSummary:
      "Hood-down, only a small members-club crest signals affiliation. Hood-up, 'HOODLUMS / ONLY' broadcasts in 4-inch gold blackletter across the crown. Interactive design — wearer controls the volume.",
    lever: "Tribal Identity + Visual Hierarchy — interactive in/out group signal.",
    igHook: "Hood down, nobody knows. Hood up, everybody does.",
    printfulProductId: 970,
    fulfillmentPath: "off-platform",
  },
  {
    number: "6",
    conceptName: "The Quiet Hoodlum",
    blankBrand: "Lane Seven",
    blankModel: "LS16001GD",
    colorway: "Pigment Burro (cream)",
    technique: "Bullion + satin-stitch embroidered chest icon + tonal hem text",
    cap: 200,
    retail: 168,
    wave: "II",
    type: "hoodie",
    designSummary:
      "Tiny bullion-stitch skull-cowboy head at center chest — bandana pulled up, only two gold grillz teeth peek. Micro tonal hem stamp 'HOODLUMS · MMXXIV · 1 OF 200'. Clean back. Stealth-wealth.",
    lever: "Status + Scarcity weaponized through omission. The most expensive piece because restraint is the flex.",
    igHook: "If you know, you know. 200 made. That's it.",
    printfulProductId: 975,
    fulfillmentPath: "off-platform",
  },
  {
    number: "7",
    conceptName: "Chapter 01 Pocket Crest",
    blankBrand: "Comfort Colors",
    blankModel: "1566",
    colorway: "Pepper",
    technique: "Discharge + gold plastisol overprint, off-center right chest",
    cap: 500,
    retail: 118,
    wave: "I",
    type: "crew",
    designSummary:
      "Vertical shield crest pulled to the right chest (vintage workwear breast-pocket position). Gold CH monogram with hidden '01' in the H's negative space. Hand-numbered nape strip.",
    lever: "Status + Tribal Identity — asymmetry signals art-direction. Center is for everybody else.",
    igHook: "One of five hundred. Center is for everybody else.",
    printfulProductId: 839,
    fulfillmentPath: "printful-with-finishing",
  },
  {
    number: "8",
    conceptName: "Club Issue No. 24",
    blankBrand: "Champion",
    blankModel: "GDS101",
    colorway: "Storm tie-dye",
    technique: "Tonal embroidered chest medallion — bronze + charcoal threads on tie-dye",
    cap: 150,
    retail: 218,
    wave: "II",
    type: "hoodie",
    designSummary:
      "Single 3.25\" tonal embroidered medallion at the chest. Threads picked one shade off the darkest tie-dye zones so the crest appears and disappears as the fabric bunches. Nothing on the back.",
    lever: "Tribal Identity + Scarcity — loud printing on tie-dye is what dropshippers do; tonal embroidery on tie-dye is what clubs do.",
    igHook: "Charter members only. No. 024 of 150. Bad decisions, good times.",
    printfulProductId: 464,
    fulfillmentPath: "off-platform",
  },
  {
    number: "9",
    conceptName: "Class of '24 — Homecoming Crew",
    blankBrand: "Champion",
    blankModel: "S149",
    colorway: "Bonfire Black",
    technique: "Tackle-twill '24' + chain-stitch arch + discharge alumni back",
    cap: 500,
    retail: 148,
    wave: "I",
    type: "crew",
    designSummary:
      "Real-deal tackle-twill '24' in cream wool felt with antique gold chain-stitch outline and Tobacco Olive drop shadow. Arched 'HOODLUMS COUNTRY CLUB' above. Back reads ALUMNI ASSOCIATION / *Bonfire Hill* / EST · MMXXIV.",
    lever: "Emotional Resonance + Tribal Identity — a fabricated memory you get to inhabit.",
    igHook: "Class of '24. Bonfire Hill forever.",
    printfulProductId: 318,
    fulfillmentPath: "off-platform",
  },
];

/** Variant IDs for the pieces routed through Printful (Path B). */
export const PRINTFUL_VARIANT_MAP: Record<
  number,
  { color: string; sizes: Record<string, number> }
> = {
  586: {
    color: "Pepper",
    sizes: { S: 17693, M: 17694, L: 17695, XL: 17696, "2XL": 17697, "3XL": 17698 },
  },
  713: {
    color: "Faded Bone",
    sizes: { S: 17570, M: 17575, L: 17580, XL: 17585, "2XL": 17590, "3XL": 17595 },
  },
  515: {
    color: "Black / White",
    sizes: { S: 12956, M: 12957, L: 12959, XL: 12960, "2XL": 12961 },
  },
  542: {
    color: "Pigment Black",
    sizes: { S: 13663, M: 13664, L: 13665, XL: 13666, "2XL": 13667, "3XL": 13668 },
  },
  970: {
    color: "Pepper",
    sizes: { S: 24850, M: 24851, L: 24852, XL: 24853, "2XL": 24854, "3XL": 24855 },
  },
  975: {
    color: "Pigment Burro",
    sizes: { S: 34360, M: 34363, L: 34366, XL: 34369, "2XL": 34372, "3XL": 34375 },
  },
  839: {
    color: "Pepper",
    sizes: { S: 21980, M: 21981, L: 21982, XL: 21983, "2XL": 21984, "3XL": 21985 },
  },
  464: {
    color: "Black",
    sizes: { S: 11986, M: 11987, L: 11988, XL: 11989, "2XL": 11990 },
  },
  318: {
    color: "Black",
    sizes: { S: 9659, M: 9660, L: 9661, XL: 9662, "2XL": 9663 },
  },
};

export const COHERENCE_RULES = [
  "Hand-stamped edition number on inside neck label in matte gold ink — every piece, format: VOL. 01 / 047 of 200.",
  "Antique Gold #C9A227 appears physically on every piece — embroidery, foil, thread, or printed mark.",
  "Same woven cotton side-seam label sewn into lower-left interior side seam: DIRT ROAD HEIRLOOMS · VOL. 01 · EST 2024 · CH.",
  "Kraft-paper hangtag tied with waxed olive cord, stamped with CH monogram in gold foil and the edition number on the reverse.",
  "No pure white anywhere. Every 'white' is Creek Cream #F5F0E1.",
];
