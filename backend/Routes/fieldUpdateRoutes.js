import express from "express";
import {
  getAllFieldUpdates,
  createFieldUpdate,
} from "../Controllers/fieldUpdatesController.js";
import isAdmin from "../middleware/roleMiddleware.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, isAdmin, getAllFieldUpdates);
router.post("/", authenticateToken, createFieldUpdate);

export default router;
