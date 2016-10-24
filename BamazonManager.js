var mysql = require('mysql');
var inquirer = require('inquirer');
var prompt = require('prompt');
var Table = require('cli-table2');
var connection = mysql.createConnection({
	host:'localhost',
	port:'3306',
	user:'root',
	password:'fddx658',
	database:'bamazon'
});
var table1 = new Table({
chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
head:['ID','Name','Price','StockQuantity']	
});
var table2 = new Table({
chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
head:['ID','Name','Price','StockQuantity']	
});
var table3 = new Table({
chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
head:['ID','Name','Price','StockQuantity']	
});
var manager = function(){
	inquirer.prompt([
			{
				type:'list',
				message:'You want to: ',
				name:'command',
				choices:['View Products for Sale','View Low Inventory','Add to Inventory','Add New Product']
			}
		]).then(function(data){
			var command = data.command;
			if (command==='View Products for Sale') {
				connection.query('SELECT * FROM produts',function(err,res){
					if(err) throw err;
					for (var i = 0; i < res.length; i++) {
						table1.push([res[i].ItemID,res[i].ProductName,res[i].Price,res[i].StockQuantity]);
					}
					console.log(table1.toString());
					inquirer.prompt([
									{
										type:'list',
										message:'You want to: ',
										name:'command',
										choices:['Exit','Go Back']
									}
								]).then(function(data){
									var command = data.command;
									if(command==='Exit') {
										process.exit();
									}
									if(command==='Go Back') {
										manager();
									}
								})
				})
			}
			if(command==='View Low Inventory') {
				connection.query('SELECT * FROM produts WHERE StockQuantity<5',function(err,res){
					if(err) throw err;
					if(res.length===0){
						console.log('No products currently have a quantity lower than 5.')
						inquirer.prompt([
									{
										type:'list',
										message:'You want to: ',
										name:'command',
										choices:['Exit','Go Back']
									}
								]).then(function(data){
									var command = data.command;
									if(command==='Exit') {
										process.exit();
									}
									if(command==='Go Back') {
										manager();
									}
								})
					} else {
						for (var i = 0; i < res.length; i++) {
							table2.push([res[i].ItemID,res[i].ProductName,res[i].Price,res[i].StockQuantity]);
						}
						console.log(table2.toString());
						inquirer.prompt([
									{
										type:'list',
										message:'You want to: ',
										name:'command',
										choices:['Exit','Go Back']
									}
								]).then(function(data){
									var command = data.command;
									if(command==='Exit') {
										process.exit();
									}
									if(command==='Go Back') {
										manager();
									}
								})
					}
				})
			}
			if(command==='Add to Inventory') {
				prompt.get([{
					description:'Enter the Item ID for the item you want to add inventory to?',
					type:'integer',
					name:'ID'
				},{
					description:'How many do you want to add?',
					type:'integer',
					name:'quantity'
				}],function(err,res){
					connection.query('SELECT * FROM produts WHERE?',{
						ItemID:res.ID
					},function(err,data){
						if(err) throw err;
						connection.query('UPDATE produts SET? WHERE?',[{
							StockQuantity:data[0].StockQuantity+res.quantity
						},{
							ItemID:res.ID
						}],function(err,result){
							if(err) throw err;
							console.log('Inventory added!');
							connection.query('SELECT * FROM produts WHERE?',{
								ItemID:res.ID
							},function(err,response){
								console.log('Current inventory is: '+response[0].StockQuantity);
								inquirer.prompt([
									{
										type:'list',
										message:'You want to: ',
										name:'command',
										choices:['Exit','Go Back']
									}
								]).then(function(data){
									var command = data.command;
									if(command==='Exit') {
										process.exit();
									}
									if(command==='Go Back') {
										manager();
									}
								})
							});
						})
					})
				})
			}
			if(command==='Add New Product') {
				inquirer.prompt([
			{
				type:'input',
				message:'Name: ',
				name:'Name'
			},{
				type:'input',
				message:'Department: ',
				name:'Department'
			},{
				type:'input',
				message:'Price: ',
				name:'Price'
			},{
				type:'input',
				message:'Quantity: ',
				name:'Quantity'
			}
		]).then(function(data){
				connection.query('INSERT INTO produts SET?',{
				ProductName:data.Name,
				DepartmentName:data.Department,
				Price:parseFloat(data.Price),
				StockQuantity:parseInt(data.Quantity)
			},function(err,res){
				if(err) throw err;
				console.log('Product added!');
				connection.query('SELECT * FROM produts',function(res,response){
					if(err) throw err;
					for (var i = 0; i < response.length; i++) {
						table3.push([response[i].ItemID,response[i].ProductName,response[i].Price,response[i].StockQuantity]);
						}
						console.log(table3.toString());
						inquirer.prompt([
									{
										type:'list',
										message:'You want to: ',
										name:'command',
										choices:['Exit','Go Back']
									}
								]).then(function(data){
									var command = data.command;
									if(command==='Exit') {
										process.exit();
									}
									if(command==='Go Back') {
										manager();
									}
								})
					});
				})	
			})				
		}
	})
}
manager();