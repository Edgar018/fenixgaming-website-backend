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
const roles_model_1 = __importDefault(require("../../models/roles.model"));
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield roles_model_1.default.estimatedDocumentCount();
        if (count > 0)
            return;
        yield Promise.all([new roles_model_1.default({ name: "user" }).save(), new roles_model_1.default({ name: "admin" }).save()]);
    }
    catch (err) {
        console.error(err);
    }
});
