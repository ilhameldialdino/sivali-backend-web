const bcrypt = require('bcryptjs');

const saltRounds = 10; // Define the number of salt rounds for hashing

// Method to hash a password
async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
}

// Method to compare the entered password with the hashed password
async function comparePassword(enteredPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing password');
  }
}

module.exports = { hashPassword, comparePassword };
