export interface Abbreviation {
  term: string;
  fullFormEn: string;
  fullFormHi: string;
  category: "Designation" | "Program" | "Facility" | "Medical" | "General";
}

export const abbreviations: Abbreviation[] = [
  { term: "PLA", fullFormEn: "Participatory Learning and Action", fullFormHi: "सहभागी शिक्षण और कार्रवाई", category: "Program" },
  { term: "ASHA", fullFormEn: "Accredited Social Health Activist", fullFormHi: "मान्यता प्राप्त सामाजिक स्वास्थ्य कार्यकर्ता", category: "Designation" },
  { term: "AF", fullFormEn: "ASHA Facilitator", fullFormHi: "आशा फैसिलेटर", category: "Designation" },
  { term: "NHM", fullFormEn: "National Health Mission", fullFormHi: "राष्ट्रीय स्वास्थ्य मिशन", category: "Program" },
  { term: "PHC", fullFormEn: "Primary Health Centre", fullFormHi: "प्राथमिक स्वास्थ्य केंद्र", category: "Facility" },
  { term: "CHC", fullFormEn: "Community Health Centre", fullFormHi: "सामुदायिक स्वास्थ्य केंद्र", category: "Facility" },
  { term: "HWC", fullFormEn: "Health & Wellness Centre", fullFormHi: "स्वास्थ्य एवं कल्याण केंद्र", category: "Facility" },
  { term: "BCM", fullFormEn: "Block Community Mobilizer", fullFormHi: "प्रखंड सामुदायिक उत्प्रेरक", category: "Designation" },
  { term: "DCM", fullFormEn: "District Community Mobilizer", fullFormHi: "जिला सामुदायिक उत्प्रेरक", category: "Designation" },
  { term: "MOIC", fullFormEn: "Medical Officer-in-Charge", fullFormHi: "प्रभारी चिकित्सा पदाधिकारी", category: "Designation" },
  { term: "MO", fullFormEn: "Medical Officer", fullFormHi: "चिकित्सा पदाधिकारी", category: "Designation" },
  { term: "ANM", fullFormEn: "Auxiliary Nurse Midwife", fullFormHi: "ऑक्ज़ीलियरी नर्स मिडवाइफ़", category: "Designation" },
  { term: "HBNC", fullFormEn: "Home Based Newborn Care", fullFormHi: "गृह आधारित नवजात देखभाल", category: "Program" },
  { term: "HBYC", fullFormEn: "Home Based Care for Young Child", fullFormHi: "शिशुओं के लिए गृह आधारित देखभाल", category: "Program" },
  { term: "VHSND", fullFormEn: "Village Health Sanitation and Nutrition Day", fullFormHi: "ग्राम स्वास्थ्य स्वच्छता और पोषण दिवस", category: "Program" },
  { term: "VHSNC", fullFormEn: "Village Health Sanitation and Nutrition Committee", fullFormHi: "ग्राम स्वास्थ्य स्वच्छता और पोषण समिति", category: "General" },
  { term: "SHSB", fullFormEn: "State Health Society Bihar", fullFormHi: "राज्य स्वास्थ्य समिति, बिहार", category: "General" },
  { term: "ARC", fullFormEn: "ASHA Resource Centre", fullFormHi: "आशा संसाधन केंद्र", category: "Facility" },
  { term: "PM", fullFormEn: "Programme Manager", fullFormHi: "कार्यक्रम प्रबंधक", category: "Designation" },
  { term: "DHS", fullFormEn: "District Health Society", fullFormHi: "जिला स्वास्थ्य समिति", category: "General" },
  { term: "PPIUCD", fullFormEn: "Postpartum Intrauterine Contraceptive Device", fullFormHi: "प्रसवोत्तर अंतर्गर्भाशयी गर्भनिरोधक उपकरण", category: "Medical" },
  { term: "PTK", fullFormEn: "Pregnancy Testing Kit", fullFormHi: "गर्भावस्था परीक्षण किट", category: "Medical" },
  { term: "ORS", fullFormEn: "Oral Rehydration Salts", fullFormHi: "ओरल रिहाइड्रेशन सॉल्ट", category: "Medical" },
  { term: "OCP", fullFormEn: "Oral Contraceptive Pill", fullFormHi: "मौखिक गर्भनिरोधक गोली", category: "Medical" },
  { term: "PDS", fullFormEn: "Public Distribution System", fullFormHi: "सार्वजनिक वितरण प्रणाली", category: "General" },
  { term: "TBA", fullFormEn: "Traditional Birth Attendant", fullFormHi: "पारंपरिक जन्म परिचारिका (दाई)", category: "Designation" },
  { term: "TB", fullFormEn: "Tuberculosis", fullFormHi: "तपेदिक (टीबी)", category: "Medical" },
  { term: "SAM", fullFormEn: "Severe Acute Malnutrition", fullFormHi: "गंभीर तीव्र कुपोषण", category: "Medical" },
  { term: "MAM", fullFormEn: "Moderate Acute Malnutrition", fullFormHi: "मध्यम तीव्र कुपोषण", category: "Medical" },
  { term: "CDPO", fullFormEn: "Child Development Project Officer", fullFormHi: "बाल विकास परियोजना पदाधिकारी", category: "Designation" },
  { term: "AWW", fullFormEn: "Anganwadi Worker", fullFormHi: "आंगनवाड़ी कार्यकर्ता", category: "Designation" },
  { term: "AWC", fullFormEn: "Anganwadi Centre", fullFormHi: "आंगनवाड़ी केंद्र", category: "Facility" },
];

export function findAbbreviation(query: string): Abbreviation | null {
  const q = query.toLowerCase().trim();
  return abbreviations.find(a => a.term.toLowerCase() === q) || null;
}

export function formatAbbreviationResponse(abb: Abbreviation): string {
  return `📚 **${abb.term} का पूरा नाम**\n\n🇺🇸: ${abb.fullFormEn}\n🇮🇳: ${abb.fullFormHi}\n\n*श्रेणी: ${abb.category}*`;
}
