import { expect } from "chai";
import Page from "../lib/builder";
import { username, password, url, invalidLoginTxt } from "../data/input-data";

var LoginPage = require("../pages/LoginPage");
var ProductHomePage = require("../pages/ProductHomePage");

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
