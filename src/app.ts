require("dotenv").config();
import express, { Request, Response } from "express";
import { Milk } from "./types-interfaces";
import { getAllMilks, getMilk } from "./DB/mongoDB";

const port = process.env.PORT;

export const app = express();
app.use(express.json());
app.use(express.static("public"));

app.get("/", async (req: Request, res: Response) => {
  const milks = await getAllMilks();
  if (!milks) {
    return res.status(404).json({ error: "Milks not found" });
  }

  return res.status(200).json({
    data: milks,
    defaultImage: `http://localhost:${port}/images/milk.png`,
  });
});

app.get("/:milkId", async (req: Request, res: Response) => {
  const milkId = req.params.milkId;
  const milk = await getMilk(milkId);

  if (!milk) {
    return res.status(404).json({ error: "Milk not found" });
  }

  return res.status(200).json({
    data: milk,
    defaultImage: `http://localhost:${port}/images/milk.png`,
  });
});
