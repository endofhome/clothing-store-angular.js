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
  var discounts = [
    {
      "name": "£5.00 off your order",
      "code": "FIVEOFF",
      "discount": 5.00
    },
    {
      "name": "£10.00 off when you spend over £50.00",
      "code": "TENOFF",
      "discount": 10.00
    },
    {
      "name": "£15.00 off when you have bought at least one footwear item and spent over £75.00",
      "code": "FIFTEENOFF",
      "discount": 15.00
    }
  ]

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
    httpBackend
      .when("GET", "app/json/offers.json")
      .respond(
        ctrl.offers = discounts
      );
  }));

  describe('initialisation', function() {
    it('loads an inventory of products', function() {
      expect(ctrl.inventory).toEqual(products);
    });
  });

  describe('shopping cart', function() {
    it('has a cart', function() {
      expect(ctrl.cart).toBeDefined();
    });

    it('products can be added', function() {
      ctrl.addProduct(ctrl.inventory[0]);
      expect(ctrl.cart).toContain(ctrl.inventory[0]);
    });

    it('products can be removed', function() {
      ctrl.addProduct(ctrl.inventory[0]);
      ctrl.removeProduct(ctrl.inventory[0]);
      expect(ctrl.cart).not.toContain(ctrl.inventory[0]);
    });

    it('item prices can be added together', function() {
      var total = [65, 35];
      expect(ctrl.sumTotal(total)).toEqual(100);
    });

    it('total price can be calculated', function() {
      ctrl.addProduct(ctrl.inventory[0]);
      ctrl.addProduct(ctrl.inventory[1]);
      expect(ctrl.totalPrice()).toEqual(100.00);
      expect(ctrl.grandTotal()).toEqual(100.00);
    });

    it('vouchers can be used', function() {
      ctrl.addProduct(ctrl.inventory[0]);
      ctrl.addVoucher(ctrl.offers[0]);
      expect(ctrl.totalDiscounts()).toEqual(5.00);
      expect(ctrl.grandTotal()).toEqual(60.00);
    });
  });

});