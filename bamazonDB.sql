# create a database
DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;
USE bamazonDB;

# create a table
CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(64) NOT NULL,
    department_name VARCHAR(64) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY(item_id)
);

# insert some item
# 1
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("DairyPure Vitamin D Whole Milk - Half Gallon","Grocery & Food",3.39,50);

# 2
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("DairyPure 2% Reduced Fat Milk - 1 Gallon","Grocery & Food",3.99,50);

# 3
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("365 Everyday Value, Cage-Free Large Brown Eggs, 18 CT","Grocery & Food",4.49,50);

# 4
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("365 Everyday Value, Organic Omega-3 Large Brown Eggs, 12 ct","Grocery & Food",3.99,50);

# 5
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("Algorithms (4th Edition)","Books",69.99,50);

# 6
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("Algorithms for Optimization (The MIT Press)","Books",52.83,50);

# 7
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("The Legend of Zelda: Breath of the Wild","Video Games",50,50);

# 8
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("Super Mario Odyssey","Video Games",57,50);

# 9
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("Apple MacBook Air - Silver","Computers & Accessories",749.99,50);

# 10
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("Lenovo Flex 14 2-in-1 Convertible Laptop","Computers & Accessories",528.98,50);

USE bamazonDB;
SELECT * FROM products;

###########################################################################################
CREATE TABLE departments(
	department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(64) NOT NULL,
    over_head_costs DECIMAL(10,2) NOT NULL,
    product_sales  DECIMAL(65,2) DEFAULT 0.00 ,
    PRIMARY KEY(department_id)
);

INSERT INTO departments(department_name,over_head_costs)
VALUES("Grocery & Food", 10000.00);

INSERT INTO departments(department_name,over_head_costs)
VALUES("Books", 20000.00);

INSERT INTO departments(department_name,over_head_costs)
VALUES("Video Games", 30000.00);

INSERT INTO departments(department_name,over_head_costs)
VALUES("Computers & Accessories", 40000.00);

