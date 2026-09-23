import Page from "./BasePage.js";

import { expect } from "chai";

const firstProduct = ".inventory_item_name";
const firstAddToCartBtn = ".btn.btn_primary";
const cartIcon = ".shopping_cart_link";
const productLabel = ".title";
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
  await this.waitAndClick(page, firstAddToCartBtn); //with xpath
  await page.waitFor(2000);
};

Page.prototype.openCart = async function (page) {
  await this.waitAndClick(page, cartIcon);
  await page.waitFor(2000);
};

export default Page;
