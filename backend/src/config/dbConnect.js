import mongoose from "mongoose";
export const dbConnect = async () => {
  try {
    // console.log("Connecting to MongoDB...", process.env.MONGODB_URI);
    const mongodb = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB", mongodb.connection.db.databaseName);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
