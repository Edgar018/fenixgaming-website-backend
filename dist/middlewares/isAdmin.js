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
const user_model_1 = __importDefault(require("../models/user.model"));
const roles_model_1 = __importDefault(require("../models/roles.model"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFound = yield user_model_1.default.findOne({ _id: req.userId });
        const roles = yield roles_model_1.default.find({ _id: { $in: userFound === null || userFound === void 0 ? void 0 : userFound.roles } });
        for (let index in roles) {
            if (roles[index].name === "admin") {
                return next();
            }
        }
        res.status(400).json("Require admin role");
        throw new Error("Require admin role");
    }
    catch (err) {
        console.error(err);
    }
});
