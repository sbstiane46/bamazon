DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products(
    item_id integer auto_increment not null,
    product_name VARCHAR (50) not NULL,
    department_name VARCHAR (50) not NULL,
    price DECIMAL (10,2) not NULL,
    stock_quantity INT NOT NULL,
    primary key (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("guitar", "instruments", 599.99, 30),
("exhaust", "automotive", 2999.99, 16),
("harmonica", "instruments", 199.99, 40),
("suspension kit", "automotive", 1800.99, 8),
("table alarm", "home goods", 19.99, 17),
("lamp", "home goods", 199.99, 15),
("toyota headlights", "automotive", 499.99, 25)

SELECT * FROM products;

