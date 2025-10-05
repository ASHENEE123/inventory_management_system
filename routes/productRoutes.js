
const rateLimit=require("express-rate-limit")
const express = require("express");
const router = express.Router();
const Joi = require("joi");

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  increaseStock,
  decreaseStock,
  getLowStockProducts,
} = require("../model/crud.js");


const getLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 10,
  message: { error: "Too many requests. Please try again later." },
});


const productSchema = Joi.object({
  stock_name: Joi.string().max(20).required(),
  description: Joi.string().max(60).required(),
  quantity: Joi.number().integer().min(0).required()
});

const stockChangeSchema = Joi.object({
  stock_name: Joi.string().max(20).required(),
  amount: Joi.number().integer().min(1).required(),
});


router.get("/products/create", (req, res) => {
  res.render("form", { action: "create", title: "Add Product" });
});


router.get("/products/update", async (req, res) => {
  const products = await getAllProducts();
  res.render("form", { action: "update", title: "Update Product", products });
});


router.get("/products/delete", async (req, res) => {
  const products = await getAllProducts();
  res.render("form", { action: "delete", title: "Delete Product", products });
});


router.get("/products/increase", async (req, res) => {
  const products = await getAllProducts();
  res.render("form", { action: "increase", title: "Increase Stock", products });
});

router.get("/products/decrease", async (req, res) => {
  const products = await getAllProducts();
  res.render("form", { action: "decrease", title: "Decrease Stock", products });
});


router.get("/products/list", getLimiter, async (req, res) => {
  try {
    const products = await getAllProducts();
    res.render("list", { products });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.get("/products/low-stock/view", getLimiter, async (req, res) => {
  try {
    const lowStock = await getLowStockProducts();
    res.render("low_stock", { lowStock });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.post("/products/create", async (req, res) => {
  try {
    const { error, value } = productSchema.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    await createProduct(value);
    res.send({ message: "Product created successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


router.post("/products/update", async (req, res) => {
  try {
    const { error, value } = productSchema.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const rows = await updateProduct(value.stock_name, value);
    if (rows === 0) return res.status(404).send({ error: "Product not found" });

    res.send({ message: "Product updated successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


router.post("/products/delete", async (req, res) => {
  try {
    const { stock_name } = req.body;
    if (!stock_name) return res.status(400).send({ error: "stock_name is required" });

    const rows = await deleteProduct(stock_name);
    if (rows === 0) return res.status(404).send({ error: "Product not found" });

    res.send({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


router.post("/products/increase", async (req, res) => {
  try {
    const { error, value } = stockChangeSchema.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const newQty = await increaseStock(value.stock_name, value.amount);
    res.send({ message: `Stock increased. New quantity: ${newQty}` });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.post("/products/decrease", async (req, res) => {
  try {
    const { error, value } = stockChangeSchema.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const newQty = await decreaseStock(value.stock_name, value.amount);
    res.send({ message: `Stock decreased. New quantity: ${newQty}` });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
