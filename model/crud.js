// models/product.js
const pool = require('../config/db.js');

// Get all stock records
async function getAllProducts() {
  const sql = `
    SELECT 
      id, 
      stock_name, 
      description, 
      quantity, 
      low_threshold, 
      created_at, 
      updated_at 
    FROM stock_management
  `;
  const [rows] = await pool.query(sql);
  return rows;
}

async function createProduct(data) {
  const { stock_name, description, quantity } = data;

  const sql = `
    INSERT INTO stock_management (stock_name, description, quantity)
    VALUES (?, ?, ?)
  `;
  const params = [stock_name, description, quantity];

  const [result] = await pool.query(sql, params);
  return result.insertId;
}



async function updateProduct(stock_name, data) {
  const { description, quantity, low_threshold } = data;

  const sql = `
    UPDATE stock_management
    SET 
      description = ?,
      quantity = ?,
      low_threshold = COALESCE(?, low_threshold)
    WHERE stock_name = ?
  `;

  const [result] = await pool.query(sql, [
    description,
    quantity,
    low_threshold,
    stock_name,
  ]);

  return result.affectedRows;
}


async function deleteProduct(stock_name) {
  const sql = `DELETE FROM stock_management WHERE stock_name = ?`;
  const [result] = await pool.query(sql, [stock_name]);
  return result.affectedRows;
}


async function increaseStock(stock_name, amount) {
  const [rows] = await pool.query(
    "SELECT quantity FROM stock_management WHERE stock_name = ?",
    [stock_name]
  );
  if (rows.length === 0) throw new Error("Item not found");

  const newQuantity = rows[0].quantity + amount;
  await pool.query(
    "UPDATE stock_management SET quantity = ? WHERE stock_name = ?",
    [newQuantity, stock_name]
  );

  return newQuantity;
}


async function decreaseStock(stock_name, amount) {
  const [rows] = await pool.query(
    "SELECT quantity FROM stock_management WHERE stock_name = ?",
    [stock_name]
  );
  if (rows.length === 0) throw new Error("Item not found");

  const current = rows[0].quantity;
  if (current < amount) throw new Error("Insufficient stock");

  const newQuantity = current - amount;
  await pool.query(
    "UPDATE stock_management SET quantity = ? WHERE stock_name = ?",
    [newQuantity, stock_name]
  );

  return newQuantity;
}


async function getLowStockProducts() {
  const sql = `
    SELECT 
      stock_name, 
      description, 
      quantity, 
      low_threshold 
    FROM stock_management
    WHERE quantity < low_threshold
  `;
  const [rows] = await pool.query(sql);
  return rows;
}


module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  increaseStock,
  decreaseStock,
  getLowStockProducts
};
