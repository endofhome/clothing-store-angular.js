# ClothingStoreAngular.js

![Clothing Store screenshot](https://www.dropbox.com/s/a49r9m8nlnjvlx1/screenshot1.png?raw=1)

### Approach
This application represents the frontend for an online clothing store. I decided to use AngularJS for this project. It is written test-first using TDD, tests are written/run using Jasmine, Karma and Protractor.

As the focus was the frontend I decided against using a database for the initial prototype and instead used JSON for the shop inventory and available special offers. In order to have the store scale nicely on mobile and full size computer screens I used Twitter Bootstrap, primarily at this stage to scale images.

I'm still finding my feet with both JavaScript and AngularJS so found that I was still learning as I was going. I'm glad to say that my knowledge of both is such that TDD is now realistically achievable, which is fantastic. I did come across a few blockers while writing the code for this challenge but they were all solved by a quick visit to Stack Overflow or basic web search. I focussed on writing short JavaScript methods and trying to adhere to the software craftsmanship principles I learned at Makers Academy.

I didn't finish the user stories as I ran out of time, and there are some aspect of this project that I'm unhappy with. I plan to push some additional changes to a separate branch and when appropriate merge these to master. I have gone in to more detail about this at the bottom of the README.


### User stories

``` 1. As a User I can add a product to my shopping cart. ```


``` 2. As a User I can remove a product from my shopping cart. ```


``` 3. As a User I can view the total price for the products in my shopping
cart. ```


``` 4. As a User I can apply a voucher to my shopping cart. ```


``` 5. As a User I can view the total price for the products in my shopping cart
with discounts applied. ```


``` 6. As a User I am alerted when I apply an invalid voucher to my shopping
cart. ```


``` 7. As a User I am unable to Out of Stock products to the shopping cart. ```


### Usage

Prerequisites:
Node.js/NPM/Karma/Protractor installed on your machine.

Clone this repo:
``` git clone git@github.com:forty9er/clothing-store-angular.js.git ```

Install dependencies:
``` npm install ```

Bower dependencies will be automatically installed.

Spin up the server:
``` http-server ```

### Testing

To run the unit tests from the root directory:
``` karma start test/karma.conf.js ```

To run the feature tests from the root directory:

``` webdriver-manager start ```

``` protractor test/e2e/conf.js ```


### TODO

* Finish implementing the full functionality.

  This speaks for itself. I try not to leave commented code in my projects but left some in the controller.spec and controller file to show how I was thinking.
* move some of the controller logic into services.

  Predominantly the importing of JSON data. I feel that this should be refractored into services.
* review HTML markup.

  I'm sure this could be better! divs all over the shop.
* Don't use eval()!

  I didn't realise when I designed my system and I've never used eval() before, but I appreciate that it could be unsafe - I should find another way to implement the discounts.
* Use some kind of CI system.

  I have experience with Travis.
* Make the most of Twitter Bootstrap.

  I'm using Bootstrap to enable a better mobile experience, but I could improve the layout the store for larger screens and make more use of the screen real-estate.