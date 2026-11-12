import type { Locator } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

export class InventoryPage extends BasePage {
  get secondaryHeader(): Locator {
    return this.page.locator('[data-test="secondary-header"]');
  }

  get swagLabsHeading(): Locator {
    return this.page.getByText('Swag Labs');
  }

  get footer(): Locator {
    return this.page.locator('[data-test="footer"]');
  }
}
