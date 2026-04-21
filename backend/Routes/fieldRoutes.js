import express from "express";
import {
  createField,
  assignFieldToAgent,
  updateField,
  getAllFields,
  getAssignedFields,
} from "../Controllers/fieldController.js";

const router = express.Router();

router.post("/create", createField);
router.put("/:id/assign", assignFieldToAgent);
router.put("/update/:id", updateField);
router.get("/", getAllFields);
router.get("/assigned-fields/:id", getAssignedFields);

export default router;
