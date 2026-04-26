import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./Routes/authRoutes.js";
import fieldRoutes from "./Routes/fieldRoutes.js";
import fieldUpdateRoutes from './Routes/fieldUpdateRoutes.js'
import dashboardRoutes from './Routes/dashboardRoutes.js'

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"].filter(Boolean),
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use("/auth", authRoutes);
app.use("/fields", fieldRoutes);
app.use("/updates", fieldUpdateRoutes);
app.use("/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
