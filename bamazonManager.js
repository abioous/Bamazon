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



function viewProductsForSale() {

}
function viewLowInventory(){

}
function addInventory(){

}


Inquirer.prompt([
  {
    type: 'list',
    name: 'option',
    message: 'What do you want to do?',
    choices: [
      'View Products for Sale',
      'View Low Inventory',
	  'Add to Inventory',
	  'Add New Product'
    ]
  }
]).then(function (request) {
	console.log(request);
	switch(request.option) {
		case 'View Products for Sale':
			viewProductsForSale();
		break;
		case 'View Low Inventory':
			viewLowInventory();
		break;
		case 'Add to Inventory':
			addInventory();
		break;
		case 'Add New Product':
			addNewProduct();

	}
});


