import { expect } from "chai";

import Page from "../lib/builder.js";
import { url, username, password, itemCount } from "../data/input-data.js";

import LoginPage from "../pages/LoginPage.js";
import ProductHomePage from "../pages/ProductHomePage.js";
import CartPage from "../pages/CartPage.js";

describe("Buy a product functionality", () => {
  let page;
  let loginPage;
  let productHomePage;
  let cartPage;

  before(async function () {
    page = await Page.build(false);
    loginPage = new LoginPage();
    productHomePage = new ProductHomePage();
    cartPage = new CartPage();
  });

  after(async function () {
    console.log("In after block");
    await page.close();
  });

  it("Verify Valid Login", async function () {
    await loginPage.fillLoginForm(page, url, username, password);
    await productHomePage.verifyValidLogin(page);
  });

  it("Verify the number of products after login", async function () {
    const prodSize = await productHomePage.verifyProductsCount(page);
    expect(prodSize, "Number of products does not match").equals(itemCount);
    console.log("The total products are: " + prodSize);
  });

  it("Add product to cart and open the cart", async function () {
    await productHomePage.addProductToCart(page);
    await productHomePage.openCart(page);
  });

  it("Verify added Product and Price", async function () {
    expect(
      await cartPage.verifyProductName(page),
      "Product Name does not match"
    ).equals(await productHomePage.getProductName(page));
    await cartPage.verifyProductPrice(page);
  });
});
