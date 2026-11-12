import { test, expect } from '@fixtures/index';
import { DeleteAccountPage } from '@pages/DeleteAccountPage';
test.describe('Edit Item test suite', { tag: ['@EditItem'] }, () => {
  test('user can log in successfully', async ({ authenticatedPage }) => {
    await expect(authenticatedPage.loggedInIndicator).toBeVisible();
    await expect(authenticatedPage.logoutLink).toBeVisible();
  });

  test('user sees an error with invalid credentials', async ({ loginPage }) => {
    await loginPage.openLogin();
    await loginPage.login('invalid-user@example.invalid', 'invalid-password');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Your email or password is incorrect!');
  });

  test.describe('new user registration', () => {
    let createdUser: { email: string; password: string } | undefined;

    test.afterEach(async ({ request }, testInfo) => {
      if (!createdUser) {
        return;
      }

      const user = createdUser;
      createdUser = undefined;

      try {
        await new DeleteAccountPage(request).deleteAccount(user.email, user.password);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`Failed to delete registered user ${user.email}: ${message}`);

        if (testInfo.status === 'passed') {
          throw new Error(`Registration cleanup failed: ${message}`);
        }
      }
    });

    test('new user can register', async ({ loginPage, signupPage }) => {
      const uniqueEmail = `testAutomation-${Date.now()}@gmail.com`;
      const password = 'Automation123!';

      await loginPage.openLogin();
      await loginPage.signup('Automation Test User', uniqueEmail);
      await signupPage.completeRegistration({
        password,
        day: '8',
        month: '5',
        year: '1984',
        firstName: 'Automation',
        lastName: 'Test',
        company: 'Test Company',
        address: '123 Test Street',
        country: 'United States',
        state: 'Alabama',
        city: 'Montgomery',
        zipcode: '36104',
        mobileNumber: '9001012345',
      });
      createdUser = { email: uniqueEmail, password };

      await expect(signupPage.accountCreatedHeading).toBeVisible();
      await expect(signupPage.getAccountCreatedMessage).toContainText('Account Created!');
      await signupPage.continueToHome();
    });
  });

});
