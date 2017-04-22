CREATE DATABASE Bamazon;

CREATE TABLE products (
	 item_id INT NOT NULL AUTO_INCREMENT,
     product_name VARCHAR(50) NOT NULL,
     department_name VARCHAR(255),
     price DECIMAL(7,2) NOT NULL,
     stock_quantity DECIMAL(7,2) NOT NULL,
     PRIMARY KEY (item_id)
);

INSERT INTO products(item_id,product_name,department_name,price,stock_quantity) VALUES
    (1,'milk','dairy',2.50,2),(2,'bred','dairy',2.70,8),(3,'egs','dairy',4.50,6),(4,'batter','dairy',6.50,1),(5,'yogurt','dairy',5.50,8),(6,'cheese','dairy',9.50,1), (7,'Coconut milk','dairy',4.50,1),(8,'goad cheese','dairy',10.70,1),(9,'mozarella','dairy',8.50,2),(10,'sour cream','dairy',2.80,1);

