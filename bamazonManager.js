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
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product","Exit"]
        }])
        .then(answers => {
            switch (answers.cmd) {
                case "View Products for Sale":
                    viewItems();
                    break;
                case "View Low Inventory":
                    viewItems_Low();
                    break;
                case "Add to Inventory":
                    restockItem();
                    break;
                default:
                    connection.end();
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
        if (err) throw err;
        display(res);
        run();
    });
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

function restockItem() {
    inquirer
        .prompt([
            {
                name: "id",
                message: "Please enter the id of the product that you want to resupply.",
                validate: function (input) {
                    // input must greter than 0, and must be integer
                    // for simplicity, not checking if input id is out of bound here
                    return input > 0 && Number.isInteger(parseFloat(input));
                }
            },
            {
                name: "amount",
                message: "How many do you want to add?",
                validate: function (input) {
                    return !isNaN(parseInt(input)) && input > 0 && Number.isInteger(parseFloat(input));
                }
            }
        ])
        .then(answers =>{
            updateDB(answers.id,answers.amount)
        });
}


function updateDB(id, amount) {
    var query = "UPDATE products SET stock_quantity=stock_quantity+? WHERE item_id=?";
    connection.query(query, [amount, id], function (err,res) {
        if (err) throw err;
        if(res.changedRows == 1){
            console.log("You have add %d unit",amount)
        }else{
            console.log("Product not found.")
        }
        run();
    });
}