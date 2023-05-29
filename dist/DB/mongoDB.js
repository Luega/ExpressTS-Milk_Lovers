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
exports.getMilk = exports.getAllMilks = exports.mongoClient = void 0;
require("dotenv").config();
const { MongoClient } = require("mongodb");
exports.mongoClient = new MongoClient(`${process.env.CONNECTION_STRING_MONGODB}`);
const getAllMilks = (skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const milks = yield exports.mongoClient
        .db(`${process.env.MONGODB_DB}`)
        .collection(`${process.env.MONGODB_COLLECTION}`)
        .find()
        .skip(skip)
        .limit(limit)
        .toArray();
    return milks;
});
exports.getAllMilks = getAllMilks;
const getMilk = (milkId) => __awaiter(void 0, void 0, void 0, function* () {
    const milk = yield exports.mongoClient
        .db(`${process.env.MONGODB_DB}`)
        .collection(`${process.env.MONGODB_COLLECTION}`)
        .findOne({ id: milkId });
    return milk;
});
exports.getMilk = getMilk;