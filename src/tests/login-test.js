import { expect } from "chai";
import Page from "../lib/builder.js";
import { username, password, url, invalidLoginTxt } from "../data/input-data.js";

import LoginPage from "../pages/LoginPage.js";
import ProductHomePage from "../pages/ProductHomePage.js";

console.log("LOGIN TEST FILE LOADED");

describe("Login functionality", function () {
  let page;
  let loginPage;
  let productHomePage;

  before(async function () {
    page = await Page.build(false);
    loginPage = new LoginPage();
    productHomePage = new ProductHomePage();
  });

  after(async function () {
    console.log("In after block");
    await page.close();
  });

  it("Verify Invalid Login", async function () {
    await loginPage.fillLoginForm(page, url, "invaliduser", "invalidpwd");
    await loginPage.verifyInvalidLogin(page, invalidLoginTxt);
  });

  it("Verify Valid Login", async function () {
    await loginPage.fillLoginForm(page, url, username, password);
    await productHomePage.verifyValidLogin(page);
  });
});
