/**
 * Seed script for Intropack Strapi CMS
 * Run: node seed.js
 * Make sure Strapi is running on localhost:1337 first
 */

const STRAPI_URL = "http://localhost:1337";
const ADMIN_EMAIL = "admin@intropack.nl";
const ADMIN_PASSWORD = "Intropack2024!";

const products = [
  {
    name: "IMH Afvoer Transportband",
    brand: "IMH",
    machineType: "Transportbanden",
    categories: ["Transportbanden", "Intropack IMH", "Nieuwe Machines"],
    specs: { merk: "IMH", type: "Afvoer Transportband", categorie: "Transportbanden", voeding: "230 Volt" },
    description: "De IMH Afvoer Transportband is ontworpen voor het efficiënt afvoeren van verpakte producten na het verpakkingsproces. Vervaardigd uit hoogwaardig RVS voor een lange levensduur en eenvoudige reiniging.",
    features: ["Uitgevoerd in RVS", "Variabele bandsnelheid via frequentieregelaar", "Eenvoudige koppeling aan bestaande machines", "Op maat leverbaar in breedte en lengte"],
    imageUrls: ["https://www.intropack.nl/wp-content/uploads/2016/05/MVC-338F.2.jpg"],
    metaDescription: "IMH Afvoer transportband voor efficiënte productafvoer na het verpakkingsproces.",
    featured: false,
  },
  {
    name: "IMH CanMatic CFI-1",
    brand: "IMH",
    machineType: "Vulmachines",
    categories: ["Vulmachines", "Intropack IMH", "Nieuwe Machines", "Blikken"],
    specs: { merk: "IMH", type: "CFI-1", categorie: "Vulmachines", voeding: "230 Volt", capaciteit: "Tot ca. 15 blikken per minuut" },
    description: "De IMH CanMatic CFI-1 is een semi-automatische vuil- en sluitlijn voor blikken. Geschikt voor het vullen en sluiten van blikken met droge producten zoals koffie, thee, noten en poeders.",
    features: ["Semi-automatisch vullen en sluiten van blikken", "Geschikt voor diverse blikformaten", "Compact en gemakkelijk te bedienen", "RVS constructie"],
    imageUrls: ["https://www.intropack.nl/wp-content/uploads/2016/05/Can_Matic-300x249.jpg"],
    metaDescription: "IMH CanMatic CFI-1: semi-automatische vuil- en sluitlijn voor blikken.",
    featured: false,
  },
  {
    name: "IMH Heavy Duty Sealer TSI 490HS",
    brand: "IMH",
    machineType: "Sealmachines",
    categories: ["Sealmachines", "Intropack IMH", "Nieuwe Machines"],
    specs: { merk: "IMH", type: "TSI 490HS", categorie: "Sealmachines", voeding: "230 Volt", afmetingen: "490 mm seallengte" },
    description: "De IMH Heavy Duty Sealer TSI 490HS is een robuuste industriële sealimachine voor het sealen van dikke en zware folie. Met een sealbalklengte van 490mm geschikt voor grotere verpakkingen.",
    features: ["Sealbalklengte 490 mm", "Geschikt voor zware folie tot 600 my", "Digitale temperatuurregeling", "Robuuste constructie voor zwaar gebruik"],
    imageUrls: ["https://www.intropack.nl/wp-content/uploads/2016/05/IMH___TSI490HS___SN_207___cp02-600x328-1.jpg"],
    metaDescription: "IMH Heavy Duty Sealer TSI 490HS: robuuste industriële sealmachine voor zware folie.",
    featured: true,
  },
  {
    name: "IMH Horizontale Transportband 30/10",
    brand: "IMH",
    machineType: "Transportbanden",
    categories: ["Transportbanden", "Intropack IMH", "Nieuwe Machines"],
    specs: { merk: "IMH", type: "30/10", categorie: "Transportbanden", voeding: "230 Volt", afmetingen: "Breedte 300 mm, Lengte 1000 mm" },
    description: "Transportband voor het transporteren van zakken, potten, dozen en meer. In RVS uitgevoerde transportband zonder meenemers. Andere afmetingen op wens leverbaar.",
    features: ["In RVS uitgevoerde transportband", "Breedte 300 mm, lengte 1000 mm standaard", "Op maat leverbaar", "230 Volt aansluiting"],
    imageUrls: ["https://www.intropack.nl/wp-content/uploads/2016/05/MVC-338F.2.jpg"],
    metaDescription: "IMH Horizontale transportband 30/10: RVS transportband voor zakken, potten en dozen.",
    featured: false,
  },
  {
    name: "IMH Opvang Draaitafel TT120-CC",
    brand: "IMH",
    machineType: "Draaitafel",
    categories: ["Draaitafel", "Intropack IMH", "Nieuwe Machines"],
    specs: { merk: "IMH", type: "TT120-CC", categorie: "Draaitafel", voeding: "230 Volt", formaat: "1.200 mm diameter" },
    description: "Middelgroot formaat draaitafel voor het verzamelen van gereed zijnde producten (potten, zakjes, flessen, blikken). Bufferfunctie voor efficiënte palletisering.",
    features: ["Stabiel blad Ø 1,2 meter", "Frequentiegeregelde aandrijfmotor", "RVS en kunststof constructie", "Bufferfunctie"],
    imageUrls: ["https://www.intropack.nl/wp-content/uploads/2016/05/IMHRotaryTables.jpg"],
    metaDescription: "IMH Opvang Draaitafel TT120-CC: draaitafel met bufferfunctie.",
    featured: false,
  },
  {
    name: "IMH Pillow Packing Machine HW102",
    brand: "IMH",
    machineType: "Verpakkingsmachines",
    categories: ["Verpakkingsmachines", "Intropack IMH", "Nieuwe Machines"],
    specs: { merk: "IMH", type: "HW102", categorie: "V.V.V.S.", voeding: "230 Volt", capaciteit: "Tot ca. 60 per min." },
    description: "De IMH Pillow Packing Machine HW102 is geschikt voor geheel automatisch vervaardigen van kleine tot middelgrote verpakkingen. Compact design, geen krachtstroom nodig.",
    features: ["Sealt 3-zijdige pillow zakjes", "Compacte uitvoering", "PILZ noodstop veiligheidsrelais", "OMRON tekst bediening terminal"],
    imageUrls: ["https://www.intropack.nl/wp-content/uploads/2016/05/PICT0003-1-1.jpg"],
    metaDescription: "IMH HW102 Pillow Packing Machine: automatische verpakkingsmachine.",
    featured: true,
  },
  {
    name: "IMH TCM Vacuum Kamer Seal Machine",
    brand: "IMH",
    machineType: "Vacuümmachines",
    categories: ["Vacuümmachines", "Intropack IMH", "Nieuwe Machines"],
    specs: { merk: "IMH", type: "TCM", categorie: "Vacuum kamer seal machine", voeding: "230 Volt" },
    description: "Robuuste vacuümmachine met grote kamer voor het vacuüm verpakken van diverse producten. Geschikt voor vlees, vis, kaas en andere voedingsproducten.",
    features: ["Grote vacuümkamer", "Digitale druk- en tijdregeling", "Robuuste RVS constructie", "Optie gas flush (MAP)"],
    imageUrls: ["https://www.intropack.nl/wp-content/uploads/2016/05/PICT7242.4-1.jpg"],
    metaDescription: "IMH TCM Vacuum Kamer Seal Machine: professioneel vacuüm verpakken.",
    featured: false,
  },
  {
    name: "Polystar Repro-Flex EVO",
    brand: "Polystar",
    machineType: "Verpakkingsmachines",
    categories: ["Verpakkingsmachines", "Intropack Polystar"],
    specs: { merk: "Polystar", type: "Repro-Flex EVO", categorie: "Plastic recycling", voeding: "380 Volt" },
    description: "De Polystar Repro-Flex EVO is een compacte maar krachtige plastic film recycling machine. Ideaal voor het recyclen van PE, PP en andere thermoplastische folies direct op de productievloer.",
    features: ["Compacte all-in-one oplossing", "Hoge output bij laag energieverbruik", "Eenvoudige bediening", "Geschikt voor natte en droge films"],
    imageUrls: ["https://www.intropack.nl/wp-content/uploads/2016/05/polystar-repro-flex-evo.jpg"],
    metaDescription: "Polystar Repro-Flex EVO: compacte plastic film recycling machine.",
    featured: true,
  },
  {
    name: "Polystar Repro-One",
    brand: "Polystar",
    machineType: "Verpakkingsmachines",
    categories: ["Verpakkingsmachines", "Intropack Polystar"],
    specs: { merk: "Polystar", type: "Repro-One", categorie: "Plastic recycling" },
    description: "De Polystar Repro-One is een eenvoudige en betaalbare plastic recycling machine voor kleine tot middelgrote hoeveelheden plastic afval.",
    features: ["Betaalbare recyclingoplossing", "Geschikt voor diverse plasticsoorten", "Lage onderhoudskosten", "Compacte voetafdruk"],
    imageUrls: ["https://www.intropack.nl/wp-content/uploads/2016/05/polystar-repro-one.jpg"],
    metaDescription: "Polystar Repro-One: betaalbare plastic recycling machine.",
    featured: false,
  },
  {
    name: "Unipack U-400",
    brand: "Unipack",
    machineType: "Verpakkingsmachines",
    categories: ["Verpakkingsmachines", "Intropack Unipack"],
    specs: { merk: "Unipack", type: "U-400", categorie: "Krimpverpakking", voeding: "230 Volt" },
    description: "De Unipack U-400 is een betrouwbare krimpverpakkingsmachine voor het wikkelings van producten in krimpfolie. Geschikt voor diverse productformaten en folietypes.",
    features: ["Eenvoudige bediening", "Geschikt voor diverse formaten", "Instelbare temperatuur", "Compacte constructie"],
    imageUrls: ["https://www.intropack.nl/wp-content/uploads/2016/05/unipack-u400.jpg"],
    metaDescription: "Unipack U-400: betrouwbare krimpverpakkingsmachine.",
    featured: false,
  },
];

