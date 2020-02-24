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
            choices: ["View Product Sales by Department", "Create New Department", "Exit"]
        }])
        .then(answers => {
            switch (answers.cmd) {
                case "View Product Sales by Department":
                    viewDepSales();
                    break;
                case "Create New Department":
                    createNewDep();
                    break;
                default:
                    console.log("Exit program!")
                    connection.end();
            }
        });
}


function viewDepSales() {
    connection.query("SELECT * ,(product_sales-over_head_costs) AS total FROM departments", function (err, res) {
        if (err) throw err;
        display(res);
        run();
    });
}

function display(res) {
    // print all items
    console.log("| Department Id |       Department Name       |   Over head costs   |    Product sales    |    Total profit    |");
    console.log("| ------------- | --------------------------- | ------------------- | ------------------- | ------------------ |");
    for (var i = 0; i < res.length; i++) {
        var dep = res[i];
        var id = dep.department_id;
        var name = dep.department_name;
        var overHead = (dep.over_head_costs).toFixed(2);
        var slaes = (dep.product_sales).toFixed(2);
        var total = (dep.total).toFixed(2);

        var d1 = Math.max(0, 13 - id.toString().length);
        var d2 = Math.max(0, 27 - name.length);
        var d3 = Math.max(0, 19 - overHead.toString().length);
        var d4 = Math.max(0, 19 - slaes.toString().length);
        var d5 = Math.max(0, 18 - total.toString().length);

        console.log("| " + id + " ".repeat(d1) + " | " + name + " ".repeat(d2) + " | " + " ".repeat(d3) + overHead + " | " + " ".repeat(d4) + slaes + " | " + " ".repeat(d5) + total + " |");
    }
    console.log("\n");
}


function createNewDep() {
    inquirer
        .prompt([{
            name: "name",
            message: "Please enter the name of the new department."
        },
        {
            name:"overHead",
            message:"What is the overHead of the new department?",
            validate: function(input){
                // must a positive number
                return !isNaN(parseFloat(input)) && input > 0;
            }
        }])
        .then(answers => {
            var query = " INSERT INTO departments SET ?";
            var name = answers.name
            connection.query(query, { department_name: name, over_head_costs: answers.overHead}, function (err) {
                if (err) throw err;
                console.log("Added new department '%s'!", name);
                run();
            });
        })
}