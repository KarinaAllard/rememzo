// seed.ts is a development helper to populate the DB with placeholder items and templates for testing the generator. Not used in production.
import dotenv from "dotenv";
import mongoose from "mongoose";
import ItemsLibrary from "./models/ItemsLibrary";
import SceneTemplate from "./models/SceneTemplates";
import QuestionsLibrary from "./models/QuestionsLibrary";

dotenv.config();

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/rememzo";

async function seed() {
  try {
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB connected");

    // --- CLEAR OLD LIBRARY DATA ---
    await ItemsLibrary.deleteMany({});
    await SceneTemplate.deleteMany({});
    await QuestionsLibrary.deleteMany({});
    console.log("🧹 Cleared existing library collections");

    // --- SEED ITEMS ---
    const itemsToInsert = [
          {
        name: "Cup",
        type: "cups",
        variations: ["coffee", "empty", "tea", "messy"],
        states: ["default"],
        artRef: ["cup-coffee.png", "cup-empty.png", "cup-tea.png", "cup-coffee-messy.png"],
        translations: {
            en: { base: "Cup", indefinite: "a cup", definite: "the cup" },
            sv: { base: "Kopp", indefinite: "en kopp", definite: "koppen" }
        }
      },
      {
        name: "Plate",
        type: "plates",
        variations: ["broken", "dirty", "empty", "crumbs", "one-cookie", "one-half-cookie"],
        states: ["default"],
        artRef: [
          "plate-broken.png",
          "plate-dirty.png",
          "plate-empty.png",
          "plate-crumbs.png",
          "plate-one-cookie.png",
          "plate-one-cookie-bitten.png",
        ],
        translations: {
            en: { base: "Plate", indefinite: "a plate", definite: "the plate" },
            sv: { base: "Tallrik", indefinite: "en tallrik", definite: "tallriken" }
        }
      },
      {
        name: "Curtains",
        type: "curtains",
        variations: ["open", "closed"],
        states: ["open", "closed"],
        artRef: ["curtains-open.png", "curtains-closed.png"],
        translations: {
            en: { base: "Curtains", indefinite: "some curtains", definite: "the curtains" },
            sv: { base: "Gardiner", indefinite: "gardiner", definite: "gardinerna" }
        },
        questionTemplate: { en: "Were the {name:definite} {state}?", sv: "Var {name:definite} {state}?" },
        stateTranslations: {
            en: { open: "open", closed: "closed" },
            sv: { open: "öppna", closed: "stängda" }
        }
      },
      {
        name: "Plant",
        type: "plants",
        variations: ["alive", "dead", "pot-empty"],
        states: ["default"],
        artRef: ["flower.png", "flower-dead.png", "flower-pot-empty.png"],
        translations: {
            en: { base: "Flower", indefinite: "a flower", definite: "the flower" },
            sv: { base: "Blomma", indefinite: "en blomma", definite: "blomman" }
        }
      },
      {
        name: "Fruit Bowl",
        type: "fruit-bowls",
        variations: ["full", "empty"],
        states: ["full", "empty"],
        artRef: ["fruit-bowl-full.png", "fruit-bowl-empty.png"],
        translations: {
            en: { base: "Fruit Bowl", indefinite: "a fruit bowl", definite: "the fruit bowl" },
            sv: { base: "Fruktskål", indefinite: "en fruktskål", definite: "fruktskålen" }
        },
        stateTranslations: {
            en: { full: "full", empty: "empty" },
            sv: { full: "full", empty: "tom" }
        }
      },
      {
        name: "TV",
        type: "tvs",
        variations: ["off", "news", "weather", "game", "static"],
        states: ["off", "news", "weather", "game", "static"],
        artRef: ["tv-off.png", "tv-news.png", "tv-weather.png", "tv-game.png", "tv-static.png"],
        translations: {
            en: { base: "TV", indefinite: "a TV", definite: "the TV" },
            sv: { base: "TV", indefinite: "en TV", definite: "TV:n" }
        },
        questionTemplate: { en: "What was on the {name:definite}?", sv: "Vad var på {name:definite}?" },
        stateTranslations: {
            en: { off: "off", news: "news", weather: "weather", game: "video game", static: "static" },
            sv: { off: "av", news: "nyheter", weather: "väder", game: "TV-spel", static: "statisk" }
        }
      },
      {
        name: "Empty",
        type: "empty",
        variations: ["empty"],
        states: ["empty"],
        artRef: ["transparent.png"],
        translations: {
            en: { base: "Empty", indefinite: "empty", definite: "the empty" },
            sv: { base: "Tom", indefinite: "tom", definite: "den tomma" }
        }
      },
    ];

    const items = await ItemsLibrary.insertMany(itemsToInsert);
    console.log(`🌱 Seeded ${items.length} items`);

    // --- SEED SCENE TEMPLATES ---
    const templatesToInsert = [
      {
        name: "Scene 1",
        backgroundRef: "scene-1.png",
        maxItems: 6,
        slots: [
          { index: 0, x: 560, y: 545, allowedTypes: ["cups"] },
          { index: 1, x: 500, y: 575, allowedTypes: ["plates"] },
          { index: 2, x: 460, y: 600, allowedTypes: ["cookies"] },
          { index: 3, x: 425, y: 650, allowedTypes: ["fruit-bowls"] },
          { index: 4, x: 700, y: 420, allowedTypes: ["plants"] },
          { index: 5, x: 670, y: 400, allowedTypes: ["plants"] },
          { index: 6, x: 725, y: 350, allowedTypes: ["curtains"] }
        ]
      },
      {
        name: "Scene 2",
        backgroundRef: "scene-2.png",
        maxItems: 6,
        slots: [
          { index: 0, x: 350, y: 500, allowedTypes: ["tvs"] },
          { index: 1, x: 700, y: 420, allowedTypes: ["plants"] },
          { index: 2, x: 670, y: 400, allowedTypes: ["plants"] },
          { index: 3, x: 725, y: 350, allowedTypes: ["curtains"] }
        ]
      }
    ];

    const templates = await SceneTemplate.insertMany(templatesToInsert);
    console.log(`🏗️  Seeded ${templates.length} scene templates`);

    // --- SEED QUESTIONS LIBRARY (templates) ---
    const questionsToInsert = [
      {
        type: "countItemType",
        requiredItemTypes: ["cups", "plates", "fruit-bowls", "plants"], 
        templateText: "How many {type} were there?",
        optionsCount: 4,
        translations: {
          sv: "Hur många {type} fanns det?"
        }
      },
      {
        type: "whichState",
        requiredItemTypes: ["fruit-bowls", "tvs"],
        templateText: "",
        optionsCount: 3,
        translations: {
          sv: ""
        }
      },
      {
        type: "existsInScene",
        requiredItemTypes: [], 
        templateText: "Did you see {name}?",
        optionsCount: 2, 
        translations: {
          sv: "Såg du {name:indefinite}?"
        }
      }
    ];

    const questions = await QuestionsLibrary.insertMany(questionsToInsert);
    console.log(`❓ Seeded ${questions.length} question templates`);

    console.log("✅ Seed completed successfully");
  } catch (err) {
    console.error("❌ Seed error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB connection closed");
  }
}

seed();
