import type { Locator } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

export class DeleteAccount extends BasePage {
  get deleteAccountLink(): Locator {
    return this.page.getByRole('link', { name: 'Delete Account' });
  }

  get accountDeletedHeading(): Locator {
    return this.page.getByText('Account Deleted!');
  }

  get accountDeletedMessage(): Locator {
    return this.accountDeletedHeading.locator('..');
  }

  get continueLink(): Locator {
    return this.page.getByRole('link', { name: 'Continue' });
  }

  async deleteAccount(): Promise<void> {
    await this.deleteAccountLink.click();
  }

  async continueToHome(): Promise<void> {
    await this.continueLink.click();
  }
}
