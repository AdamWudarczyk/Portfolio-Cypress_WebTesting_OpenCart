export class LoginPage {
    visit() {
        cy.visit('https://www.saucedemo.com/');
    }

    fillUsername(username) {
        cy.get('#user-name').clear().type(username);
    }

    fillPassword(password) {
        cy.get('#password').clear().type(password);
    }

    clickLogin() {
        cy.get('#login-button').click();
    }

    login(username, password) {
        this.fillUsername(username);
        this.fillPassword(password);
        this.clickLogin();
    }

    getErrorMessage() {
        return cy.get('[data-test="error"]');
    }
}