const PaymentServiceInstitution = require('../models/paymentServiceInstitution');

// Helper function to generate custom ID 
async function generateCustomUUID(prefix) {
    // Query the latest ID (assuming payment_institution_id is stored as a string like 'RGSTR000000000001')
    const result = await pool.query('SELECT payment_institution_id FROM company ORDER BY payment_institution_id DESC LIMIT 1');
  
    let newId = 1; // Default to 1 if there are no existing records
  
    if (result.rows.length > 0) {
      const lastId = result.rows[0].payment_institution_id;
      const lastSequenceNumber = parseInt(lastId.replace(prefix, '')); // Remove the prefix and get the numeric part
      newId = lastSequenceNumber + 1;
    }
  
    // Return the new custom UUID with leading zeros (e.g., 'RGSTR000000000001')
    return `${prefix}${String(newId).padStart(12, '0')}`;
}

async function createPaymentServiceInstitution(paymentInstitutionData) {
  const { bank_name, account_number } = paymentInstitutionData;
  const result = await pool.query(
    `INSERT INTO payment_service_institution (payment_institution_id, bank_name, account_number) 
     VALUES ($1, $2, $3) 
     RETURNING *`,
    [paymentInstitutionData.payment_institution_id, bank_name, account_number]
  );
  return result.rows[0];
}

async function getAllPaymentServiceInstitutions() {
  const result = await pool.query(`SELECT * FROM payment_service_institution`);
  return result.rows;
}

async function getPaymentServiceInstitutionById(payment_institution_id) {
  const result = await pool.query(`SELECT * FROM payment_service_institution WHERE payment_institution_id = $1`, [payment_institution_id]);
  if (result.rows.length === 0) {
    throw new Error('Payment service institution not found');
  }
  return result.rows[0];
}

async function updatePaymentServiceInstitution(payment_institution_id, paymentInstitutionData) {
  const { bank_name, account_number } = paymentInstitutionData;
  const result = await pool.query(
    `UPDATE payment_service_institution 
     SET bank_name = $2, account_number = $3 
     WHERE payment_institution_id = $1 
     RETURNING *`,
    [payment_institution_id, bank_name, account_number]
  );
  if (result.rows.length === 0) {
    throw new Error('Payment service institution not found');
  }
  return result.rows[0];
}

async function deletePaymentServiceInstitution(payment_institution_id) {
  const result = await pool.query(`DELETE FROM payment_service_institution WHERE payment_institution_id = $1 RETURNING *`, [payment_institution_id]);
  if (result.rows.length === 0) {
    throw new Error('Payment service institution not found');
  }
  return result.rows[0];
}

module.exports = {
  createPaymentServiceInstitution,
  getAllPaymentServiceInstitutions,
  getPaymentServiceInstitutionById,
  updatePaymentServiceInstitution,
  deletePaymentServiceInstitution
};

