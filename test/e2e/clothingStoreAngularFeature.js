describe('Clothing Store', function() {

  beforeEach(function() {
    browser.get('http://localhost:8080');
  })

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('Clothing Store');
  });

  it('lists all products available and their details', function() {
    var productImageURL = 'http://localhost:8080/app/images/almond_toe_court_shoes.jpg';
    var productName = 'Almond Toe Court Shoes, Patent Black';
    var productPrice = '£99.00';
    expect(element.all(by.css('.product-image')).first().getAttribute('src')).toMatch(productImageURL);
    expect(element.all(by.css('#product-name')).first().getText()).toEqual(productName);
    expect(element.all(by.css('#price')).first().getText()).toEqual(productPrice);
  });

  it('each product has an add to cart button', function() {
    expect(element.all(by.css('#product-info')).first().element(by.css('#add-to-cart'))).toBeTruthy();
  });

  it('the cart button has a dropdown menu', function() {
    expect(element(by.css('.dropdown-menu')).isDisplayed()).toBe(false);
    element(by.css('.dropdown-toggle')).click();
    expect(element(by.css('.dropdown-menu')).isDisplayed()).toBe(true);
  });

  it('products are added to the cart', function() {
    element.all(by.css('#add-to-cart')).first().click();
    element(by.css('.dropdown-toggle')).click();
    expect(element(by.css('.dropdown-menu')).getText()).toContain('Almond Toe Court Shoes, Patent Black')
  });

});