# Bamazon

### General Description

* This is a CLI shopping app. It allows customers to view all products and place orders. It also offer two tools that can do product/deparment management tasks (i.e. restock/add products, view department sales report). 

### Application setup & funtionalities:
* Database:
    * `products`
        * This is a table that contain all products
    * `departments`
        * This is a table that contain all departments
* JS files:
    * `bamazonCustomer.js` - client(customer) interface
        * View all available products/items (cannot see the quantities)
        * Allow customer to place order and update the two tables
    * `bamazonManager.js` - Managemnet interface
        * View all products/items in the products table
        * View all products whose quntities is less than a pre-defined value
        * Restock products
        * Add new product/item
    * `bamazonSupervisor.js` - Management interface
        * View department sales report
        * Add new department

### Demo
* First the database needs to be set up in mySQL by runing the mySQP script file. 
    ![database-products](/demo/demo-database-products.PNG) 
    ![database-departments](/demo/demo-database-departments.PNG)

* `bamazonzCustomer.js`
    * View product list and place order. It will also update the `products` table and the `departments` table. 
    ![customer-normal](/demo/demo-customer-normal.gif)

    * If the current quantities is less than the order amount, it will not place the order and the database will not get affected. 
    ![customer-out-of-stock](/demo/demo-customer-out-of-stock.gif)

*  `bamazonManager.js`
    ![manager-view](/demo/demo-manager)
    
