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
          translations: { en: "Cup", sv: "Kopp" }
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
          translations: { en: "Plate", sv: "Tallrik" }
        },
        {
          name: "Curtains",
          type: "curtains",
          variations: ["open", "closed"],
          states: ["open", "closed"],
          artRef: ["curtains-open.png", "curtains-closed.png"],
          translations: { en: "Curtains", sv: "Gardiner" },
          questionTemplate: { en: "Were the {name} {state}", sv: "Var {name} {state}?"}
        },
        {
          name: "Plant",
          type: "plants",
          variations: ["alive", "dead", "pot-empty"],
          states: ["default"],
          artRef: ["flower.png", "flower-dead.png", "flower-pot-empty.png"],
          translations: { en: "Flower", sv: "Blomma" }
        },
        {
          name: "Fruit Bowl",
          type: "fruit-bowls",
          variations: ["full", "empty"],
          states: ["full", "empty"],
          artRef: ["fruit-bowl-full.png", "fruit-bowl-empty.png"],
          translations: { en: "Fruit Bowl", sv: "Fruktskål" }
        },
        {
          name: "TV",
          type: "tvs",
          variations: ["off", "news", "weather", "game", "static"],
          states: ["off", "news", "weather", "game", "static"],
          artRef: ["tv-off.png", "tv-news.png", "tv-weather.png", "tv-game.png", "tv-static.png"],
          translations: { en: "TV", sv: "TV" },
          questionTemplate: {en: "What was on the {name}?", sv: "Vad var på {name}n?"},
        },
        {
          name: "Empty",
          type: "empty",
          variations: ["empty"],
          states: ["empty"],
          artRef: ["transparent.png"],
          translations: { en: "Empty", sv: "Tom" }
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
          sv: "Såg du {name}?"
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
