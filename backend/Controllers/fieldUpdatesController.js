import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg from "../generated/prisma/client.js";
const { PrismaClient } = prismaPkg;

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const STAGES = ["planted", "growing", "ready", "harvested"];

export const createFieldUpdate = async (req, res) => {
  try {
    const { newStage, note } = req.body;
    const fieldId = req.params.id;
    const agentId = req.user?.userId;

    if (!req.user || !agentId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    if (!newStage || !note || !fieldId || !agentId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!STAGES.includes(newStage)) {
      return res.status(400).json({ message: "Invalid field stage" });
    }

    const existingField = await prisma.field.findUnique({
      where: {
        id: fieldId,
      },
    });

    if (!existingField) {
      return res.status(404).json({ message: "Field does not exist" });
    }

    if (
      !existingField.assignedAgentId ||
      existingField.assignedAgentId !== agentId
    ) {
      return res
        .status(403)
        .json({ message: "Agent is not assigned to this field" });
    }

    const result = await prisma.$transaction(async (tx) => {
      const fieldUpdate = await tx.fieldUpdate.create({
        data: {
          fieldId,
          agentId,
          newStage,
          note,
        },
      });

      await tx.field.update({
        where: { id: fieldId },
        data: { currentStage: newStage },
      });

      return tx.fieldUpdate.findUnique({
        where: { id: fieldUpdate.id },
        include: {
          field: true,
          agent: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    });

    return res.status(201).json({
      message: "Field update created",
      fieldUpdate: result,
    });
  } catch (error) {
    console.error("Error creating field update:", error);
    res.status(500).json({ message: "Failed to create field update" });
  }
};

export const getAllFieldUpdates = async (req, res) => {
  try {
    const fieldUpdates = await prisma.fieldUpdate.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        field: true,
        agent: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(200).json(fieldUpdates);
  } catch (error) {
    console.error("Error getting field updates", error);
    res.status(500).json({ message: "Failed to get field updates" });
  }
};
