import express from "express";
import {
  getAllFieldUpdates,
  createFieldUpdate,
} from "../Controllers/fieldUpdatesController.js";

const router = express.Router();

router.get("/", getAllFieldUpdates);
router.post("/", createFieldUpdate);

export default router;
