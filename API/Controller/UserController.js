

import User from "../Models/User.js";
import sendMail from "./Email.controller.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();


export const createUser = async (req, res) => {
  try {
    const { username, email,password } = req.body;


    const existingUser= await User.findOne({where:{username}});
    if(existingUser){
      res.json({"message":"Account already present"})
    }

    const user = await User.create({...req.body,status:0});

    sendMail(email);

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    console.error(err);
  ``
    res.status(500).json({ message: "Error creating user" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};


export const verifyUser = async (req, res) => {
  
  const token = decodeURIComponent(req.params.token);
  console.log(token);
  try {

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findOne({ where: { email: decoded.email } });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.status === 1) {
      return res.status(200).json({ status: true, message: "User already verified." });
    }

    user.status = 1;
    await user.save();

    res.status(200).json({ message: "Email verified successfully!" });
  } 
  catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};
