import { test, expect } from '@playwright/test';

test('test001 - User is able to login successfully', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByRole('form', { name: 'Login' }).click();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="secondary-header"]')).toBeVisible();
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await page.locator('[data-test="secondary-header"]').click();
  await expect(page.locator('[data-test="secondary-header"]')).toContainText('ProductsName (A to Z)Name (A to Z)Name (Z to A)Price (low to high)Price (high to low)');
  await expect(page.locator('[data-test="footer"]')).toBeVisible();
});

test('test002 - User is not able to login with wrong credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('Test');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('TEst');
  await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('path').first()).toBeVisible();
  await expect(page.locator('path').nth(1)).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');

});

test('test003 - New user is able to register', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('TestUser');
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('TestUser');
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('myatuomationuser01@gmail.com');
  await page.getByRole('button', { name: 'Signup' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('Control123!');
  await page.locator('#days').selectOption('8');
  await page.locator('#months').selectOption('5');
  await page.locator('#years').selectOption('1984');
  await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
  await page.getByRole('checkbox', { name: 'Receive special offers from' }).check();
  await page.getByRole('textbox', { name: 'First name *' }).click();
  await page.getByRole('textbox', { name: 'First name *' }).fill('Juan');
  await page.getByRole('textbox', { name: 'Last name *' }).click();
  await page.getByRole('textbox', { name: 'Last name *' }).fill('Perez');
  await page.getByRole('textbox', { name: 'Company', exact: true }).click();
  await page.getByRole('textbox', { name: 'Company', exact: true }).fill('TestCompany');
  await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).click();
  await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('Fake Street 123');
  await page.getByLabel('Country *').selectOption('United States');
  await page.getByRole('textbox', { name: 'State *' }).click();
  await page.getByRole('textbox', { name: 'State *' }).click();
  await page.getByRole('textbox', { name: 'State *' }).fill('Alabama');
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).click();
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('Montgomery');
  await page.locator('#zipcode').click();
  await page.locator('#zipcode').fill('334');
  await page.getByRole('textbox', { name: 'Mobile Number *' }).click();
  await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('9001012345');
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page.locator('b')).toContainText('Account Created!');
  await expect(page.locator('#form')).toContainText('Account Created! Congratulations! Your new account has been successfully created! You can now take advantage of member privileges to enhance your online shopping experience with us. Continue');
  await page.getByRole('link', { name: 'Continue' }).click();
});