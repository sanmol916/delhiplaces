import type { Localized } from "@/lib/i18n";
import type { ModuleKey } from "@/lib/areas";

/** UI chrome strings, available in English + Hindi. */
export const ui = {
  brandTagline: { en: "Your neighbourhood, alive online.", hi: "आपका मोहल्ला, अब ऑनलाइन।" },
  chooseArea: { en: "Choose your area", hi: "अपना इलाका चुनें" },
  exploreArea: { en: "Explore", hi: "एक्सप्लोर करें" },
  liveNow: { en: "Live now", hi: "अभी लाइव" },

  navRentals: { en: "Rentals", hi: "किराया" },
  navNews: { en: "News", hi: "खबरें" },
  navOpenings: { en: "Openings", hi: "नई दुकानें" },
  navEvents: { en: "Events", hi: "इवेंट्स" },
  navLostFound: { en: "Lost & Found", hi: "खोया-पाया" },
  navBusinesses: { en: "Local", hi: "लोकल" },

  perMonth: { en: "/mo", hi: "/माह" },
  viewDetails: { en: "View details", hi: "विवरण देखें" },
  contact: { en: "Contact", hi: "संपर्क करें" },
  callNow: { en: "Call", hi: "कॉल करें" },
  directions: { en: "Directions", hi: "रास्ता" },
  postUpdate: { en: "Post an update", hi: "अपडेट पोस्ट करें" },
  reportItem: { en: "Report lost / found", hi: "खोया-पाया दर्ज करें" },
  joinCommunity: { en: "Join the community", hi: "कम्युनिटी जॉइन करें" },
  joinSub: {
    en: "Get rentals, news & alerts for your area — free.",
    hi: "अपने इलाके के किराये, खबरें और अलर्ट पाएँ — मुफ़्त।",
  },
  emailPlaceholder: { en: "Your email address", hi: "आपका ईमेल पता" },
  subscribe: { en: "Subscribe", hi: "सब्सक्राइब करें" },
  backToAreas: { en: "All areas", hi: "सभी इलाके" },
  footerNote: {
    en: "Built for the neighbourhood. Made in Delhi.",
    hi: "मोहल्ले के लिए बना। दिल्ली में निर्मित।",
  },

  // module-specific labels
  lost: { en: "Lost", hi: "खोया" },
  found: { en: "Found", hi: "मिला" },
  sponsored: { en: "Sponsored", hi: "प्रायोजित" },
  advertiserOfDay: { en: "Advertiser of the day", hi: "आज का विज्ञापनदाता" },
  todaysOffer: { en: "Today's offer", hi: "आज का ऑफर" },
  followers: { en: "followers", hi: "फॉलोअर्स" },
  open24x7: { en: "Open 24×7", hi: "24×7 खुला" },
  emergency: { en: "Emergency", hi: "इमरजेंसी" },
  helpline: { en: "Helpline", hi: "हेल्पलाइन" },
  powerCut: { en: "Power cut", hi: "बिजली कटौती" },
  waterCut: { en: "Water supply", hi: "पानी आपूर्ति" },
  statusOngoing: { en: "Ongoing", hi: "जारी" },
  statusScheduled: { en: "Scheduled", hi: "निर्धारित" },
  statusResolved: { en: "Resolved", hi: "समाप्त" },
  lostFoundNote: {
    en: "Lost or found something? Post it with a photo and where you last saw it. Never share OTPs or pay in advance — always meet in a public place.",
    hi: "कुछ खोया या मिला? फ़ोटो और आख़िरी जगह के साथ पोस्ट करें। OTP कभी साझा न करें, पहले से पैसे न दें — हमेशा सार्वजनिक जगह पर मिलें।",
  },
} satisfies Record<string, Localized>;

export interface SectionCopy {
  label: Localized;
  title: Localized;
  sub: Localized;
}

