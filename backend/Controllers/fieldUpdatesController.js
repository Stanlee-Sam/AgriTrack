import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg from "./generated/prisma/client.js";
const { PrismaClient } = prismaPkg;

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export const createFieldUpdate = async(req, res) => {}
export const getAllFieldUpdates = async(req, res) => {}