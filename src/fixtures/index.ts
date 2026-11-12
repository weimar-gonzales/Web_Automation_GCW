import { test as base, expect } from '@playwright/test';
import { authData } from '@data/auth.data';
import { LoginPage } from '@pages/LoginPage';
import { InventoryPage } from '@pages/InventoryPage';

type FrameworkFixtures = {
  loginPage: LoginPage;
  authenticatedPage: InventoryPage;
};

export const test = base.extend<FrameworkFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLogin();
    await loginPage.login(authData.username, authData.password);
    await use(new InventoryPage(page));
  },
});

export { expect };
