import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const asyncScrypt = promisify(scrypt);
export class Password {
  static async hashPassword(password: string) {
    const salt = randomBytes(40).toString('hex');
    const hash = (await asyncScrypt(password, salt, 64)) as Buffer;

    return `${hash.toString('hex')}.${salt}`;
  }

  static async comparePassword(
    storedHasspassword: string,
    enteredPassword: string
  ) {
    const [passwordHash, salt] = storedHasspassword.split('.');
    const confirm = (await asyncScrypt(enteredPassword, salt, 64)) as Buffer;

    return passwordHash === confirm.toString('hex');
  }
}
