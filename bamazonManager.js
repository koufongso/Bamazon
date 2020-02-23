var mysql = require("mysql");
var inquirer = require("inquirer");

const THRESHOLD_QUANTITIES_LOW = 5;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("You are now connected to the Bamazon DataBase");
    run();
});



function run() {
    inquirer
        .prompt([{
            type: "list",
            name: "cmd",
            message: "choose one of them",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }])
        .then(answers => {
            switch (answers.cmd) {
                case "View Products for Sale":
                    viewItems();
                    break;
                case "View Low Inventory":
                    viewItems_Low();
                    break;
                default:
                    "Not recongized command";
                    run();
            }
        });
}


function viewItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        display(res);
        run();
    });
}


function viewItems_Low() {
    var query = "SELECT * FROM products WHERE stock_quantity<?";
    connection.query(query, [THRESHOLD_QUANTITIES_LOW], function (err, res) {
        if(err) throw err;
        display(res);
    })
}


function display(res) {
    // print all items
    console.log("Id" + " ".repeat(6) + "Product Name" + " ".repeat(70 - 12) + "Price" + " ".repeat(10) + "Quantity");
    console.log("*".repeat(100));
    for (var i = 0; i < res.length; i++) {
        var item = res[i];
        var id = item.item_id.toString();
        var name = item.product_name;
        var price = item.price.toFixed(2);
        var quantity = item.stock_quantity.toString();

        var d1 = Math.max(2, 8 - id.length);
        var d2 = Math.max(10, 70 - name.length);
        var d3 = Math.max(2, 14 - price.length);

        console.log(id + " ".repeat(d1) + name + "-".repeat(d2) + "$" + price + " ".repeat(d3) + quantity);
    }
    console.log("*".repeat(100) + "\n");
}