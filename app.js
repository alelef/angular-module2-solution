(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var itemToBuy = this;

  itemToBuy.itemName = "";
  itemToBuy.itemQuantity = "";

  itemToBuy.items = ShoppingListCheckOffService.getToBuyItems();
  itemToBuy.isEmpty = function(){
	  if (itemToBuy.items.length<1){
		  return true;
	  }
	  return false;
  }
  
  itemToBuy.checkOff = function (itemIndex) {
    ShoppingListCheckOffService.checkOffItem(itemIndex);
  }
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var itemBought = this;

  itemBought.itemName = "";
  itemBought.itemQuantity = "";

  itemBought.items = ShoppingListCheckOffService.getBoughtItems();
  itemBought.isEmpty = function(){
	  if (itemBought.items.length<1){
		  return true;
	  }
	  return false;
  }

  
  itemBought.checkOff = function () {
    ShoppingListCheckOffService.checkOff(itemBought.itemName, itemBought.itemQuantity);
  }
}

function ShoppingListCheckOffService(){
	var service = this;
	var boughtItems = [];
	var toBuyItems = [{ name: "Cookies", quantity: 10 },{ name: "Milk", quantity: 1 },{ name: "Pop Corn", quantity: 2 }, { name: "chips", quantity: 3 },{ name: "Chocolates", quantity: 7 }];
	
	service.getBoughtItems = function (){
		return boughtItems;
	}
	
	service.getToBuyItems = function (){
		return toBuyItems;
	}
	
	service.checkOffItem = function (indexOfItem){
		var item = service.getToBuyItem(indexOfItem);
		service.removeToBuyItem(indexOfItem);
		service.addBoughtItem(item)
	}
	
	service.addBoughtItem = function (item) {
		boughtItems.push(item);
	}
//	service.addBoughtItem = function (itemName, quantity) {
//		var item = {
//			name: itemName,
//			quantity: quantity
//		};
//		boughtItems.push(item);
//	};

	service.removeToBuyItem = function (itemIndex) {
		toBuyItems.splice(itemIndex, 1);
	};
	service.getToBuyItem = function (itemIndex) {
		return toBuyItems[itemIndex];
	}
}


})();
