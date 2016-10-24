var mysql = require('mysql');
var prompt = require('prompt');
var connection = mysql.createConnection({
	host:'localhost',
	port:'3306',
	user:'root',
	password:'fddx658',
	database:'bamazon'
});
//displaying item info
connection.query('SELECT ItemID,ProductName,Price FROM produts',function(err,data){
	if(err) {
		console.log('Displaying error')
	};
	console.log('items for sale: ');
	for (var i = 0; i < data.length; i++) {
		console.log('ID: '+data[i].ItemID+' Name: '+data[i].ProductName+' Price: '+data[i].Price);
	};
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
		connection.query('SELECT StockQuantity,Price FROM produts WHERE?',{
			ItemID:res.ID
		},function(err,data){
			if(err) {
				console.log('query match ID error');
			};
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
					console.log('Transaction successful! Your total is: $'+res.quantity*data[0].Price);
					console.log('The chosen item stock quntity is now: '+data[0].StockQuantity);
				})
			}
		})
	})
})