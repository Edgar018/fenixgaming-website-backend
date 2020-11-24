"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const replaysControllers_1 = require("../../controllers/replaysControllers");
const router = express_1.Router();
router.post("/api/replays", replaysControllers_1.uploadReplays);
exports.default = router;