const newsArticles = [
  {
    title: "Intropack breidt productlijn uit met nieuwe IMH sealmachines",
    excerpt: "We zijn trots te kunnen melden dat Intropack het assortiment IMH sealmachines heeft uitgebreid met drie nieuwe modellen voor de voedselverwerkende industrie.",
    content: "## Nieuwe sealmachines in ons assortiment\n\nIntropack breidt het assortiment IMH sealmachines uit met drie nieuwe modellen. De nieuwe machines zijn speciaal ontwikkeld voor de voedselverwerkende industrie en voldoen aan de nieuwste hygiënenormen.\n\n## Kenmerken nieuwe modellen\n\nDe nieuwe sealmachines beschikken over:\n- **Digitale temperatuurregeling** voor consistente sealkwaliteit\n- **RVS constructie** voor eenvoudige reiniging\n- **Energiezuinige verwarmingselementen**\n\nNeem contact met ons op voor meer informatie.",
    date: "2024-03-15",
    category: "Producten",
    featured: true,
  },
  {
    title: "Intropack aanwezig op Verpakkingsbeurs 2024",
    excerpt: "Van 12 tot 14 november 2024 is Intropack aanwezig op de Verpakkingsbeurs in Utrecht. Kom langs op stand B42 voor een live demonstratie.",
    content: "## Verpakkingsbeurs 2024\n\nIntropack is dit jaar aanwezig op de Verpakkingsbeurs 2024, de grootste vakbeurs voor de verpakkingsindustrie in Nederland.\n\n**Datum:** 12 t/m 14 november 2024\n**Locatie:** Jaarbeurs Utrecht\n**Stand:** B42\n\n## Wat kunt u verwachten?\n\nOp onze stand demonstreren wij de nieuwste IMH en Polystar machines live. Onze specialisten staan klaar om al uw vragen te beantwoorden.",
    date: "2024-02-28",
    category: "Evenementen",
    featured: false,
  },
  {
    title: "Polystar recycling machines: duurzame oplossing voor plastic afval",
    excerpt: "Met de toenemende focus op duurzaamheid bieden de Polystar recycling machines een uitstekende oplossing voor het verwerken van plastic productie-afval.",
    content: "## Duurzaam produceren met Polystar\n\nIn een tijd waarin duurzaamheid steeds belangrijker wordt, bieden de Polystar recycling machines een praktische oplossing voor bedrijven die hun plastic afval willen verminderen en hergebruiken.\n\n## Voordelen recycling op de werkvloer\n\n- Directe verwerking van productie-afval\n- Reductie van afvalkosten\n- Hergebruik als grondstof\n- Verbetering van duurzaamheidsprofiel",
    date: "2024-01-20",
    category: "Producten",
    featured: false,
  },
  {
    title: "Intropack viert 25-jarig jubileum",
    excerpt: "In 2024 viert Intropack Machinery Holland haar 25-jarig jubileum. Een kwart eeuw expertise in verpakkingsmachines voor de Nederlandse markt.",
    content: "## 25 jaar Intropack\n\nIn 2024 viert Intropack Machinery Holland haar 25-jarig jubileum. In deze 25 jaar is Intropack uitgegroeid tot een betrouwbare partner voor de verpakkingsindustrie in Nederland en België.\n\n## Van klein naar groot\n\nBegonnen als kleine dealer van verpakkingsmachines, is Intropack nu een gevestigd bedrijf met een breed assortiment van topmerken als IMH, Polystar en Unipack.",
    date: "2024-01-05",
    category: "Bedrijfsnieuws",
    featured: false,
  },
  {
    title: "Nieuwe service- en onderhoudscontracten beschikbaar",
    excerpt: "Intropack introduceert uitgebreide service- en onderhoudscontracten om de uptime van uw verpakkingsmachines te maximaliseren.",
    content: "## Service en onderhoud\n\nIntropack introduceert uitgebreide service- en onderhoudscontracten voor al onze machines. Een goed onderhouden machine garandeert optimale prestaties en minimale uitvaltijd.\n\n## Contractopties\n\n- **Basis**: jaarlijkse inspectie en onderhoud\n- **Plus**: kwartaalinspecties inclusief verbruiksonderdelen\n- **Premium**: maandelijkse controle met prioriteitsservice\n\nNeem contact op voor een offerte.",
    date: "2023-11-10",
    category: "Bedrijfsnieuws",
    featured: false,
  },
];

