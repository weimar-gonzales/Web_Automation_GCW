import type { Locator } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

export class CartPage extends BasePage {
  productRow(productName: string): Locator {
    return this.page.getByRole('row', { name: new RegExp(`Product Image ${productName} Women`) });
  }

  get proceedToCheckoutLink(): Locator {
    return this.page.getByText('Proceed To Checkout');
  }
}
