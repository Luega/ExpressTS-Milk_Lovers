require("dotenv").config();
const { MongoClient } = require("mongodb");
import { Milk } from "../types-interfaces";
import { dbMilks } from "./milks";

export const mongoClient: typeof MongoClient = new MongoClient(
  `${process.env.CONNECTION_STRING_MONGODB}`
);

// START - SEEDER - DELETE THIS SECTION IF YOU WANT TO WORK WITH YOUR DATA
const milksSeeder: Milk[] = dbMilks;

const uploadSeederData = async (seeder: Milk[]) => {
  await mongoClient
    .db(`${process.env.MONGODB_DB}`)
    .collection(`${process.env.MONGODB_COLLECTION}`)
    .deleteMany({});

  await mongoClient
    .db(`${process.env.MONGODB_DB}`)
    .collection(`${process.env.MONGODB_COLLECTION}`)
    .insertMany(seeder);
};

uploadSeederData(milksSeeder);
// END - SEEDER

export const getAllMilks = async (): Promise<Milk[]> => {
  const milks: Milk[] = await mongoClient
    .db(`${process.env.MONGODB_DB}`)
    .collection(`${process.env.MONGODB_COLLECTION}`)
    .find()
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
