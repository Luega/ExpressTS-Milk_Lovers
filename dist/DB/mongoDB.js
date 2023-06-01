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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = exports.getAllProducts = exports.mongoClient = void 0;
require("dotenv").config();
const { MongoClient } = require("mongodb");
const mockData_1 = require("./mockData");
exports.mongoClient = new MongoClient(`${process.env.CONNECTION_STRING_MONGODB}`);
const products = mockData_1.mockData;
const productSeeder = products.map((product) => (Object.assign(Object.assign({}, product), { literPrice: Math.floor(Math.random() * 30 + 1) })));
const uploadSeederData = (seeder) => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.mongoClient
        .db(`${process.env.MONGODB_DB}`)
        .collection(`${process.env.MONGODB_COLLECTION}`)
        .deleteMany({});
    yield exports.mongoClient
        .db(`${process.env.MONGODB_DB}`)
        .collection(`${process.env.MONGODB_COLLECTION}`)
        .insertMany(seeder);
});
uploadSeederData(productSeeder);
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield exports.mongoClient
        .db(`${process.env.MONGODB_DB}`)
        .collection(`${process.env.MONGODB_COLLECTION}`)
        .find()
        // .skip(skip)
        // .limit(limit)
        .toArray();
    return products;
});
exports.getAllProducts = getAllProducts;
const getProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield exports.mongoClient
        .db(`${process.env.MONGODB_DB}`)
        .collection(`${process.env.MONGODB_COLLECTION}`)
        .findOne({ id: productId });
    return product;
});
exports.getProduct = getProduct;
//# sourceMappingURL=mongoDB.js.map