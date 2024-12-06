const crypto = require("crypto");

// Generate a 32-byte (256-bit) encryption key
const key = crypto.randomBytes(32).toString("hex"); // AES-256 requires 32 bytes

// Generate a 16-byte (128-bit) IV
const iv = crypto.randomBytes(16).toString("hex"); // IV for AES should be 16 bytes

console.log("Encryption Key:", key);
console.log("Initialization Vector (IV):", iv);
