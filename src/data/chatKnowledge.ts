// PLA Health Assistant — Knowledge Engine
// Rule-based keyword matching for Saharsa district, Bihar

import { findBlockContacts, formatBlockContacts, formatAllBlocks, blockNames } from "./saharsaContacts";
import { findFacilitiesByBlock, formatFacilityResponse, formatAllFacilities, healthFacilities } from "./facilityLocations";
import { findAbbreviation, formatAbbreviationResponse, abbreviations } from "./abbreviations";

export interface ChatResponse {
  text: string;
  isEmergency?: boolean;
  quickActions?: string[];
}

// ─── Emergency Detection ───────────────────────────────────────
const emergencyKeywords = [
  "bleeding", "blood", "खून", "ब्लीडिंग", "रक्तस्राव",
  "fits", "seizure", "दौरा", "मिर्गी", "बेहोश",
  "fever", "बुखार", "तेज बुखार",
  "not feeding", "दूध नहीं", "feed nahi", "स्तनपान नहीं",
  "सांस नहीं", "breathe", "breathing problem",
  "उल्टी", "vomiting", "बहुत कमजोर", "very weak",
  "emergency", "इमरजेंसी", "urgent", "जल्दी",
  "pain", "दर्द", "पेट दर्द",
];

function isEmergency(input: string): boolean {
  const lower = input.toLowerCase();
  return emergencyKeywords.some(k => lower.includes(k.toLowerCase()));
}

const EMERGENCY_RESPONSE: ChatResponse = {
  text: `🚨 **यह एक आपातकालीन स्थिति हो सकती है!**

तुरंत यह करें:

1. 📞 **108 पर कॉल करें** — एम्बुलेंस
2. 📞 **102 पर कॉल करें** — जननी हेल्पलाइन (गर्भवती महिलाओं के लिए)
3. 🏥 **नजदीकी PHC / CHC / जिला अस्पताल जाएं**
4. अपनी ASHA दीदी या ANM को तुरंत बुलाएं

📍 सहरसा जिला अस्पताल या नजदीकी स्वास्थ्य केंद्र जाएं।

⚠️ देरी न करें — समय पर इलाज से जान बच सकती है!`,
  isEmergency: true,
  quickActions: ["📞 108 — Ambulance", "📞 102 — Janani", "📞 104 — Health Helpline"],
};

// ─── Contact / Phone Number Patterns ───────────────────────────
const contactKeywords = [
  "number", "नंबर", "phone", "फोन", "contact", "संपर्क",
  "helpline", "हेल्पलाइन", "ambulance", "एम्बुलेंस",
  "call", "कॉल",
];

const CONTACT_RESPONSE: ChatResponse = {
  text: `📞 **ज़रूरी फोन नंबर (सहरसा, बिहार)**

🚑 **एम्बुलेंस:** 108
🤰 **जननी हेल्पलाइन (गर्भवती):** 102
🏥 **स्वास्थ्य हेल्पलाइन:** 104
👶 **चाइल्ड हेल्पलाइन:** 1098

📍 **ब्लॉक-स्तरीय अधिकारी:**
किसी ब्लॉक का नाम लिखें और मैं MOIC, BHM, BCM, BMNE, BAM सभी के नंबर दे दूंगा!

👉 उदाहरण: "Mahishi contact" या "Nauhatta नंबर"`,
  quickActions: ["Mahishi", "Nauhatta", "Sonbarsa", "सभी ब्लॉक"],
};

// ─── PLA Explanation ───────────────────────────────────────────
const plaKeywords = [
  "pla", "what is pla", "pla kya", "pla क्या", "participatory",
  "सहभागी", "मॉड्यूल", "module",
];

