require("dotenv").config();
const cors = require("cors");
import express, { Request, Response } from "express";
import { getAllProducts, getProduct } from "./DB/mongoDB";

const port = process.env.PORT;

export const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/api/products", async (req: Request, res: Response) => {
  // let { page, limit } = req.query;
  // if (!page) page = "1";
  // if (!limit) limit = "9";
  // const skip: number = (Number(page) - 1) * Number(limit);

  // const products = await getAllProducts(skip, Number(limit));
  const products = await getAllProducts();

  if (!products) {
    return res.status(404).json({ error: "Product not found" });
  }

  return res.status(200).json({
    // page: page,
    // limit: limit,
    products: products,
    defaultImage: `http://localhost:${port}/images/milk.png`,
  });
});

app.get("/api/products/:productId", async (req: Request, res: Response) => {
  const productId = req.params.productId;
  const product = await getProduct(productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  return res.status(200).json({
    product: product,
    defaultImage: `http://localhost:${port}/images/milk.png`,
  });
});

app.use("*", (_req: Request, res: Response) => {
  return res.status(404).json({ error: "Page not found" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
