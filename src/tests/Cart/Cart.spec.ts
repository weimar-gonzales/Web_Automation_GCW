import { test, expect } from '@fixtures/index';
import { CartPage } from '@pages/CartPage';
import { InventoryPage } from '@pages/InventoryPage';

test.describe('Cart page validations', { tag: ['@Cart'] }, () => {
  test('Test 5: Verify that a product can be added in the cart', async ({ authenticatedPage, page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addProductToCart('Blue Top');
    await inventoryPage.continueShopping();
    await inventoryPage.openCart();
    await expect(cartPage.productRow('Blue Top')).toBeVisible();
    await expect(cartPage.proceedToCheckoutLink).toBeVisible();
  });

  test('Test 6: Verify that products can be added in the cart since View product Page', async ({ authenticatedPage, page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.viewProduct('Blue Top');
    await inventoryPage.addCurrentProductToCart();
    await inventoryPage.continueShopping();
    await inventoryPage.openHome();
    await inventoryPage.viewProduct('Men Tshirt');
    await inventoryPage.addCurrentProductToCart();
    await inventoryPage.continueShopping();
    await inventoryPage.openCart();
    await expect(cartPage.productRow('Blue Top')).toBeVisible();
    await expect(cartPage.productRow('Men Tshirt')).toBeVisible();
    await expect(cartPage.proceedToCheckoutLink).toBeVisible();
  });
});
