import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../generateToken.js";
import nodemailer from "nodemailer";
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

export const sendEmail = async (req, res) => {
    try {
        const { ownerEmail, message, userName } = req.body;

        const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: process.env.EMAIL,
                  pass: process.env.EMAIL_PASSWORD,
                },
        });

            const mailOptions = {
              from: process.env.EMAIL,
              to: ownerEmail,
              subject: "Property Inquiry",
              text: `${userName} sent the following message: ${message}`,
            };
        
        transporter.sendMail(mailOptions, (err, info) => {
                 if (err) {
                   return res.status(500).send({ message: err.message });
                 }
                 console.log("Email sent: " + info.response);
                 res.status(200).send({ message: "Email sent" });
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}