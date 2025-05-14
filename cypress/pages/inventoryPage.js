export class InventoryPage {
    getInventoryItems() {
        return cy.get('.inventory_item');
    }

    getItemNames() {
        return cy.get('.inventory_item_name');
    }

    getSortDropdown() {
        return cy.get('[data-test="product-sort-container"]').should('be.visible');

    }

    sortBy(optionText) {
        this.getSortDropdown().select(optionText);
    }

    addItemToCartByName(productName) {
        cy.contains('.inventory_item', productName)
            .find('button')
            .click();
    }

    goToCart() {
        cy.get('.shopping_cart_link').click();
    }

    getCartBadge() {
        return cy.get('.shopping_cart_badge');
    }
}