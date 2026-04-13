// Health Hero Academy — Game Content (Hindi)

export interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: "nutrition" | "disease" | "maternal" | "community";
  difficulty: "easy" | "medium" | "hard";
  points: number;
}

export interface ScenarioChoice {
  text: string;
  points: number;
  feedback: string;
  badge?: string;
  isBest?: boolean;
}

export interface Scenario {
  id: number;
  title: string;
  story: string;
  emoji: string;
  choices: ScenarioChoice[];
  category: "nutrition" | "disease" | "maternal" | "community";
}

export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  requirement: string;
}

export interface FoodItem {
  name: string;
  emoji: string;
  group: "vegetables" | "dairy" | "grains" | "proteins" | "fruits";
}

// ─── BADGES ───────────────────────────────────────────────
export const badges: Badge[] = [
  { id: "nutrition_expert", name: "पोषण विशेषज्ञ", emoji: "🥗", description: "सभी पोषण सवालों में सही जवाब दिए", requirement: "पोषण श्रेणी में 100% सही" },
  { id: "disease_fighter", name: "रोग-योद्धा", emoji: "💉", description: "10 बीमारी रोकथाम सुझावों को पहचाना", requirement: "रोग निवारण में 80%+ सही" },
  { id: "baby_care", name: "शिशु देखभाल मास्टर", emoji: "👶", description: "मातृ एवं शिशु स्वास्थ्य स्तर पूरा किया", requirement: "मातृ स्वास्थ्य स्तर पूरा करें" },
  { id: "asha_supporter", name: "ASHA समर्थक", emoji: "🏥", description: "3 सामुदायिक स्वास्थ्य परिदृश्य पूरे किए", requirement: "3 सामुदायिक परिदृश्य पूरे करें" },
  { id: "health_champion", name: "स्वास्थ्य चैंपियन", emoji: "🏆", description: "90%+ सटीकता के साथ सभी स्तर पूरे किए", requirement: "90%+ सही उत्तर" },
  { id: "community_leader", name: "सामुदायिक नेता", emoji: "🌟", description: "5 बार 'समुदाय पहले' निर्णय लिए", requirement: "5 सामुदायिक निर्णय" },
  { id: "knowledge_keeper", name: "ज्ञान रक्षक", emoji: "📚", description: "50 ट्रिविया सवालों के सही जवाब दिए", requirement: "50 सही उत्तर" },
  { id: "streak_master", name: "लगातार विजेता", emoji: "🔥", description: "लगातार 5 सही जवाब दिए", requirement: "5 सही उत्तरों की लगातार श्रृंखला" },
];

