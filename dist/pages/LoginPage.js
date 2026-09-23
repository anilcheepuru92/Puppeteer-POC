"use strict";

var Page = require("./BasePage");

var usernmbox = "#user-name";
var pwdbox = "//input[@id='password']";
var loginbtn = "#login-button";
var loginErrorMsg = "h3";

Page.prototype.fillLoginForm = async function (page, url, username, password) {
  await this.visit(page, url);
  await this.enterText(page, usernmbox, username);
  await this.enterTextWithXpath(page, pwdbox, password); //with xpath
  var btnText = await this.getValueEle(page, loginbtn);
  console.log("Text of login btn: " + btnText);
  await this.waitAndClick(page, loginbtn);
  await page.waitFor(2000);
};

Page.prototype.verifyInvalidLogin = async function (page, errorMsg) {
  await this.waitForText(page, loginErrorMsg, errorMsg);
};

module.exports = Page;