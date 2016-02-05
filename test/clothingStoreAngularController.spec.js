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
      "name": "Cotton T-Shirt, White",
      "category": "Men's Casual",
      "price": 35.00,
      "quantity": 10, 
      "image": "app/images/cotton_t_shirt.jpg"
    }
  ];
  var discounts = [
    {
      "name": "£5.00 off your order",
      "code": "FIVEOFF",
      "discount": 5.00,
      "terms": "true"
    },
    {
      "name": "£10.00 off when you spend over £50.00",
      "code": "TENOFF",
      "discount": 10.00,
      "terms": "((self.totalPrice()) >= 50.00)"
    },
    {
      "name": "£15.00 off when you have bought at least one footwear item and spent over £75.00",
      "code": "FIFTEENOFF",
      "discount": 15.00,
      "terms": "((self.totalPrice > 75.00) && (self.checkForProduct('Footwear')))"
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

  describe('adding and removing products to shopping cart', function() {
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
  });

  describe('calculating cart totals', function() {
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
  });

  describe('using vouchers', function() {
    it('vouchers can be used', function() {
      ctrl.addProduct(ctrl.inventory[0]);
      ctrl.addVoucher(ctrl.offers[0]);
      expect(ctrl.totalDiscounts()).toEqual(5.00);
      expect(ctrl.grandTotal()).toEqual(60.00);
    });

    it('vouchers are not validated', function() {
      ctrl.addProduct(ctrl.inventory[1]);
      expect(ctrl.validateVoucher(ctrl.offers[0])).toEqual(true);
      expect(ctrl.validateVoucher(ctrl.offers[1])).toEqual(false);
      expect(ctrl.validateVoucher(ctrl.offers[2])).toEqual(false);
    });

    it('vouchers are validated', function() {
      ctrl.addProduct(ctrl.inventory[1]);
      expect(ctrl.validateVoucher(ctrl.offers[0])).toEqual(true);
      expect(ctrl.validateVoucher(ctrl.offers[1])).toEqual(false);
      ctrl.addProduct(ctrl.inventory[1]);
      expect(ctrl.validateVoucher(ctrl.offers[1])).toEqual(true);
    });

    // Writing a test to drive development of a method
    // to enable the £15 voucher to be validated.

    // it('can check for products of a certain category in the cart', function() {
    //   expect(ctrl.checkForProduct).toBeDefined();
    //   ctrl.addProduct(ctrl.inventory[1]);
    //   expect(ctrl.checkForProduct('Footwear')).toEqual(false);
    // });

    it('£10 vouchers are not valid if order is under £50.00', function() {
      ctrl.addProduct(ctrl.inventory[1]);
      ctrl.addVoucher(ctrl.offers[1]);
      expect(ctrl.totalDiscounts()).toEqual(0);
      expect(ctrl.grandTotal()).toEqual(35.00);
    });
  });

});