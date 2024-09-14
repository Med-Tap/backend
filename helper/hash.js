const crypto = require('crypto');

const generateHashId = (userName, userEmail) => {
  const hash = crypto.createHash('sha256');
  hash.update(userName + userEmail);
  const fullHash = hash.digest('hex');
  return fullHash.substring(0, 7); // Return the first 7 characters
};

const generateHashPassword = (password) => {
  const hash = crypto.createHash('sha256');
  hash.update(userName);
  const fullHash = hash.digest('hex');
  return fullHash.substring(0, 7); // Return the first 7 characters
};

module.exports = generateHashId;