const PLA_RESPONSE: ChatResponse = {
  text: `📚 **PLA (Participatory Learning & Action) क्या है?**

PLA एक समुदाय-आधारित प्रक्रिया है जिसमें गर्भवती महिलाएं और उनके परिवार मिलकर:
- मातृ एवं शिशु स्वास्थ्य की **समस्याओं को पहचानते हैं**
- **समाधान खोजते हैं**
- और उन्हें **लागू करते हैं**

📅 **कुल 8 बैठकें** होती हैं, 4 चरणों में:

| चरण | विवरण | बैठकें |
|------|--------|---------|
| 1️⃣ | समस्या पहचानना | बैठक 1-2 |
| 2️⃣ | रणनीति बनाना | बैठक 3-4 |
| 3️⃣ | लागू करना | बैठक 5-6 |
| 4️⃣ | मूल्यांकन | बैठक 7-8 |

👩‍⚕️ ASHA फ़ैसिलिटेटर इन बैठकों को आयोजित करती हैं।

👉 किसी खास बैठक की जानकारी चाहिए?`,
  quickActions: ["बैठक 1", "बैठक 5", "गतिविधियां", "📞 हेल्पलाइन"],
};

// ─── Meeting-specific Responses ────────────────────────────────
const meetingResponses: Record<string, ChatResponse> = {
  "1": {
    text: `📅 **बैठक 1 — समस्या की पहचान**

🎯 उद्देश्य: महिलाओं और नवजात शिशुओं की स्वास्थ्य समस्याओं की पहचान

🎮 गतिविधि: **घोड़ा खेल (Horse Game)**
- कहानी कार्ड दिखाकर समस्याओं पर चर्चा
- सभी को बोलने का मौका

⏱️ समय: 1 — 1.5 घंटा
📦 सामग्री: कहानी कार्ड, चार्ट पेपर

💡 याद रखें: सोनी की कहानी का उपयोग करें!`,
    quickActions: ["बैठक 2", "सोनी की कहानी", "📞 हेल्पलाइन"],
  },
  "2": {
    text: `📅 **बैठक 2 — समस्या को प्राथमिकता देना**

🎯 उद्देश्य: सबसे गंभीर समस्याओं को चुनना

🎮 गतिविधि: **वोटिंग / रैंकिंग**
- हर महिला 3 सबसे बड़ी समस्याओं पर वोट करती है
- सबसे ज्यादा वोट वाली समस्या = प्राथमिकता

⏱️ समय: 1 — 1.5 घंटा`,
    quickActions: ["बैठक 1", "बैठक 3", "📞 हेल्पलाइन"],
  },
  "3": {
    text: `📅 **बैठक 3 — कारण खोजना (But Why?)**

🎯 उद्देश्य: समस्या की जड़ तक पहुंचना

🎮 गतिविधि: **लेकिन क्यों? (But Why?)**
- हर जवाब के बाद पूछें "लेकिन क्यों?"
- 5 बार पूछने से असली कारण मिलता है

⏱️ समय: 1 — 1.5 घंटा
💡 सोनी की कहानी से उदाहरण दें`,
    quickActions: ["बैठक 4", "सोनी की कहानी", "📞 हेल्पलाइन"],
  },
  "4": {
    text: `📅 **बैठक 4 — समाधान खोजना (But What?)**

🎯 उद्देश्य: हर कारण के लिए समाधान तैयार करना

🎮 गतिविधि: **लेकिन क्या? (But What?)**
- हर कारण के सामने समाधान लिखें
- समुदाय खुद अपना समाधान चुने

⏱️ समय: 1 — 1.5 घंटा`,
    quickActions: ["बैठक 3", "बैठक 5", "📞 हेल्पलाइन"],
  },
  "5": {
    text: `📅 **बैठक 5 — रणनीति बनाना**

🎯 उद्देश्य: समाधान को लागू करने की योजना

🎮 गतिविधि: **ब्रिज गेम (Bridge Game)**
- एक तरफ समस्या, दूसरी तरफ समाधान
- बीच में पुल (समुदाय की रणनीति)

⏱️ समय: 1 — 1.5 घंटा`,
    quickActions: ["बैठक 6", "गतिविधियां", "📞 हेल्पलाइन"],
  },
  "6": {
    text: `📅 **बैठक 6 — योजना लागू करना**

🎯 उद्देश्य: समुदाय-स्तरीय कार्य योजना बनाना

🎮 गतिविधि: **नुक्कड़ नाटक / रोल प्ले**
- समस्या और समाधान को नाटक के रूप में प्रस्तुत करें

⏱️ समय: 1 — 1.5 घंटा`,
    quickActions: ["बैठक 5", "बैठक 7", "📞 हेल्पलाइन"],
  },
  "7": {
    text: `📅 **बैठक 7 — प्रगति की समीक्षा**

🎯 उद्देश्य: अब तक क्या बदला? क्या अच्छा हुआ?

🎮 गतिविधि: **सीढ़ी खेल (Step Game)**
- पहले कहां थे, अब कहां हैं
- सफलताओं की पहचान

⏱️ समय: 1 — 1.5 घंटा`,
    quickActions: ["बैठक 8", "📞 हेल्पलाइन"],
  },
  "8": {
    text: `📅 **बैठक 8 — समुदाय मेला (Community Event)**

🎯 उद्देश्य: पूरे समुदाय के साथ उपलब्धियां साझा करना

🎉 गतिविधि: **समुदाय मेला**
- सभी 8 बैठकों की उपलब्धियां प्रदर्शित करें
- गीत, नाटक, प्रदर्शनी

⏱️ समय: **3 — 4 घंटे**
📦 सामग्री: चार्ट, बैनर, माइक, रिफ्रेशमेंट`,
    quickActions: ["बैठक 1 से शुरू करें", "📞 हेल्पलाइन"],
  },
};

