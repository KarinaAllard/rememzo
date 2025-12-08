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
            name: "Empty",
            type: "empty",
            variations: ["empty"],
            states: ["empty"],
            artRef: ["transparent.png"],
            translations: { en: "Empty", sv: "Tom" }
        },
        {
            name: "Book",
            type: "book",
            variations: ["red", "blue"],
            states: ["default"],
            artRef: ["book_red.png", "book_blue.png"],
            translations: { en: "Book", sv: "Bok" }
        },
        {
            name: "Vase",
            type: "vase",
            variations: ["red", "blue"],
            states: ["default"],
            artRef: ["vase_red.png", "vase_blue.png"],
            translations: { en: "Vase", sv: "Vas" }
        },
        {
            name: "Cup",
            type: "cup",
            variations: ["white", "green"],
            states: ["default"],
            artRef: ["cup_white.png", "cup_green.png"],
            translations: { en: "Cup", sv: "Kopp" }
        },
        {
            name: "Fruit Bowl",
            type: "container",
            variations: ["wood", "ceramic"],
            states: ["full", "empty"],
            artRef: ["bowl_wood.png", "bowl_ceramic.png"],
            translations: { en: "Fruit Bowl", sv: "Fruktskål" }
        },
        {
            name: "TV",
            type: "electronics",
            variations: ["beige"],
            states: ["noSignal", "static", "off"],
            artRef: ["tv_nosignal.png", "tv_static.png", "tv_off.png"],
            translations: { en: "TV", sv: "TV" }
        },
        {
            name: "Plant",
            type: "plant",
            variations: ["small", "large"],
            states: ["default"],
            artRef: ["plant_small.png", "plant_large.png"],
            translations: { en: "Plant", sv: "Växt" }
        }
    ];

    const items = await ItemsLibrary.insertMany(itemsToInsert);
    console.log(`🌱 Seeded ${items.length} items`);

    // --- SEED SCENE TEMPLATES ---
    const templatesToInsert = [
      {
        name: "Living Room 1",
        backgroundRef: "livingroom_1.png",
        maxItems: 8,
        slots: [
          { index: 0, x: 40, y: 120, allowedTypes: ["book", "vase"] },
          { index: 1, x: 120, y: 120, allowedTypes: ["cup", "container"] },
          { index: 2, x: 200, y: 80, allowedTypes: ["electronics"] },
          { index: 3, x: 60, y: 200, allowedTypes: ["book", "container"] },
          { index: 4, x: 150, y: 200, allowedTypes: ["plant"] },
          { index: 5, x: 220, y: 150, allowedTypes: ["book", "electronics"] },
          { index: 6, x: 80, y: 250, allowedTypes: ["cup"] },
          { index: 7, x: 180, y: 220, allowedTypes: ["vase", "plant"] }
        ]
      },
      {
        name: "Desk Scene",
        backgroundRef: "desk_1.png",
        maxItems: 6,
        slots: [
          { index: 0, x: 50, y: 90, allowedTypes: ["book", "container"] },
          { index: 1, x: 140, y: 90, allowedTypes: ["electronics", "book"] },
          { index: 2, x: 90, y: 150, allowedTypes: ["cup", "plant"] },
          { index: 3, x: 160, y: 150, allowedTypes: ["book", "vase"] },
          { index: 4, x: 120, y: 200, allowedTypes: ["plant"] },
          { index: 5, x: 200, y: 180, allowedTypes: ["electronics", "container"] }
        ]
      },
      {
        name: "Kitchen Scene",
        backgroundRef: "kitchen_1.png",
        maxItems: 5,
        slots: [
          { index: 0, x: 30, y: 100, allowedTypes: ["cup", "container"] },
          { index: 1, x: 100, y: 100, allowedTypes: ["cup"] },
          { index: 2, x: 60, y: 150, allowedTypes: ["plant"] },
          { index: 3, x: 180, y: 140, allowedTypes: ["fruitBowl", "container"] },
          { index: 4, x: 150, y: 180, allowedTypes: ["vase"] }
        ]
      },
      {
        name: "Bedroom Scene",
        backgroundRef: "bedroom_1.png",
        maxItems: 7,
        slots: [
          { index: 0, x: 50, y: 80, allowedTypes: ["book", "vase"] },
          { index: 1, x: 120, y: 80, allowedTypes: ["plant"] },
          { index: 2, x: 180, y: 120, allowedTypes: ["electronics"] },
          { index: 3, x: 60, y: 160, allowedTypes: ["cup"] },
          { index: 4, x: 150, y: 180, allowedTypes: ["book", "container"] },
          { index: 5, x: 200, y: 150, allowedTypes: ["plant", "vase"] },
          { index: 6, x: 80, y: 200, allowedTypes: ["fruitBowl", "cup"] }
        ]
      }
    ];

    const templates = await SceneTemplate.insertMany(templatesToInsert);
    console.log(`🏗️  Seeded ${templates.length} scene templates`);

    // --- SEED QUESTIONS LIBRARY (templates) ---
    const questionsToInsert = [
      {
        type: "countItemType",
        requiredItemTypes: ["book"],
        templateText: "How many {type} were in the scene?",
        optionsCount: 4,
        translations: {
          sv: "Hur många {type} fanns i scenen?"
        }
      },
      {
        type: "whichState",
        requiredItemTypes: ["electronics"],
        templateText: "What was the state of the {type}?",
        optionsCount: 3,
        translations: {
          sv: "Vilket tillstånd hade {type}?"
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