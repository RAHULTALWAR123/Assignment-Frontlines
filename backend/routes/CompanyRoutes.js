import express from "express";
import { addCompany,deleteCompany, getAllCompanies, updateCompany } from "../controllers/CompanyController.js";

const router = express.Router();

router.post("/create-company",addCompany);
router.get("/get-All-companies",getAllCompanies);
router.patch("/update-company/:id",updateCompany);
router.delete("/delete-company/:id",deleteCompany);


export default router;