const crypto = require("crypto");

const ENCRYPTION_KEY = crypto.randomBytes(32);  // 32 bytes for AES-256
const IV_LENGTH = 16;  // AES block size

// Encrypt function
const encrypt = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);  // Generate 16-byte IV
  const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);  // Create cipher
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;  // Return IV + encrypted data
};

// Decrypt function
const decrypt = (encryptedText) => {
  const parts = encryptedText.split(":");  // Split IV and encrypted data
  const iv = Buffer.from(parts[0], "hex");  // Convert IV from hex to buffer
  const encryptedData = parts[1];  // The actual encrypted text

  const decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);  // Create decipher
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;  // Return decrypted text
};

const textToEncrypt = "hira@example.com";
const encryptedText = encrypt(textToEncrypt);
console.log("Encrypted:", encryptedText);
const decryptedText = decrypt(encryptedText);
console.log("Decrypted:", decryptedText);