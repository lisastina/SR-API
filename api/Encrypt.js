const crypto = require("crypto");

module.exports = class Encrypt {
  static encrypt(password) {
    return (
    crypto
    .createHmac("sha256", "Don't froget to salt your spaghetti...")
    .update(password)
    .digest("hex")
    );
  }
};