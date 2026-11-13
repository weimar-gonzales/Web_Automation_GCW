import { test, expect } from '@fixtures/index';
import { CartPage } from '@pages/CartPage';
import { InventoryPage } from '@pages/InventoryPage';

test('Verify that a product can be added in the cart', async ({ authenticatedPage, page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await inventoryPage.addProductToCart('Blue Top');
  await inventoryPage.continueShopping();
  await inventoryPage.openCart();
  await expect(cartPage.productRow('Blue Top')).toBeVisible();
  await expect(cartPage.proceedToCheckoutLink).toBeVisible();
});
