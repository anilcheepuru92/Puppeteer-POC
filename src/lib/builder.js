import puppeteer from "puppeteer";

export default class Builder {
  constructor(page) {
    this.page = page;
  }
  static async build(headlessFlag) {
    const launchOptions = {
      headless: headlessFlag,
      slowMo: 0,
      args: ["--start-maximized"],
    };

    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();
    const extendedPage = new Builder(page);
    await page.setDefaultTimeout(30000);

    return new Proxy(extendedPage, {
      get: function (_target, property) {
        return extendedPage[property] || browser[property] || page[property];
      },
    });
    // return new Proxy(
    //   {},
    //   {
    //     get: function ({}, property) {
    //       return extendedPage[property] || browser[property] || page[property];
    //     },
    //   }
    // );
  }
}
