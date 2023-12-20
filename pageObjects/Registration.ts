import { Locator, Page, expect } from '@playwright/test';
class Registration {
    readonly firstname: Locator;
    readonly userName: Locator;
    readonly password: Locator;
    readonly registerButton: Locator;

    constructor(public page: Page) {
        this.page = page;
        this.firstname = page.locator("#firstname");
        this.userName = page.locator("#username");
        this.password = page.locator("#password");
        this.registerButton= page.getByRole("button", {name: 'Register'});
    }

}
module.exports = { Registration };