// ─── Activities ────────────────────────────────────────────────
const activityKeywords = [
  "activity", "गतिविधि", "game", "खेल", "method", "तरीका",
  "horse", "घोड़ा", "bridge", "पुल", "step", "सीढ़ी",
  "nukkad", "नुक्कड़", "natak", "नाटक", "picture", "card",
];

const ACTIVITY_RESPONSE: ChatResponse = {
  text: `🎮 **PLA गतिविधियां (Activities)**

PLA बैठकों में ये प्रमुख गतिविधियां की जाती हैं:

🐎 **घोड़ा खेल (Horse Game)** — बैठक 1
> कहानी कार्ड से समस्याओं की पहचान

🎯 **वोटिंग** — बैठक 2
> सबसे गंभीर समस्या चुनें

❓ **लेकिन क्यों? (But Why?)** — बैठक 3
> कारणों की जड़ तक पहुंचना

💡 **लेकिन क्या? (But What?)** — बैठक 4
> हर कारण का समाधान

🌉 **ब्रिज गेम (Bridge Game)** — बैठक 5
> समस्या से समाधान तक का पुल

🎭 **नुक्कड़ नाटक** — बैठक 6
> रोल प्ले से जागरूकता

📊 **सीढ़ी खेल (Step Game)** — बैठक 7
> प्रगति की समीक्षा

🎉 **समुदाय मेला** — बैठक 8
> उपलब्धियां साझा करना

💡 याद रखें: कभी लेक्चर न दें, सब मिलकर सीखें!`,
  quickActions: ["बैठक 1", "बैठक 5", "📞 हेल्पलाइन"],
};

// ─── Health Topics ─────────────────────────────────────────────
const healthKeywords = [
  "health", "स्वास्थ्य", "pregnancy", "गर्भवती", "pregnant",
  "baby", "बच्चा", "शिशु", "newborn", "नवजात",
  "breastfeed", "स्तनपान", "दूध", "milk",
  "nutrition", "पोषण", "खाना", "diet", "आहार",
  "weak", "कमजोर", "anemia", "एनीमिया", "खून की कमी",
  "vaccine", "टीका", "vaccination", "टीकाकरण",
  "danger", "खतरा", "sign", "लक्षण",
];

