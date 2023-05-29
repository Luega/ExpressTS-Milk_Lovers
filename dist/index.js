"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv").config();
const milks_1 = require("./DB/milks");
const milks = milks_1.dbMilks;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
app.get("/", (req, res) => {
    if (!milks) {
        return res.status(404).json({ error: "Milks not found" });
    }
    return res.status(200).json({
        data: milks,
        defaultImage: `http://localhost:${port}/images/milk.png`,
    });
});
app.get("/:milkId", (req, res) => {
    const milkId = req.params.milkId;
    const milk = milks.find((milk) => milk.id === milkId);
    if (!milk) {
        return res.status(404).json({ error: "Milk not found" });
    }
    return res.status(200).json({
        data: milk,
        defaultImage: `http://localhost:${port}/images/milk.png`,
    });
});
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
