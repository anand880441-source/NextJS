import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable");
}

export async function connectDB() {
  try {
    await mongoose.connect(DATABASE_URL!);
    console.log("mongodb connected successfully");
  } catch (err) {
    console.log("something went wrong", err);
  }
}

connectDB()
