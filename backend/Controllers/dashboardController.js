import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg from "../generated/prisma/client.js";
import { getFieldStatus } from "../utils/fieldStatus.js";

const { PrismaClient } = prismaPkg;

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export const getAdminDashboardData = async (req, res) => {
  try {
    const fields = await prisma.field.findMany();

    let active = 0;
    let completed = 0;
    let atRisk = 0;

    fields.forEach((field) => {
      const status = getFieldStatus(field);

      if (status === "active") {
        active++;
      } else if (status === "completed") {
        completed++;
      } else {
        atRisk++;
      }
    });

    const recentUpdates = await prisma.fieldUpdate.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        field: true,
        agent: true,
      },
    });

    res.status(200).json({
      totalFields: fields.length,
      activeFields: active,
      completedFields: completed,
      atRiskFields: atRisk,
      recentUpdates,
    });
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    res.status(500).json({ error: "Failed to fetch admin dashboard data" });
  }
};
export const getAgentDashboardData = async (req, res) => {
  try {
    const agentId = req.user.id;

    const fields = await prisma.field.findMany({
      where: {
        assignedAgentId: agentId,
      },
    });

    let active = 0;
    let completed = 0;
    let atRisk = 0;

    fields.forEach((field) => {
      const status = getFieldStatus(field);

      if (status === "active") {
        active++;
      } else if (status === "completed") {
        completed++;
      } else {
        atRisk++;
      }
    });

    const recentUpdates = await prisma.fieldUpdate.findMany({
      where: {
        agentId: agentId,
      },
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    res.json({
      assignedFields: fields.length,
      activeFields: active,
      completedFields: completed,
      atRiskFields: atRisk,
      recentUpdates,
    });
  } catch (error) {
    console.error("Error fetching agent dashboard data:", error);
    res.status(500).json({
      message: "Failed to fetch agent dashboard data",
    });
  }
};
