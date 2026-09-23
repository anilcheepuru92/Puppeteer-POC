import Page from "./BasePage.js";
import { firstPriceVal } from "../data/input-data.js";

// Elements

const productName = ".inventory_item_name";
const price = ".inventory_item_price";

Page.prototype.verifyProductName = async function (page) {
  return this.getText(page, productName);
};

Page.prototype.verifyProductPrice = async function (page) {
  await this.waitForText(page, price, firstPriceVal);
  console.log("Price value is:" + (await this.getText(page, price)));
};

export default Page;