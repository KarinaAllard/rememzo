import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.get("/", (req: Request, res: Response) => {
	res.send("Rememzo backend running!");
});

const PORT = parseInt(process.env.PORT || "5001", 10);
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
