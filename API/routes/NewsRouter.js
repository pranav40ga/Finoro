import express from "express";
import { News } from "../Controller/NewsController.js";
const router=express.Router();
router.get('/',News);
export default router;
