import type { APIRequestContext } from '@playwright/test';

export class DeleteAccountPage {
  constructor(private readonly request: APIRequestContext) {}

  async deleteAccount(email: string, password: string): Promise<void> {
    const response = await this.request.post('/api/deleteAccount', {
      form: { email, password },
    });

    if (response.ok()) {
      return;
    }

    const responseBody = await response.text();
    throw new Error(`User cleanup failed with ${response.status()}: ${responseBody}`);
  }
}
