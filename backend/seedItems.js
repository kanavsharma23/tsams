import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Item from "./models/Item.js";

dotenv.config();
await connectDB();

const sampleItems = [
  { name: "Badminton Racket", quantity: 10, available: 8, category: "Badminton" },
  { name: "Football", quantity: 15, available: 12, category: "Football" },
  { name: "Cricket Bat", quantity: 5, available: 5, category: "Cricket" },
  { name: "Tennis Racket", quantity: 7, available: 6, category: "Tennis" },
  { name: "Basketball", quantity: 12, available: 11, category: "Basketball" },
];

try {
  await Item.deleteMany({});
  await Item.insertMany(sampleItems);
  console.log("✅ Items seeded successfully!");
} catch (err) {
  console.error("❌ Seeding failed:", err.message);
}
process.exit();
