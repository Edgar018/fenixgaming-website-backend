"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../user.controller");
const router = express_1.Router();
router.post("/api/signup", user_controller_1.signUp);
router.post("/api/signin", user_controller_1.signIn);
exports.default = router;
