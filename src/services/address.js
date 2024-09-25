const Address = require('../models/address');

// Helper function to generate custom ID 
async function generateCustomUUID(prefix) {
    // Query the latest ID (assuming postal_code_id is stored as a string like 'RGSTR000000000001')
    const result = await pool.query('SELECT postal_code_id FROM postal_code ORDER BY postal_code_id DESC LIMIT 1');
  
    let newId = 1; // Default to 1 if there are no existing records
  
    if (result.rows.length > 0) {
      const lastId = result.rows[0].postal_code_id;
      const lastSequenceNumber = parseInt(lastId.replace(prefix, '')); // Remove the prefix and get the numeric part
      newId = lastSequenceNumber + 1;
    }
  
    // Return the new custom UUID with leading zeros (e.g., 'RGSTR000000000001')
    return `${prefix}${String(newId).padStart(12, '0')}`;
}

async function createAddress(addressData) {
  const { address, village_id } = addressData;
  const result = await pool.query(
    `INSERT INTO address (postal_code_id, address, village_id) 
     VALUES ($1, $2, $3) 
     RETURNING *`,
    [addressData.postal_code_id, address, village_id]
  );
  return result.rows[0];
}

async function getAllAddresses() {
  const result = await pool.query(`SELECT * FROM address`);
  return result.rows;
}

async function getAddressById(postal_code_id) {
  const result = await pool.query(`SELECT * FROM address WHERE postal_code_id = $1`, [postal_code_id]);
  if (result.rows.length === 0) {
    throw new Error('Address not found');
  }
  return result.rows[0];
}

async function updateAddress(postal_code_id, addressData) {
  const { address, village_id } = addressData;
  const result = await pool.query(
    `UPDATE address 
     SET address = $2, village_id = $3 
     WHERE postal_code_id = $1 
     RETURNING *`,
    [postal_code_id, address, village_id]
  );
  if (result.rows.length === 0) {
    throw new Error('Address not found');
  }
  return result.rows[0];
}

async function deleteAddress(postal_code_id) {
  const result = await pool.query(`DELETE FROM address WHERE postal_code_id = $1 RETURNING *`, [postal_code_id]);
  if (result.rows.length === 0) {
    throw new Error('Address not found');
  }
  return result.rows[0];
}

module.exports = {
  createAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
  deleteAddress
};
