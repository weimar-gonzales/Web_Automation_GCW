import { test, expect } from '@fixtures/index';

test.describe('SignUp page validations', { tag: ['@Login'] }, () => {
  test('Test 2: Verify that a new user is able to register', { tag: ['@[2]'] }, async ({ loginPage, signupPage }) => {
    const uniqueEmail = 'testAutomation@gmail.com';
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
    await expect(signupPage.getAccountCreatedMessage).toContainText('Account Created!');
    await signupPage.continueToHome();
  });

  test.afterEach(async ({ request }, testInfo) => {
    if (['@[2]'].some((tag) => testInfo.tags.includes(tag))) {
      const response = await request.delete('https://automationexercise.com/api/deleteAccount', {
        form: { email: 'testAutomation@gmail.com', password: 'Automation123!' },
      });
    }
  });

  test.afterAll(async ({ page }) => {
    await page.close();
  });
});