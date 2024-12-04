import express from "express";
import {signup, signin,  } from "../controllers/userController.js"
import multer from "multer";
import upload from "../middleware/multer.js";
const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);



export default userRouter