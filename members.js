/**
 * ============================================================================
 * GOLDEN DAYS — MEMBER DATA & STORAGE ENGINE (members.js)
 * ============================================================================
 * Updated with 16 Members (Aryan 1st, Tanya 2nd, Nora, Amit, Pavitra papi & others)
 */

const STORAGE_KEY = "golden_days_members_v6";

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

const DEFAULT_MEMBERS = [
  {
    id: "m-01",
    name: "Aryan",
    username: "1nd_mp48",
    avatar: "member-01.jpg",
    bio: "Golden Days ke mastermind aur group ke sabse main sadasya. Inke bina yeh group aur website dono adhoore hain—pura squad inhi ke dum par chalta hai!"
  },
  {
    id: "m-02",
    name: "Tanya",
    username: "saanaakh.___",
    avatar: "member-02.jpg",
    bio: "Group ki sabse badi mazaakiya aur natkhat soul! Har waqt sabke sath hasi-mazak karna aur sabki taang kheechhna inka roz ka kaam hai, inke bina chat mein rang hi nahi aata."
  },
  {
    id: "m-03",
    name: "Subki Fav Bachi",
    username: "subkifavbachihu",
    avatar: "member-03.jpg",
    bio: "Group ki sabse pyari bachi, jinki cute baatein aur sweet vibe poore chat box ka mood ek second mein bright kar deti hain."
  },
  {
    id: "m-04",
    name: "Killar Prince",
    username: "killar_prince_0703",
    avatar: "member-04.jpg",
    bio: "Naam mein hi Prince hai toh style toh royal hoga hi! Group ke fearless aur shandaar sadasya jo har mauke par dosto ke liye khade rehte hain."
  },
  {
    id: "m-05",
    name: "Mystery Soul",
    username: "_.3122007",
    avatar: "member-05.jpg",
    bio: "Kam bolte hain lekin jab bolte hain toh seedha dil par asar hota hai. Group ke mysterious aur sabse smart khiladi."
  },
  {
    id: "m-06",
    name: "Tabish",
    username: "tabish_hoon",
    avatar: "member-06.jpg",
    bio: "Ekdum real aur unfiltered bande! Dosti ho ya late-night bakchodi, Tabish ka support hamesha pakka hota hai."
  },
  {
    id: "m-07",
    name: "Mr. Pandey",
    username: "mr.pandey_2208",
    avatar: "member-07.jpg",
    bio: "Group ke gyani baba aur sabse dangerous comebacks dene wale insaan. Inki baaton mein mazaak bhi hota hai aur samajhdari bhi."
  },
  {
    id: "m-08",
    name: "Pavitra papi(shaurya)",
    username: "noof.lex__",
    avatar: "member-08.jpg",
    bio: "Aesthetic queen with cool vibes. Chat mein jab bhi aati hain, ek alag hi classy aur shandar mahaul ban jata hai."
  },
  {
    id: "m-09",
    name: "Pandit Girl",
    username: "itzz_pandit_girl1771",
    avatar: "member-09.jpg",
    bio: "Confidence aur cuteness ka perfect mix. Group ki shaan jo har cheez mein aage rehti hain."
  },
  {
    id: "m-10",
    name: "Garveet Arora",
    username: "garveet_arora_",
    avatar: "member-10.jpg",
    bio: "Hamesha high energy aur positive vibe ke sath rehne wale bande. Inke hone se group mein kabhi sannata nahi hota."
  },
  {
    id: "m-11",
    name: "Titili",
    username: "titili7011",
    avatar: "member-11.jpg",
    bio: "Titili ki tarah yaha se wahan phudakne wali aur sabke chehre par muskan laane wali group ki jaan."
  },
  {
    id: "m-12",
    name: "Faizu",
    username: "_btw.faizuuu_",
    avatar: "member-12.jpg",
    bio: "Desi style aur swag ke sath group ki raunak badhane wale Faizu bhai. Inki entry hi kaafi hoti hai."
  },
  {
    id: "m-13",
    name: "Besharam Babu",
    username: "besharam_babu__",
    avatar: "member-13.jpg",
    bio: "Naam besharam hai par dil ke ekdum sachedaar! Inke mazaak aur memes ke bina group adhoora lagta hai."
  },
  {
    id: "m-14",
    name: "Mahakal Angad",
    username: "___mahakal___angad___",
    avatar: "member-14.jpg",
    bio: "Mahakal ke bhakt aur dosti ke liye jaan dene wale. Shandaar personality ke malik jo sabko jod kar rakhte hain."
  },
  {
    id: "m-15",
    name: "Nora",
    username: "luv.2.vanish",
    avatar: "member-15.jpg",
    bio: "Group ki charming aur unique personality, jinki presence se poora conversation lively aur memorable ho jata hai."
  },
  {
    id: "m-16",
    name: "Amit",
    username: "cutie__one_____",
    avatar: "member-16.jpg",
    bio: "Cutieone wale Amit bhai, jo apne mast mazaak aur solid dosti se group ki har shaam ko shandar bana dete hain."
  }
];

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
