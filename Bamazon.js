var mysql = require('mysql');
var prompt = require('prompt');
var inquirer = require('inquirer');
var Table = require('cli-table2');
var connection = mysql.createConnection({
	host:'localhost',
	port:'3306',
	user:'root',
	password:'fddx658',
	database:'bamazon'
});
var table = new Table({
chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
head:['ID','Name','Price']	
});
//displaying item info
var bamazon = function(){
	connection.query('SELECT ItemID,ProductName,Price FROM produts',function(err,data){
		if(err) {
			console.log('Displaying error')
		};
		console.log('items for sale: ');
		for (var i = 0; i < data.length; i++) {
			table.push([data[i].ItemID,data[i].ProductName,data[i].Price]);
		};
		console.log(table.toString());
		//prompt to get input
		prompt.get([{
			description:'Enter the Item ID for the item you want to purchase?',
			type:'integer',
			name:'ID'
		},{
			description:'How many do you want to purchase?',
			type:'integer',
			name:'quantity'
		}],function(err,res){
			if (err){
				console.log('prompt error');
			};
			//query the right item
			connection.query('SELECT StockQuantity,Price,DepartmentName FROM produts WHERE?',{
				ItemID:res.ID
			},function(err,data){
				if(err) {
					console.log('query match ID error');
				};
				//update quantity
				if(res.quantity>data[0].StockQuantity){
					console.log('Insufficient quantity!');
					process.exit();
				} else {
					connection.query('UPDATE produts SET? WHERE?',[{
						StockQuantity: data[0].StockQuantity - res.quantity
					},{
						ItemId:res.ID
					}],function(err,result){
						if (err) {
							console.log('update error');
						};
						//displaying product sales and current stock
						console.log('Transaction successful! Your total is: $'+res.quantity*data[0].Price);
						console.log('The chosen item stock quantity is now: '+(data[0].StockQuantity - res.quantity));
						//add sales to department
						connection.query('SELECT * FROM departments WHERE?',{
							DepartmentName: data[0].DepartmentName
						},function(err,response){
							if (err) throw err;
							console.log('Updating sales in '+data[0].DepartmentName+' Department.');
							connection.query('UPDATE departments SET? WHERE?',[{
								TotalSales:response[0].TotalSales+(res.quantity*data[0].Price)
							},{
								DepartmentName: data[0].DepartmentName
							}],function(err,dep){
								if(err) throw err;
								console.log('Department '+data[0].DepartmentName+' has been updated');
								inquirer.prompt([
									{
										type:'list',
										message:'You want to: ',
										name:'command',
										choices:['Exit','Purchase More']
									}
								]).then(function(data){
									var command = data.command;
									if(command==='Exit') {
										process.exit();
									}
									if(command==='Purchase More') {
										bamazon();
									}
								})
							})
						})
					})
				}
			})
		})
	})
}
bamazon();