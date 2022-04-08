var Page = require("../pages/BasePage");

import { expect } from "chai";

const firstProduct = ".inventory_item_name";
const firstAddToCartBtn = "//button[@class='btn_primary btn_inventory']";
const cartIcon = ".svg-inline--fa";
const productLabel = ".product_label";
const loginbtn = "#login-button";

Page.prototype.verifyValidLogin = async function (page) {
  expect(
    await this.isElementVisible(page, productLabel),
    "Product label is not displayed"
  ).to.be.true;
  await this.waitForElementToDisappear(page, loginbtn);
};

Page.prototype.verifyProductsCount = async function (page) {
  const size = await this.getElementCount(page, firstProduct);
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
