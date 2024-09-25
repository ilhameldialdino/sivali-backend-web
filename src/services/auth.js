const pool = require('../db'); // PostgreSQL database connection
const emailService = require('./emailVerificationService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const jwtSecret = process.env.JWT_SECRET || 'default_secret_key';
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

// Helper function to generate custom ID 
async function generateCustomUUID(prefix) {
  // Query the latest ID (assuming company_id is stored as a string like 'RGSTR000000000001')
  const result = await pool.query('SELECT company_id FROM company ORDER BY company_id DESC LIMIT 1');

  let newId = 1; // Default to 1 if there are no existing records

  if (result.rows.length > 0) {
    const lastId = result.rows[0].company_id;
    const lastSequenceNumber = parseInt(lastId.replace(prefix, '')); // Remove the prefix and get the numeric part
    newId = lastSequenceNumber + 1;
  }

  // Return the new custom UUID with leading zeros (e.g., 'RGSTR000000000001')
  return `${prefix}${String(newId).padStart(12, '0')}`;
}

// Register a new user
async function registerUser(companyData) {
  const { company_name, company_email, company_password, company_address, company_industry, company_size, company_user_position, company_phone_number, company_photo } = companyData;

  // Check if the email already exists
  const existingCompany = await pool.query('SELECT * FROM "COMPANY" WHERE company_email = $1', [company_email]);
  if (existingCompany.rows.length > 0) {
    throw new Error('The email is already taken, please choose a different one.');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(company_password, saltRounds);

  // Generate a verification token
  const verification_token = crypto.randomBytes(20).toString('hex');
  const verification_token_expires = new Date(Date.now() + 3600000); // 1 hour

  // Generate custom UUID for company (e.g., 'RGSTR000000000001')
  const company_id = await generateCustomUUID('CMPNY');

  // Insert the new company into the database 
  const result = await pool.query(
    `INSERT INTO "COMPANY" (company_id, company_password, company_industry, company_size, company_name, company_photo,
    company_address, company_email, company_user_position, company_phone_number, is_verified, verification_token, verification_token_expires, reset_password_token, reset_password_expires, 
      job_id, employee_id, pic_id, transaction_id, attendance_id) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) RETURNING *`,
    [company_id, hashedPassword, company_industry, company_size, company_name, company_photo, company_address, company_email, company_user_position, company_phone_number, false, verification_token, verification_token_expires, null, null, job_id, employee_id, pic_id, transaction_id, attendance_id]
  );

  // Generate JWT token
  const token = jwt.sign({ companyId: result.rows[0].company_id }, jwtSecret, { expiresIn: '1h' });

  return {
    token,
    company: {
      company_name: result.rows[0].company_name,
      company_email: result.rows[0].company_email
    }
  };
}

// Login function
async function login(companyData) {

  const { company_email, company_password } = companyData;

  const companyPartner = await pool.query('SELECT * FROM "COMPANY" WHERE company_email = $1', [company_email]);
  
  if (companyPartner.rows.length === 0) {
    throw new Error('Company not found Bro !');
  }

  const company = companyPartner.rows[0];

  if (!company.is_verified) {
    throw new Error('Account not verified. Please check your email.');
  }

  // Compare password
  const isMatch = await bcrypt.compare(company_password, company.company_password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  // Generate JWT token
  const token = jwt.sign({ companyId: company.company_id }, jwtSecret, { expiresIn: '1h' });

  return { token, company_id: company.company_id, company_name: company.company_name, company_email: company.company_email };
}

// Verify email function
async function verifyEmail(token) {
  const companyPartner = await pool.query(
    'SELECT * FROM "COMPANY" WHERE verification_token = $1 AND verification_token_expires > $2',
    [token, new Date()]
  );

  if (companyPartner.rows.length === 0) {
    throw new Error('Verification token is invalid or has expired.');
  }

  const company = companyPartner.rows[0];

  // Update company verification status
  await pool.query(
    `UPDATE "COMPANY" SET is_verified = $1, verification_token = $2, verification_token_expires = $3 WHERE company_id = $4`,
    [true, null, null, company.company_id]
  );
}

// Forgot password function
async function forgotPassword(company_email) {
  const companyPartner = await pool.query('SELECT * FROM "COMPANY" WHERE company_email = $1', [company_email]);

  if (companyPartner.rows.length === 0) {
    throw new Error('Company with that email address does not exist.');
  }

  const resetToken = crypto.randomBytes(20).toString('hex');
  const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour

  // Update the company with the reset token
  await pool.query(
    `UPDATE "COMPANY" SET reset_password_token = $1, reset_password_expires = $2 WHERE company_id = $3`,
    [resetToken, resetTokenExpires, companyPartner.rows[0].company_id]
  );

  // Send password reset email
  await emailService.sendPasswordResetEmail(company_email, resetToken);

  return resetToken;
}

// Reset password function
async function resetPassword(token, newPassword) {
  const companyPartner = await pool.query(
    'SELECT * FROM "COMPANY" WHERE reset_password_token = $1 AND reset_password_expires > $2',
    [token, new Date()]
  );

  if (companyPartner.rows.length === 0) {
    throw new Error('Password reset token is invalid or has expired.');
  }

  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  // Update the company password and clear reset token
  await pool.query(
    `UPDATE "COMPANY" SET company_password = $1, reset_password_token = $2, reset_password_expires = $3 WHERE company_id = $4`,
    [hashedPassword, null, null, companyPartner.rows[0].company_id]
  );
}

module.exports = {
  registerUser,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
