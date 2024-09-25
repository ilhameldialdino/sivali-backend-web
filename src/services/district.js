const District = require('../models/district');

// Helper function to generate custom ID 
async function generateCustomUUID(prefix) {
  const result = await pool.query('SELECT district_id FROM district ORDER BY district_id DESC LIMIT 1');
  let newId = 1;
  if (result.rows.length > 0) {
    const lastId = result.rows[0].district_id;
    const lastSequenceNumber = parseInt(lastId.replace(prefix, 'DISTR'));
    newId = lastSequenceNumber + 1;
  }
  return `${prefix}${String(newId).padStart(12, '0')}`;
}

async function createDistrict(districtData) {
  const { district, village_id } = districtData;
  const result = await pool.query(
    `INSERT INTO district (district_id, district, village_id) 
     VALUES ($1, $2, $3) 
     RETURNING *`,
    [districtData.district_id, district, village_id]
  );
  return result.rows[0];
}

async function getAllDistricts() {
  const result = await pool.query(`SELECT * FROM district`);
  return result.rows;
}

async function getDistrictById(district_id) {
  const result = await pool.query(`SELECT * FROM district WHERE district_id = $1`, [district_id]);
  if (result.rows.length === 0) {
    throw new Error('District not found');
  }
  return result.rows[0];
}

async function updateDistrict(district_id, districtData) {
  const { district, village_id } = districtData;
  const result = await pool.query(
    `UPDATE district 
     SET district = $2, village_id = $3 
     WHERE district_id = $1 
     RETURNING *`,
    [district_id, district, village_id]
  );
  if (result.rows.length === 0) {
    throw new Error('District not found');
  }
  return result.rows[0];
}

async function deleteDistrict(district_id) {
  const result = await pool.query(`DELETE FROM district WHERE district_id = $1 RETURNING *`, [district_id]);
  if (result.rows.length === 0) {
    throw new Error('District not found');
  }
  return result.rows[0];
}

module.exports = {
  createDistrict,
  getAllDistricts,
  getDistrictById,
  updateDistrict,
  deleteDistrict
};
