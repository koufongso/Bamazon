var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user:"root",
    password:"root",
    database:"bamazonDB"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("Welcome to Bamazon!");
    // run();
    connection.end();
});

function run(){
    showItems();
    placeOrder();
    
}

