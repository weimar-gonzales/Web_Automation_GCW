import { test as base, expect } from '@playwright/test';
import { authData } from '@data/auth.data';
import { LoginPage } from '@pages/LoginPage';
import { HomePage } from '@pages/InventoryPage';
import { SignupPage } from '@pages/SignupPage';

type FrameworkFixtures = {
  loginPage: LoginPage;
  authenticatedPage: HomePage;
  signupPage: SignupPage;
};

export const test = base.extend<FrameworkFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLogin();
    await loginPage.login(authData.username, authData.password);
    await use(new HomePage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
});

export { expect };
