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
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.files === undefined)
            throw new Error("files is undefined");
        const fileName = req.files.file.name;
        const size = req.files.file.data.length;
        if (fileName === undefined)
            throw new Error("fileName is undefined");
        const extension = path_1.default.extname(fileName);
        const allowedExtensions = /w3g/;
        if (!allowedExtensions.test(extension)) {
            res.status(400).json({ msg: "Unsupported extension" });
            throw new Error("Unsupported extension");
        }
        if (size === undefined)
            throw new Error("size is undefined");
        if (size > 5000000) {
            res.status(400).json({ msg: "File must be less than 5mb" });
            throw new Error("File must be less than 5mb");
        }
        const md5 = req.files.file.md5;
        const URL = "/uploads/replays/" + md5 + extension;
        yield util_1.default.promisify(req.files.file.mv)("./public" + URL);
        res.status(201).json({ msg: "file upload successfully" });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: err.message });
    }
});
