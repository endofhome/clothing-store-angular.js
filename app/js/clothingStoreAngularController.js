(function () {
  'use strict';

  clothingStoreAngular.controller('ClothingStoreAngularController', ['$http', function($http) {  
    
    var self = this;
    self.inventory = {};
    self.offers = {};
    self.cart = [];
    self.discounts = [{"discount": 0}];
    
    self.addProduct = function(product) {
      self.cart.push(product);
    };

    self.removeProduct = function(product) {
      var index = self.cart.indexOf(product);
      self.cart.splice(index, 1)
    };

    self.totalPrice = function() {
      var product;
      var total = [];
      for (product in self.cart) {
       total.push(self.cart[product]["price"]);
      }
      return self.sumTotal(total);
    };

    self.sumTotal = function(total) {
      var result = total.reduce(function(previousValue, currentValue, currentIndex, array) {
        return previousValue + currentValue;
      });
      return result;
    };    

    self.addVoucher = function(offer) { 
      if (self.validateVoucher(offer)) {
        self.discounts.push(offer);
      }
    };

    self.totalDiscounts = function() {
      var offer;
      var total = [];
      for (offer in self.discounts) {
        total.push(self.discounts[offer]["discount"]);
      }
      return self.sumTotal(total);
    };

    self.grandTotal = function() {
      return ((self.totalPrice()) - (self.totalDiscounts()));
    };

    self.validateVoucher = function(offer) {
      var result = false;
      var terms = offer["terms"];
      if ((eval(terms))===true) {
        result = true;
      }
      return result;
    };

    // Working on a method to enable the £15 voucher to be accepted.

    // self.checkForProduct = function(keyword) {
    //   var result = false;
    //   for (product in self.cart) {
    //     if ((product["description"])===(str.match(keyword)))
    //       result = true;
    //       return result;
    //     };
    //     return result;
    //   };
    //   return result;
    //  };

    $http.get("app/json/inventory.json").then(function (response) {
      self.inventory = response.data;
    })

    $http.get("app/json/offers.json").then(function (response) {
      self.offers = response.data;
    })

  }]);
}());