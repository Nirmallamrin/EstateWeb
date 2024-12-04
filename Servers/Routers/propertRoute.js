import express from "express";
import upload from "../middleware/multer.js";
import {
  uploadProperty,
    allProperties,
  sendEmail
} from "../controllers/propertyController.js";

const propertyRouter = express.Router()

propertyRouter.post("/upload-property", upload.single("image"), uploadProperty);
propertyRouter.get("/properties", allProperties)
propertyRouter.post("/send-email", sendEmail);

export default propertyRouter