import { Env } from '@config/Env';

export const authData = {
  username: Env.testUsername,
  password: Env.testPassword,
} as const;
