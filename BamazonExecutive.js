var mysql = require('mysql');
var inquirer = require('inquirer');
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
head:['ID','Name','OverHeadCosts','TotalSales','TotalProfit']	
});
var table2 = new Table({
chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
head:['ID','Name','OverHeadCosts','TotalSales','TotalProfit']	
});

inquirer.prompt([
		{
			type:'list',
			message:'You want to: ',
			name:'command',
			choices:['View Product Sales by Department','Create New Department']
		}
	]).then(function(data){
		var command = data.command;
		if(command === 'View Product Sales by Department') {
			connection.query('SELECT DepartmentID, DepartmentName, OverHeadCosts, TotalSales,(TotalSales-OverHeadCosts) as TotalProfit from departments',function(err,res){
				if(err) throw err;
				for (var i = 0; i < res.length; i++) {
					table1.push(
							    [res[i].DepartmentID, res[i].DepartmentName, res[i].OverHeadCosts,res[i].TotalSales,res[i].TotalProfit]
							);
				}
				console.log(table1.toString());
			})
		}
		if(command==='Create New Department') {
			inquirer.prompt([
		{
			type:'input',
			message:'Name: ',
			name:'Name'
		},{
			type:'input',
			message:'Overhead Costs: ',
			name:'Overhead'
		}
	]).then(function(data){
			connection.query('INSERT INTO departments SET?',{
			DepartmentName:data.Name,
			OverHeadCosts:data.Overhead,
			TotalSales:0
		},function(err,res){
			if(err) throw err;
			console.log('Department added!');
			connection.query('SELECT * FROM departments',function(res,response){
				if(err) throw err;
				for (var i = 0; i < response.length; i++) {
					table1.push(
							    [res[i].DepartmentID, res[i].DepartmentName, res[i].OverHeadCosts,res[i].TotalSales,res[i].TotalProfit]
							);
					}
					console.log(table2.toString());
				});
			})	
		})				
	}
})