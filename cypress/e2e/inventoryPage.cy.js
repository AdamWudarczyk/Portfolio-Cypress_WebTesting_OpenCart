import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';

const loginPage = new LoginPage();
const inventoryPage = new InventoryPage();

describe('SauceDemo – Inventory Page Tests', () => {
    beforeEach(() => {
        loginPage.visit();
        cy.fixture('users').then((data) => {
            loginPage.login(data.validUser.username, data.validUser.password);
            cy.url().should('include', '/inventory.html');
            cy.get('.inventory_list').should('exist');
        });
    });

    it('displays 6 products on the inventory page', () => {
        inventoryPage.getInventoryItems().should('have.length', 6);
    });

    it('adds a specific item to the cart', () => {
        inventoryPage.addItemToCartByName('Sauce Labs Backpack');
        inventoryPage.getCartBadge().should('contain', '1');
    });

    it('sorts products by Name (Z to A)', () => {
        inventoryPage.sortBy('Name (Z to A)');

        inventoryPage.getItemNames().then(($items) => {
            const names = [...$items].map(el => el.innerText.trim());
            const sorted = [...names].sort().reverse(); // oczekiwana kolejność Z → A
            expect(names).to.deep.equal(sorted);
        });
    });

    it('sorts products by Price (low to high)', () => {
        inventoryPage.sortBy('Price (low to high)');
        inventoryPage.getItemNames().first().should('exist');


    });

    it('removes item from the cart after adding it', () => {
        inventoryPage.addItemToCartByName('Sauce Labs Backpack');
        cy.contains('.inventory_item_name', 'Sauce Labs Backpack')
            .closest('.inventory_item')
            .find('button')
            .should('contain', 'Remove')
            .click();
        inventoryPage.getCartBadge().should('not.exist');

    });

    it('navigates to the cart', () => {
        inventoryPage.goToCart();
        cy.url().should('include', '/cart.html');
    })


    it('adds multiple items to the cart and checks cart badge', () => {
            inventoryPage.addItemToCartByName('Sauce Labs Backpack');
            inventoryPage.addItemToCartByName('Sauce Labs Bike Light');
            inventoryPage.getCartBadge().should('have.text', '2');
    });


    it('displays "Add to cart" button for all products', () => {
            inventoryPage.getInventoryItems().each((item) => {
                cy.wrap(item).find('button').should('contain.text', 'Add to cart');
            });
    });


    it('changes button text to "Remove" after adding product to cart', () => {
            inventoryPage.addItemToCartByName('Sauce Labs Fleece Jacket');
            cy.contains('.inventory_item_name', 'Sauce Labs Fleece Jacket')
                .closest('.inventory_item')
                .find('button')
                .should('have.text', 'Remove');
    });

    it('each product displays a valid price', () => {
            cy.get('.inventory_item_price').each(($el) => {
                const price = $el.text().trim();
                expect(price).to.match(/^\$\d+\.\d{2}$/); // np. $29.99
            });
    });

    it('displays added item in cart', () => {
            inventoryPage.addItemToCartByName('Sauce Labs Bolt T-Shirt');
            inventoryPage.goToCart();
            cy.get('.cart_item').should('contain.text', 'Sauce Labs Bolt T-Shirt');
    });
});
