import { test as base, expect } from '@playwright/test';
import { Env } from '@config/Env';
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
    await loginPage.login(Env.testUsername, Env.testPassword);
    await use(new InventoryPage(page));
  },
});

export { expect };
