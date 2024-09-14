import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./Routes/user.js";
import questionRoutes from "./Routes/question.js";
import answerRoutes from "./Routes/answer.js";

const app = express();

dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);

app.get("/", (req, res) => {
  res.send("The Server has Started Running");
});

const PORT = process.env.PORT || 5000;
const database_url = process.env.MONGODB_URL;

mongoose
  .connect(database_url)
  .then(() =>
    app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`))
  )
  .catch((err) => console.log(err.message));
