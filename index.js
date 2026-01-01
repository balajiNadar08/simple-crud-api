import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Simple CRUD API...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


try {
  await mongoose.connect(process.env.DB_URI);
  console.log("Connected to database.");
} catch (error) {
  console.error("Error connecting to database: ", error);
  process.exit(1);
}
