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

function Product(id, name, department, price, quantity) {
	var self = this;
	this.id = id;
	this.name = name;
	this.department = department;
	this.price = price;
	this.quantity = quantity;
	this.print = function() {
		console.log('Product:');
		console.log('\tid: ' + self.id);
		console.log('\tname: ' + self.name);
	//	console.log('\tdepartment: ' + self.department);
		console.log('\tprice: ' + self.price);
		console.log('\tquantity: ' + self.quantity);
		console.log('');

	}
}

//select any products where stock_quantity > 0
function viewProductsForSale() {
	connection.query('SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE stock_quantity > 0 ', 
        function(err, rows, fields) {
    		  	if (err) throw err;
     			if(rows) {
     				for(var i=0;i<rows.length;i++){
     				var row = rows[i];
     				var product = new Product(row.item_id,row.product_name,row.department_name,row.price,row.stock_quantity);
     				product.print();
     				}
     			}
        })
}

//select any products where stock_quantity < 5
function viewLowInventory(){
	connection.query('SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE stock_quantity < 5 ', 
        function(err, rows, fields) {
    		  	if (err) throw err;
     			if(rows) {
     				for(var i=0;i<rows.length;i++){
     				var row = rows[i];
     				var product = new Product(row.item_id,row.product_name,row.department_name,row.price,row.stock_quantity);
     				product.print();
     				}
     			}
        })
}

//update stock_quantity where item_id = ?
function addInventory(){
	
	var inputs = [
	  {
	    type: "input",
	    message: "Please enter product id to  ?",
	    name: "productId"
	  },
	  {
	    type: "input",
	    message: "How many unit are you adding ?",
	    name: "quantity"
	  }
	];
	Inquirer.prompt(inputs).then(function(request) {
		var id = parseInt(request.productId);
		var quantity = parseFloat(request.quantity);
		connection.query('UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id =?',
        [quantity, id],function(err, row, fields) {
   		  	  if (err) throw err;
		  	  console.log('The product inventory was modified;')
        })
	})
}

//insert into products
function addNewProduct(){
var inputs = [
	  {
	    type: "input",
	    message: "Please enter product name  ?",
	    name: "name"
	  },
	   {
	    type: "input",
	    message: "Please enter product department  ?",
	    name: "department"
	  },
	   {
	    type: "input",
	    message: "Please enter product price  ?",
	    name: "price"
	  },
	  {
	    type: "input",
	    message: "How many unit are you adding ?",
	    name: "quantity"
	  }
	];
	Inquirer.prompt(inputs).then(function(request) {
		var name = request.name;
		var department = request.department;
		var price = parseFloat(request.price);
		var quantity = parseFloat(request.quantity);
		connection.query('INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES(?,?,?,?)',
        [name, department, price, quantity],function(err, row, fields) {
   		  	  if (err) throw err;
		  	  console.log('The product has been added;')
        })
	})
}


function selectOption() {
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
}


selectOption();