async function getAdminToken() {
  const res = await fetch(`${STRAPI_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });
  const data = await res.json();
  if (!data.data?.token) throw new Error("Login failed: " + JSON.stringify(data));
  return data.data.token;
}

async function createProduct(token, product) {
  const res = await fetch(`${STRAPI_URL}/content-manager/collection-types/api::product.product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
  const data = await res.json();
  if (res.ok) {
    console.log(`✓ Product: ${product.name}`);
  } else {
    console.error(`✗ Product ${product.name}: ${JSON.stringify(data.error || data)}`);
  }
}

async function createNewsArticle(token, article) {
  const res = await fetch(`${STRAPI_URL}/content-manager/collection-types/api::news-article.news-article`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(article),
  });
  const data = await res.json();
  if (res.ok) {
    console.log(`✓ Artikel: ${article.title}`);
  } else {
    console.error(`✗ Artikel ${article.title}: ${JSON.stringify(data.error || data)}`);
  }
}

async function seed() {
  console.log("🌱 Seeding Intropack CMS...\n");

  const token = await getAdminToken();
  console.log("✓ Ingelogd als admin\n");

  console.log("📦 Producten aanmaken...");
  for (const product of products) {
    await createProduct(token, product);
  }

  console.log("\n📰 Nieuwsberichten aanmaken...");
  for (const article of newsArticles) {
    await createNewsArticle(token, article);
  }

  console.log("\n✅ Seeding voltooid!");
}

seed().catch(console.error);