const HEALTH_RESPONSE: ChatResponse = {
  text: `👩‍⚕️ **मातृ एवं शिशु स्वास्थ्य सहायता**

🤰 **गर्भावस्था में ध्यान रखें:**
- 4+ बार ANC (प्रसव पूर्व) जांच करवाएं
- आयरन-फोलिक एसिड की गोली रोज खाएं
- पोषक आहार लें (दाल, हरी सब्जी, दूध, अंडा)
- TT (टिटनस) का टीका लगवाएं

👶 **नवजात शिशु की देखभाल:**
- जन्म के 1 घंटे के अंदर स्तनपान शुरू करें
- 6 महीने तक केवल माँ का दूध
- बच्चे को गरम रखें (कंगारू मदर केयर)
- नियमित टीकाकरण करवाएं

⚠️ **खतरे के लक्षण — तुरंत अस्पताल जाएं:**
- तेज बुखार या ठंड लगना
- भारी रक्तस्राव
- बच्चा दूध नहीं पी रहा
- दौरे/बेहोशी
- सांस लेने में तकलीफ

📞 आपातकाल: **108** | जननी: **102** | हेल्पलाइन: **104**

👉 आप किस विषय में और जानना चाहेंगे?`,
  quickActions: ["गर्भावस्था", "नवजात देखभाल", "📞 हेल्पलाइन", "PLA क्या है?"],
};

// ─── Soni Story ────────────────────────────────────────────────
const soniKeywords = [
  "soni", "सोनी", "story", "कहानी", "kahani",
];

const SONI_RESPONSE: ChatResponse = {
  text: `📖 **सोनी की कहानी**

सोनी एक 19 वर्षीय गर्भवती महिला है जो सहरसा, बिहार के एक गांव में रहती है।

😟 **क्या हुआ?**
सोनी को गर्भावस्था में कमजोरी और चक्कर आने लगे। उसने जांच नहीं करवाई।

❓ **लेकिन क्यों? (But Why?)**
1. जांच नहीं हुई → क्योंकि PHC दूर है
2. PHC दूर है → क्योंकि गांव में सुविधा नहीं
3. सुविधा नहीं → क्योंकि जागरूकता की कमी
4. जागरूकता की कमी → क्योंकि बैठकें नहीं होती
5. बैठकें नहीं → क्योंकि कोई संगठित नहीं करता

💡 **लेकिन क्या? (But What? — समाधान)**
1. ASHA दीदी गृह भ्रमण करें
2. PLA बैठकें शुरू करें
3. समुदाय को जोड़ें
4. टेलीफोन ट्री बनाएं
5. परिवहन योजना बनाएं

✅ यह कहानी PLA बैठक 3-4 में उपयोग होती है!`,
  quickActions: ["बैठक 3", "बैठक 4", "📞 हेल्पलाइन"],
};

// ─── Guidelines ────────────────────────────────────────────────
const guidelineKeywords = [
  "guideline", "नियम", "rule", "rules", "करें", "न करें",
  "do", "don't", "tip", "सुझाव", "facilitator",
  "फ़ैसिलिटेटर", "marginali", "वंचित",
];

const GUIDELINE_RESPONSE: ChatResponse = {
  text: `📋 **PLA बैठक के नियम**

✅ **करें (Must Do):**
- सबको गोले में बराबर स्तर पर बैठाएं
- उपस्थिति स्वैच्छिक रखें (कोई प्रोत्साहन नहीं)
- बैठक 1-1.5 घंटे की रखें
- सभी रिकॉर्ड लिखित में रखें

❌ **न करें (Must Not Do):**
- उपदेशपूर्ण (lecture-style) न बनें
- किसी सदस्य को बाहर न रखें
- कहानी का पात्र असली व्यक्ति न हो
- बिना तैयारी बैठक न चलाएं

🎯 **इन परिवारों को प्राथमिकता दें:**
- अल्पसंख्यक / अनुसूचित जाति
- महिला-प्रधान परिवार
- दिहाड़ी मजदूर
- विकलांगता वाले परिवार`,
  quickActions: ["गतिविधियां", "PLA क्या है?", "📞 हेल्पलाइन"],
};

