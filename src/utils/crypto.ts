import { links } from './links';
import pkg, { lib } from 'crypto-js';

const { AES, enc } = pkg;
const SECRET: string = links.secret_key;

export const encode = (message: string): string => AES.encrypt(message, SECRET);

export const decode = (message: lib.CipherParams | string): string => {
  const bytes = AES.decrypt(message, SECRET);

  return bytes.toString(enc.Utf8);
};
