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


function Order(product, quantity) {
	var self = this;
	this.product = product;
	this.quantity = quantity;
	this.total = quantity * product.price;
	this.print = function() {
		console.log('product: ' + self.product.name);
		console.log('price: ' + self.product.price);
		console.log('quantity: ' + self.quantity);
		console.log('total: ' + self.total);
			
	}
}



//take product details
function processProduct(id, onFetch) {
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
}

//update product stock
function updateProductSock(id, amount, onUpdate) {
	connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ? ', 
		[amount, id], function(err, rows, fields) {
    		  	if (err) throw err;
    		  	onUpdate();
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


Inquirer.prompt(inputs).then((request) => {
   		var quantity = parseFloat(request.quantity)
   		var productId = parseInt(request.productId)
	   		processProduct(productId, function(product) {
	   			
				if(product.quantity >= quantity) {
					updateProductSock(product.id, product.quantity - quantity, function() {
						connection.end();
					});
					var order = new Order(product, quantity);
					console.log('Thank you for placing the following order:')
					order.print();
				} else {
					console.log("Insufficient quantity!");
					connection.end();
				}

	   		})



	}).catch((error) => {
			throw error;
	});

}





makeOrder();

//connection.end();
	
