(function () {
  'use strict';

  clothingStoreAngular.controller('ClothingStoreAngularController', ['$http', function($http) {  
    
    var self = this;
    self.inventory = {};
    self.cart = [];
    
    self.addProduct = function(product) {
      self.cart.push(product);
    };

    $http.get("app/json/inventory.json").then(function (response) {
      self.inventory = response.data;
    })

  }]);
}());