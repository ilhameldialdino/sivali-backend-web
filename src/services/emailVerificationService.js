// services/emailService.js
const nodemailer = require('nodemailer');

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

async function sendVerificationEmail(companyEmail, token) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  const mailOptions = {
    from: 'no-reply@yourapp.com',
    to: companyEmail,
    subject: 'Account Verification',
    text: `You are receiving this email because you (or someone else) have signed up for an account.\n\n
    Please click on the following link, or paste it into your browser to complete the verification process:\n\n
    http://localhost:3000/verify-email?token=${token}\n\n
    If you did not request this, please ignore this email.\n`,
  };

  await transporter.sendMail(mailOptions);
}

async function sendPasswordResetEmail(companyEmail, token) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  const mailOptions = {
    from: 'no-reply@yourapp.com',
    to: companyEmail,
    subject: 'Password Reset',
    text: `You are receiving this email because you (or someone else) have requested the reset of a password.\n\n
    Please click on the following link, or paste it into your browser to complete the process:\n\n
    http://localhost:3000/reset-password?token=${token}\n\n
    If you did not request this, please ignore this email.\n`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};
