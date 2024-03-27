import CryptoJS from 'crypto-js';

export const encryptAES = (str) => {
  if(!str) return str;
  const encrypted = CryptoJS.AES.encrypt(str, import.meta.env.VITE_SECRET_KEY);
  return encrypted.toString();
};

export const decryptAES = (str) => {
  if(!str) return str;
  const decrypted = CryptoJS.AES.decrypt(str, import.meta.env.VITE_SECRET_KEY);
  return decrypted.toString(CryptoJS.enc.Utf8);
};
