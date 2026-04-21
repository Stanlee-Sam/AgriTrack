import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./Routes/authRoutes.js";
import fieldRoutes from './Routes/fieldRoutes.js'

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use("/auth", authRoutes);
app.use('/fields', fieldRoutes)

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
