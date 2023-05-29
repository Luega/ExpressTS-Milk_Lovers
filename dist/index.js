"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const app_1 = require("./app");
const port = process.env.PORT;
app_1.app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