// ─── TRIVIA QUESTIONS ───────────────────────────────────────
export const triviaQuestions: TriviaQuestion[] = [
  // NUTRITION - Easy
  {
    id: 1, question: "हड्डियों की मजबूती के लिए कौन सा विटामिन सबसे जरूरी है?",
    options: ["विटामिन C", "विटामिन D", "विटामिन A", "विटामिन K"],
    correctIndex: 1, explanation: "विटामिन D हड्डियों में कैल्शियम को अवशोषित करने में मदद करता है।",
    category: "nutrition", difficulty: "easy", points: 1,
  },
  {
    id: 2, question: "एक किशोर (13-17 वर्ष) को रोजाना कितना पानी पीना चाहिए?",
    options: ["1-2 गिलास", "3-4 गिलास", "6-8 गिलास", "12-15 गिलास"],
    correctIndex: 2, explanation: "किशोरों को दिन में 6-8 गिलास (2-3 लीटर) पानी पीना चाहिए।",
    category: "nutrition", difficulty: "easy", points: 1,
  },
  {
    id: 3, question: "संतुलित आहार में कितने खाद्य समूह शामिल होने चाहिए?",
    options: ["2", "3", "5", "7"],
    correctIndex: 2, explanation: "संतुलित आहार में 5 समूह: अनाज, प्रोटीन, डेयरी, फल और सब्जियां शामिल हैं।",
    category: "nutrition", difficulty: "easy", points: 1,
  },
  {
    id: 4, question: "आयरन (लौह तत्व) की कमी से कौन सी बीमारी होती है?",
    options: ["मधुमेह", "एनीमिया (रक्ताल्पता)", "टीबी", "मलेरिया"],
    correctIndex: 1, explanation: "आयरन की कमी से एनीमिया होता है, जिससे शरीर में खून की कमी हो जाती है।",
    category: "nutrition", difficulty: "medium", points: 2,
  },
  {
    id: 5, question: "दूध, दही और पनीर किस खाद्य समूह में आतें हैं?",
    options: ["प्रोटीन", "अनाज", "डेयरी", "विटामिन"],
    correctIndex: 2, explanation: "दूध, दही और पनीर डेयरी समूह में आते हैं जो कैल्शियम प्रदान करते हैं।",
    category: "nutrition", difficulty: "easy", points: 1,
  },

  // DISEASE PREVENTION
  {
    id: 6, question: "टीकाकरण (वैक्सीन) का मुख्य उद्देश्य क्या है?",
    options: ["बीमारी का इलाज करना", "बीमारी को रोकना", "दर्द कम करना", "भूख बढ़ाना"],
    correctIndex: 1, explanation: "टीके शरीर की प्रतिरक्षा प्रणाली को बीमारियों से लड़ने के लिए तैयार करते हैं।",
    category: "disease", difficulty: "easy", points: 1,
  },
  {
    id: 7, question: "डायरिया (दस्त) होने पर सबसे पहले क्या देना चाहिए?",
    options: ["एंटीबायोटिक", "ORS (ओ.आर.एस.)", "कोल्ड ड्रिंक", "चाय"],
    correctIndex: 1, explanation: "ORS शरीर में पानी और नमक की कमी को पूरा करता है। यह जीवनरक्षक है।",
    category: "disease", difficulty: "easy", points: 1,
  },
  {
    id: 8, question: "हाथ धोने का सबसे प्रभावी तरीका कौन सा है?",
    options: ["सिर्फ पानी से", "साबुन और पानी से 20 सेकंड तक", "सैनिटाइज़र से", "कपड़े से पोंछना"],
    correctIndex: 1, explanation: "साबुन और पानी से 20 सेकंड तक हाथ धोना सबसे प्रभावी है।",
    category: "disease", difficulty: "easy", points: 1,
  },
  {
    id: 9, question: "मलेरिया किस से फैलता है?",
    options: ["दूषित पानी", "मच्छर के काटने से", "हवा से", "छूने से"],
    correctIndex: 1, explanation: "मलेरिया एनोफिलीज़ मच्छर के काटने से फैलता है। मच्छरदानी का उपयोग बचाव है।",
    category: "disease", difficulty: "medium", points: 2,
  },
  {
    id: 10, question: "टीबी (तपेदिक) के मुख्य लक्षण क्या हैं?",
    options: ["लगातार 2 सप्ताह से अधिक खांसी", "पेट दर्द", "सिरदर्द", "बुखार के बिना दस्त"],
    correctIndex: 0, explanation: "2 सप्ताह से अधिक खांसी, वजन कम होना, रात को पसीना — ये TB के लक्षण हैं।",
    category: "disease", difficulty: "medium", points: 2,
  },

  // MATERNAL & CHILD HEALTH
  {
    id: 11, question: "नवजात शिशु को जन्म के बाद कितने समय में स्तनपान शुरू करना चाहिए?",
    options: ["6 घंटे बाद", "24 घंटे बाद", "1 घंटे के अंदर", "3 दिन बाद"],
    correctIndex: 2, explanation: "जन्म के 1 घंटे के अंदर स्तनपान शुरू करने से शिशु को 'कोलोस्ट्रम' मिलता है — यह पहला टीका है!",
    category: "maternal", difficulty: "medium", points: 2,
  },
  {
    id: 12, question: "गर्भावस्था में कम से कम कितनी बार स्वास्थ्य जांच करानी चाहिए?",
    options: ["1 बार", "2 बार", "4 बार", "सिर्फ डिलीवरी के समय"],
    correctIndex: 2, explanation: "WHO के अनुसार कम से कम 4 बार प्रसवपूर्व जांच (ANC) जरूरी है।",
    category: "maternal", difficulty: "medium", points: 2,
  },
  {
    id: 13, question: "शिशु को केवल स्तनपान (exclusive breastfeeding) कब तक कराना चाहिए?",
    options: ["1 महीने तक", "3 महीने तक", "6 महीने तक", "1 साल तक"],
    correctIndex: 2, explanation: "WHO अनुसार पहले 6 महीने केवल स्तनपान कराएं — पानी भी नहीं देना है।",
    category: "maternal", difficulty: "easy", points: 1,
  },
  {
    id: 14, question: "गर्भवती महिला को आयरन-फोलिक एसिड (IFA) की गोली कब से खानी चाहिए?",
    options: ["डिलीवरी के बाद", "गर्भावस्था के 4 महीने बाद", "गर्भावस्था शुरू होते ही", "जब कमजोरी लगे"],
    correctIndex: 2, explanation: "IFA गोली गर्भावस्था शुरू होते ही खानी चाहिए ताकि एनीमिया से बचाव हो।",
    category: "maternal", difficulty: "hard", points: 3,
  },

  // COMMUNITY HEALTH
  {
    id: 15, question: "ASHA का पूरा नाम क्या है?",
    options: ["Accredited Social Health Activist", "Associated Social Health Agent", "Accredited State Health Advisor", "Active Social Health Activist"],
    correctIndex: 0, explanation: "ASHA = Accredited Social Health Activist (मान्यता प्राप्त सामाजिक स्वास्थ्य कार्यकर्ता)",
    category: "community", difficulty: "easy", points: 1,
  },
  {
    id: 16, question: "एक ASHA दीदी कितनी जनसंख्या की सेवा करती है?",
    options: ["500 लोग", "1000 लोग", "5000 लोग", "10000 लोग"],
    correctIndex: 1, explanation: "NHM के तहत 1 ASHA प्रति 1000 ग्रामीण जनसंख्या चुनी जाती है।",
    category: "community", difficulty: "medium", points: 2,
  },
  {
    id: 17, question: "PLA का पूरा नाम क्या है?",
    options: ["Private Learning Action", "Participatory Learning and Action", "Public Learning Association", "Primary Learning Activity"],
    correctIndex: 1, explanation: "PLA = Participatory Learning and Action (सहभागी शिक्षण और कार्रवाई)",
    category: "community", difficulty: "easy", points: 1,
  },
  {
    id: 18, question: "एम्बुलेंस के लिए कौन सा नंबर डायल करें?",
    options: ["100", "108", "112", "181"],
    correctIndex: 1, explanation: "108 एम्बुलेंस सेवा और 102 जननी एक्सप्रेस (गर्भवती महिलाओं के लिए) का नंबर है।",
    category: "community", difficulty: "easy", points: 1,
  },
  {
    id: 19, question: "SAM (Severe Acute Malnutrition) से ग्रसित बच्चे की पहचान कैसे करें?",
    options: ["वजन मापकर", "MUAC टेप से बांह की मोटाई मापकर", "रंग देखकर", "आवाज़ सुनकर"],
    correctIndex: 1, explanation: "MUAC टेप (मध्य-ऊपरी बांह परिधि) — लाल रंग HOT खतरा। तुरंत इलाज जरूरी!",
    category: "community", difficulty: "hard", points: 3,
  },
  {
    id: 20, question: "VHSND का पूर्ण रूप और उद्देश्य क्या है?",
    options: ["Village Health Sanitation & Nutrition Day — गांव में स्वास्थ्य दिवस", "Village Health Service and National Day", "Voluntary Health Support and National Duty", "Village Hospital Service and Nutrition Department"],
    correctIndex: 0, explanation: "VHSND में ANM, ASHA और AWW मिलकर टीकाकरण, पोषण और स्वास्थ्य सेवाएं देते हैं।",
    category: "community", difficulty: "hard", points: 3,
  },
];

