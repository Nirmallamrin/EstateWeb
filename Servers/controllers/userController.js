import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../generateToken.js";

import dotenv from "dotenv";
dotenv.config();



export const signup = async (req, res) => {
     try {
       const { userName, email, password } = req.body;

       const userExist = await User.findOne({ email });
       if (userExist) {
         return res.status(400).send("User already exists");
       }

       const saltRounds = 10;
       const hashPassword = await bcrypt.hash(password, saltRounds);

       const newUser = new User({
         userName,
         email,
         hashPassword,
       });

       const newUserCreated = await newUser.save();

       if (!newUserCreated) {
         return res.status(400).send("Failed to create user");
       }

       const token = generateToken(email);

       res.cookie("token", token);
       res.status(200).send({ message: "Signed Successfully!", token });
     } catch (error) {
       console.log(error, "Something wrong");
       res.status(500).send("Internal Server Error");
     }
}

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.send("User not found");
    }

    const matchPassword = await bcrypt.compare(password, user.hashPassword);

    if (!matchPassword) {
      return res.send("Password is not correct");
    }

    const token = generateToken(email);

    res.cookie("token", token);
    res.send({ message: "Logged in!", token });
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).send("Internal Server Error");
  }
}



