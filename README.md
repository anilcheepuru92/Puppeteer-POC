# Puppeteer POC

A proof of concept for browser automation and end-to-end testing with [Puppeteer](https://pptr.dev/), JavaScript, and the Page Object Model (POM).

The tests use the public [Sauce Demo](https://www.saucedemo.com/) application to demonstrate login validation and a product purchase flow.

## What this project demonstrates

- Launching and controlling Chromium with Puppeteer
- Encapsulating browser actions in reusable page objects
- Using CSS selectors and XPath selectors
- Validating page state and user-visible messages with Chai
- Testing both invalid and valid login scenarios
- Selecting a product, adding it to the cart, and validating its name and price
- Sharing browser/page helpers through a custom builder

## Project structure

```text
.
├── src/
│   ├── data/
│   │   └── input-data.js       # Test URL, credentials, and expected values
│   ├── lib/
│   │   └── builder.js          # Puppeteer browser/page builder
│   ├── pages/
│   │   ├── BasePage.js         # Common page actions
│   │   ├── CartPage.js         # Cart page actions and assertions
│   │   ├── LoginPage.js        # Login page actions and assertions
│   │   └── ProductHomePage.js  # Product listing and cart actions
│   └── tests/
│       ├── buy-product-test.js # End-to-end product flow
│       └── login-test.js       # Login scenarios
└── dist/                       # Compiled/distributed JavaScript mirror
```

## Prerequisites

- Node.js and npm
- A Chromium-compatible environment supported by Puppeteer
- Network access to `https://www.saucedemo.com/`

## Installation

Install the project dependencies with npm:

```bash
npm install puppeteer chai
```

If you are setting up the test runner from scratch, install Mocha and the required Babel tooling as well:

```bash
npm install --save-dev mocha @babel/core @babel/register @babel/preset-env
```

> The repository currently contains the test sources but does not include a `package.json`. Add project-specific scripts and dependency versions to a package manifest before running the suite through npm.

## Test data

Test inputs are centralized in [`src/data/input-data.js`](src/data/input-data.js):

- URL: `https://www.saucedemo.com/index.html`
- Username: `standard_user`
- Password: `secret_sauce`
- Expected product count: `6`
- Expected first product price: `29.99`

For real projects, keep credentials and environment-specific values outside source control and load them from environment variables or a secrets manager.

## Running the tests

The test builder currently launches Puppeteer in non-headless mode. After configuring a test script and module transpilation in `package.json`, run the tests with:

```bash
npx mocha src/tests/**/*.js
```

To run an individual suite:

```bash
npx mocha src/tests/login-test.js
npx mocha src/tests/buy-product-test.js
```

## Test scenarios

### Login tests

`login-test.js` verifies that:

1. Invalid credentials display the expected login error.
2. Valid credentials navigate to the product page.

### Product flow tests

`buy-product-test.js` verifies that:

1. A valid login succeeds.
2. The expected number of products is displayed.
3. A product can be added to the cart.
4. The cart contains the selected product and its expected price.

## Page Object Model

Page-specific behavior is separated from test cases:

- `LoginPage` handles navigation, credential entry, and login errors.
- `ProductHomePage` handles product visibility, product selection, and the cart.
- `CartPage` handles cart item and price verification.
- `BasePage` provides reusable browser interaction helpers.

This structure keeps test cases focused on behavior and makes selectors and browser operations easier to maintain.

## Notes

- The tests depend on the current Sauce Demo UI and test data. Changes to that application may require selector or expectation updates.
- Puppeteer downloads a compatible browser during installation in standard setups.
- `dist/` contains the generated/distributed JavaScript counterpart of the `src/` tree; make source changes in `src/` first.

## License

No license has been specified for this repository.
