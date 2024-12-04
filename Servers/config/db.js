import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.MONGO_DB);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("error", error);
  }
};

export default connect;
