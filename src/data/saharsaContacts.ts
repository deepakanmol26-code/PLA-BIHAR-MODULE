// Saharsa District Health Officers Contact Directory

export interface HealthOfficer {
  name: string;
  designation: string;
  phone: string;
  altPhone?: string;
  email: string;
}

export interface BlockContacts {
  block: string;
  officers: HealthOfficer[];
}

export const saharsaContacts: BlockContacts[] = [
  {
    block: "Mahishi",
    officers: [
      { name: "Dr. Ramadhar Singh", designation: "MOIC", phone: "9470003670", email: "chc.mahisi@rediffmail.com" },
      { name: "Md. Afjal Hussain", designation: "BHM", phone: "8809095353", email: "mailtoafjal@gmail.com" },
      { name: "Abhishek Kumar", designation: "BCM", phone: "7991186177", email: "aayush.adarsh@gmail.com" },
      { name: "Dilip Kumar Dinkar", designation: "IC BMNE", phone: "9939219513", email: "dilipkumar080@gmail.com" },
      { name: "Munna Kumar", designation: "BAM", phone: "8408261988", email: "mk698314@gmail.com" },
    ],
  },
  {
    block: "Saur Bazar",
    officers: [
      { name: "Dr. Amit Kumar", designation: "MOIC", phone: "9470003673", email: "saurbazar@rediffmail.com" },
      { name: "Parikshit Kumar", designation: "BHM", phone: "9835048949", email: "parikshitkumar1970@rediffmail.com" },
      { name: "Parmila Rai", designation: "BCM", phone: "8969959436", email: "pramila.nov79@gmail.com" },
      { name: "Dilip Kumar Dinkar", designation: "BMNE", phone: "9939219513", email: "dilipkumar080@gmail.com" },
      { name: "Niraj Kumar Singh", designation: "BAM", phone: "9430244300", email: "niraj_singh1982@live.com" },
    ],
  },
  {
    block: "Satar Kataiya",
    officers: [
      { name: "Dr. Dilip Kumar", designation: "MOIC", phone: "9470003674", email: "panchgachhia@rediffmail.com" },
      { name: "Raj Kumar", designation: "BHM", phone: "8298583151", email: "singh.cool.raj@gmail.com" },
      { name: "Vijay Kumar", designation: "BCM", phone: "8051572565", email: "vijay.kr14supaul@gmail.com" },
      { name: "Sushanshu Kumar Sharma", designation: "BMNE", phone: "9939488276", email: "s.sharma022@gmail.com" },
      { name: "Mukesh Ranjan", designation: "BAM", phone: "7870269593", email: "mukeshranjan141083@rediff.com" },
    ],
  },
  {
    block: "Nauhatta",
    officers: [
      { name: "Dr. Birendra Kumar", designation: "MOIC", phone: "9470003671", email: "nauhatta@rediffmail.com" },
      { name: "Md. Makhdoom Ashraf", designation: "IC BHM", phone: "9973480501", email: "ashraf.997348@gmail.com" },
      { name: "Md. Makhdoom Ashraf", designation: "BCM", phone: "9973480501", email: "ashraf.997378@gmail.com" },
      { name: "Bedanand Paswan", designation: "BMNE", phone: "9523753151", email: "badanandpaswan1980@gmail.com" },
      { name: "Rajkumar", designation: "BAM", phone: "9939098067", email: "rajkumarsharmasaharsa@gmail.com" },
    ],
  },
  {
    block: "Sonbarsa",
    officers: [
      { name: "Dr. Laxman Kumar", designation: "MOIC", phone: "9470003667", email: "sonbarsa_raj@rediffmail.com" },
      { name: "Amit Kumar Chanchal", designation: "BHM", phone: "7004017676", email: "amitchanchal001@gmail.com" },
      { name: "Vinod Kumar", designation: "BCM", phone: "8544422974", email: "vinod1993bth@gmail.com" },
      { name: "Milan Kumar", designation: "BMNE", phone: "7631456850", email: "milanjee87@gmail.com" },
      { name: "Abhishek Kumar", designation: "BAM", phone: "7004055312", email: "abhiphc07@gmail.com" },
    ],
  },
  {
    block: "Patarghat",
    officers: [
      { name: "Dr. Babita Kumari", designation: "MOIC", phone: "9470003666", email: "patarghatphc1@gmail.com" },
      { name: "Raman Kumar", designation: "BHM", phone: "9472180294", email: "ramanraj989@gmail.com" },
      { name: "Rahul Kumar", designation: "BCM", phone: "7903662195", email: "rahulpavency92@gmail.com" },
      { name: "Dinu Kumar", designation: "BMNE", phone: "7903662195", email: "dinumariya@gmail.com" },
      { name: "Mithilesh Kumar Rai", designation: "BAM", phone: "9549413755", email: "mithileshkumarrai11@gmail.com" },
    ],
  },
  {
    block: "Salkhua",
    officers: [
      { name: "Dr. Anil Kumar Singh", designation: "MOIC", phone: "9470003677", email: "salkhua@rediffmail.com" },
      { name: "Sanjeev Kumar Singh", designation: "BHM", phone: "7870350215", email: "salkhua@rediffmail.com" },
      { name: "Shyam Kumar Ram", designation: "BCM", phone: "9155000340", email: "shyam020190@gmail.com" },
      { name: "Sujeet Kumar", designation: "BMNE", phone: "8002961562", email: "sujitkumar.kumar100@gmail.com" },
      { name: "Abhishek Kumar", designation: "BAM", phone: "9525451404", email: "vipabhisheksingh@gmail.com" },
    ],
  },
  {
    block: "Simri Bakhtiyarpur",
    officers: [
      { name: "Dr. Ashish Kumar", designation: "MOIC", phone: "9470003663", email: "simri-bakhtiyarpur@rediffmail.com" },
      { name: "Mahboob Alam", designation: "BHM", phone: "9386491616", email: "mahboobalam27@gmail.com" },
      { name: "Qmar Jhan", designation: "BCM", phone: "8709116879", email: "quamarjahan04@gmail.com" },
      { name: "Ashwani Kumari", designation: "BMNE", phone: "9709808089", email: "ashwani.banma@gmail.com" },
      { name: "Dinesh Kumar", designation: "BAM", phone: "9525451404", email: "dineshbam1984@gmail.com" },
    ],
  },
  {
    block: "Banma Itarhi",
    officers: [
      { name: "Dr. Santosh Sant", designation: "MOIC", phone: "9771719009", altPhone: "9470003967", email: "banmma@rediffmail.com" },
      { name: "Ravi Khan", designation: "BHM", phone: "6203428374", email: "khanravi@gmail.com" },
      { name: "Satish Kumar", designation: "BCM", phone: "8544422972", email: "banmma@rediffmail.com" },
      { name: "Ashwani Kumar", designation: "IC BMNE", phone: "9709808089", email: "banmma@rediffmail.com" },
      { name: "Dinesh Kumar", designation: "IC BAM", phone: "9334191361", email: "dineshbam1984@gmail.com" },
    ],
  },
  {
    block: "Kahara",
    officers: [
      { name: "Dr. A K Gupta", designation: "MOIC", phone: "9308506085", altPhone: "9470003672", email: "Kahra@rediffmail.com" },
      { name: "Om Prakash", designation: "BHM", phone: "8409779623", email: "kahra@rediffmail.com" },
      { name: "Kavita Kumari", designation: "BCM", phone: "8789021557", email: "kahra@rediffmail.com" },
      { name: "Rashmi Kumari", designation: "BMNE", phone: "8271911518", email: "kahra@rediffmail.com" },
      { name: "Kesav Kumar", designation: "BAM", phone: "9570338542", email: "jhakeshav308@gmail.com" },
    ],
  },
];

