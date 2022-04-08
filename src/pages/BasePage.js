var Page = function () {
  //Navigate to the given URL
  this.visit = async function (page, url) {
    await page.goto(url);
  };

  //Wait for element with the given css selector
  this.waitForElement = async function (page, ele) {
    return await page.waitForSelector(ele);
  };

  //Wait for element with the given xpath
  this.waitForElementXpath = async function (page, xpath) {
    return await page.waitForXPath(xpath);
  };

  //Wait for element with the given css selector and then perform click
  this.waitAndClick = async function (page, ele) {
    await this.waitForElement(page, ele);
    return await page.click(ele);
  };

  //Wait for element with the given xpath and then perform click
  this.waitAndClickXpath = async function (page, xpath) {
    await this.waitForElementXpath(page, xpath);
    const elem = await page.$x(xpath);
    await elem[0].click();
  };

  //Wait for element with the given css selector and then enter the provided text
  this.enterText = async function (page, ele, txt) {
    await this.waitForElement(page, ele);
    return await page.type(ele, txt);
  };

  //Wait for element with the given xpath and then enter the provided text
  this.enterTextWithXpath = async function (page, xpath, txt) {
    await this.waitForElementXpath(page, xpath);
    const elem = await page.$x(xpath);
    await elem[0].type(txt);
  };

  //Wait for element with the given css selector and then return the text
  this.getText = async function (page, ele) {
    await this.waitForElement(page, ele);
    return await page.$eval(ele, (elem) => elem.innerText);
  };

  //Wait for element with the given css selector and then return the text
  this.getValueEle = async function (page, ele) {
    await this.waitForElement(page, ele);
    return await page.$eval(ele, (elem) => elem.value);
  };

  //Wait for element with the given css selector and then return the number of elements
  this.getElementCount = async function (page, ele) {
    await this.waitForElement(page, ele);
    return await page.$$eval(ele, (elems) => elems.length);
  };

  //Returns the display status of the given css selector
  this.isElementVisible = async function (page, ele) {
    let visibility = true;
    await page
      .waitForSelector(ele, { visible: true, timeout: 3000 })
      .catch(() => {
        visibility = false;
      });
    return visibility;
  };

  //Returns the display status of the given xpath
  this.isXapthVisible = async function (page, xpath) {
    let visibility = true;
    await page
      .waitForXPath(xpath, { visible: true, timeout: 3000 })
      .catch(() => {
        visibility = false;
      });
    return visibility;
  };

  //Wait for the text of the given css selector to change to the provided text
  this.waitForText = async function (page, ele, text) {
    await this.waitForElement(page, ele);
    await page.waitForFunction(
      (ele, text) => document.querySelector(ele).innerText.includes(text),
      {},
      ele,
      text
    );
  };

  //Wait for an element to disappear
  this.waitForElementToDisappear = async function (page, selector) {
    await page.waitForSelector(selector, { hidden: true, timeout: 3000 });
  };
};

module.exports = Page;
