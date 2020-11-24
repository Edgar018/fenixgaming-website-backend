import { Router } from "express";
import { uploadReplays } from "../../controllers/replaysControllers";

const router = Router();

router.post("/api/replays", uploadReplays);

export default router;
