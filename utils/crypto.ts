import { links } from 'safira-app/config/links';
import { AES, enc, lib } from 'crypto-js';

const secret: string = links.secret_key;

export const encode = (message: string): string => AES.encrypt(message, secret) as any;

export const decode = (message: lib.CipherParams | string): string => {
  const bytes = AES.decrypt(message, secret);

  return bytes.toString(enc.Utf8);
};
