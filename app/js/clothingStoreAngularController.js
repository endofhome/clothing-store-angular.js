(function () {
  'use strict';

  clothingStoreAngular.controller('ClothingStoreAngularController', ['$http', function($http) {  
    
    var self = this;
    self.inventory = {};
    self.cart = [];
    
    self.addProduct = function(product) {
      self.cart.push(product);
    };

    self.removeProduct = function(product) {
      var index = self.cart.indexOf(product);
      self.cart.splice(index, 1)
    };

    $http.get("app/json/inventory.json").then(function (response) {
      self.inventory = response.data;
    })

  }]);
}());