// ─── SCENARIOS ────────────────────────────────────────────
export const scenarios: Scenario[] = [
  {
    id: 1,
    title: "पड़ोसी की मदद",
    story: "आपकी पड़ोसन का बच्चा 4 महीने का है और वजन नहीं बढ़ रहा। वह आपसे सलाह मांगती है।",
    emoji: "👶",
    category: "nutrition",
    choices: [
      { text: "\"6 महीने तक केवल स्तनपान सबसे अच्छा है\"", points: 10, feedback: "बिल्कुल सही! WHO के अनुसार 6 महीने तक केवल स्तनपान सर्वोत्तम है।" },
      { text: "\"2 महीने से ठोस आहार शुरू कर दो\"", points: -5, feedback: "❌ गलत! 6 महीने से पहले ठोस आहार शिशु के पेट के लिए हानिकारक है।" },
      { text: "\"ASHA दीदी से मिलकर सलाह लो\"", points: 15, feedback: "शानदार! ASHA दीदी से मिलना सबसे बुद्धिमान कदम है।", badge: "asha_supporter", isBest: true },
      { text: "\"बस चावल का पानी पिलाओ\"", points: -10, feedback: "❌ ये ठीक नहीं! चावल का पानी में पर्याप्त पोषण नहीं होता।" },
    ],
  },
  {
    id: 2,
    title: "स्कूल में टीकाकरण अभियान",
    story: "आपके स्कूल में टीकाकरण कैंप लगा है। आपका दोस्त राज टीका लगवाने से डर रहा है।",
    emoji: "💉",
    category: "disease",
    choices: [
      { text: "\"चिंता मत करो, शायद बीमार नहीं पड़ोगे\"", points: -10, feedback: "❌ टीका लगवाना ज़रूरी है! बीमारी का इंतज़ार न करें।" },
      { text: "\"टीके बीमारियों से बचाते हैं, ये बहुत ज़रूरी है\"", points: 10, feedback: "✅ सही कहा! टीके रोग प्रतिरक्षा प्रणाली को मजबूत बनाते हैं।" },
      { text: "\"चलो साथ में चलते हैं, मैं भी लगवाऊंगा\"", points: 15, feedback: "👏 शानदार! साथ देना = असली दोस्ती!", badge: "community_leader" },
      { text: "\"स्वास्थ्य कर्मी से बात करवाता हूं\"", points: 20, feedback: "🌟 बेहतरीन! ASHA/ANM से जानकारी लेना सबसे समझदारी भरा कदम!", badge: "asha_supporter", isBest: true },
    ],
  },
  {
    id: 3,
    title: "ASHA दीदी का एक दिन",
    story: "आपकी गांव की ASHA दीदी ने आपको अपने काम देखने का न्योता दिया। आप क्या करेंगे?",
    emoji: "🏥",
    category: "community",
    choices: [
      { text: "\"उनकी भूमिका सीखूंगा/सीखूंगी\"", points: 10, feedback: "✅ ASHA दीदी समुदाय और स्वास्थ्य सेवाओं की रीढ़ हैं।" },
      { text: "\"ASHA दीदी गर्भवती माताओं की कैसे मदद करती हैं?\"", points: 15, feedback: "👏 ASHA दीदी ANC जांच, IFA गोली, और संस्थागत प्रसव सुनिश्चित करती हैं।", badge: "baby_care" },
      { text: "\"सरकारी स्वास्थ्य कार्यक्रमों से ASHA दीदी का क्या संबंध है?\"", points: 20, feedback: "🌟 NHM के तहत ASHA 52+ गतिविधियों में भाग लेती हैं — वो सरकार और समुदाय के बीच कड़ी हैं!", badge: "community_leader", isBest: true },
      { text: "\"अभी टाइम नहीं है\"", points: 0, feedback: "😕 एक बड़ा सीखने का मौका छूट गया!" },
    ],
  },
  {
    id: 4,
    title: "बुखार का इलाज",
    story: "आपके छोटे भाई को तेज बुखार है और पिछले 3 दिन से ठीक नहीं हो रहा। आप क्या करेंगे?",
    emoji: "🤒",
    category: "disease",
    choices: [
      { text: "\"घर पर ही देसी इलाज करेंगे\"", points: -5, feedback: "❌ 3 दिन से बुखार = डॉक्टर ज़रूरी! देरी खतरनाक हो सकती है।" },
      { text: "\"ASHA दीदी को बुलाओ\"", points: 15, feedback: "✅ ASHA दीदी सही मार्गदर्शन दे सकती हैं और PHC रेफर कर सकती हैं।", badge: "asha_supporter" },
      { text: "\"तुरंत नजदीकी PHC/अस्पताल ले जाओ\"", points: 20, feedback: "🌟 बिल्कुल सही! 3 दिन से अधिक बुखार में तुरंत चिकित्सकीय सहायता लें।", isBest: true },
      { text: "\"पेरासिटामोल दो, ठीक हो जाएगा\"", points: 0, feedback: "⚠️ दवाई दे सकते हैं पर 3 दिन से अधिक बुखार में डॉक्टर ज़रूरी है।" },
    ],
  },
  {
    id: 5,
    title: "गांव में स्वच्छता अभियान",
    story: "आपके गांव में बारिश के बाद पानी जमा हो गया है और मच्छर बढ़ रहे हैं। आप क्या करेंगे?",
    emoji: "🦟",
    category: "disease",
    choices: [
      { text: "\"कुछ नहीं, ये तो हर साल होता है\"", points: -10, feedback: "❌ जमा पानी = मच्छर = मलेरिया/डेंगू! कार्रवाई ज़रूरी है।" },
      { text: "\"दोस्तों के साथ जमा पानी साफ करेंगे\"", points: 15, feedback: "✅ बहुत अच्छा! सामुदायिक प्रयास से बीमारी रोकी जा सकती है।", badge: "community_leader" },
      { text: "\"ASHA दीदी और ग्राम प्रधान को बताएंगे\"", points: 20, feedback: "🌟 शानदार! सही अधिकारियों को सूचित करना = समझदारी!", badge: "asha_supporter", isBest: true },
      { text: "\"मच्छरदानी लगा लेंगे\"", points: 5, feedback: "मच्छरदानी अच्छा है, पर समस्या की जड़ = जमा पानी हटाना ज़रूरी।" },
    ],
  },
];

