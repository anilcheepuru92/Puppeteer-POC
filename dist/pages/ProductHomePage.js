"use strict";

var _chai = require("chai");

var Page = require("../pages/BasePage");

var firstProduct = ".inventory_item_name";
var firstAddToCartBtn = "//button[@class='btn_primary btn_inventory']";
var cartIcon = ".svg-inline--fa";
var productLabel = ".product_label";
var loginbtn = "#login-button";

Page.prototype.verifyValidLogin = async function (page) {
  (0, _chai.expect)((await this.isElementVisible(page, productLabel)), "Product label is not displayed").to.be.true;
  await this.waitForElementToDisappear(page, loginbtn);
};

Page.prototype.verifyProductsCount = async function (page) {
  var size = await this.getElementCount(page, firstProduct);
  return size;
};

Page.prototype.getProductName = async function (page) {
  return this.getText(page, firstProduct);
};

Page.prototype.addProductToCart = async function (page) {
  await this.waitAndClickXpath(page, firstAddToCartBtn); //with xpath
  await page.waitFor(2000);
};

Page.prototype.openCart = async function (page) {
  await this.waitAndClick(page, cartIcon);
  await page.waitFor(2000);
};

module.exports = Page;