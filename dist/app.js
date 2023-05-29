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
const cors = require("cors");
const express_1 = __importDefault(require("express"));
const mongoDB_1 = require("./DB/mongoDB");
const port = process.env.PORT;
exports.app = (0, express_1.default)();
exports.app.use(cors());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.static("public"));
exports.app.get("/api/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let { page, limit } = req.query;
    // if (!page) page = "1";
    // if (!limit) limit = "9";
    // const skip: number = (Number(page) - 1) * Number(limit);
    // const products = await getAllProducts(skip, Number(limit));
    const products = yield (0, mongoDB_1.getAllProducts)();
    if (!products) {
        return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json({
        // page: page,
        // limit: limit,
        products: products,
        defaultImage: `http://localhost:${port}/images/milk.png`,
    });
}));
exports.app.get("/api/products/:productId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const product = yield (0, mongoDB_1.getProduct)(productId);
    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json({
        product: product,
        defaultImage: `http://localhost:${port}/images/milk.png`,
    });
}));
exports.app.use("*", (_req, res) => {
    return res.status(404).json({ error: "Page not found" });
});
