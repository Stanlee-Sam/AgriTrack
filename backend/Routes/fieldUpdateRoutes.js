import express from "express";
import {
  getAllFieldUpdates,
  createFieldUpdate,
} from "../Controllers/fieldUpdatesController.js";
import isAdmin, { authorizeRoles } from "../middleware/roleMiddleware.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, isAdmin, getAllFieldUpdates);
router.post("/field/:id", authenticateToken,authorizeRoles("agent"), createFieldUpdate);
export default router;
