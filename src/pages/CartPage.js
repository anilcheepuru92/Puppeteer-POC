var Page = require("../pages/BasePage");

import { firstPriceVal } from "../data/input-data";

//Elements
const productName = ".inventory_item_name";
const price = ".inventory_item_price";

Page.prototype.verifyProductName = async function (page) {
  return this.getText(page, productName);
};

Page.prototype.verifyProductPrice = async function (page) {
  await this.waitForText(page, price, firstPriceVal);
  console.log("Price value is:" + (await this.getText(page, price)));
};
module.exports = Page;
