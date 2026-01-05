import express, {Request, Response} from "express";
import Item from "../models/ItemsLibrary";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

export default router;
