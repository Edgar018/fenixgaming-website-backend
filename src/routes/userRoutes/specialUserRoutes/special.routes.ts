import { Router, Request, Response } from "express";
import { createUserAdmin } from "../../../controllers/specialUserControllers/special.user.controllers";
const router = Router();

import passport from "passport";
import getTokenUserId from "../../../middlewares/getTokenUserId";
import isAdmin from "../../../middlewares/isAdmin";

router.get("/api/special/user", [passport.authenticate("jwt", { session: false }), getTokenUserId, isAdmin], (req: Request, res: Response) => {
	res.send("users!!!");
});

router.post("/api/special/user", [passport.authenticate("jwt", { session: false }), getTokenUserId, isAdmin], createUserAdmin);

export default router;
