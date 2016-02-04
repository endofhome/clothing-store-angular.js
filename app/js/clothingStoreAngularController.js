(function () {
  'use strict';

  clothingStoreAngular.controller('ClothingStoreAngularController', ['$http', function($http) {  
    
    var self = this;
    self.inventory = {};
    
    $http.get("app/json/inventory.json").then(function (response) {
      self.inventory = response.data;
    })

  }]);
}());