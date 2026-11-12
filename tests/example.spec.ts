import { test, expect } from '@fixtures/index';

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

test('new user can register', async ({ loginPage, signupPage }) => {
  const uniqueEmail = `automation-${Date.now()}@example.invalid`;
  await loginPage.openLogin();
  await loginPage.signup('Automation Test User', uniqueEmail);
  await signupPage.completeRegistration({
    password: 'Automation123!',
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
  await expect(signupPage.accountCreatedHeading).toBeVisible();
  await expect(signupPage.accountCreatedHeading.locator('..')).toContainText('Congratulations! Your new account has been successfully created!');
  await signupPage.continueToHome();
});
