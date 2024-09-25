const authService = require('../services/auth'); // Import the service layer
const { body, validationResult } = require('express-validator');
const logger = require('../utils/logger'); // Logging (optional)

//Register (Sign Up) with input validation
async function register(req, res) {
  // Input validation
  await body('company_name');
  await body('company_email').isEmail().run(req);
  await body('company_password').isLength({ min: 6 }).run(req);
  await body('address');
  await body('company_industry');
  await body('company_size');
  await body('company_user_position');
  await body('company_phone_number');
  //await body('company_photo');

  // company_name, 
  // company_email, 
  // company_password, 
  // company_address, 
  // company_industry, 
  // company_size, 
  // company_user_position, 
  // company_phone_number, 
  // company_photo

  const errors = validationResult(req);
  if (!errors.isEmpty()) { 
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Call the service layer's register function
    const { token, company } = await authService.registerUser(req.body);

    // If successful, return the token and company info in the response
    res.status(201).json({ token, company });
  } catch (err) {
    logger.error(`Registration error: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
}

// Login
async function login(req, res) {
  console.log('Login request body:', req.body); // Add this line
  try {
    // Call the service layer's login function
    const { token, company_name, company_email } = await authService.login(req.body);

    // If successful, return the token and company info in the response
    res.status(200).json({ token, company_name, company_email });
  } catch (err) {
    // Handle specific errors (401 for invalid credentials, 400 for other issues)
    const statusCode = err.message.includes('Invalid email or password') ? 401 : 400;
    res.status(statusCode).json({ error: err.message });
  }
}

// Forgot Password
async function forgotPassword(req, res) {
  try {
    const resetToken = await authService.forgotPassword(req.body.company_email);
    res.status(200).json({ message: 'Password reset email sent', resetToken });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Reset Password
async function resetPassword(req, res) {
  try {
    await authService.resetPassword(req.body.token, req.body.newPassword);
    res.status(200).json({ message: 'Password has been reset' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { register, login, forgotPassword, resetPassword };
