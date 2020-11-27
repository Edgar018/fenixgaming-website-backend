import { Router } from "express";
import { getArticles, getArticlesBySlug } from "../../controllers/articlesControllers/"

const router = Router();

router.get("/api/articles", getArticlesBySlug);
router.get("/api/articles/:slug", getArticlesBySlug);

export default router;
