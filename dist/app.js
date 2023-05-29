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
exports.app = void 0;
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const mongoDB_1 = require("./DB/mongoDB");
const port = process.env.PORT;
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.static("public"));
exports.app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const milks = yield (0, mongoDB_1.getAllMilks)();
    if (!milks) {
        return res.status(404).json({ error: "Milks not found" });
    }
    return res.status(200).json({
        data: milks,
        defaultImage: `http://localhost:${port}/images/milk.png`,
    });
}));
exports.app.get("/:milkId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const milkId = req.params.milkId;
    const milk = yield (0, mongoDB_1.getMilk)(milkId);
    if (!milk) {
        return res.status(404).json({ error: "Milk not found" });
    }
    return res.status(200).json({
        data: milk,
        defaultImage: `http://localhost:${port}/images/milk.png`,
    });
}));