// Get all block names for matching
export const blockNames = saharsaContacts.map(b => b.block.toLowerCase());

// Find block contacts by name (fuzzy)
export function findBlockContacts(query: string): BlockContacts | undefined {
  const q = query.toLowerCase().trim();
  return saharsaContacts.find(b => {
    const bLower = b.block.toLowerCase();
    return bLower.includes(q) || q.includes(bLower) || 
           // Handle Hindi/alternate spellings
           (bLower === "kahara" && (q.includes("kahra") || q.includes("कहरा"))) ||
           (bLower === "mahishi" && (q.includes("mahisi") || q.includes("महिषी"))) ||
           (bLower === "nauhatta" && (q.includes("नौहट्टा") || q.includes("nauhatta"))) ||
           (bLower === "sonbarsa" && (q.includes("सोनबरसा") || q.includes("sonbarsa"))) ||
           (bLower === "patarghat" && (q.includes("पत्तरघाट") || q.includes("pattarghat"))) ||
           (bLower === "salkhua" && (q.includes("सलखुआ") || q.includes("salkhua"))) ||
           (bLower === "simri bakhtiyarpur" && (q.includes("सिमरी") || q.includes("simri"))) ||
           (bLower === "banma itarhi" && (q.includes("बनमा") || q.includes("banma"))) ||
           (bLower === "saur bazar" && (q.includes("सौर") || q.includes("saur"))) ||
           (bLower === "satar kataiya" && (q.includes("सतार") || q.includes("satar") || q.includes("panchgachia") || q.includes("पंचगछिया")));
  });
}

// Format block contacts as chat response text
export function formatBlockContacts(block: BlockContacts): string {
  let text = `📍 **${block.block} ब्लॉक — सहरसा जिला**\n\n`;
  text += `स्वास्थ्य अधिकारी संपर्क सूची:\n\n`;
  
  for (const officer of block.officers) {
    text += `👤 **${officer.name}**\n`;
    text += `   📋 ${officer.designation}\n`;
    text += `   📞 ${officer.phone}`;
    if (officer.altPhone) text += ` / ${officer.altPhone}`;
    text += `\n   ✉️ ${officer.email}\n\n`;
  }

  text += `---\n🚑 **आपातकाल:** 108 | 🤰 **जननी:** 102 | 🏥 **हेल्पलाइन:** 104`;
  return text;
}

// List all blocks
export function formatAllBlocks(): string {
  let text = `📍 **सहरसा जिला — सभी ब्लॉक**\n\n`;
  text += `किस ब्लॉक की जानकारी चाहिए? ब्लॉक का नाम लिखें:\n\n`;
  
  saharsaContacts.forEach((b, i) => {
    text += `${i + 1}. 🏥 **${b.block}** — MOIC: ${b.officers[0].name} (📞 ${b.officers[0].phone})\n`;
  });

  text += `\n👉 उदाहरण: "Mahishi contact" या "नौहट्टा नंबर"`;
  return text;
}
