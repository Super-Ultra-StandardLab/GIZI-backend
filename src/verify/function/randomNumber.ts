import * as crypto from 'crypto';

export function generateNumericToken(): string {
  const id = crypto.randomInt(100000, 999999).toString();
  return id;
}
