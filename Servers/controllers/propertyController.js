import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
import cloudinary from "cloudinary";
import Property from "../models/propertyModel.js";
import nodemailer from "nodemailer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadProperty = async (req, res) => {
  try {
    const { imageUrl, title, description, ownerEmail } = req.body;

      let uploadedImageUrl;

    // Check if imageUrl is provided
    if (imageUrl) {
      // Upload directly from URL
      const result = await cloudinary.uploader.upload(imageUrl);
      uploadedImageUrl = result.secure_url;
    } else if (req.file) {
      // Upload file from req.file.path
      const result = await cloudinary.uploader.upload(req.file.path);
      uploadedImageUrl = result.secure_url;
    } else {
      return res.status(400).send("No image provided");
    }

    const newProperty = new Property({
      title,
      description,
      ownerEmail,
      imageUrl: uploadedImageUrl,
    });

    const newPropertyCreated = await newProperty.save();
    if (!newPropertyCreated) {
      return res.status(500).send("Property is not created");
    }


    res.status(201).json(newPropertyCreated);
  } catch (error) {
    console.error("Something went wrong:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create property",
    });
  }
};

export const allProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.send(properties)
    } catch (error) {
        console.log(error)
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
};
