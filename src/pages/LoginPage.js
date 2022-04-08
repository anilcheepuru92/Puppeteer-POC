var Page = require("./BasePage");

const usernmbox = "#user-name";
const pwdbox = "//input[@id='password']";
const loginbtn = "#login-button";
const loginErrorMsg = "h3";

Page.prototype.fillLoginForm = async function (page, url, username, password) {
  await this.visit(page, url);
  await this.enterText(page, usernmbox, username);
  await this.enterTextWithXpath(page, pwdbox, password); //with xpath
  const btnText = await this.getValueEle(page, loginbtn); //extract the text of an element when it is present inside value attribute
  console.log("Text of login btn: " + btnText);
  await this.waitAndClick(page, loginbtn);
  await page.waitFor(2000);
};

Page.prototype.verifyInvalidLogin = async function (page, errorMsg) {
  await this.waitForText(page, loginErrorMsg, errorMsg);
};

module.exports = Page;
