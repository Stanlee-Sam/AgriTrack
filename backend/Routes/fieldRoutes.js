import express from "express";
import {
  createField,
  assignFieldToAgent,
  updateField,
  getAllFields,
  getAssignedFields,
} from "../Controllers/fieldController.js";
import isAdmin from "../middleware/roleMiddleware.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authenticateToken, isAdmin, createField);
router.put("/:id/assign", authenticateToken, isAdmin, assignFieldToAgent);
router.put("/update/:id", authenticateToken, isAdmin, updateField);
router.get("/", authenticateToken, isAdmin, getAllFields);
router.get("/assigned-fields/:id", authenticateToken, getAssignedFields);
router.get("/agents", async (req, res) => {
  try {
    const agents = await prisma.user.findMany({
      where: { role: "agent" },
      select: { id: true, name: true, email: true },
    });

    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch agents" });
  }
});


export default router;
