import express from "express";
import connectToDatabase from "./database/mongodb.js";
import dotenv from "dotenv";
dotenv.config();
import Product from "./models/product.model.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Simple CRUD API...");
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
    console.log(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
    console.log(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
       return res.status(404).json({ message: "Product not found!" });
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
    console.log(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectToDatabase();
});
