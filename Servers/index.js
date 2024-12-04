import express from "express";
import dotenv from "dotenv";
import connect from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./Routers/userRoute.js";
import propertyRouter from "./Routers/propertRoute.js";

dotenv.config();

connect();

const app = express();
const Port = 3000

app.use(express.json());
app.use(cookieParser());
app.use(cors())


app.use("/user", userRouter)
app.use("/property", propertyRouter);

app.get("/", (req, res) => {
  res.send("Estate Web!");
});

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});