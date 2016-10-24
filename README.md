# Bamazon

##Bamazon Customer Experience
* displaying all product info
![display](/screenshots/display.png)
* enter product item id for purchase
![itemID](/screenshots/itemID.png)
* enter quantity for purchase
	* insufficient quantity scenario
	![insufficient](/screenshots/insufficient.png)
	* sufficient quantity scenario
	![sufficient](/screenshots/sufficient.png)
	* This also updates the corresponding department TotalSales column for the executive use later.
		* the database has been updated accordingly
		* Frozen Beans quantity went from 300 to 290.
		![beans](/screenshots/beans.png)
		* Frozen department totalsales went up to 13.
		![frozen](/screenshots/frozen.png)

##Bamazon Manager Exeprience
* displaying options
![options](/screenshots/options.png)
	* view products for sale
	![view](/screenshots/view.png)
	* view low inventory
		* no low inventory
		![nolow](/screenshots/noloq.png)
		* no products currently have inventory lower than 5
		![high5](/screenshots/high5.png)
		* we will come back to low inventory later - when we add a new product with an inventory lower than 5
	* add inventory
	![addID](/screenshots/addID.png)
	![addquantity](/screenshots/addquantity.png)
	![added](/screenshots/added.png)
	![addreflected](/screenshots/addreflected.png)
	* add new product
	![addnew](/screenshots/addnew.png)
	![addsuccess](/screenshots/addsuccess.png)
	* now we will go back to low inventory and check if it works.
		* low inventory
		![lowinventory](/screenshots/lowinventory.png)

##Bamazon Executive Exprience
* diaplaying options
![choices](/screenshots/choices.png)
	* view sales by department
	![viewsales](/screenshots/viewsales.png)
	* total profit is auto-calculated. right now they are mostly negative because I have not put in much data for sales
	* create a new department
	![createnew](/screenshots/createnew.png)
		* name
		![name](/screenshots/name.png)
		* overheadcosts
		![overhead](/screenshots/overhead.png)
		* now we have added a new department named 'Low' - which has the 'low' product we created before.
		![departmentlow](/screenshots/departmentlow.png)


######That is all for the Bamazon App!
