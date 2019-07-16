CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products(
    item_id integer auto_increment not null,
    product_name VARCHAR (50) not NULL,
    department_name VARCHAR (50) not NULL,
    price DECIMAL (10,4) not NULL,
    stock_quantity INT (12) not NULL,
    primary key (item_id)
);
