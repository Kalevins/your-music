import CryptoJS from 'crypto-js';

// Función para cifrar una cadena
export const encryptURL = (str) => {
  const encrypted = btoa(str);
  return encrypted;
};

// Función para descifrar una cadena
export const decryptURL = (str) => {
  if (!isValidBase64(str)) return str;
  const decrypted = atob(str);
  return decrypted;
};

// Función validar la cadena
export const isValidBase64 = (str) => {
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
};

// Función para cifrar una cadena con AES
export const encryptAES = (str) => {
  if(!str) return str;
  const encrypted = CryptoJS.AES.encrypt(str, import.meta.env.VITE_SECRET_KEY);
  return encrypted.toString();
};

// Función para descifrar una cadena con AES
export const decryptAES = (str) => {
  if(!str) return str;
  const decrypted = CryptoJS.AES.decrypt(str, import.meta.env.VITE_SECRET_KEY);
  return decrypted.toString(CryptoJS.enc.Utf8);
};
