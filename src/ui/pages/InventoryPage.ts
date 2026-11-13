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

  private get currentProductAddToCartButton(): Locator {
    return this.page.getByRole('button', { name: /Add to cart/ });
  }

  private get continueShoppingButton(): Locator {
    return this.page.getByRole('button', { name: 'Continue Shopping' });
  }

  private get homeLink(): Locator {
    return this.page.getByRole('link', { name: /Home/ });
  }

  private get cartLink(): Locator {
    return this.page.getByRole('link', { name: /Cart/ });
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
    await this.currentProductAddToCartButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async openHome(): Promise<void> {
    await this.homeLink.click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}

// Kept for compatibility with existing imports while callers migrate to InventoryPage.
export { InventoryPage as HomePage };
