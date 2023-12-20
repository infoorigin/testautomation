import { Page } from '@playwright/test';

const { Login } = require('./LoginPage');
const { Registration } = require('./Registration');

class POManager {
    readonly loginPage: any;
    readonly registrationPage: any;

    constructor(public page: Page) {
        this.page = page;
        this.loginPage = new Login(this.page);
        this.registrationPage = new Registration(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getRegistrationPage() {
        return this.registrationPage;
    }


}
module.exports = { POManager };