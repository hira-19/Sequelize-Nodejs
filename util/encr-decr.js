const crypto = require("crypto");
require("dotenv").config();

const ENCRYPTION_KEY = Buffer.from(process.env.encryption_key, "hex"); //32bytes
const IV = Buffer.from(process.env.iv_key, "hex"); // 16bytes 

const encrypt = (text) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, IV);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted; //  encrypted data
};

const decrypt = (encryptedText) => {
  const decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, IV);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

module.exports = { encrypt, decrypt };
