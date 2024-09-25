const Village = require('../models/village');

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

async function createVillage(villageData) {
  const { village, city_id } = villageData;
  const result = await pool.query(
      `INSERT INTO village (village_id, village, city_id) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (village_id) 
       DO UPDATE SET village = EXCLUDED.village, city_id = EXCLUDED.city_id 
       RETURNING *`,
      [villageData.village_id, village, postal_code_id]
  );
  return result.rows[0];
}

async function getAllVillages() {
  const result = await pool.query(`SELECT * FROM village`);
  return result.rows;
}

async function getVillageById(village_id) {
  const result = await pool.query(`SELECT * FROM village WHERE village_id = $1`, [village_id]);
  if (result.rows.length === 0) {
    throw new Error('Village not found');
  }
  return result.rows[0];
}

async function updateVillage(village_id, villageData) {
  const { village, postal_code_id } = villageData;
  const result = await pool.query(
    `UPDATE village 
     SET village = $2, postal_code_id = $3 
     WHERE village_id = $1 
     RETURNING *`,
    [village_id, village, postal_code_id]
  );
  if (result.rows.length === 0) {
    throw new Error('Village not found');
  }
  return result.rows[0];
}

async function deleteVillage(village_id) {
  const result = await pool.query(`DELETE FROM village WHERE village_id = $1 RETURNING *`, [village_id]);
  if (result.rows.length === 0) {
    throw new Error('Village not found');
  }
  return result.rows[0];
}

module.exports = {
  createVillage,
  getAllVillages,
  getVillageById,
  updateVillage,
  deleteVillage
};
