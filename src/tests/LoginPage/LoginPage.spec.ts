import { test, expect } from '@fixtures/index';
import { authData } from '@data/auth.data';
import { HomePage } from '@pages/HomePage';

test.describe('login and sing up page validations', { tag: ['@Login'] }, () => {
  test('Test 1: Verify that error message is displayed for wrong credentials', async ({ loginPage }) => {
    await loginPage.openLogin();
    await loginPage.login('invalid-user@example.invalid', 'invalid-password');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Your email or password is incorrect!');
  });

  test('Test 2: Verify that a user is able to log in with valid credentials', async ({ loginPage, page }) => {
    await loginPage.openLogin();
    await loginPage.login(authData.username, authData.password);

    const homePage = new HomePage(page);
    await expect(homePage.loggedInIndicator).toBeVisible();
  });

  test.afterAll(async ({ page }) => {
    await page.close();
  });
});