// ─── FOOD ITEMS for Nutrition Puzzle ────────────────────────
export const foodItems: FoodItem[] = [
  { name: "पालक", emoji: "🥬", group: "vegetables" },
  { name: "गाजर", emoji: "🥕", group: "vegetables" },
  { name: "टमाटर", emoji: "🍅", group: "vegetables" },
  { name: "दूध", emoji: "🥛", group: "dairy" },
  { name: "दही", emoji: "🍶", group: "dairy" },
  { name: "चावल", emoji: "🍚", group: "grains" },
  { name: "रोटी", emoji: "🫓", group: "grains" },
  { name: "दाल", emoji: "🫘", group: "proteins" },
  { name: "अंडा", emoji: "🥚", group: "proteins" },
  { name: "केला", emoji: "🍌", group: "fruits" },
  { name: "सेब", emoji: "🍎", group: "fruits" },
  { name: "संतरा", emoji: "🍊", group: "fruits" },
];

export const foodGroupLabels: Record<string, { name: string; emoji: string; color: string }> = {
  vegetables: { name: "सब्जियां", emoji: "🥬", color: "#2A9B56" },
  dairy: { name: "डेयरी", emoji: "🥛", color: "#2E6FC8" },
  grains: { name: "अनाज", emoji: "🍚", color: "#B8860B" },
  proteins: { name: "प्रोटीन", emoji: "🫘", color: "#C0392B" },
  fruits: { name: "फल", emoji: "🍎", color: "#D4621A" },
};

// ─── LEVEL STRUCTURE ──────────────────────────────────────
export const levels = [
  { level: 1, name: "पोषण की पहचान", category: "nutrition" as const, pointsRequired: 0 },
  { level: 2, name: "रोग से लड़ाई", category: "disease" as const, pointsRequired: 50 },
  { level: 3, name: "मां और शिशु", category: "maternal" as const, pointsRequired: 120 },
  { level: 4, name: "सामुदायिक चैंपियन", category: "community" as const, pointsRequired: 200 },
  { level: 5, name: "स्वास्थ्य हीरो", category: "community" as const, pointsRequired: 300 },
];

export function getLevelForPoints(points: number) {
  let currentLevel = levels[0];
  for (const l of levels) {
    if (points >= l.pointsRequired) currentLevel = l;
  }
  return currentLevel;
}

export function getNextLevel(points: number) {
  for (const l of levels) {
    if (points < l.pointsRequired) return l;
  }
  return null; // max level
}
