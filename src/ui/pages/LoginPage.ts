import type { Locator } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

export class LoginPage extends BasePage {
  get loginForm(): Locator {
    return this.page.locator('form[action="/login"]');
  }

  get usernameInput(): Locator {
    return this.page.locator('[data-qa="login-email"]');
  }

  get passwordInput(): Locator {
    return this.page.locator('[data-qa="login-password"]');
  }

  get loginButton(): Locator {
    return this.page.locator('[data-qa="login-button"]');
  }

  get errorMessage(): Locator {
    return this.loginForm.locator('p').filter({ hasText: 'Your email or password is incorrect!' });
  }

  get signupNameInput(): Locator {
    return this.page.locator('[data-qa="signup-name"]');
  }

  get signupEmailInput(): Locator {
    return this.page.locator('[data-qa="signup-email"]');
  }

  get signupButton(): Locator {
    return this.page.locator('[data-qa="signup-button"]');
  }

  async openLogin(): Promise<void> {
    await this.navigate('/login');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async signup(name: string, email: string): Promise<void> {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }
}
