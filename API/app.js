
import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import UserRouter from "./routes/UserRouter.js";
import NewsRouter from "./routes/NewsRouter.js";
import cors from "cors";
import User from "./Models/User.js"; // required to sync models
import CompaniesRouter from "./routes/CompaniesRouter.js"
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/user", UserRouter);
app.use('/news',NewsRouter);
app.use("/companies",CompaniesRouter);

// Test DB connection and sync models
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ MySQL connected!");
    return sequelize.sync(); // sync tables
  })
  .then(() => {
    console.log("✅ Models synchronized!");
   const PORT=3001;
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ DB Connection Error:", err));
