const Province = require('../models/province');

// Helper function to generate custom ID 
async function generateCustomUUID(prefix) {
    // Query the latest ID (assuming province_id is stored as a string like 'RGSTR000000000001')
    const result = await pool.query('SELECT province_id FROM province ORDER BY province_id DESC LIMIT 1');
  
    let newId = 1; // Default to 1 if there are no existing records
  
    if (result.rows.length > 0) {
      const lastId = result.rows[0].province_id;
      const lastSequenceNumber = parseInt(lastId.replace(prefix, '')); // Remove the prefix and get the numeric part
      newId = lastSequenceNumber + 1;
    }
  
    // Return the new custom UUID with leading zeros (e.g., 'RGSTR000000000001')
    return `${prefix}${String(newId).padStart(12, '0')}`;
}

async function createProvince(provinceData) {
  const { province, city_id } = provinceData;
  const result = await pool.query(
      `INSERT INTO province (province_id, province, city_id) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (province_id) 
       DO UPDATE SET province = EXCLUDED.province, city_id = EXCLUDED.city_id 
       RETURNING *`,
      [provinceData.province_id, province, city_id]
  );
  return result.rows[0];
}

async function getAllProvinces() {
  const result = await pool.query(`SELECT * FROM province`);
  return result.rows;
}

async function getProvinceById(province_id) {
  const result = await pool.query(`SELECT * FROM province WHERE province_id = $1`, [province_id]);
  if (result.rows.length === 0) {
      throw new Error('Province not found');
  }
  return result.rows[0];
}

async function updateProvince(province_id, provinceData) {
  const { province, city_id } = provinceData;
  const result = await pool.query(
      `UPDATE province 
       SET province = $2, city_id = $3 
       WHERE province_id = $1 
       RETURNING *`,
      [province_id, province, city_id]
  );
  if (result.rows.length === 0) {
      throw new Error('Province not found');
  }
  return result.rows[0];
}

async function deleteProvince(province_id) {
  const result = await pool.query(`DELETE FROM province WHERE province_id = $1 RETURNING *`, [province_id]);
  if (result.rows.length === 0) {
      throw new Error('Province not found');
  }
  return result.rows[0];
}

module.exports = {
  createProvince,
  getAllProvinces,
  getProvinceById,
  updateProvince,
  deleteProvince
};

