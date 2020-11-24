"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const special_user_controllers_1 = require("../../controllers/specialUserControllers/special.user.controllers");
const router = express_1.Router();
const passport_1 = __importDefault(require("passport"));
const getTokenUserId_1 = __importDefault(require("../../middlewares/getTokenUserId"));
const isAdmin_1 = __importDefault(require("../../middlewares/isAdmin"));
router.get("/api/special/user", [passport_1.default.authenticate("jwt", { session: false }), getTokenUserId_1.default, isAdmin_1.default], (req, res) => {
    res.send("users!!!");
});
router.post("/api/special/user", [passport_1.default.authenticate("jwt", { session: false }), getTokenUserId_1.default, isAdmin_1.default], special_user_controllers_1.createUserAdmin);
exports.default = router;
