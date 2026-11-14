/**
 * ============================================================================
 * GOLDEN DAYS — MEMBER DATA & STORAGE ENGINE (members.js)
 * ============================================================================
 * Updated with your 10 Golden Days Inner Circle Members & Custom Bios!
 */

const STORAGE_KEY = "golden_days_members_v1";

// Automatic Royal Gold Monogram Fallback (jab tak aap DP upload nahi karte)
function createFallbackDP(name = "GD") {
  const clean = name.replace(/[^a-zA-Z0-9\s]/g, "").trim();
  const initials = clean
    .split(/\s+/)
    .map(word => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase() || "GD";

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
      <defs>
        <radialGradient id="bg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stop-color="#1e1910"/>
          <stop offset="100%" stop-color="#070707"/>
        </radialGradient>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F7E29C"/>
          <stop offset="50%" stop-color="#D4AF37"/>
          <stop offset="100%" stop-color="#997A15"/>
        </linearGradient>
      </defs>
      <rect width="600" height="600" fill="url(#bg)"/>
      <circle cx="300" cy="300" r="245" fill="none" stroke="url(#gold)" stroke-width="3" stroke-opacity="0.45"/>
      <circle cx="300" cy="300" r="228" fill="none" stroke="url(#gold)" stroke-width="1" stroke-dasharray="6 8" stroke-opacity="0.35"/>
      <text x="300" y="330" font-family="Georgia, serif" font-size="145" font-weight="bold" fill="url(#gold)" text-anchor="middle" letter-spacing="6">${initials}</text>
      <text x="300" y="405" font-family="sans-serif" font-size="18" fill="#D4AF37" fill-opacity="0.7" text-anchor="middle" letter-spacing="8">GOLDEN DAYS</text>
    </svg>
  `.trim();

  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

// Aapke 10 Original Group Members
const DEFAULT_MEMBERS = [
  {
    id: "m-01",
    name: "Subki Fav Bachi",
    username: "subkifavbachihu",
    avatar: "assets/member-01.jpg",
    bio: "The undisputed heart and charm of Golden Days. Her vibe turns ordinary group chats into unforgettable memories, and honestly, the title says it all—truly everyone's favorite."
  },
  {
    id: "m-02",
    name: "Killar Prince",
    username: "killar_prince_0703",
    avatar: "assets/member-02.jpg",
    bio: "Royalty in attitude and loyalty in friendship. Always arrives with unmatched aura, bold energy, and stands solid with the circle no matter what."
  },
  {
    id: "m-03",
    name: "Mystery Soul 07",
    username: "_.3122007",
    avatar: "assets/member-03.jpg",
    bio: "A rare blend of calm mystery and sharp wit. Speaks less, observes everything, and drops the most iconic lines when nobody expects it."
  },
  {
    id: "m-04",
    name: "Tabish",
    username: "tabish_hoon",
    avatar: "assets/member-04.jpg",
    bio: "Pure authenticity with zero filters. Whether it is midnight laughs, real talk, or keeping the brotherhood alive, Tabish brings effortless warmth to every conversation."
  },
  {
    id: "m-05",
    name: "Mr. Pandey",
    username: "mr.pandey_2208",
    avatar: "assets/member-05.jpg",
    bio: "The pillar of wisdom, humor, and legendary comebacks. Always ready with solid advice and the kind of loyalty that defines true family."
  },
  {
    id: "m-06",
    name: "Noof",
    username: "noof.lex__",
    avatar: "assets/member-06.jpg",
    bio: "Effortlessly stylish with an unmatched aesthetic sense. Brings cool composure, sharp humor, and signature energy that elevates the entire squad."
  },
  {
    id: "m-07",
    name: "Pandit Girl",
    username: "itzz_pandit_girl1771",
    avatar: "assets/member-07.jpg",
    bio: "Grace mixed with fearless confidence. Brightens up the dullest days with her expressive energy, quick wit, and genuine care for the circle."
  },
  {
    id: "m-08",
    name: "Garveet Arora",
    username: "garveet_arora_",
    avatar: "assets/member-08.jpg",
    bio: "The spark that keeps the momentum going. Always brings positive vibes, great humor, and turns every casual hangout into a golden memory."
  },
  {
    id: "m-09",
    name: "Titili",
    username: "titili7011",
    avatar: "assets/member-09.jpg",
    bio: "Free-spirited, vibrant, and full of life. Like her name, she brings color, warmth, and effortless joy wherever she goes in this group."
  },
  {
    id: "m-10",
    name: "Saana",
    username: "saanaakh.___",
    avatar: "assets/member-10.jpg",
    bio: "Elegance with a golden heart. Thoughtful, expressive, and someone who makes every member feel valued—a true gem of the Golden Days family."
  }
];

// Global Data API
window.GoldenDaysStore = {
  getMembers() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn("Could not read localStorage, falling back to default members.", err);
    }
    return [...DEFAULT_MEMBERS];
  },

  saveMembers(membersArray) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(membersArray));
  },

  resetToDefaults() {
    localStorage.removeItem(STORAGE_KEY);
    return [...DEFAULT_MEMBERS];
  },

  sanitizeUsername(raw) {
    return String(raw || "").trim().replace(/^@+/, "");
  }
};
