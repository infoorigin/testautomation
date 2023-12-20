import { Locator, Page, expect } from '@playwright/test';
class Login {
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;

    constructor(public page: Page) {
        this.page = page;
        this.userName = page.locator("#username");
        this.password = page.locator("#password");
        this.loginButton= page.getByRole("button", {name: 'Login'});
    }

}
module.exports = { Login };