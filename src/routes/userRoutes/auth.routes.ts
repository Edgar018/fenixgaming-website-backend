import { Router } from "express";

import { signUp, signIn } from "../../controllers/userControllers/user.controller";

const router = Router();

router.post("/api/signup", signUp)
router.post("/api/signin", signIn)

export default router
