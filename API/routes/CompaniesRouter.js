import express from "express";
import { 
  getAllCompanies,
  getCompanyBySymbol,
  filterCompanies,
  searchCompanies
} from "../Controller/CompanyController.js";

const router = express.Router();

// GET /api/companies
router.get("/", getAllCompanies);

// GET /api/companies/:symbol
router.get("/:symbol", getCompanyBySymbol);

// POST /api/companies/filter
router.post("/filter", filterCompanies);

// GET /api/companies/search?q=...
router.post("/search", searchCompanies);

export default router;
