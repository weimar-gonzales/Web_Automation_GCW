import type { Locator } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

export class CartPage extends BasePage {
  productRow(productName: string): Locator {
    return this.page.getByRole('row').filter({ hasText: productName });
  }

  get proceedToCheckoutLink(): Locator {
    return this.page.getByText('Proceed To Checkout');
  }
}