// ─── Greeting ──────────────────────────────────────────────────
const greetingKeywords = [
  "hi", "hello", "namaste", "नमस्ते", "hey", "hii",
  "help", "मदद", "start", "शुरू",
];

const GREETING_RESPONSE: ChatResponse = {
  text: `🙏 **नमस्ते! PLA स्वास्थ्य सहायक में आपका स्वागत है**

मैं आपकी मदद कर सकता/सकती हूं:

🏥 **स्वास्थ्य संबंधी सवाल** — गर्भावस्था, नवजात, पोषण
📅 **PLA बैठकें** — 8 बैठकों की पूरी जानकारी
📞 **फोन नंबर** — एम्बुलेंस, हेल्पलाइन, स्थानीय संपर्क
🎮 **गतिविधियां** — घोड़ा खेल, ब्रिज गेम, नुक्कड़ नाटक
📋 **दिशानिर्देश** — फ़ैसिलिटेटर के लिए नियम

📍 sहरसा (बिहार) के लिए विशेष सहायता उपलब्ध है!

👉 आप क्या जानना चाहेंगे?`,
  quickActions: ["PLA क्या है?", "📞 हेल्पलाइन", "स्वास्थ्य सहायता", "बैठक 1"],
};

// ─── Default / Fallback ────────────────────────────────────────
const DEFAULT_RESPONSE: ChatResponse = {
  text: `🤔 मुझे आपका सवाल पूरी तरह समझ नहीं आया। 

कृपया इनमें से कोई विषय चुनें:
- "PLA क्या है?"
- "बैठक 1" (या कोई भी 1-8)
- "गतिविधियां"
- "स्वास्थ्य सहायता"
- "नंबर दो" / "हेल्पलाइन"
- "सोनी की कहानी"
- "नियम / दिशानिर्देश"

📞 आपातकाल? तुरंत **108** पर कॉल करें!`,
  quickActions: ["PLA क्या है?", "📞 हेल्पलाइन", "स्वास्थ्य सहायता", "गतिविधियां"],
};

// ─── ASHA Programme Knowledge ──────────────────────────────────
const ashaKeywords = [
  "asha", "आशा", "asha didi", "आशा दीदी", "asha kya", "asha guide",
  "accredited social health", "community health worker",
];

const ASHA_RESPONSE: ChatResponse = {
  text: `👩‍⚕️ **ASHA (Accredited Social Health Activist)**

ASHA एक स्वैच्छिक महिला सामुदायिक स्वास्थ्य कार्यकर्ता है।

📊 **प्रमुख आंकड़े:**
- 1 ASHA प्रति 1000 ग्रामीण जनसंख्या
- बिहार में 1,08,707 ASHAs (2018-19)
- ~167 परिवारों की सेवा
- 52+ प्रोत्साहन गतिविधियां

📋 **पात्रता:**
- न्यूनतम 10वीं पास
- आयु 18-40 वर्ष
- गांव की स्थायी निवासी
- विवाहित (अविवाहित पात्र नहीं)

🔗 पूरी जानकारी: **/asha** पेज पर जाएं

👉 और क्या जानना चाहेंगे?`,
  quickActions: ["ASHA कर्तव्य", "ASHA Facilitator", "कल्याण योजना", "📞 हेल्पलाइन"],
};

const ashaEligKeywords = [
  "eligibility", "पात्रता", "criteria", "qualification", "योग्यता",
  "age limit", "आयु सीमा", "शैक्षिक",
];

