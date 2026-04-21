import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg from "../generated/prisma/client.js";
const { PrismaClient } = prismaPkg;

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const STAGES = ["planted", "growing", "ready", "harvested"];

const parsePlantingDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const createField = async (req, res) => {
  try {
    const { name, cropType, plantingDate, currentStage } = req.body;

    if (
      !name ||
      !cropType ||
      !plantingDate ||
      !currentStage
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!STAGES.includes(currentStage)) {
      return res.status(400).json({ message: "Invalid field stage" });
    }

    const parsedPlantingDate = parsePlantingDate(plantingDate);
    if (!parsedPlantingDate) {
      return res.status(400).json({ message: "Invalid planting date" });
    }

    const newField = await prisma.field.create({
      data: {
        name,
        cropType,
        plantingDate: parsedPlantingDate,
        currentStage,
      },
    });

    res.status(201).json({
      newField,
    });
  } catch (error) {
    console.error("Error creating field:", error);
    if (error?.code === "P2002") {
      return res.status(409).json({ message: "Field already exists" });
    }
    res.status(500).json({ message: "Failed to create field" });
  }
};

export const getAllFields = async (req, res) => {
  try {
    const fields = await prisma.field.findMany();

    res.status(200).json(fields);
  } catch (error) {
    console.error("Error getting all fields:", error);
    res.status(500).json({ message: "Failed to get fields" });
  }
};

export const getAssignedFields = async (req, res) => {
  try {
    const assignedAgentId = req.params.id;

    const existingAgent = await prisma.user.findUnique({
      where: {
        id: assignedAgentId,
      },
    });

    if (!existingAgent) {
      return res.status(404).json({ message: "Agent does not exist" });
    }

    const assignedFields = await prisma.field.findMany({
      where: {
        assignedAgentId,
      },
    });

    res.status(200).json(assignedFields);
  } catch (error) {
    console.error("Error getting assigned fields:", error);
    res.status(500).json({ message: "Failed to get assigned fields" });
  }
};

export const updateField = async (req, res) => {
  try {
    const { name, cropType, plantingDate, currentStage } = req.body;
    const fieldId = req.params.id;

    if (!name || !cropType || !plantingDate || !currentStage) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!STAGES.includes(currentStage)) {
      return res.status(400).json({ message: "Invalid field stage" });
    }

    const parsedPlantingDate = parsePlantingDate(plantingDate);
    if (!parsedPlantingDate) {
      return res.status(400).json({ message: "Invalid planting date" });
    }

    const existingField = await prisma.field.findUnique({
      where: {
        id: fieldId,
      },
    });

    if (!existingField) {
      return res.status(404).json({ message: "Field does not exist" });
    }

    const updatedField = await prisma.field.update({
      where: { id: fieldId },
      data: {
        name,
        cropType,
        plantingDate: parsedPlantingDate,
        currentStage,
      },
    });

    res.status(200).json({
      updatedField,
    });
  } catch (error) {
    console.error("Error updating field:", error);
    res.status(500).json({ message: "Failed to update field" });
  }
};

export const assignFieldToAgent = async (req, res) => {
  try {
    const fieldId = req.params.id;

    const { assignedAgentId } = req.body;

    if (!assignedAgentId) {
      return res.status(400).json({ message: "Agent ID is required" });
    }

    const field = await prisma.field.findUnique({
      where: {
        id: fieldId,
      },
    });

    if (!field) {
      return res.status(404).json({ message: "Field does not exist" });
    }

    const existingAgent = await prisma.user.findUnique({
      where: {
        id: assignedAgentId,
      },
    });

    if (!existingAgent) {
      return res.status(404).json({ message: "Agent does not exist" });
    }

    if (existingAgent.role !== "agent") {
      return res
        .status(400)
        .json({ message: "Assigned user must have agent role" });
    }

    const assignedField = await prisma.field.update({
      where: { id: fieldId },
      data: {
        assignedAgentId,
      },
    });

    res.status(200).json({
      message: "Field assigned successfully",
      assignedField,
    });
  } catch (error) {
    console.error("Error assigning field to agent:", error);
    res.status(500).json({ message: "Failed to assign field to agent" });
  }
};

// export const deleteField = async (req, res) => {};
