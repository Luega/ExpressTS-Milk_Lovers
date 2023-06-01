require("dotenv").config();
const { MongoClient } = require("mongodb");
import { IProduct } from "../types-interfaces";
import { mockData } from "./mockData";

export const mongoClient: typeof MongoClient = new MongoClient(
  `${process.env.CONNECTION_STRING_MONGODB}`
);

const products = mockData;

const productSeeder: IProduct[] = products.map((product) => ({
  ...product,
  literPrice: Math.floor(Math.random() * 30 + 1),
}));

const uploadSeederData = async (seeder: IProduct[]) => {
  await mongoClient
    .db(`${process.env.MONGODB_DB}`)
    .collection(`${process.env.MONGODB_COLLECTION}`)
    .deleteMany({});

  await mongoClient
    .db(`${process.env.MONGODB_DB}`)
    .collection(`${process.env.MONGODB_COLLECTION}`)
    .insertMany(seeder);
};

uploadSeederData(productSeeder);

export const getAllProducts = async (): // skip: number,
// limit: number
Promise<IProduct[]> => {
  const products: IProduct[] = await mongoClient
    .db(`${process.env.MONGODB_DB}`)
    .collection(`${process.env.MONGODB_COLLECTION}`)
    .find()
    // .skip(skip)
    // .limit(limit)
    .toArray();

  return products;
};

export const getProduct = async (productId: string): Promise<IProduct> => {
  const product: IProduct = await mongoClient
    .db(`${process.env.MONGODB_DB}`)
    .collection(`${process.env.MONGODB_COLLECTION}`)
    .findOne({ id: productId });

  return product;
};