const ASHA_ELIGIBILITY_RESPONSE: ChatResponse = {
  text: `📋 **ASHA पात्रता मानदंड**

सभी शर्तें पूरी होनी चाहिए:

1️⃣ **शिक्षा:** न्यूनतम 10वीं पास
2️⃣ **आयु:** 18-40 वर्ष
3️⃣ **निवास:** गांव की स्थायी निवासी (बहू/विधवा पात्र, अविवाहित नहीं)
4️⃣ **कोई सरकारी संबंध नहीं:** PDS विक्रेता/सरकारी कर्मचारी रिश्तेदार अपात्र
5️⃣ **कोई मौजूदा पद नहीं:** मुखिया, पंचायत सदस्य, आंगनवाड़ी कार्यकर्ता अपात्र
6️⃣ **शारीरिक/मानसिक स्वस्थ**

⭐ **प्राथमिकता:** विधवा, परित्यक्ता, तलाकशुदा, प्रशिक्षित दाई

⚠️ अधिकतम कार्य आयु: 60 वर्ष (स्वतः सेवानिवृत्ति)

🔗 विस्तार: /asha पेज → पात्रता खंड`,
  quickActions: ["चयन प्रक्रिया", "ASHA कर्तव्य", "📞 हेल्पलाइन"],
};

const ashaDutyKeywords = [
  "asha duty", "asha duties", "asha kaam", "asha work",
  "कर्तव्य", "जिम्मेदारी", "asha ka kaam",
];

const ASHA_DUTIES_RESPONSE: ChatResponse = {
  text: `💪 **ASHA के मुख्य कर्तव्य**

📢 स्वास्थ्य व्यवहार परिवर्तन संचार
🏘️ ग्राम स्वास्थ्य योजना कार्यान्वयन
🤝 आंगनवाड़ी, TBA, ANM, MPW के साथ समन्वय
💊 पोषण, परिवार नियोजन, मातृ स्वास्थ्य पर परामर्श
🏥 रेफरल और एस्कॉर्ट
🎒 दवा किट धारक (ORS, आयरन गोलियां)
📋 गर्भावस्था, जन्म, मृत्यु, टीकाकरण रजिस्टर
👶 प्राथमिक उपचार, नवजात देखभाल
📊 HBNC फॉर्म, मासिक स्वास्थ्य संकेतक
🎯 52+ प्रोत्साहन गतिविधियां (NHM)

🔗 विस्तार: /asha पेज → कर्तव्य खंड`,
  quickActions: ["ASHA Facilitator", "प्रदर्शन मूल्यांकन", "📞 हेल्पलाइन"],
};

const afKeywords = [
  "facilitator", "फ़ैसिलिटेटर", "af ", "asha facilitator",
  "asha sahayak", "आशा सहायक",
];

const AF_RESPONSE: ChatResponse = {
  text: `👩‍💼 **ASHA Facilitator (AF) कौन है?**

1 ASHA Facilitator प्रति 20 ASHAs चुनी जाती है।

📊 **आंकड़े:**
- 20,000+ जनसंख्या कवर
- ~3,334 परिवार
- 12 प्रमुख कार्य

📋 **AF पात्रता:**
- मौजूदा ASHA होनी चाहिए (अनिवार्य)
- न्यूनतम 3 वर्ष ASHA अनुभव
- उच्च शैक्षिक योग्यता को प्राथमिकता
- ASHA दिवस पर इंचार्ज MO की अध्यक्षता में चयन

📝 **12 प्रमुख कार्य:**
I. क्षेत्र भ्रमण  II. मासिक क्लस्टर बैठक
III. बैठक एजेंडा  IV. वंचितों तक पहुंच
V. प्रशिक्षण सहायता  VI. ASHA प्रतिस्थापन
VII. शिकायत निवारण  VIII. दवा किट निरीक्षण
IX. डेटा संग्रह  X. भुगतान सुनिश्चित
XI. उपलब्धि दस्तावेजीकरण  XII. अतिरिक्त कार्य

🔗 विस्तार: /asha पेज → AF खंड`,
  quickActions: ["AF प्रदर्शन", "कल्याण योजना", "📞 हेल्पलाइन"],
};

const welfareKeywords = [
  "welfare", "कल्याण", "scheme", "योजना", "pension", "पेंशन",
  "insurance", "बीमा", "jeevan jyoti", "suraksha", "mandhan",
  "प्रोत्साहन", "incentive", "salary", "वेतन",
];

