import type { Locator } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

export class HomePage extends BasePage {
  get loggedInIndicator(): Locator {
    return this.page.getByText(/Logged in as/);
  }

  get logoutLink(): Locator {
    return this.page.getByRole('link', { name: 'Logout' });
  }

  get deleteAccountLink(): Locator {
    return this.page.getByRole('link', { name: 'Delete Account' });
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }
}
