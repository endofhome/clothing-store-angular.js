describe('ClothingStoreAngular', function() {

  beforeEach(function() {
    browser.get('http://localhost:8080');
  })

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('Clothing Store');
  });

});