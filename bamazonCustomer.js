var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host:"my local",
    port:3306,
    user:"root",
    password:"123abc",
    database:"bamazon_db"
})

connection.connect(function(err){
    if (err) throw err;
    console.log("connection Successful");
})