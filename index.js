import express from "express";
import connectToDatabase from "./database/mongodb.js";
import productRouter from "./routes/product.route.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/product", productRouter);

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Simple CRUD API...");
});


app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectToDatabase();
});
