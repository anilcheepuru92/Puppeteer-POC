"use strict";

var _chai = require("chai");

var _builder = require("../lib/builder");

var _builder2 = _interopRequireDefault(_builder);

var _inputData = require("../data/input-data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoginPage = require("../pages/LoginPage");
var ProductHomePage = require("../pages/ProductHomePage");

describe("Login functionality", function () {
  var page = void 0;
  var loginPage = void 0;
  var productHomePage = void 0;

  before(async function () {
    page = await _builder2.default.build(false);
    loginPage = new LoginPage();
    productHomePage = new ProductHomePage();
  });

  after(async function () {
    console.log("In after block");
    await page.close();
  });

  it("Verify Invalid Login", async function () {
    await loginPage.fillLoginForm(page, _inputData.url, "invaliduser", "invalidpwd");
    await loginPage.verifyInvalidLogin(page, _inputData.invalidLoginTxt);
  });

  it("Verify Valid Login", async function () {
    await loginPage.fillLoginForm(page, _inputData.url, _inputData.username, _inputData.password);
    await productHomePage.verifyValidLogin(page);
  });
});