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
exports.signIn = exports.signUp = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const createToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, config_1.default.jwtSecret, {
        expiresIn: 86400
    });
};
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email || !req.body.password || !req.body.username) {
            res.status(400).json({ msg: "Please send your email, password and username" });
            throw new Error("password, email and password no found");
        }
        const userFound = yield user_1.default.findOne({ email: req.body.email });
        if (userFound) {
            res.status(400).json({ msg: "the user already exists" });
            throw new Error("the user already exists");
        }
        const newUser = new user_1.default(req.body);
        yield newUser.save();
        return res.status(201).json({ msg: "The user was created successfully" });
    }
    catch (err) {
        console.error(err.message);
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email || !req.body.password) {
            res.status(400).json({ msg: "Please send your email and password" });
            throw new Error("Please send your email and password");
        }
        const userFound = yield user_1.default.findOne({ email: req.body.email });
        if (!userFound) {
            res.status(404).json("the user does not exists");
            throw new Error("the user does not exists");
        }
        const isMatch = yield userFound.comparePassword(req.body.password);
        if (isMatch) {
            return res.status(201).json({ msg: createToken(userFound) });
        }
        res.status(400).json({ msg: "the email or password is incorrect" });
        throw new Error("the email or password is incorrect");
    }
    catch (err) {
        console.error(err.message);
    }
});
exports.signIn = signIn;
