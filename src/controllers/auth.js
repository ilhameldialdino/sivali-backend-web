// controllers/authController.js
const authService = require('../services/auth');

exports.signup = async (req, res) => {
  try {
    // Pass the entire req.body to the authService.registerUser function
    const { company_email } = await authService.registerUser(req.body);

    // Return the company_email in the response
    res.status(201).send({
      message: 'Company registered successfully. Please check your email for verification.',
      email: company_email
    });
  } catch (error) {
    // If the error is about the email being taken, send a specific message
    if (error.message === 'The email is already taken, please choose a different one.') {
      return res.status(400).send({ message: error.message });
    }
    
    // Handle other errors
    res.status(400).send({ message: 'An error occurred during signup.' });
  }
};

exports.login = async (req, res) => {
  try {
    // Pass the entire req.body to the authService.login function
    const { token, company_id, company_name, company_email: email } = await authService.login(req.body); 
    res.status(200).send({ token, company_id, company_name, email });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};


exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    await authService.verifyEmail(token);
    res.status(200).send({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { company_email } = req.body;
    await authService.forgotPassword(company_email);
    res.status(200).send({ message: 'Password reset email sent successfully.' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    await authService.resetPassword(token, newPassword);
    res.status(200).send({ message: 'Password reset successfully.' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
