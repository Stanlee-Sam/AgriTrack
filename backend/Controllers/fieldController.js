import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg from "./generated/prisma/client.js";
const { PrismaClient } = prismaPkg;

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export const createField = async(req, res) => {}
export const getAllFields = async(req, res) => {}
export const getAssignedFields = async(req, res) => {}
export const updateField = async(req, res) => {}
export const assignFieldToAgent = async(req, res) => {}

export const deleteField = async(req, res) => {}