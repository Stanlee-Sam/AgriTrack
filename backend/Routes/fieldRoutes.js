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

export default router;
