require("dotenv").config();
import express, { Request, Response } from "express";
import { getAllMilks, getMilk } from "./DB/mongoDB";

const port = process.env.PORT;

export const app = express();
app.use(express.json());
app.use(express.static("public"));

app.get("/api/milks", async (req: Request, res: Response) => {
  let { page, limit } = req.query;
  if (!page) page = "1";
  if (!limit) limit = "9";
  const skip: number = (Number(page) - 1) * Number(limit);

  const milks = await getAllMilks(skip, Number(limit));

  if (!milks) {
    return res.status(404).json({ error: "Milks not found" });
  }

  return res.status(200).json({
    page: page,
    limit: limit,
    data: milks,
    defaultImage: `http://localhost:${port}/images/milk.png`,
  });
});

app.get("/api/milks/:milkId", async (req: Request, res: Response) => {
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

app.use("*", (_req: Request, res: Response) => {
  return res.status(404).json({ error: "Page not found" });
});
