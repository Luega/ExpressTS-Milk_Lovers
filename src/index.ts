import express, { Request, Response } from "express";
require("dotenv").config();
import { Milk } from "./types-interfaces";
import { dbMilks } from "./DB/milks";

const milks: Milk[] = dbMilks;

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req: Request, res: Response) => {
  if (!milks) {
    return res.status(404).json({ error: "Milks not found" });
  }

  return res.status(200).json({
    data: milks,
    defaultImage: `http://localhost:${port}/images/milk.png`,
  });
});

app.get("/:milkId", (req: Request, res: Response) => {
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
