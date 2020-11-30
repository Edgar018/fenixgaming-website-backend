import { Router } from "express";
import { getComments } from "../../controllers/commentControllers/"

const router = Router();

router.get("/api/comments", getComments);

export default router;
