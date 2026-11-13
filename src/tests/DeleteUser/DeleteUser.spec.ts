import { test, expect } from '@fixtures/index';
import { DeleteAccount } from '@pages/DeleteAccount';
import { HomePage } from '@pages/HomePage';

test('test 4: Verify that user account can be deleted', async ({ loginPage, signupPage, page }) => {
  const deleteAccount = new DeleteAccount(page);
  const homePage = new HomePage(page);

  await loginPage.openLogin();
  await loginPage.signup('DeleteUSer', 'deleteUser@gmailTest.com');
  await signupPage.completeRegistration({
    password: '123',
    day: '12',
    month: '1',
    year: '2003',
    firstName: 'Delete',
    lastName: 'User',
    company: 'Test',
    address: 'Test',
    country: 'United States',
    state: 'Test',
    city: 'Test',
    zipcode: '0000',
    mobileNumber: '123456789',
  });
  await signupPage.continueToHome();
  await deleteAccount.deleteAccount();
  await expect(deleteAccount.accountDeletedHeading).toBeVisible();
  await expect(deleteAccount.accountDeletedMessage).toContainText('Account Deleted!');
  await deleteAccount.continueToHome();
  await expect(homePage.signupLoginLink).toBeVisible();
});
