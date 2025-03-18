import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_SECRETE_KEY;

export const encryptData = (data) => {
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretKey
  ).toString();
  return ciphertext;
};

export const decryptData = (encryptedData) => {
    if (!encryptData || encryptData === null) return null
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const originalData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return originalData;
};
