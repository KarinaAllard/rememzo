import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUri: string = process.env.MONGO_URI || "mongodb://localhost:27017/rememzo";

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;
