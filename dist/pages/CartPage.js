"use strict";

var _inputData = require("../data/input-data");

var Page = require("../pages/BasePage");

//Elements
var productName = ".inventory_item_name";
var price = ".inventory_item_price";

Page.prototype.verifyProductName = async function (page) {
  return this.getText(page, productName);
};

Page.prototype.verifyProductPrice = async function (page) {
  await this.waitForText(page, price, _inputData.firstPriceVal);
  console.log("Price value is:" + (await this.getText(page, price)));
};
module.exports = Page;