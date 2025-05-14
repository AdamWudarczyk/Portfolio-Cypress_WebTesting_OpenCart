#  SauceDemo Cypress Tests

End-to-end (E2E) automated tests for the [SauceDemo](https://www.saucedemo.com/) application using Cypress and the Page Object Model pattern. Tests cover login, product interactions, cart functionality, and sorting.

##  Project Structure

cypress/\
├── e2e/ # Test files\
│ ├── login.cy.js\
│ └── inventory.cy.js\
├── pages/ # Page Object Model (POM)\
│ ├── loginPage.js\
│ └── inventoryPage.js\
├── fixtures/ # Test data\
│ └── users.json\
├── support/\
│ └── e2e.js # Plugin imports\


## Running the Tests

### 1. Install dependencies


> npm install

### 2. Run tests in headless mode (CLI)

>npm run cypress:run

### 3. Open Cypress Test Runner (GUI)
> npx cypress open


## Test Report (Mochawesome)

Generate the report:
> npm run cypress:run

Open the report:
> npm run report:open

Report location: cypress/reports/html/index.html


## Test Coverage

### Login
- Successful login with valid credentials
- Invalid password
- Empty username or password
- Locked-out user

### Inventory
- Displays all products
- Sorting by name and price
- Adding/removing products from cart
- Price and label validation
- Navigating to cart page

## Tech Stack

- Cypress – E2E testing framework
- Mochawesome – test report generator
- [Page Object Model (POM)] – clean architecture for test code
- JavaScript (ES6)

____
Created by Adam Wudarczyk

