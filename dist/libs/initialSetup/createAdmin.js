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
const user_model_1 = __importDefault(require("../../models/user.model"));
const roles_model_1 = __importDefault(require("../../models/roles.model"));
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield user_model_1.default.findOne({ email: "admin@localhost.com" });
    const rolesFound = yield roles_model_1.default.findOne({ name: "admin" });
    if (!userFound && rolesFound) {
        yield user_model_1.default.create({
            username: "admin",
            email: "admin@localhost.com",
            password: "123",
            roles: [rolesFound.id]
        });
        console.log("admin user created");
    }
});