const WELFARE_RESPONSE: ChatResponse = {
  text: `🎁 **ASHA/AF कल्याण योजनाएं**

1️⃣ **PM श्रम योगी मानधन योजना**
   💰 ₹3,000/माह पेंशन (60 वर्ष बाद)
   📋 18-40 वर्ष, आय ≤ ₹15,000/माह
   💳 50% योगदान केंद्र सरकार

2️⃣ **PM जीवन ज्योति बीमा योजना**
   💰 ₹2 लाख जीवन बीमा
   📋 18-50 वर्ष, प्रीमियम ₹330/वर्ष
   💳 पूरा प्रीमियम केंद्र सरकार वहन

3️⃣ **PM सुरक्षा बीमा योजना**
   💰 ₹2 लाख दुर्घटना बीमा
   📋 18-70 वर्ष, प्रीमियम केवल ₹12/वर्ष
   💳 पूरा प्रीमियम केंद्र सरकार वहन

⚠️ बैंक खाता अनिवार्य (ऑटो-डेबिट)

🔗 विस्तार: /asha पेज → कल्याण खंड`,
  quickActions: ["ASHA पात्रता", "📞 हेल्पलाइन", "PLA क्या है?"],
};

const deselectionKeywords = [
  "deselect", "निष्कासन", "remove", "हटाना", "resign", "इस्तीफा",
  "retirement", "सेवानिवृत्ति",
];

const DESELECTION_RESPONSE: ChatResponse = {
  text: `❌ **ASHA/AF निष्कासन कारण**

1. अन्य रोजगार (आंगनवाड़ी, शिक्षा मित्र) में शामिल
2. ANM/विभाग से सहयोग न मिलने पर कार्य नहीं
3. संपन्न परिवार — काम करने को तैयार नहीं
4. मुखिया/पंचायत/वार्ड सदस्य निर्वाचित
5. अपरिहार्य कारणों से कार्य असंभव

📋 **प्रक्रिया:**
- BCM जांच → इंचार्ज MO को प्रस्ताव
- AF को 15 दिन में स्पष्टीकरण
- असंतोषजनक → सिविल सर्जन निष्कासन
- अपील: क्षेत्रीय अपर निदेशक (अंतिम आदेश)

⚠️ इस्तीफे के बाद पुनः चयन का अधिकार नहीं
⚠️ अधिकतम कार्य आयु: 60 वर्ष`,
  quickActions: ["ASHA पात्रता", "कल्याण योजना", "📞 हेल्पलाइन"],
};

