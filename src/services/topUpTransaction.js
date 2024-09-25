const TopUpTransaction = require('../models/topUpTransaction');

// Helper function to generate custom ID 
async function generateCustomUUID(prefix) {
    // Query the latest ID (assuming transaction_id is stored as a string like 'RGSTR000000000001')
    const result = await pool.query('SELECT transaction_id FROM company ORDER BY transaction_id DESC LIMIT 1');
  
    let newId = 1; // Default to 1 if there are no existing records
  
    if (result.rows.length > 0) {
      const lastId = result.rows[0].transaction_id;
      const lastSequenceNumber = parseInt(lastId.replace(prefix, '')); // Remove the prefix and get the numeric part
      newId = lastSequenceNumber + 1;
    }
  
    // Return the new custom UUID with leading zeros (e.g., 'RGSTR000000000001')
    return `${prefix}${String(newId).padStart(12, '0')}`;
}

async function createTopUpTransaction(transactionData) {
  const { transaction_date, transaction_amount, transaction_source_account_number, transaction_destination_account_number, company_id } = transactionData;
  const result = await pool.query(
    `INSERT INTO top_up_transaction (transaction_id, transaction_date, transaction_amount, transaction_source_account_number, transaction_destination_account_number, company_id) 
     VALUES ($1, $2, $3, $4, $5, $6) 
     RETURNING *`,
    [transactionData.transaction_id, transaction_date, transaction_amount, transaction_source_account_number, transaction_destination_account_number, company_id]
  );
  return result.rows[0];
}

async function getAllTopUpTransactions() {
  const result = await pool.query(`SELECT * FROM top_up_transaction`);
  return result.rows;
}

async function getTopUpTransactionById(transaction_id) {
  const result = await pool.query(`SELECT * FROM top_up_transaction WHERE transaction_id = $1`, [transaction_id]);
  if (result.rows.length === 0) {
    throw new Error('Top-up transaction not found');
  }
  return result.rows[0];
}

async function updateTopUpTransaction(transaction_id, transactionData) {
  const { transaction_date, transaction_amount, transaction_source_account_number, transaction_destination_account_number, company_id } = transactionData;
  const result = await pool.query(
    `UPDATE top_up_transaction 
     SET transaction_date = $2, transaction_amount = $3, transaction_source_account_number = $4, transaction_destination_account_number = $5, company_id = $6 
     WHERE transaction_id = $1 
     RETURNING *`,
    [transaction_id, transaction_date, transaction_amount, transaction_source_account_number, transaction_destination_account_number, company_id]
  );
  if (result.rows.length === 0) {
    throw new Error('Top-up transaction not found');
  }
  return result.rows[0];
}

async function deleteTopUpTransaction(transaction_id) {
  const result = await pool.query(`DELETE FROM top_up_transaction WHERE transaction_id = $1 RETURNING *`, [transaction_id]);
  if (result.rows.length === 0) {
    throw new Error('Top-up transaction not found');
  }
  return result.rows[0];
}

module.exports = {
  createTopUpTransaction,
  getAllTopUpTransactions,
  getTopUpTransactionById,
  updateTopUpTransaction,
  deleteTopUpTransaction
};

