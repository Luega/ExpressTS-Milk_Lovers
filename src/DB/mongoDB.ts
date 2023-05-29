require("dotenv").config();
const { MongoClient } = require("mongodb");
import { Milk } from "../types-interfaces";

export const mongoClient: typeof MongoClient = new MongoClient(
  `${process.env.CONNECTION_STRING_MONGODB}`
);

export const getAllMilks = async (
  skip: number,
  limit: number
): Promise<Milk[]> => {
  const milks: Milk[] = await mongoClient
    .db(`${process.env.MONGODB_DB}`)
    .collection(`${process.env.MONGODB_COLLECTION}`)
    .find()
    .skip(skip)
    .limit(limit)
    .toArray();

  return milks;
};

export const getMilk = async (milkId: string): Promise<Milk> => {
  const milk: Milk = await mongoClient
    .db(`${process.env.MONGODB_DB}`)
    .collection(`${process.env.MONGODB_COLLECTION}`)
    .findOne({ id: milkId });

  return milk;
};
