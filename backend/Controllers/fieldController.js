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
    const { name, cropType, plantingDate, currentStage, assignedAgentId } =
      req.body;
    let agent = null;

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

    if (assignedAgentId) {
      agent = await prisma.user.findUnique({
        where: { id: assignedAgentId },
      });

      if (!agent) {
        return res.status(404).json({ message: "Agent does not exist" });
      }

      if (agent.role !== "agent") {
        return res.status(400).json({ message: "User is not an agent" });
      }
    }

    const newField = await prisma.field.create({
      data: {
        name,
        cropType,
        plantingDate: parsedPlantingDate,
        currentStage,
        assignedAgentId: assignedAgentId || null,
      },
      include: {
        agent: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return res.status(201).json(newField);
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
    const fields = await prisma.field.findMany({
      include: {
        agent: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(200).json(fields);
  } catch (error) {
    console.error("Error getting all fields:", error);
    res.status(500).json({ message: "Failed to get fields" });
  }
};

export const getAssignedFields = async (req, res) => {
  try {
    const assignedAgentId = req.user.userId;

    const existingAgent = await prisma.user.findUnique({
      where: {
        id: assignedAgentId,
      },
    });

    if (!existingAgent) {
      return res.status(404).json({ message: "Agent does not exist" });
    }

    const assignedFields = await prisma.field.findMany({
      where: { assignedAgentId },
      include: {
        agent: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
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
    const { name, cropType, plantingDate, currentStage, assignedAgentId } =
      req.body;
    const fieldId = req.params.id;
    let agent = null;

    if (!name || !cropType || !plantingDate || !currentStage) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (assignedAgentId) {
      agent = await prisma.user.findUnique({
        where: { id: assignedAgentId },
      });

      if (!agent) {
        return res.status(404).json({ message: "Agent does not exist" });
      }

      if (agent.role !== "agent") {
        return res.status(400).json({ message: "User is not an agent" });
      }
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
        assignedAgentId: assignedAgentId || null,
      },
      include: {
        agent: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return res.status(200).json(updatedField);
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
      data: { assignedAgentId },
      include: {
        agent: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return res.status(200).json(assignedField);
  } catch (error) {
    console.error("Error assigning field to agent:", error);
    res.status(500).json({ message: "Failed to assign field to agent" });
  }
};

export const getAgents = async (_req, res) => {
  try {
    const agents = await prisma.user.findMany({
      where: { role: "agent" },
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    res.status(200).json(agents);
  } catch (error) {
    console.error("Error fetching agents:", error);
    res.status(500).json({ message: "Failed to fetch agents" });
  }
};

// export const deleteField = async (req, res) => {};
