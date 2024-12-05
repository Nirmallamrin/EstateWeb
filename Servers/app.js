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
const Port = process.env.PORT || 3000

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,

  })
);



app.use("/user", userRouter)
app.use("/property", propertyRouter);

app.get("/", (req, res) => {
  res.send("Estate Web!");
});

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});