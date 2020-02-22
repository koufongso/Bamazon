var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Welcome to Bamazon!");
    run();
});

function run() {
    showItems();
    // placeOrder();
}


function showItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // print all items
        console.log("Here's the list of all the products for sale!\n")
        console.log("Id" + " ".repeat(6) + "Product Name" + " ".repeat(70 - 12) + "Price");
        console.log("*".repeat(90));
        var idMax = res.length;
        for (var i = 0; i < idMax; i++) {
            var item = res[i];
            var id = item.item_id.toString();
            var name = item.product_name;
            var price = item.price.toFixed(2);

            var d1 = Math.max(2, 8 - id.length);
            var d2 = Math.max(10, 70 - name.length);

            console.log(id + " ".repeat(d1) + name + "-".repeat(d2) + "$" + price);
        }
        console.log("*".repeat(90) + "\n");

        placeOrder(idMax);
    });
}


function placeOrder(idMax) {
    inquirer
        .prompt([{
            type: "confirm",
            name: "isOrder",
            message: "Anything you want to buy?"
        }])
        .then(answers => {
            if (answers.isOrder) {
                inquirer
                    .prompt([
                        {
                            name: "id",
                            message: "Please enter the product id.",
                            validate: function (input) {
                                
                                return input <= idMax && input > 0 && Number.isInteger(parseFloat(input));
                            }
                        },
                        {
                            name: "amount",
                            message: "How many do you want to order?",
                            validate: function (input) {
                                return !isNaN(parseInt(input)) && input > 0 && Number.isInteger(parseFloat(input));
                            }
                        }
                    ])
                    .then(answers => {
                        processOrder(answers);
                    });
            } else {
                quit();
            }
        });
}


function processOrder(order) {
    console.log("Processing your order...");
    // check if store has enough selected product
    var query = "SELECT stock_quantity FROM products WHERE item_id=?";
    connection.query(query, [order.id], function (err, res) {
        if (err) throw err;
        if (res[0].stock_quantity >= order.amount) {
            // enough items
            updateDB(res);
        } else {
            // not enough items
            cancelOrder();
        }
    });
}


function updateDB(res) {
    console.log("updating database...");
    connection.end();
}

function cancelOrder() {
    inquirer
        .prompt([{
            type: "confirm",
            name:"continue",
            message: "Sorry, the products you chose has insufficient quantity! Order is canceled. Do you want to buy anything else?"
        }])
        .then(answers => {
            if (answers.continue) {
                showItems();
            } else {
                quit();
            }
        })
}

function quit() {
    console.log("See you next time!");
    connection.end();
}