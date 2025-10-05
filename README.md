# 📦 Inventory Management System

## 🛠️ Tech Stack

- **Node.js** ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
- **Express** ![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
- **EJS** ![EJS](https://img.shields.io/badge/EJS-8A4182?style=flat)
- **MySQL2** ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)
- **Joi** ![Joi](https://img.shields.io/badge/Joi-00ADEF?style=flat)
- **express-rate-limit** ⏱️
- **dotenv-safe** ![dotenv](https://img.shields.io/badge/dotenv-safe-brightgreen)
- **express.urlencoded** 📝
- **SQL Schema File** 🗄️

## ✨ Features

- 📝 **Full CRUD on Products**: Create, Read, Update, Delete operations via UI and API.
- 📊 **Stock Management**: Increase/decrease product quantity, low-stock alerts.
- ⏱ **Rate Limiting**: Prevents abuse (e.g., max 10 requests/minute for product listing).
- ✅ **Schema Validation**: All input is validated using Joi before any DB action.
- 🛡️ **Robust Error Handling**: Handles invalid input, missing resources, and DB errors gracefully.
- 🔒 **Environment Safety**: Ensures all required env variables are set before startup.
- 📱 **Responsive UI**: EJS templates for user-friendly forms and lists.
- 🗄️ **SQL Setup**: Includes a `.sql` file to initialize your database schema easily.

## 🚦 How It Works

### 🛣️ Real-Time CRUD via Routes

- **GET `/products/list`**  
  📋 Renders all products (rate-limited).

- **GET `/products/create`**  
  ➕ Form to add a new product.

- **POST `/products/create`**  
  🟢 Validates and inserts a new product into the DB.

- **GET `/products/update`**  
  📝 Form to update a product.

- **POST `/products/update`**  
  🟡 Validates and updates an existing product.

- **GET `/products/delete`**  
  ❌ Form to delete a product.

- **POST `/products/delete`**  
  🔴 Deletes a product by name.

- **GET `/products/increase`**  
  ⬆️ Form to increase stock.

- **POST `/products/increase`**  
  ➕ Increases product stock, returns new quantity.

- **GET `/products/decrease`**  
  ⬇️ Form to decrease stock.

- **POST `/products/decrease`**  
  ➖ Decreases product stock, returns new quantity.

- **GET `/products/low-stock/view`**  
  🚨 Shows products below their threshold.

### ⚡ Real-Time Example

When you POST to `/products/increase` or `/products/decrease`:
- Joi validates your input.
- The backend checks the DB for the product.
- Stock is increased/decreased atomically, and the UI updates instantly.

### 🧩 How Dependencies Are Used

- **express**: Sets up the server, routers, and uses `express.urlencoded({ extended: true })` to parse form submissions.
- **EJS**: Renders forms and product lists with dynamic data.
- **mysql2**: Handles all DB queries via a connection pool (`config/db.js`).
- **joi**: Ensures all incoming data matches required schema before DB actions.
- **express-rate-limit**: Limits certain endpoints (like `/products/list`) to 10 requests per minute.
- **dotenv-safe**: Ensures all required variables for DB, port, etc., are set before the app runs.
- **SQL file**: Provided in the repo, run this file in your MySQL to create the `stock_management` table and any necessary schema.

### 🛡️ Error Handling

- Input errors (bad data) return 400 with details.
- Not found errors (missing product) return 404.
- Server/DB errors return 500 with the message.
- Stock decrease checks for insufficient inventory and returns a relevant message.
##Screenshots
![image](https://github.com/ASHENEE123/inventory_management_system/blob/main/Screenshot%202025-10-05%20154359.png)
![image](https://github.com/ASHENEE123/inventory_management_system/blob/main/Screenshot%202025-10-05%20154419.png)
![image](https://github.com/ASHENEE123/inventory_management_system/blob/main/Screenshot%202025-10-05%20154435.png)
![image](https://github.com/ASHENEE123/inventory_management_system/blob/e44b815483b5c1fe3c1a36d80dc37e56e8493ba8/Screenshot%202025-10-05%20154516.png)
![image](https://github.com/ASHENEE123/inventory_management_system/blob/e44b815483b5c1fe3c1a36d80dc37e56e8493ba8/Screenshot%202025-10-05%20154531.png)
![image](https://github.com/ASHENEE123/inventory_management_system/blob/e44b815483b5c1fe3c1a36d80dc37e56e8493ba8/Screenshot%202025-10-05%20154556.png)
![image](https://github.com/ASHENEE123/inventory_management_system/blob/e44b815483b5c1fe3c1a36d80dc37e56e8493ba8/Screenshot%202025-10-05%20154904.png)




## 🚀 How to Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ASHENEE123/inventory_management_system.git
   cd inventory_management_system
   ```

2. **Set up the database:**
   - Open your MySQL client and run the provided `.sql` file to create the database and tables.

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in your DB credentials and port.

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Start the server:**
   ```bash
   npm start set in scripts with the main file name or run with node file name
   ```

6. **Visit in your browser:**
   - Go to `http://localhost:3000` (or the port in your `.env`).

## ⚙️ Example Environment (.env)
```env
HOST=localhost
USER=your_mysql_user
PASSWORD=your_mysql_password
DATABASE=your_database
PORT=3000
```

## 🗄️ SQL File Example

A typical `.sql` file (see the repo for the full version):

```sql
CREATE TABLE stock_management (
  id INT AUTO_INCREMENT PRIMARY KEY,
  stock_name VARCHAR(20) NOT NULL,
  description VARCHAR(60) NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  low_threshold INT NOT NULL DEFAULT 5,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```
##Optimzation
Added index for fast retrieval and accessing instead of relying accesing dat
here created on stock_name 
---

## 🌟 Summary

This project is a robust, real-time inventory system with input validation, error handling, rate limiting, and easy setup using Node.js, Express, MySQL2, Joi, EJS, and dotenv-safe.
