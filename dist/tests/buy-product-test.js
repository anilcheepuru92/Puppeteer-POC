"use strict";

var _chai = require("chai");

var _builder = require("../lib/builder");

var _builder2 = _interopRequireDefault(_builder);

var _inputData = require("../data/input-data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoginPage = require("../pages/LoginPage");
var ProductHomePage = require("../pages/ProductHomePage");
var CartPage = require("../pages/CartPage");

describe("Buy a product functionality", function () {
  var page = void 0;
  var loginPage = void 0;
  var productHomePage = void 0;
  var cartPage = void 0;

  before(async function () {
    page = await _builder2.default.build(false);
    loginPage = new LoginPage();
    productHomePage = new ProductHomePage();
    cartPage = new CartPage();
  });

  after(async function () {
    console.log("In after block");
    await page.close();
  });

  it("Verify Valid Login", async function () {
    await loginPage.fillLoginForm(page, _inputData.url, _inputData.username, _inputData.password);
    await productHomePage.verifyValidLogin(page);
  });

  it("Verify the number of products after login", async function () {
    var prodSize = await productHomePage.verifyProductsCount(page);
    (0, _chai.expect)(prodSize, "Number of products does not match").equals(_inputData.itemCount);
    console.log("The total products are: " + prodSize);
  });

  it("Add product to cart and open the cart", async function () {
    await productHomePage.addProductToCart(page);
    await productHomePage.openCart(page);
  });

  it("Verify added Product and Price", async function () {
    (0, _chai.expect)((await cartPage.verifyProductName(page)), "Product Name does not match").equals((await productHomePage.getProductName(page)));
    await cartPage.verifyProductPrice(page);
  });
});