require("dotenv").config();
const { MongoClient } = require("mongodb");
import { Product } from "../types-interfaces";

export const mongoClient: typeof MongoClient = new MongoClient(
  `${process.env.CONNECTION_STRING_MONGODB}`
);

export const getAllProducts = async (): // skip: number,
// limit: number
Promise<Product[]> => {
  const products: Product[] = await mongoClient
    .db(`${process.env.MONGODB_DB}`)
    .collection(`${process.env.MONGODB_COLLECTION}`)
    .find()
    // .skip(skip)
    // .limit(limit)
    .toArray();

  return products;
};

export const getProduct = async (productId: string): Promise<Product> => {
  const product: Product = await mongoClient
    .db(`${process.env.MONGODB_DB}`)
    .collection(`${process.env.MONGODB_COLLECTION}`)
    .findOne({ id: productId });

  return product;
};
