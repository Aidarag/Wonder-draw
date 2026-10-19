import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { cat1 } from './cat1_psychology.js';
import { cat2 } from './cat2_data.js';
import { cat3 } from './cat3_ai.js';
import { cat4 } from './cat4_space.js';
import { cat5 } from './cat5_religions.js';
import { cat6 } from './cat6_technology.js';
import { cat7 } from './cat7_finance.js';
import { cat8 } from './cat8_business.js';
import { cat9 } from './cat9_philosophy.js';
import { cat10 } from './cat10_society.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const allDescriptions = {
  ...cat1,
  ...cat2,
  ...cat3,
  ...cat4,
  ...cat5,
  ...cat6,
  ...cat7,
  ...cat8,
  ...cat9,
  ...cat10,
};

console.log(`Checking topic descriptions... Total loaded: ${Object.keys(allDescriptions).length}`);

// Validation
let missing = [];
let invalid = [];

for (let id = 1; id <= 1000; id++) {
  const item = allDescriptions[id];
  if (!item) {
    missing.push(id);
    continue;
  }
  if (!item.en || typeof item.en !== 'string' || item.en.trim().length === 0) {
    invalid.push({ id, issue: 'missing or empty EN' });
  }
  if (!item.fr || typeof item.fr !== 'string' || item.fr.trim().length === 0) {
    invalid.push({ id, issue: 'missing or empty FR' });
  }
}

if (missing.length > 0) {
  console.error(`ERROR: Missing ${missing.length} topic IDs:`, missing.slice(0, 10));
  process.exit(1);
}

if (invalid.length > 0) {
  console.error(`ERROR: Found ${invalid.length} invalid topic entries:`, invalid.slice(0, 10));
  process.exit(1);
}

console.log('Verification passed: All 1,000 topics have valid EN and FR descriptions!');

// Check topic 194 specifically
console.log('Topic #194 EN:', allDescriptions[194].en);
console.log('Topic #194 FR:', allDescriptions[194].fr);

// Load original topics.json
const topicsJsonPath = path.join(rootDir, 'data', 'topics.json');
const originalData = JSON.parse(fs.readFileSync(topicsJsonPath, 'utf8'));

// Fresh exciting category descriptions
const categoryDescriptions = {
  'psychology-and-human-behavior': {
    en: "Why do we feel, react, and connect the way we do? 🧠 Dive into the fascinating quirks, habits, and secrets of the human mind.",
    fr: "Pourquoi ressentons-nous et réagissons-nous ainsi ? 🧠 Plongez dans les mystères, les réflexes et les secrets de l'esprit humain."
  },
  'data-and-analytics': {
    en: "How do hidden numbers tell the stories of our world? 📊 Explore the charts, trends, and clues that turn raw data into wisdom.",
    fr: "Comment les chiffres racontent-ils l'histoire du monde ? 📊 Explorez les graphiques et les indices qui transforment les données en révélations."
  },
  'artificial-intelligence': {
    en: "Can silicon and code truly learn, dream, and create? 🤖 Step into the thrilling frontier where machines begin to think alongside us.",
    fr: "Les lignes de code peuvent-elles vraiment apprendre et créer ? 🤖 Explorez la frontière passionnante où les machines s'éveillent."
  },
  'space-and-the-universe': {
    en: "What lies beyond the blue rim of our planet? 🚀 Journey across exploding stars, dark abysses, and cosmic wonders of the night sky.",
    fr: "Qu'y a-t-il au-delà de notre petite planète bleue ? 🚀 Voyagez à travers les étoiles, les trous noirs et les merveilles du cosmos."
  },
  'religions': {
    en: "How have sacred stories, rituals, and music guided human hearts for millennia? 🕊️ Explore the beauty and faiths of world cultures.",
    fr: "Comment les récits sacrés et les rituels ont-ils guidé l'humanité à travers les âges ? 🕊️ Découvrez les sagesses et fois du monde."
  },
  'technology': {
    en: "How do pocket-sized glass slabs talk across oceans in milliseconds? ⚡ Peek under the hood of the inventions reshaping daily life.",
    fr: "Comment un simple écran de verre dialogue-t-il à travers les océans ? ⚡ Découvrez les inventions géniales qui réinventent notre quotidien."
  },
  'finance': {
    en: "How does money move, multiply, and shape civilization? 💰 Master compound growth, smart investing, and freedom without stress.",
    fr: "Comment l'argent circule-t-il et fait-il tourner le monde ? 💰 Découvrez les secrets de l'épargne, de l'investissement et de la liberté."
  },
  'business-and-entrepreneurship': {
    en: "How does a tiny spark of an idea turn into a thriving business? 🚀 Explore the playbooks, bold moves, and grit behind great startups.",
    fr: "Comment une simple idée devient-elle une entreprise qui change la vie de milliers de gens ? 🚀 Découvrez l'aventure entrepreneuriale."
  },
  'spirituality-and-philosophy': {
    en: "What does it mean to live a good, meaningful life? 🌟 Ponder the big questions, timeless wisdom, and peace within yourself.",
    fr: "Que signifie mener une vie pleine de sens et de paix ? 🌟 Explorez les grandes questions existentielles et la quête de sagesse."
  },
  'society-culture-and-identity': {
    en: "What makes each of us unique, and what binds us together across continents? 🌍 Explore identity, belonging, food, and culture.",
    fr: "Qu'est-ce qui rend chacun unique et nous rassemble tous ? 🌍 Explorez les identités, les traditions, les fêtes et le vivre-ensemble."
  }
};

// Update categories
const updatedCategories = originalData.categories.map(cat => {
  const catDesc = categoryDescriptions[cat.id];
  return {
    ...cat,
    guidance: catDesc ? catDesc.en : cat.guidance,
    guidance_fr: catDesc ? catDesc.fr : undefined,
    description: catDesc ? catDesc.en : undefined,
    description_fr: catDesc ? catDesc.fr : undefined
  };
});

// Update topics
const updatedTopics = originalData.topics.map(topic => {
  const desc = allDescriptions[topic.id];
  return {
    ...topic,
    description: desc.en,
    description_fr: desc.fr,
    description_en: desc.en,
    guidance: desc.en,
    guidance_fr: desc.fr
  };
});

const updatedData = {
  categories: updatedCategories,
  topics: updatedTopics
};

// Write updated data/topics.json
fs.writeFileSync(topicsJsonPath, JSON.stringify(updatedData, null, 2), 'utf8');
console.log(`Updated ${topicsJsonPath} successfully!`);

// Write updated data/topics.js
const topicsJsPath = path.join(rootDir, 'data', 'topics.js');
const jsContent = `export const TOPICS_DATA = ${JSON.stringify(updatedData)};\n`;
fs.writeFileSync(topicsJsPath, jsContent, 'utf8');
console.log(`Updated ${topicsJsPath} successfully!`);

console.log('Build completed successfully.');
