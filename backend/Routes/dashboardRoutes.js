import express from "express";
import {
  getAdminDashboardData,
  getAgentDashboardData,
} from "../Controllers/dashboardController.js";

const router = express.Router();

router.get("/admin", getAdminDashboardData);
router.get("/agent/:id", getAgentDashboardData);

export default router;
