import { LoginPage } from '../pages/loginPage';

const loginPage = new LoginPage();

describe('SauceDemo – Login Tests', () => {

    beforeEach(() => {
        loginPage.visit();
    });

    it('logs in with valid user', () => {
        cy.fixture('users').then((data) => {
            loginPage.login(data.validUser.username, data.validUser.password);
            cy.url().should('include', '/inventory.html');
        });
    });

    it('fails to login with locked out user', () => {
        cy.fixture('users').then((data) => {
            loginPage.login(data.lockedUser.username, data.lockedUser.password);
            loginPage.getErrorMessage().should('contain', 'locked out');
        });
    });

    it('shows error for empty credentials', () => {
        loginPage.clickLogin();
        loginPage.getErrorMessage().should('contain', 'Username is required');
    });

    it('shows error for missing password', () => {
        loginPage.fillUsername('standard_user');
        loginPage.clickLogin();
        loginPage.getErrorMessage().should('contain', 'Password is required');
    });

    it('shows error for invalid credentials', () => {
        loginPage.login('invalid_user', 'wrong_password');
        loginPage.getErrorMessage().should('contain', 'Username and password do not match');
    });
});