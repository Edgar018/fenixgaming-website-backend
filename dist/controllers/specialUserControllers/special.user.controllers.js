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
exports.createUserAdmin = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const roles_model_1 = __importDefault(require("../../models/roles.model"));
const createUserAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email || !req.body.password || !req.body.username) {
            res.status(400).json({ msg: "Please send your email, password and username" });
            throw new Error("password, email and password no found");
        }
        const userFound = yield user_model_1.default.findOne({ email: req.body.email });
        userFound;
        if (userFound) {
            res.status(400).json({ msg: "the user already exists" });
            throw new Error("the user already exists");
        }
        const newUser = new user_model_1.default(req.body);
        const rolesFound = yield roles_model_1.default.findOne({ name: "admin" });
        newUser.roles = [rolesFound === null || rolesFound === void 0 ? void 0 : rolesFound._id];
        yield newUser.save();
        return res.status(201).json({ msg: "The user was created successfully" });
    }
    catch (err) {
        console.error(err.message);
    }
});
exports.createUserAdmin = createUserAdmin;
