import express from "express";
import {
  getAdminDashboardData,
  getAgentDashboardData,
} from "../Controllers/dashboardController.js";

import isAdmin from "../middleware/roleMiddleware.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

// router.get("/admin", authenticateToken, isAdmin, getAdminDashboardData);
// router.get("/agent/:id", authenticateToken, getAgentDashboardData);
router.get("/admin",  getAdminDashboardData);
router.get("/agent/:id", getAgentDashboardData);


export default router;
