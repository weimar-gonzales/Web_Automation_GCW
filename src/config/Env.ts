import dotenv from 'dotenv';

dotenv.config();

type RequiredEnvironmentKey = 'BASE_URL' | 'TEST_USERNAME' | 'TEST_PASSWORD';

const requiredKeys: RequiredEnvironmentKey[] = [
  'BASE_URL',
  'TEST_USERNAME',
  'TEST_PASSWORD',
];

function readRequired(key: RequiredEnvironmentKey): string {
  const value = process.env[key];
  if (!value?.trim()) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

for (const key of requiredKeys) {
  readRequired(key);
}

export const Env = {
  baseUrl: readRequired('BASE_URL'),
  testUsername: readRequired('TEST_USERNAME'),
  testPassword: readRequired('TEST_PASSWORD'),
} as const;
