CREATE TABLE stock_management (
    id INT AUTO_INCREMENT PRIMARY KEY,
    stock_name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    quantity INT NOT NULL ,
    low_threshold INT NOT NULL DEFAULT 10,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_stock_name ON stock_management(stock_name);