// ─── Main Response Engine ──────────────────────────────────────
export function getChatResponse(input: string): ChatResponse {
  const lower = input.toLowerCase().trim();

  // 1. EMERGENCY — highest priority
  if (isEmergency(lower)) return EMERGENCY_RESPONSE;

  // 2. Meeting-specific (check for meeting number)
  const meetingMatch = lower.match(/(?:बैठक|meeting|baithak)\s*(\d)/);
  if (meetingMatch) {
    const num = meetingMatch[1];
    if (meetingResponses[num]) return meetingResponses[num];
  }
  // Also match just a number like "3" or "meeting 5"
  const numOnly = lower.match(/^(\d)$/);
  if (numOnly && meetingResponses[numOnly[1]]) {
    return meetingResponses[numOnly[1]];
  }

  // 3. Block-specific contact lookup (check BEFORE generic contact)
  const blockMatch = findBlockContacts(lower);
  if (blockMatch) {
    return {
      text: formatBlockContacts(blockMatch),
      quickActions: ["सभी ब्लॉक", "📞 हेल्पलाइन", "PLA क्या है?"],
    };
  }

  // 3b. "सभी ब्लॉक" / "all blocks" / "block list"
  const allBlockKeywords = ["सभी ब्लॉक", "all block", "block list", "सारे ब्लॉक", "blocks"];
  if (allBlockKeywords.some(k => lower.includes(k.toLowerCase()))) {
    return {
      text: formatAllBlocks(),
      quickActions: ["Mahishi", "Nauhatta", "Sonbarsa", "📞 हेल्पलाइन"],
    };
  }

  // 4. Facility / Hospital / PHC lookup
  const facilityKeywords = ["hospital", "अस्पताल", "phc", "chc", "facility", "सुविधा", "maps", "map", "नक्शा", "location", "स्थान"];
  if (facilityKeywords.some(k => lower.includes(k.toLowerCase()))) {
    // Check if user mentioned a specific block
    const matchedFacilities = findFacilitiesByBlock(lower);
    if (matchedFacilities.length > 0) {
      return {
        text: formatFacilityResponse(matchedFacilities),
        quickActions: ["सभी सुविधाएं", "📞 हेल्पलाइन", "ASHA गाइड"],
      };
    }
    return {
      text: formatAllFacilities(),
      quickActions: ["Mahishi PHC", "Sonbarsa PHC", "📞 हेल्पलाइन"],
    };
  }

  // 4b. Abbreviation Dictionary Lookup
  // Extract potential abbreviation from the query
  const cleanQuery = lower.replace(/(full form|का मतलब|क्या है|means|meaning|in hindi|in english|what is|\?)/gi, "").trim();
  const directMatch = findAbbreviation(cleanQuery) || findAbbreviation(lower);
  if (directMatch) {
    return {
      text: formatAbbreviationResponse(directMatch),
      quickActions: ["संक्षिप्त नाम सूची", "ASHA गाइड", "📞 हेल्पलाइन"],
    };
  }
  // Also check if any abbreviation appears in the text when asked about meaning
  if (lower.includes("full form") || lower.includes("मतलब") || lower.includes("क्या है")) {
    const foundAbb = abbreviations.find(a => lower.includes(a.term.toLowerCase()));
    if (foundAbb) {
      return {
        text: formatAbbreviationResponse(foundAbb),
        quickActions: ["संक्षिप्त नाम सूची", "ASHA गाइड"],
      };
    }
  }

  // 5. Contact/Phone numbers (generic)
  if (contactKeywords.some(k => lower.includes(k.toLowerCase()))) return CONTACT_RESPONSE;

  // 5. ASHA-specific queries (before generic health)
  if (deselectionKeywords.some(k => lower.includes(k.toLowerCase()))) return DESELECTION_RESPONSE;
  if (welfareKeywords.some(k => lower.includes(k.toLowerCase()))) return WELFARE_RESPONSE;
  if (ashaDutyKeywords.some(k => lower.includes(k.toLowerCase()))) return ASHA_DUTIES_RESPONSE;
  if (ashaEligKeywords.some(k => lower.includes(k.toLowerCase()))) return ASHA_ELIGIBILITY_RESPONSE;
  if (afKeywords.some(k => lower.includes(k.toLowerCase()))) return AF_RESPONSE;
  if (ashaKeywords.some(k => lower.includes(k.toLowerCase()))) return ASHA_RESPONSE;

  // 6. Soni story
  if (soniKeywords.some(k => lower.includes(k.toLowerCase()))) return SONI_RESPONSE;

  // 7. Activities
  if (activityKeywords.some(k => lower.includes(k.toLowerCase()))) return ACTIVITY_RESPONSE;

  // 8. Guidelines
  if (guidelineKeywords.some(k => lower.includes(k.toLowerCase()))) return GUIDELINE_RESPONSE;

  // 9. Health topics
  if (healthKeywords.some(k => lower.includes(k.toLowerCase()))) return HEALTH_RESPONSE;

  // 10. PLA explanation
  if (plaKeywords.some(k => lower.includes(k.toLowerCase()))) return PLA_RESPONSE;

  // 11. Greeting
  if (greetingKeywords.some(k => lower.includes(k.toLowerCase()))) return GREETING_RESPONSE;

  // 12. Default
  return DEFAULT_RESPONSE;
}