/** Heading copy for every module/section. */
export const sections: Record<ModuleKey, SectionCopy> = {
  alerts: {
    label: { en: "Alerts", hi: "अलर्ट" },
    title: { en: "Power & water alerts", hi: "बिजली व पानी अलर्ट" },
    sub: { en: "Stay ahead of cuts in your block.", hi: "अपने ब्लॉक की कटौती की जानकारी पहले पाएँ।" },
  },
  advertiser: {
    label: { en: "Sponsored", hi: "प्रायोजित" },
    title: { en: "Advertiser of the day", hi: "आज का विज्ञापनदाता" },
    sub: { en: "Today's featured local business.", hi: "आज का चुनिंदा लोकल बिज़नेस।" },
  },
  rentals: {
    label: { en: "Rentals", hi: "किराया" },
    title: { en: "Homes & shops for rent", hi: "किराये के घर व दुकानें" },
    sub: { en: "Verified places, no broker drama.", hi: "वेरिफाइड जगहें, बिना दलाली झंझट।" },
  },
  pg: {
    label: { en: "PG & Hostels", hi: "पीजी व हॉस्टल" },
    title: { en: "PGs & hostels", hi: "पीजी व हॉस्टल" },
    sub: { en: "Student-friendly stays with food.", hi: "खाने के साथ छात्र-अनुकूल आवास।" },
  },
  institutes: {
    label: { en: "Education", hi: "शिक्षा" },
    title: { en: "Coaching & institutes", hi: "कोचिंग व संस्थान" },
    sub: { en: "Coaching hubs and skill centres nearby.", hi: "आस-पास के कोचिंग व स्किल सेंटर।" },
  },
  news: {
    label: { en: "News", hi: "खबरें" },
    title: { en: "What's happening", hi: "क्या हो रहा है" },
    sub: { en: "Fresh local updates from your street.", hi: "आपकी गली से ताज़ा अपडेट।" },
  },
  openings: {
    label: { en: "New", hi: "नया" },
    title: { en: "Just opened", hi: "अभी-अभी खुला" },
    sub: { en: "New cafes, shops & spots to try.", hi: "नए कैफे, दुकानें और जगहें।" },
  },
  events: {
    label: { en: "Events", hi: "इवेंट्स" },
    title: { en: "Upcoming events", hi: "आने वाले इवेंट्स" },
    sub: { en: "Don't miss out on the buzz.", hi: "मस्ती छूट न जाए।" },
  },
  businesses: {
    label: { en: "Local", hi: "लोकल" },
    title: { en: "Trusted local businesses", hi: "भरोसेमंद लोकल बिज़नेस" },
    sub: { en: "Shops & services your area loves.", hi: "इलाके की पसंदीदा दुकानें व सेवाएँ।" },
  },
  influencers: {
    label: { en: "Creators", hi: "क्रिएटर्स" },
    title: { en: "Local creators", hi: "लोकल क्रिएटर्स" },
    sub: { en: "Voices putting your area on the map.", hi: "इलाके को पहचान दिलाने वाली आवाज़ें।" },
  },
  lostfound: {
    label: { en: "Community", hi: "समुदाय" },
    title: { en: "Lost & Found", hi: "खोया-पाया" },
    sub: { en: "Neighbours helping neighbours.", hi: "पड़ोसी, पड़ोसियों की मदद।" },
  },
  schools: {
    label: { en: "Education", hi: "शिक्षा" },
    title: { en: "Schools nearby", hi: "आस-पास के स्कूल" },
    sub: { en: "Education options in the area.", hi: "इलाके के शिक्षा विकल्प।" },
  },
  hospitals: {
    label: { en: "Health", hi: "स्वास्थ्य" },
    title: { en: "Hospitals & clinics", hi: "अस्पताल व क्लिनिक" },
    sub: { en: "Health care close to home.", hi: "घर के पास स्वास्थ्य सेवा।" },
  },
  police: {
    label: { en: "Safety", hi: "सुरक्षा" },
    title: { en: "Police & safety", hi: "पुलिस व सुरक्षा" },
    sub: { en: "Know your local helpline.", hi: "अपनी लोकल हेल्पलाइन जानें।" },
  },
  atms: {
    label: { en: "Money", hi: "पैसे" },
    title: { en: "ATMs nearby", hi: "आस-पास के एटीएम" },
    sub: { en: "Cash points around you.", hi: "आपके आस-पास कैश पॉइंट।" },
  },
  map: {
    label: { en: "Map", hi: "नक्शा" },
    title: { en: "On the map", hi: "नक्शे पर" },
    sub: { en: "Find your way around the area.", hi: "इलाके में रास्ता खोजें।" },
  },
};
