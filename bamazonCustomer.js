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
    run();
    connection.end();
});

function run(){
    showItems();
    // placeOrder();
}


function showItems(){
    connection.query("SELECT * FROM products",function(err,res){
        if(err) throw err;
        // print all items
        console.log("Here's the list of all the products for sale!\n")
        console.log("Id"+" ".repeat(6)+"Product Name"+" ".repeat(70-12)+"Price");
        console.log("*".repeat(90));
        for(var i=0; i<res.length;i++){
            var item = res[i];
            var id = item.item_id.toString();
            var name = item.product_name;
            var price = item.price.toFixed(2);

            var d1 = Math.max(2,8-id.length);
            var d2 = Math.max(10,70-name.length);

            console.log(id+" ".repeat(d1)+name+"-".repeat(d2)+"$"+price);
        }
        console.log("*".repeat(90)+"\n");
    });
}
