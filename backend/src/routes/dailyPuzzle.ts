import { Router } from "express";

const router = Router();

router.get("/daily", async (req, res) => {
    res.json({ message: "Daily puzzle endpoint placeholder" });
});

export default router;