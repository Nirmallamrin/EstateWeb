import express from "express";
import {signup, signin, sendEmail} from "../controllers/userController.js"

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.post("/send-email", sendEmail);

export default userRouter