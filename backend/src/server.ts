import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db";
import dailyPuzzle from "./routes/dailyPuzzle";
import authRoutes from "./routes/auth/auth";
import gameRoutes from "./routes/gameAttempt";

dotenv.config();

const app = express();

const allowedOrigins = [
	"http://localhost:5173",
	process.env.FRONTEND_URL,
].filter((origin): origin is string => !!origin);

app.use(
	cors({
		origin: allowedOrigins,
		credentials: true,
	})
);

app.use(express.json());

connectDB();

app.get("/", (req: Request, res: Response) => {
	res.send("Rememzo backend running!");
});

app.use("/api/play", dailyPuzzle);

app.use("/api/auth", authRoutes);

app.use("/api/game", gameRoutes);

const PORT = parseInt(process.env.PORT || "5001", 10);
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
