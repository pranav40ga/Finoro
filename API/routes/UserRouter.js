import express from "express";
import { createUser, getAllUsers, verifyUser,loginUser } from "../Controller/UserController.js";

const router = express.Router();

router.post("/create", createUser);
router.get('/verify/:token',verifyUser);
router.post('/login',loginUser);

export default router;

