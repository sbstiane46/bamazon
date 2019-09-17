const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");


var connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"123abc",
    database:"bamazon_db"
})

connection.connect(function(err){
    if (err) throw err;
    console.log("connection Successful");
    makeTable();
})

var makeTable = function(){
    connection.query("SELECT * FROM products", function(err,res){
        if (err) throw err;
        
        for(var i=0; i<res.length; i++){
            console.log("ID: " +res[i].item_id+ " ||Product Name: "+res[i].product_name+ " ||Department: " +res[i].department_name+
            " ||Price: "+res[i].price+" ||Quantity: "+res[i].stock_quantity+"\n");
            console.log("==================================================");
        }
        promptCustomer(res);
    })
}

var promptCustomer = function(res) {
    inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "Select item's ID to purchase.\n",
        validate: function(value) {
          if (!isNaN(value) && value < 8) {
            return true;
          }
          return false;
        }
       },
   
       {
        type: "input",
        name: "quantity",
        message: "Enter quantity. \n",
        validate: function(value) {
          if (!isNaN(value)) {
            return true;
          }
          return false;
         }
       }
    ]).then(function(answer){
        var userId = answer.id;
                console.log("Chosen item id: " , userId);
    
                var userQuantity = answer.quantity;
                console.log("Chosen quantity from stock: " , userQuantity , "\n");
    
                connection.query("SELECT * FROM products WHERE ?", [{ item_id : answer.id }], function(err, res) {
                    if (err) throw err;
                    
                    
                    console.table(res);
                    var stock_quantity = res[0].stock;
                    console.log("# in stock: " , stock_quantity);
                    var price = res[0].price;
                    var remaining_quantity = stock_quantity - answer.quantity;
                    console.log("Remaining: " , remaining_quantity);
    
                    if(stock_quantity > answer.quantity) {
    
                        console.log("Remaining: " + remaining_quantity);
    
                        connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?",
                        [
                        remaining_quantity, answer.id
                        ],
                        );

                        connection.query("SELECT * FROM products", function(err, res) {
    
                            console.log("Updated Inventory: ");
                            console.table(res);
                        });
    
                    } else {
                        console.log("Not enough available!");
                    }
    
                connection.end();
    
                });
            })
      }    