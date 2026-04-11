// Saharsa District Health Facility Locations — Google Maps Place IDs

export interface HealthFacility {
  name: string;
  block: string;
  category: "Hospital" | "Medical Center" | "Government office";
  rating: number;
  placeId: string;
  mapsUrl: string;
}

export const healthFacilities: HealthFacility[] = [
  // District Headquarters
  {
    name: "Sadar Hospital",
    block: "Saharsa HQ",
    category: "Hospital",
    rating: 3.2,
    placeId: "ChIJzeKma_I97jkRTFSFuuzwWqc",
    mapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJzeKma_I97jkRTFSFuuzwWqc",
  },
  {
    name: "District Health Society",
    block: "Saharsa HQ",
    category: "Hospital",
    rating: 2.5,
    placeId: "ChIJ_2j9lfM97jkRobz6taSMH8o",
    mapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJ_2j9lfM97jkRobz6taSMH8o",
  },

  // CHCs & PHCs by Block
  {
    name: "PHC Mahishi",
    block: "Mahishi",
    category: "Hospital",
    rating: 3.4,
    placeId: "ChIJCz5YMeMQ7jkRODtM19sH_i4",
    mapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJCz5YMeMQ7jkRODtM19sH_i4",
  },
  {
    name: "Block Office, Nauhatta",
    block: "Nauhatta",
    category: "Government office",
    rating: 4.4,
    placeId: "ChIJ11EOQgAT7jkR_1TYu_L47kc",
    mapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJ11EOQgAT7jkR_1TYu_L47kc",
  },
  {
    name: "Salkhua PHC",
    block: "Salkhua",
    category: "Hospital",
    rating: 4.2,
    placeId: "ChIJLSxLqzYg7jkRiUZqzg6F1AA",
    mapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJLSxLqzYg7jkRiUZqzg6F1AA",
  },
  {
    name: "CHC Saurbazaar",
    block: "Saur Bazar",
    category: "Hospital",
    rating: 4.4,
    placeId: "ChIJyTvL6Wo77jkRcMrEBPo69QA",
    mapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJyTvL6Wo77jkRcMrEBPo69QA",
  },
  {
    name: "Hospital PHC Banma",
    block: "Banma Itarhi",
    category: "Hospital",
    rating: 5.0,
    placeId: "ChIJo0NaOAAh7jkR_kKZZSlIIgg",
    mapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJo0NaOAAh7jkR_kKZZSlIIgg",
  },
  {
    name: "Bariyahi PHC",
    block: "Kahara / Satar Kataiya",
    category: "Hospital",
    rating: 5.0,
    placeId: "ChIJCUrI7zYX7jkR1lVUeoC5k_Q",
    mapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJCUrI7zYX7jkR1lVUeoC5k_Q",
  },
  {
    name: "PHC Panchgachhiya",
    block: "Satar Kataiya",
    category: "Hospital",
    rating: 3.9,
    placeId: "ChIJIyjLjRIV7jkRclMkrsvwXNg",
    mapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJIyjLjRIV7jkRclMkrsvwXNg",
  },
  {
    name: "Primary Health Center, Patarghat",
    block: "Patarghat",
    category: "Government office",
    rating: 4.0,
    placeId: "ChIJOSkv-8Iv7jkRmL3GDrIV8Qk",
    mapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJOSkv-8Iv7jkRmL3GDrIV8Qk",
  },
  {
    name: "Sub-divisional Hospital, Simri Bakhtiyarpur",
    block: "Simri Bakhtiyarpur",
    category: "Medical Center",
    rating: 3.5,
    placeId: "ChIJK7eIEAQi7jkRWrTqBsz63LM",
    mapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJK7eIEAQi7jkRWrTqBsz63LM",
  },
  {
    name: "PHC Sonbarsa",
    block: "Sonbarsa",
    category: "Hospital",
    rating: 5.0,
    placeId: "ChIJMzxqbQAn7jkRQWjydTJkKUE",
    mapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJMzxqbQAn7jkRQWjydTJkKUE",
  },
];

// Find facilities by block name
export function findFacilitiesByBlock(query: string): HealthFacility[] {
  const q = query.toLowerCase().trim();
  return healthFacilities.filter(f => {
    const bLower = f.block.toLowerCase();
    return bLower.includes(q) || q.includes(bLower) ||
      f.name.toLowerCase().includes(q);
  });
}

// Format facility for chatbot
export function formatFacilityResponse(facilities: HealthFacility[]): string {
  if (facilities.length === 0) return "";
  let text = `🏥 **स्वास्थ्य सुविधाएं — सहरसा जिला**\n\n`;
  for (const f of facilities) {
    const stars = "⭐".repeat(Math.round(f.rating));
    text += `🏥 **${f.name}**\n`;
    text += `   📍 ${f.block}\n`;
    text += `   ${stars} ${f.rating}/5\n`;
    text += `   🗺️ [Google Maps पर देखें](${f.mapsUrl})\n\n`;
  }
  text += `---\n🚑 **एम्बुलेंस:** 108 | 🤰 **जननी:** 102`;
  return text;
}

// Format all facilities
export function formatAllFacilities(): string {
  let text = `🏥 **सहरसा जिला — सभी स्वास्थ्य सुविधाएं**\n\n`;

  // HQ first
  const hq = healthFacilities.filter(f => f.block === "Saharsa HQ");
  if (hq.length) {
    text += `🏛️ **जिला मुख्यालय:**\n`;
    hq.forEach(f => {
      text += `  • ${f.name} ⭐${f.rating} — [Maps](${f.mapsUrl})\n`;
    });
    text += `\n`;
  }

  // Block-wise
  const blocks = healthFacilities.filter(f => f.block !== "Saharsa HQ");
  text += `🏥 **ब्लॉक PHC/CHC:**\n`;
  blocks.forEach(f => {
    text += `  • **${f.block}:** ${f.name} ⭐${f.rating} — [Maps](${f.mapsUrl})\n`;
  });

  text += `\n👉 किसी ब्लॉक का नाम लिखें: "Mahishi hospital" या "Sonbarsa PHC"`;
  return text;
}
