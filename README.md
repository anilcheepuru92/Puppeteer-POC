# Puppeteer POC

A proof of concept for browser automation and end-to-end testing with [Puppeteer](https://pptr.dev/), JavaScript, Mocha, Chai, Mochawesome, and the Page Object Model (POM).

The tests use the public [Sauce Demo](https://www.saucedemo.com/) application to demonstrate login validation and a product purchase flow.

## What this project demonstrates

* Launching and controlling Chromium with Puppeteer
* Encapsulating browser actions in reusable page objects
* Using CSS selectors and XPath selectors
* Validating page state and user-visible messages with Chai
* Running tests with Mocha
* Generating HTML and JSON test reports with Mochawesome
* Testing both invalid and valid login scenarios
* Selecting a product, adding it to the cart, and validating its name and price
* Sharing browser/page helpers through a custom builder
* Using JavaScript ES modules for application and test code

## Project structure

```text
.
├── src/
│   ├── data/
│   │   └── input-data.js        # Test URL, credentials, and expected values
│   ├── lib/
│   │   └── builder.js           # Puppeteer browser/page builder
│   ├── pages/
│   │   ├── BasePage.js          # Common page actions
│   │   ├── CartPage.js          # Cart page actions and assertions
│   │   ├── LoginPage.js         # Login page actions and assertions
│   │   └── ProductHomePage.js   # Product listing and cart actions
│   └── tests/
│       ├── buy-product-test.js  # End-to-end product flow
│       └── login-test.js        # Login scenarios
├── MochaReports_*/              # Mochawesome HTML/JSON reports
├── .mocharc.cjs                 # Mocha configuration
├── package.json                 # Project dependencies and configuration
└── package-lock.json            # Locked dependency versions
```

## Prerequisites

* Node.js and npm
* A Chromium-compatible environment supported by Puppeteer
* Network access to https://www.saucedemo.com/

## Installation

Clone the repository and install all the project dependencies with:

```bash
npm install
```

The project uses the following main dependencies:

* Puppeteer — browser automation
* Mocha — test runner
* Chai — assertions
* Mochawesome — test reporting

The project uses native JavaScript ES modules. The `package.json` contains:

```json
"type": "module"
```

The Mocha configuration is kept as `.mocharc.cjs` because it uses CommonJS configuration syntax.

## Test data

Test inputs are centralized in [`src/data/input-data.js`](src/data/input-data.js).

The file currently contains the Sauce Demo URL, test credentials, timeout values, product count, and expected product price.

For real projects, credentials and environment-specific values should be kept outside source control and loaded from environment variables or a secrets manager.

## Running the tests

The Puppeteer builder currently launches the browser in non-headless mode.

Run all tests with:

```bash
npx mocha ./src/tests
```

Run the login tests only:

```bash
npx mocha ./src/tests/login-test.js
```

Run the product flow tests only:

```bash
npx mocha ./src/tests/buy-product-test.js
```

The Mocha configuration sets the test timeout to 30 seconds to allow sufficient time for Puppeteer to launch the browser and initialize the page.

## Test reports

Mochawesome generates HTML and JSON reports after the test execution.

Reports are created in timestamped directories similar to:

```text
MochaReports_Wed  23 Sep 2026 16 45 16 GMT/
├── firstReport_Wed  23 Sep 2026 16 45 16 GMT.html
└── firstReport_Wed  23 Sep 2026 16 45 16 GMT.json
```

Generated reports should generally be excluded from source control.

## Test scenarios

### Login tests

`login-test.js` verifies that:

1. Invalid credentials display the expected login error.
2. Valid credentials successfully navigate to the product page.

### Product flow tests

`buy-product-test.js` verifies that:

1. A valid login succeeds.
2. The expected number of products is displayed.
3. A product can be added to the cart.
4. The cart contains the selected product and its expected price.

## Page Object Model

Page-specific behavior is separated from test cases:

* `LoginPage` handles navigation, credential entry, and login errors.
* `ProductHomePage` handles product visibility, product selection, and cart operations.
* `CartPage` handles cart item and price verification.
* `BasePage` provides reusable browser interaction helpers.
* `Builder` provides browser and page initialization.

This structure keeps test cases focused on behavior and makes selectors and browser operations easier to maintain.

## Module structure

The project uses native ES modules consistently.

Local JavaScript imports include the `.js` extension:

```javascript
import Page from "../lib/builder.js";
import LoginPage from "../pages/LoginPage.js";
```

Default exports use ES module syntax:

```javascript
export default Page;
```

The Mocha configuration remains CommonJS and therefore uses the `.cjs` extension:

```text
.mocharc.cjs
```

## Notes

* The tests depend on the current Sauce Demo UI and test data. Changes to the application may require selector or expectation updates.
* Puppeteer downloads a compatible browser during installation in standard setups.
* The browser is currently launched in non-headless mode by the test builder.
* The Mocha timeout is configured to 30 seconds because Puppeteer browser startup can exceed Mocha's default 2-second timeout.
* `MochaReports_*` contains generated Mochawesome reports and should normally be excluded from source control.
* Make source changes in `src/` rather than generated or report directories.
