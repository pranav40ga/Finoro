import Company from "../Models/Company.js";
import { Op } from "sequelize";
import Sequelize from "sequelize";
// GET /api/companies
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// GET /api/companies/:symbol
export const getCompanyBySymbol = async (req, res) => {
  try {
    const { symbol } = req.params;
    const company = await Company.findOne({ where: { symbol } });
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const filterCompanies = async (req, res) => {
  try {
    const {
      minROCE, maxROCE,
      minPE, maxPE,
      minMarketCap, maxMarketCap
    } = req.body;

    const filters = {};

    if (minROCE || maxROCE) {
      filters.ROCE = {};
      if (minROCE) filters.ROCE[Op.gte] = minROCE;
      if (maxROCE) filters.ROCE[Op.lte] = maxROCE;
    }

    if (minPE || maxPE) {
      filters.peRatio = {};
      if (minPE) filters.peRatio[Op.gte] = minPE;
      if (maxPE) filters.peRatio[Op.lte] = maxPE;
    }

    if (minMarketCap || maxMarketCap) {
      filters.marketCap = {};
      if (minMarketCap) filters.marketCap[Op.gte] = minMarketCap;
      if (maxMarketCap) filters.marketCap[Op.lte] = maxMarketCap;
    }

    // Exclude companies with null values in any of the filtering fields
    const nonNullFilters = {
      ...(filters.ROCE && { ROCE: { ...filters.ROCE, [Op.not]: null } }),
      ...(filters.peRatio && { peRatio: { ...filters.peRatio, [Op.not]: null } }),
      ...(filters.marketCap && { marketCap: { ...filters.marketCap, [Op.not]: null } }),
    };

    const companies = await Company.findAll({
      where: nonNullFilters
    });

    res.json(companies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Post /api/companies/
export const searchCompanies = async (req, res) => {
  try {
    console.log("this is search companies");
    console.log(req.body);
    const { query } = req.body;
  
    if (!query || query.length==0) {
      return res.status(400).json({ message: "Search query missing" });
    }

    const companies = await Company.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${query}%` } },
   
          Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', `%${query.toLowerCase()}%`),
   
          Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('symbol')), 'LIKE', `%${query.toLowerCase()}%`)
  ]
        
      }
    });

    if (companies.length === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json(companies);
    console.log(companies);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
