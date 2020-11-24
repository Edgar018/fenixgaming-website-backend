"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const config_1 = __importDefault(require("../config/config"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.header("authorization");
        if (!token) {
            res.status(403).json({ msg: "no token provided" });
            throw new Error("no token provided");
        }
        token = token.split(" ");
        const decoded = jsonwebtoken_1.default.verify(token[1], config_1.default.jwtSecret);
        req.userId = decoded.id;
        const userFound = yield user_model_1.default.findById(req.userId, { password: 0 });
        if (!userFound) {
            res.status(404).json("no user found");
            throw new Error("no user found");
        }
        next();
    }
    catch (err) {
        console.error(err);
    }
});
