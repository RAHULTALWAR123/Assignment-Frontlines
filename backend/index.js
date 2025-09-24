import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import userRoutes from "./routes/CompanyRoutes.js"
import connectDB from "./db/connectDB.js";

const app = express()


dotenv.config();
connectDB();

const PORT = process.env.PORT || 5001;
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/api/company",userRoutes);

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
})