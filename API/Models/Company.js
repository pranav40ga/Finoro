import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Company = sequelize.define(
  "Company",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
     
      validate: {
        notEmpty: true
      }
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    marketCap: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    peRatio: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    ROE: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    ROCE: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    debtToEquity: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    salesGrowth: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    profitGrowth: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    tableName: "company", // ✅ correct spelling
    freezeTableName: true // optional: prevents Sequelize from pluralizing to "companies"
  }
);

export default Company;
