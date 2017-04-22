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
function getProduct(id, onFetch) {
	connection.query('SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE item_id = ? ', 
        [id],function(err, rows, fields) {
    		  	if (err) throw err;
     			if(rows && rows.length >0) {
     				var row = rows[0];
     				var product = {
     					id:row.item_id,
	     				name:row.product_name,
     					department:	row.department_name,
     					price:row.price,	
     					quantity:row.stock_quantity
     				};
     				onFetch(product);
     			}


        })
	return product;
}

//update product stock
function updateProductSock(id, amount) {
	connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ? ', 
		[amount, id], function(err, rows, fields) {
    		  	if (err) throw err;
    });
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


Inquirer.prompt(inputs).then(function(request) {
   	var product = getProduct(parseInt(request.productId), function(product) {
		if(product.quantity >= request.quantity) {
			updateProductSock(id, product.quantity - request.quantity);
		} else {
			console.log("Insufficient quantity!");
		}
   	})

});

}


makeOrder();


//connection.end();