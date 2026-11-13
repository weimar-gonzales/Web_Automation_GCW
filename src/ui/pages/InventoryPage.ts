import type { Locator } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

export class InventoryPage extends BasePage {
  get loggedInIndicator(): Locator {
    return this.page.getByText(/Logged in as/);
  }

  get logoutLink(): Locator {
    return this.page.getByRole('link', { name: 'Logout' });
  }

  get deleteAccountLink(): Locator {
    return this.page.getByRole('link', { name: 'Delete Account' });
  }

  private productCard(productName: string): Locator {
    return this.page.locator('.product-image-wrapper').filter({ hasText: productName });
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }

  async viewProduct(productName: string): Promise<void> {
    await this.productCard(productName).getByRole('link', { name: /View Product/ }).click();
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.productCard(productName).getByText('Add to cart').first().click();
  }

  async addCurrentProductToCart(): Promise<void> {
    await this.page.getByRole('button', { name: /Add to cart/ }).click();
  }

  async continueShopping(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
  }

  async openHome(): Promise<void> {
    await this.page.getByRole('link', { name: /Home/ }).click();
  }

  async openCart(): Promise<void> {
    await this.page.getByRole('link', { name: /Cart/ }).click();
  }
}

// Kept for compatibility with existing imports while callers migrate to InventoryPage.
export { InventoryPage as HomePage };
