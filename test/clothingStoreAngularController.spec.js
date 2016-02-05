describe('ClothingStoreAngularController', function() {
  beforeEach(module('ClothingStoreAngular'));

  var ctrl;
  var products = [
    {
      "name": "Blundstone Boots, Brown",
      "category": "Women's Footwear", 
      "price": 65.00,
      "quantity": 3, 
      "image": "app/images/blundstone_boots.jpg"
    },
    {
      "name": "Converse All Stars, Orange",
      "category": "Men's Footwear",
      "price": 35.00,
      "quantity": 10, 
      "image": "app/images/converse_all_stars.jpg"
    }
  ];

  beforeEach(inject(function($controller) {
    ctrl = $controller('ClothingStoreAngularController');
  }));

  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend
    httpBackend
      .when("GET", "app/json/inventory.json")
      .respond(
        ctrl.inventory = products
      );
  }));

  describe('initialisation', function() {
    it('loads an inventory of products', function() {
      expect(ctrl.inventory).toEqual(products);
    });
  });

});