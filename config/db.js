// config/db.js
const mysql = require("mysql2");
require("dotenv-safe").config(); // loads .env variables

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error("Error connecting to database:", err.message);
    } else {
        console.log("Database connected successfully!");
        connection.release();
    }
});

// Export pool as a promise-based pool
module.exports = pool.promise();
