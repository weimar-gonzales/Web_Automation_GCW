import type { Locator } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

export type SignupDetails = {
  password: string;
  day: string;
  month: string;
  year: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
};

export class SignupPage extends BasePage {
  get passwordInput(): Locator {
    return this.page.locator('[data-qa="password"]');
  }

  get daysSelect(): Locator {
    return this.page.locator('[data-qa="days"]');
  }

  get monthsSelect(): Locator {
    return this.page.locator('[data-qa="months"]');
  }

  get yearsSelect(): Locator {
    return this.page.locator('[data-qa="years"]');
  }

  get firstNameInput(): Locator {
    return this.page.locator('[data-qa="first_name"]');
  }

  get lastNameInput(): Locator {
    return this.page.locator('[data-qa="last_name"]');
  }

  get companyInput(): Locator {
    return this.page.locator('[data-qa="company"]');
  }

  get addressInput(): Locator {
    return this.page.locator('[data-qa="address"]');
  }

  get countrySelect(): Locator {
    return this.page.locator('[data-qa="country"]');
  }

  get stateInput(): Locator {
    return this.page.locator('[data-qa="state"]');
  }

  get cityInput(): Locator {
    return this.page.locator('[data-qa="city"]');
  }

  get zipcodeInput(): Locator {
    return this.page.locator('[data-qa="zipcode"]');
  }

  get mobileNumberInput(): Locator {
    return this.page.locator('[data-qa="mobile_number"]');
  }

  get createAccountButton(): Locator {
    return this.page.locator('[data-qa="create-account"]');
  }

  get accountCreatedHeading(): Locator {
    return this.page.getByText('Account Created!');
  }

  get continueLink(): Locator {
    return this.page.getByRole('link', { name: 'Continue' });
  }

  async completeRegistration(details: SignupDetails): Promise<void> {
    await this.passwordInput.fill(details.password);
    await this.daysSelect.selectOption(details.day);
    await this.monthsSelect.selectOption(details.month);
    await this.yearsSelect.selectOption(details.year);
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.companyInput.fill(details.company);
    await this.addressInput.fill(details.address);
    await this.countrySelect.selectOption({ label: details.country });
    await this.stateInput.fill(details.state);
    await this.cityInput.fill(details.city);
    await this.zipcodeInput.fill(details.zipcode);
    await this.mobileNumberInput.fill(details.mobileNumber);
    await this.createAccountButton.click();
  }

  async continueToHome(): Promise<void> {
    await this.continueLink.click();
  }
}
