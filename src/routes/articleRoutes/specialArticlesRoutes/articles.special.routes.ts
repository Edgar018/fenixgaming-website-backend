import { Router } from "express";
import { createArticle, deleteArticle, editArticle } from "../../../controllers/articlesControllers/specialController/index";

const router = Router();

router.post("/api/articles", createArticle);
router.put("/api/articles", editArticle);
router.delete("/api/articles", deleteArticle);

export default router;
