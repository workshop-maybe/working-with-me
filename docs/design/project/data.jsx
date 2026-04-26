// Shared sample data — six real-feeling Assignments + connections + commitments.
// Used across all three landing variations.

const PEOPLE = [
  { handle: "mira",    name: "Mira Okafor",       role: "Independent researcher", where: "Lagos · remote",  hue: "#1A4856" },
  { handle: "tomas",   name: "Tomás Ribeiro",     role: "Protocol engineer",      where: "São Paulo",       hue: "#4A6C30" },
  { handle: "aiyana",  name: "Aiyana Whitehorse", role: "Designer + writer",      where: "Santa Fe",        hue: "#8B3A3A" },
  { handle: "kenji",   name: "Kenji Park",        role: "Founder, two-person studio", where: "Seoul",       hue: "#2E5266" },
  { handle: "hannah",  name: "Hannah Lindqvist",  role: "Climate technologist",   where: "Stockholm",       hue: "#5C4A8C" },
  { handle: "diego",   name: "Diego Saavedra",    role: "Composer",               where: "Mexico City",     hue: "#A85C32" },
];

const ASSIGNMENTS = [
  {
    id: "wwm-001",
    author: PEOPLE[0],
    title: "Mapping informal credit networks in West African markets",
    summary: "Six-month fieldwork project. Looking for a collaborator who can read survey data with me and translate findings for a policy audience.",
    body: "I run a small research practice. The current project is fieldwork I am doing in three Lagos markets. I do not want a research assistant. I want one person who has read at least two papers in this area and is willing to push back on my methodology.",
    pref: "Async first. Long blocks of writing time. No standing meetings.",
    tags: ["Research", "Field data", "Policy"],
    open: 4,
    commitments: 14,
    posted: "2 days ago",
  },
  {
    id: "wwm-002",
    author: PEOPLE[1],
    title: "Verifiable supply-chain attestations on Cardano",
    summary: "Eight weeks. Open source. I want one collaborator who has shipped audited contracts before. We finish a v0.1 or we don't ship.",
    body: "Hard deadline, hard scope. Two audited contracts from you. One pair-programming session a week. We demo every Friday or we re-plan.",
    pref: "Pair sessions. Weekly demo. Time-boxed.",
    tags: ["Cardano", "Plutus", "Open source"],
    open: 2,
    commitments: 9,
    posted: "5 hours ago",
  },
  {
    id: "wwm-003",
    author: PEOPLE[2],
    title: "A field guide to the language of land-back agreements",
    summary: "Print and web. A long manuscript, eighteen months. Looking for a researcher and a translator who can sit with primary sources.",
    body: "I write, you push back, we ship a beautiful book. Not a journal article. A book you would want to hold.",
    pref: "Long letters. Monthly call. No Slack.",
    tags: ["Editorial", "Indigenous", "Print"],
    open: 3,
    commitments: 22,
    posted: "1 week ago",
  },
  {
    id: "wwm-004",
    author: PEOPLE[3],
    title: "Spinning out a stand-alone product from our consultancy",
    summary: "Working prototype, ten paying users, real choice to make. Need a founder-mode collaborator who has done this transition before.",
    body: "We have the team but not the experience. Looking for one person who has spun a product out of services work and lived through year two.",
    pref: "Two calls a week. Share the cap table early.",
    tags: ["Founders", "Product", "Strategy"],
    open: 1,
    commitments: 6,
    posted: "3 days ago",
  },
  {
    id: "wwm-005",
    author: PEOPLE[4],
    title: "Soil carbon measurement that smallholders can afford",
    summary: "Hardware plus protocol. Soil scientists in place. Need a hardware lead and a regulatory writer who has worked with EU agencies.",
    body: "Two-year horizon, paid. The hard problem is not the science. The hard problem is the price. The thing has to cost what a coop can pay.",
    pref: "Mixed remote and quarterly in-person.",
    tags: ["Climate", "Hardware", "EU policy"],
    open: 5,
    commitments: 31,
    posted: "12 hours ago",
  },
  {
    id: "wwm-006",
    author: PEOPLE[5],
    title: "Scoring a documentary about northern-Mexican corridos",
    summary: "Six months. I am the composer. I need a music supervisor and an archivist who knows the regional record labels of the 1980s.",
    body: "Real budget. Real footage. Real archives in Saltillo and Monterrey. You will spend at least two weeks on the ground.",
    pref: "Field trips. Long voice memos. Trust.",
    tags: ["Music", "Documentary", "Archive"],
    open: 2,
    commitments: 11,
    posted: "4 days ago",
  },
];

const CONNECTIONS = [
  { a: PEOPLE[1], b: PEOPLE[4], asn: "soil carbon measurement", t: "yesterday" },
  { a: PEOPLE[3], b: PEOPLE[0], asn: "informal credit networks",  t: "2 days ago" },
  { a: PEOPLE[2], b: PEOPLE[5], asn: "corridos documentary score", t: "5 days ago" },
  { a: PEOPLE[4], b: PEOPLE[1], asn: "supply-chain attestations",  t: "1 week ago" },
];

const COMMITMENTS_INBOX = [
  { from: { name: "Ada Karim", handle: "ada.k" },     msg: "Independent econ researcher, ex-IFC, three years in West Africa. I read your fieldwork on Aba market lending in 2024.", interest: true, t: "12 min ago" },
  { from: { name: "Patrick Olu", handle: "patrick.o" }, msg: "Survey-design background. I'd like to commit two hours a week on the data side. I would prefer async.", interest: true, t: "1 hour ago" },
  { from: { name: "Saoirse Kelly", handle: "saoirse.k" }, msg: "Translator, English/Yoruba. Willing to help with policy framing.", interest: true, t: "yesterday" },
];

const FAQ = [
  { q: "What does it cost?", a: "Free to read. Free to post. Free to commit. The protocol covers chain fees." },
  { q: "Do I need a wallet?", a: "Reading is open. Posting and committing both need a Cardano wallet. Connect once and it remembers you." },
  { q: "Who sees my Commitment?", a: "Only the author of the Assignment. The connection that follows is public; the letter that earned it stays between you." },
  { q: "Can a Connection be revoked?", a: "No. Once issued, the credential lives in the recipient's wallet. The connection it names cannot be unmade." },
  { q: "What does a Connection unlock?", a: "Each author can write a private companion to their Assignment that only their connections can read. The connection is also portable to other apps." },
  { q: "Is this a marketplace?", a: "No. There are no listings, no rates, no platform fees. Just docs, replies, and the connections that follow." },
];

window.WWM = { PEOPLE, ASSIGNMENTS, CONNECTIONS, COMMITMENTS_INBOX, FAQ };
