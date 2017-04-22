var mysql      = require('mysql');
var Inquirer   = require('inquirer');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'dev',
  database : 'Bamazon'
});

connection.connect(function(err) {
    if(err) {
      if (err) throw err;
    } 
});


//take product details
function getProduct(id) {


}

//update product stock
function updateProductSock(id, amount) {


}

function makeOrder() {
//The app should then prompt users with two messages.
//The first should ask them the ID of the product they would like to buy.
//The second message should ask how many units of the product they would like to buy.

var inputs = [
  {
    type: "input",
    message: "Please enter product id you would like to buy ?",
    name: "productId"
  },
  {
    type: "input",
    message: "How many unit of this product is needed ?",
    name: "quantity"
  }
];

  Inquirer.prompt(inputs).then(function(answers) {
    console.log(answers);
 });



}


connection.end();