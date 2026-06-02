import type { Localized } from "@/lib/i18n";

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`;

export type Accent = "violet" | "lime" | "cyan";

/** Every section the platform supports. Each area enables the ones it needs. */
export type ModuleKey =
  | "alerts"
  | "advertiser"
  | "rentals"
  | "pg"
  | "institutes"
  | "news"
  | "openings"
  | "events"
  | "businesses"
  | "influencers"
  | "lostfound"
  | "schools"
  | "hospitals"
  | "police"
  | "atms"
  | "map";

/* ----------------------------- module data types ----------------------------- */

export interface Rental {
  id: string;
  title: Localized;
  type: Localized;
  price: number;
  image: string;
  tag?: Localized;
}
export interface Spot {
  // shared shape for "new openings" and "institutes"
  id: string;
  name: string;
  kind: Localized;
  blurb: Localized;
  image: string;
}
export interface NewsItem {
  id: string;
  title: Localized;
  summary: Localized;
  category: Localized;
  time: Localized;
  image: string;
}
export interface EventItem {
  id: string;
  name: Localized;
  date: Localized;
  venue: Localized;
  image: string;
}
export interface LostFound {
  id: string;
  kind: "lost" | "found";
  title: Localized;
  detail: Localized;
  time: Localized;
  contact: string;
}
export interface Business {
  id: string;
  name: string;
  category: Localized;
  rating: number;
  phone: string;
}
export interface School {
  id: string;
  name: string;
  board: string;
  rating: number;
  tag?: Localized;
}
export interface Hospital {
  id: string;
  name: string;
  type: Localized;
  emergency: boolean;
  phone: string;
}
export interface Police {
  id: string;
  name: string;
  address: Localized;
  phone: string;
}
export interface Atm {
  id: string;
  bank: string;
  location: Localized;
  is24x7: boolean;
}
export interface Alert {
  id: string;
  kind: "power" | "water";
  block: Localized;
  window: Localized;
  status: "ongoing" | "scheduled" | "resolved";
}
export interface Advertiser {
  name: string;
  category: Localized;
  tagline: Localized;
  offer: Localized;
  image: string;
}
export interface Influencer {
  id: string;
  name: string;
  handle: string;
  niche: Localized;
  followers: string;
  image: string;
}
export interface Stat {
  label: Localized;
  value: string;
}

export interface Area {
  slug: string;
  name: Localized;
  tagline: Localized;
  blurb: Localized;
  accent: Accent;
  heroImage: string;
  mapQuery: string;
  modules: ModuleKey[];
  ticker: Localized[];
  stats: Stat[];
  alerts: Alert[];
  advertiser: Advertiser;
  rentals: Rental[];
  pgs?: Rental[];
  institutes?: Spot[];
  news: NewsItem[];
  openings: Spot[];
  events: EventItem[];
  businesses: Business[];
  influencers: Influencer[];
  lostFound: LostFound[];
  schools: School[];
  hospitals: Hospital[];
  police: Police[];
  atms: Atm[];
}

/* =============================== AREA: LAXMI NAGAR =============================== */

const laxmiNagar: Area = {
  slug: "laxmi-nagar",
  name: { en: "Laxmi Nagar", hi: "लक्ष्मी नगर" },
  tagline: { en: "East Delhi's hustle HQ", hi: "ईस्ट दिल्ली का हलचल केंद्र" },
  blurb: {
    en: "Coaching hubs, student PGs, street food and endless shops — the beating heart of East Delhi.",
    hi: "कोचिंग सेंटर, स्टूडेंट पीजी, स्ट्रीट फूड और अनगिनत दुकानें — ईस्ट दिल्ली का दिल।",
  },
  accent: "violet",
  heroImage: img("photo-1597040663342-45b6c3470d3f"),
  mapQuery: "Laxmi Nagar, Delhi",
  modules: [
    "alerts",
    "advertiser",
    "institutes",
    "pg",
    "rentals",
    "news",
    "openings",
    "events",
    "businesses",
    "influencers",
    "lostfound",
    "schools",
    "hospitals",
    "police",
    "atms",
    "map",
  ],
  ticker: [
    { en: "Metro Blue Line running smooth today", hi: "ब्लू लाइन मेट्रो आज सामान्य" },
    { en: "New CA coaching batch starts Monday", hi: "नया सीए कोचिंग बैच सोमवार से" },
    { en: "Power cut in Block C, 2–4 PM", hi: "ब्लॉक C में बिजली कटौती, 2–4 बजे" },
    { en: "Street food festival this weekend", hi: "इस वीकेंड स्ट्रीट फूड फेस्टिवल" },
  ],
  stats: [
    { label: { en: "Residents", hi: "निवासी" }, value: "2.1L+" },
    { label: { en: "Listings", hi: "लिस्टिंग" }, value: "340" },
    { label: { en: "Coachings", hi: "कोचिंग" }, value: "150+" },
    { label: { en: "Members", hi: "सदस्य" }, value: "8.5k" },
  ],
  alerts: [
    { id: "ln-a1", kind: "power", block: { en: "Block C & D", hi: "ब्लॉक C व D" }, window: { en: "Today 2–4 PM", hi: "आज 2–4 बजे" }, status: "scheduled" },
    { id: "ln-a2", kind: "water", block: { en: "Shakarpur side", hi: "शकरपुर तरफ" }, window: { en: "Tomorrow 6–8 AM", hi: "कल 6–8 बजे" }, status: "scheduled" },
  ],
  advertiser: {
    name: "Aggarwal Sweets & Caterers",
    category: { en: "Food & Catering", hi: "खाना व कैटरिंग" },
    tagline: { en: "50 years of East Delhi's favourite sweets", hi: "ईस्ट दिल्ली की पसंदीदा मिठाई, 50 साल से" },
    offer: { en: "20% off on bulk orders this week", hi: "इस हफ़्ते थोक ऑर्डर पर 20% छूट" },
    image: img("photo-1606471191009-63994c53433b"),
  },
  institutes: [
    { id: "ln-i1", name: "Vidya CA Classes", kind: { en: "CA / Commerce coaching", hi: "सीए / कॉमर्स कोचिंग" }, blurb: { en: "Top results in CA Foundation & Inter.", hi: "सीए फाउंडेशन व इंटर में टॉप रिज़ल्ट।" }, image: img("photo-1523240795612-9a054b0db644") },
    { id: "ln-i2", name: "Spoken English Academy", kind: { en: "Language institute", hi: "भाषा संस्थान" }, blurb: { en: "Confidence-building English & IELTS.", hi: "इंग्लिश व IELTS, आत्मविश्वास के साथ।" }, image: img("photo-1503676260728-1c00da094a0b") },
    { id: "ln-i3", name: "TechSkill Computer Centre", kind: { en: "Computer / IT", hi: "कंप्यूटर / आईटी" }, blurb: { en: "Tally, coding & digital marketing.", hi: "टैली, कोडिंग व डिजिटल मार्केटिंग।" }, image: img("photo-1517245386807-bb43f82c33c4") },
  ],
  pgs: [
    { id: "ln-p1", title: { en: "Boys PG near coaching hub", hi: "कोचिंग हब के पास बॉयज़ पीजी" }, type: { en: "PG · Double sharing", hi: "पीजी · डबल शेयरिंग" }, price: 8500, image: img("photo-1505693416388-ac5ce068fe85"), tag: { en: "Food incl.", hi: "खाना शामिल" } },
    { id: "ln-p2", title: { en: "Girls PG with mess", hi: "मेस के साथ गर्ल्स पीजी" }, type: { en: "PG · Single/Double", hi: "पीजी · सिंगल/डबल" }, price: 10000, image: img("photo-1631049307264-da0ec9d70304"), tag: { en: "Verified", hi: "वेरिफाइड" } },
  ],
  rentals: [
    { id: "ln-r1", title: { en: "2BHK near Metro Station", hi: "मेट्रो के पास 2BHK" }, type: { en: "Family flat", hi: "फैमिली फ्लैट" }, price: 22000, image: img("photo-1502672260266-1c1ef2d93688"), tag: { en: "Verified", hi: "वेरिफाइड" } },
    { id: "ln-r2", title: { en: "Furnished 1BHK, Block B", hi: "फर्निश्ड 1BHK, ब्लॉक B" }, type: { en: "Couple / single", hi: "कपल / सिंगल" }, price: 15000, image: img("photo-1493809842364-78817add7ffb"), tag: { en: "New", hi: "नया" } },
    { id: "ln-r3", title: { en: "Shop space on main road", hi: "मेन रोड पर दुकान" }, type: { en: "Commercial", hi: "कमर्शियल" }, price: 45000, image: img("photo-1441986300917-64674bd600d8") },
  ],
  news: [
    { id: "ln-n1", title: { en: "Vikas Marg gets new cycle lane", hi: "विकास मार्ग पर नई साइकिल लेन" }, summary: { en: "Dedicated lane from Nirman Vihar to Laxmi Nagar metro.", hi: "निर्माण विहार से लक्ष्मी नगर मेट्रो तक समर्पित लेन।" }, category: { en: "Civic", hi: "नागरिक" }, time: { en: "2h ago", hi: "2 घंटे पहले" }, image: img("photo-1449824913935-59a10b8d2000") },
    { id: "ln-n2", title: { en: "Market wins cleanliness award", hi: "मार्केट को स्वच्छता पुरस्कार" }, summary: { en: "Traders recognised for waste-segregation drive.", hi: "कचरा पृथक्करण के लिए व्यापारी सम्मानित।" }, category: { en: "Community", hi: "समुदाय" }, time: { en: "Yesterday", hi: "कल" }, image: img("photo-1556767576-5ec41e3239ea") },
  ],
  openings: [
    { id: "ln-o1", name: "Brew & Books Cafe", kind: { en: "Cafe", hi: "कैफे" }, blurb: { en: "Study-friendly cafe with cheap filter coffee.", hi: "पढ़ाई के लिए कैफे, सस्ती फ़िल्टर कॉफ़ी।" }, image: img("photo-1554118811-1e0d58224f24") },
    { id: "ln-o2", name: "FitZone Gym", kind: { en: "Fitness", hi: "फिटनेस" }, blurb: { en: "24x7 gym with student discounts.", hi: "24x7 जिम, छात्र छूट के साथ।" }, image: img("photo-1534438327276-14e5300c3a48") },
  ],
  events: [
    { id: "ln-e1", name: { en: "Street Food Festival", hi: "स्ट्रीट फूड फेस्टिवल" }, date: { en: "Sat, 7 Jun", hi: "शनि, 7 जून" }, venue: { en: "Laxmi Nagar Main Market", hi: "लक्ष्मी नगर मुख्य बाज़ार" }, image: img("photo-1414235077428-338989a2e8c0") },
    { id: "ln-e2", name: { en: "Free Career Counselling", hi: "मुफ़्त करियर काउंसलिंग" }, date: { en: "Sun, 8 Jun", hi: "रवि, 8 जून" }, venue: { en: "Community Hall, Block A", hi: "कम्युनिटी हॉल, ब्लॉक A" }, image: img("photo-1524178232363-1fb2b075b655") },
  ],
  businesses: [
    { id: "ln-b1", name: "Sharma Tiffin Service", category: { en: "Food", hi: "खाना" }, rating: 4.6, phone: "+9198xxxxxx01" },
    { id: "ln-b2", name: "QuickFix Mobile Repair", category: { en: "Services", hi: "सेवाएँ" }, rating: 4.4, phone: "+9198xxxxxx02" },
    { id: "ln-b3", name: "Apna Kirana Store", category: { en: "Grocery", hi: "किराना" }, rating: 4.7, phone: "+9198xxxxxx03" },
  ],
  influencers: [
    { id: "ln-inf1", name: "Riya Sharma", handle: "@riya.eats.delhi", niche: { en: "Street food vlogger", hi: "स्ट्रीट फूड व्लॉगर" }, followers: "128k", image: img("photo-1529626455594-4ff0802cfb7e") },
    { id: "ln-inf2", name: "Aman Verma", handle: "@aman.studies", niche: { en: "Study & exam tips", hi: "पढ़ाई व परीक्षा टिप्स" }, followers: "76k", image: img("photo-1507003211169-0a1dd7228f2d") },
  ],
  lostFound: [
    { id: "ln-l1", kind: "lost", title: { en: "Black college backpack", hi: "काला कॉलेज बैकपैक" }, detail: { en: "Left in an e-rickshaw near metro gate 3.", hi: "मेट्रो गेट 3 के पास ई-रिक्शा में छूटा।" }, time: { en: "1h ago", hi: "1 घंटा पहले" }, contact: "+9198xxxxxx41" },
    { id: "ln-l2", kind: "found", title: { en: "Set of house keys", hi: "घर की चाबियाँ" }, detail: { en: "Found outside SBI ATM, Vikas Marg.", hi: "एसबीआई एटीएम, विकास मार्ग के बाहर मिलीं।" }, time: { en: "4h ago", hi: "4 घंटे पहले" }, contact: "+9198xxxxxx42" },
  ],
  schools: [
    { id: "ln-s1", name: "Bal Bharati Public School", board: "CBSE", rating: 4.5, tag: { en: "Admissions open", hi: "प्रवेश खुले" } },
    { id: "ln-s2", name: "Saraswati Vidya Mandir", board: "CBSE", rating: 4.2 },
  ],
  hospitals: [
    { id: "ln-h1", name: "Jeevan Multispeciality Hospital", type: { en: "Multispeciality", hi: "मल्टीस्पेशलिटी" }, emergency: true, phone: "+9111xxxxxx10" },
    { id: "ln-h2", name: "Care Clinic & Diagnostics", type: { en: "Clinic & lab", hi: "क्लिनिक व लैब" }, emergency: false, phone: "+9111xxxxxx11" },
  ],
  police: [
    { id: "ln-pl1", name: "Laxmi Nagar Police Station", address: { en: "Vikas Marg, near metro", hi: "विकास मार्ग, मेट्रो के पास" }, phone: "112" },
  ],
  atms: [
    { id: "ln-atm1", bank: "SBI", location: { en: "Main Market", hi: "मुख्य बाज़ार" }, is24x7: true },
    { id: "ln-atm2", bank: "HDFC", location: { en: "Block B", hi: "ब्लॉक B" }, is24x7: true },
    { id: "ln-atm3", bank: "PNB", location: { en: "Near metro gate 1", hi: "मेट्रो गेट 1 के पास" }, is24x7: false },
  ],
};

/* =============================== AREA: MODEL TOWN =============================== */

const modelTown: Area = {
  slug: "model-town",
  name: { en: "Model Town", hi: "मॉडल टाउन" },
  tagline: { en: "North Delhi's calm & classy lane", hi: "नॉर्थ दिल्ली की शांत व शानदार गली" },
  blurb: {
    en: "Leafy avenues, a serene lake and old-money charm — Model Town breathes easy.",
    hi: "हरी-भरी सड़कें, शांत झील और पुरानी शान — मॉडल टाउन सुकून से साँस लेता है।",
  },
  accent: "lime",
  heroImage: img("photo-1480714378408-67cf0d13bc1b"),
  mapQuery: "Model Town, Delhi",
  modules: [
    "alerts",
    "advertiser",
    "rentals",
    "news",
    "openings",
    "events",
    "businesses",
    "influencers",
    "schools",
    "hospitals",
    "police",
    "atms",
    "lostfound",
    "map",
  ],
  ticker: [
    { en: "Model Town lake cleanup drive Sunday 7 AM", hi: "मॉडल टाउन झील सफाई रवि 7 बजे" },
    { en: "New organic farmers' market opens", hi: "नया ऑर्गेनिक किसान बाज़ार शुरू" },
    { en: "RWA meeting: parking rules update", hi: "RWA बैठक: पार्किंग नियम अपडेट" },
    { en: "Yoga in the park, daily 6 AM", hi: "पार्क में योग, रोज़ 6 बजे" },
  ],
  stats: [
    { label: { en: "Residents", hi: "निवासी" }, value: "95k+" },
    { label: { en: "Listings", hi: "लिस्टिंग" }, value: "180" },
    { label: { en: "Businesses", hi: "बिज़नेस" }, value: "640" },
    { label: { en: "Members", hi: "सदस्य" }, value: "5.2k" },
  ],
  alerts: [
    { id: "mt-a1", kind: "water", block: { en: "Phase 1", hi: "फेज़ 1" }, window: { en: "Today 7–9 AM", hi: "आज 7–9 बजे" }, status: "ongoing" },
  ],
  advertiser: {
    name: "The Lake House Bistro",
    category: { en: "Fine Dining", hi: "फाइन डाइनिंग" },
    tagline: { en: "Lakeside dining with a continental menu", hi: "झील किनारे कॉन्टिनेंटल डाइनिंग" },
    offer: { en: "Free dessert on weekend bookings", hi: "वीकेंड बुकिंग पर मुफ़्त डेज़र्ट" },
    image: img("photo-1517248135467-4c7edcad34c4"),
  },
  rentals: [
    { id: "mt-r1", title: { en: "3BHK villa floor with lawn", hi: "लॉन के साथ 3BHK विला फ्लोर" }, type: { en: "Premium floor", hi: "प्रीमियम फ्लोर" }, price: 55000, image: img("photo-1568605114967-8130f3a36994"), tag: { en: "Premium", hi: "प्रीमियम" } },
    { id: "mt-r2", title: { en: "Quiet 1BHK near the lake", hi: "झील के पास शांत 1BHK" }, type: { en: "Couple / single", hi: "कपल / सिंगल" }, price: 18000, image: img("photo-1522708323590-d24dbb6b0267") },
    { id: "mt-r3", title: { en: "Working women's PG", hi: "वर्किंग वुमेन पीजी" }, type: { en: "PG", hi: "पीजी" }, price: 12000, image: img("photo-1560448204-e02f11c3d0e2"), tag: { en: "Verified", hi: "वेरिफाइड" } },
  ],
  news: [
    { id: "mt-n1", title: { en: "Model Town lake to get fountain", hi: "मॉडल टाउन झील में लगेगा फव्वारा" }, summary: { en: "Beautification project approved by the council.", hi: "नगर परिषद ने सौंदर्यीकरण मंज़ूर किया।" }, category: { en: "Civic", hi: "नागरिक" }, time: { en: "3h ago", hi: "3 घंटे पहले" }, image: img("photo-1507525428034-b723cf961d3e") },
    { id: "mt-n2", title: { en: "Heritage walk every Saturday", hi: "हर शनिवार हेरिटेज वॉक" }, summary: { en: "Residents revive the old colony trail.", hi: "निवासियों ने पुरानी कॉलोनी ट्रेल फिर शुरू की।" }, category: { en: "Culture", hi: "संस्कृति" }, time: { en: "Yesterday", hi: "कल" }, image: img("photo-1542051841857-5f90071e7989") },
  ],
  openings: [
    { id: "mt-o1", name: "Green Leaf Organics", kind: { en: "Grocery", hi: "किराना" }, blurb: { en: "Farm-fresh organic produce daily.", hi: "रोज़ ताज़ी ऑर्गेनिक सब्ज़ियाँ।" }, image: img("photo-1542838132-92c53300491e") },
    { id: "mt-o2", name: "Aura Wellness Spa", kind: { en: "Spa & wellness", hi: "स्पा व वेलनेस" }, blurb: { en: "Premium therapies in a calm setting.", hi: "शांत माहौल में प्रीमियम थेरेपी।" }, image: img("photo-1540555700478-4be289fbecef") },
  ],
  events: [
    { id: "mt-e1", name: { en: "Sunday Farmers' Market", hi: "संडे किसान बाज़ार" }, date: { en: "Sun, 8 Jun", hi: "रवि, 8 जून" }, venue: { en: "Phase 1 Park", hi: "फेज़ 1 पार्क" }, image: img("photo-1488459716781-31db52582fe9") },
    { id: "mt-e2", name: { en: "Open-air Music Evening", hi: "ओपन-एयर म्यूज़िक शाम" }, date: { en: "Fri, 13 Jun", hi: "शुक्र, 13 जून" }, venue: { en: "Community Lawn", hi: "कम्युनिटी लॉन" }, image: img("photo-1470225620780-dba8ba36b745") },
  ],
  businesses: [
    { id: "mt-b1", name: "Lakeview Bakery", category: { en: "Food", hi: "खाना" }, rating: 4.8, phone: "+9198xxxxxx11" },
    { id: "mt-b2", name: "Dr. Mehra Clinic", category: { en: "Health", hi: "स्वास्थ्य" }, rating: 4.9, phone: "+9198xxxxxx12" },
    { id: "mt-b3", name: "Petals Florist", category: { en: "Gifts", hi: "गिफ्ट" }, rating: 4.5, phone: "+9198xxxxxx13" },
  ],
  influencers: [
    { id: "mt-inf1", name: "Sara Kapoor", handle: "@sara.in.delhi", niche: { en: "Lifestyle & cafes", hi: "लाइफस्टाइल व कैफे" }, followers: "210k", image: img("photo-1438761681033-6461ffad8d80") },
    { id: "mt-inf2", name: "Dev Malhotra", handle: "@dev.runs", niche: { en: "Fitness & running", hi: "फिटनेस व रनिंग" }, followers: "54k", image: img("photo-1500648767791-00dcc994a43e") },
  ],
  lostFound: [
    { id: "mt-l1", kind: "found", title: { en: "Brown pet dog (Labrador)", hi: "भूरा पालतू कुत्ता (लैब्राडोर)" }, detail: { en: "Found near Phase 2 park, very friendly.", hi: "फेज़ 2 पार्क के पास मिला, बहुत friendly।" }, time: { en: "2h ago", hi: "2 घंटे पहले" }, contact: "+9198xxxxxx51" },
    { id: "mt-l2", kind: "lost", title: { en: "Gold bracelet", hi: "सोने का कंगन" }, detail: { en: "Lost during morning walk near the lake.", hi: "झील के पास सुबह की सैर में खोया।" }, time: { en: "6h ago", hi: "6 घंटे पहले" }, contact: "+9198xxxxxx52" },
  ],
  schools: [
    { id: "mt-s1", name: "Cambridge Heritage School", board: "CBSE", rating: 4.7, tag: { en: "Top rated", hi: "टॉप रेटेड" } },
    { id: "mt-s2", name: "St. Xavier's Convent", board: "ICSE", rating: 4.6 },
  ],
  hospitals: [
    { id: "mt-h1", name: "Model Town Nursing Home", type: { en: "Multispeciality", hi: "मल्टीस्पेशलिटी" }, emergency: true, phone: "+9111xxxxxx20" },
    { id: "mt-h2", name: "Smile Dental Care", type: { en: "Dental clinic", hi: "डेंटल क्लिनिक" }, emergency: false, phone: "+9111xxxxxx21" },
  ],
  police: [
    { id: "mt-pl1", name: "Model Town Police Station", address: { en: "Phase 2 main road", hi: "फेज़ 2 मेन रोड" }, phone: "112" },
  ],
  atms: [
    { id: "mt-atm1", bank: "ICICI", location: { en: "Phase 1 market", hi: "फेज़ 1 मार्केट" }, is24x7: true },
    { id: "mt-atm2", bank: "Axis", location: { en: "Near the lake", hi: "झील के पास" }, is24x7: true },
  ],
};

export const areas: Area[] = [laxmiNagar, modelTown];

export function getArea(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}

export function getAreaSlugs(): string[] {
  return areas.map((a) => a.slug);
}

/** Accent → tailwind class fragments, so each area feels visually distinct. */
export const accentTheme: Record<
  Accent,
  { text: string; gradient: string; ring: string; glow: string; dot: string }
> = {
  violet: {
    text: "text-neon-fuchsia",
    gradient: "bg-grad-brand",
    ring: "ring-neon-violet/40",
    glow: "shadow-glow",
    dot: "bg-neon-fuchsia",
  },
  lime: {
    text: "text-neon-lime",
    gradient: "bg-grad-lime",
    ring: "ring-neon-lime/40",
    glow: "shadow-glow-lime",
    dot: "bg-neon-lime",
  },
  cyan: {
    text: "text-neon-cyan",
    gradient: "bg-grad-lime",
    ring: "ring-neon-cyan/40",
    glow: "shadow-glow-lime",
    dot: "bg-neon-cyan",
  },
};
