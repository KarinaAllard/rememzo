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
          name: "Cup Coffee",
          type: "cups",
          variations: ["coffee", "empty", "tea", "messy"],
          states: ["default", "dirty", "empty"],
          artRef: ["cup-coffee.png", "cup-empty.png", "cup-tea.png", "cup-coffee-messy.png"],
          translations: { en: "Cup Coffee", sv: "Kopp kaffe" }
        },
        {
          name: "Cookie",
          type: "cookies",
          variations: ["regular", "bitten"],
          states: ["default"],
          artRef: ["cookie.png", "cookie-bitten.png"],
          translations: { en: "Cookie", sv: "Kaka" }
        },
        {
          name: "Plate with Cookie",
          type: "plates",
          variations: ["dirty", "empty", "crumbs", "one-cookie", "triple-cookie"],
          states: ["default", "broken"],
          artRef: [
            "plate-broken.png",
            "plate-crumbs.png",
            "plate-dirty.png",
            "plate-empty.png",
            "plate-one-cookie.png",
            "plate-one-cookie-bitten.png",
            "plate-triple-cookies.png",
            "triple-cookies.png"
          ],
          translations: { en: "Plate with Cookies", sv: "Tallrik med kakor" }
        },
        {
          name: "Curtains",
          type: "curtains",
          variations: ["open", "closed"],
          states: ["default"],
          artRef: ["curtains-open.png", "curtains-closed.png"],
          translations: { en: "Curtains", sv: "Gardiner" }
        },
        {
          name: "Flower",
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
          states: ["default"],
          artRef: ["fruit-bowl-full.png", "fruit-bowl-empty.png"],
          translations: { en: "Fruit Bowl", sv: "Fruktskål" }
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
          { index: 0, x: 50, y: 100, allowedTypes: ["cups"] },
          { index: 1, x: 150, y: 100, allowedTypes: ["plates"] },
          { index: 2, x: 250, y: 100, allowedTypes: ["cookies"] },
          { index: 3, x: 100, y: 200, allowedTypes: ["plants"] },
          { index: 4, x: 200, y: 200, allowedTypes: ["fruit-bowls"] },
          { index: 5, x: 300, y: 50, allowedTypes: ["curtains"] }
        ]
      }
    ];

    const templates = await SceneTemplate.insertMany(templatesToInsert);
    console.log(`🏗️  Seeded ${templates.length} scene templates`);

    // --- SEED QUESTIONS LIBRARY (templates) ---
    const questionsToInsert = [
      {
        type: "countItemType",
        requiredItemTypes: ["cup", "plate", "fruit-bowl", "flower"], 
        templateText: "How many {type} were in the scene?",
        optionsCount: 4,
        translations: {
          sv: "Hur många {type} fanns i scenen?"
        }
      },
      {
        type: "whichState",
        requiredItemTypes: ["cup", "plate", "fruit-bowl", "flower"],
        templateText: "What was the state of the {type}?",
        optionsCount: 3,
        translations: {
          sv: "Vilket tillstånd hade {type}?"
        }
      },
      {
        type: "existsInScene",
        requiredItemTypes: [], 
        templateText: "Did {name} exist in the scene?",
        optionsCount: 2, 
        translations: {
          sv: "Fanns {name} i scenen?"
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
