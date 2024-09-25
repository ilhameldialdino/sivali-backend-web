const City = require('../models/city');

// Helper function to generate custom ID 
async function generateCustomUUID(prefix) {
    // Query the latest ID (assuming city_id is stored as a string like 'RGSTR000000000001')
    const result = await pool.query('SELECT city_id FROM city ORDER BY city_id DESC LIMIT 1');
  
    let newId = 1; // Default to 1 if there are no existing records
  
    if (result.rows.length > 0) {
      const lastId = result.rows[0].city_id;
      const lastSequenceNumber = parseInt(lastId.replace(prefix, '')); // Remove the prefix and get the numeric part
      newId = lastSequenceNumber + 1;
    }
  
    // Return the new custom UUID with leading zeros (e.g., 'RGSTR000000000001')
    return `${prefix}${String(newId).padStart(12, '0')}`;
}

async function createCity(cityData) {
  const { city, district_id } = cityData;
  const result = await pool.query(
      `INSERT INTO city (city_id, city, district_id) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (city_id) 
       DO UPDATE SET city = EXCLUDED.city, district_id = EXCLUDED.district_id 
       RETURNING *`,
      [cityData.city_id, city, district_id]
  );
  return result.rows[0];
}

async function getAllCities() {
  const result = await pool.query(`SELECT * FROM city`);
  return result.rows;
}

async function getCityById(city_id) {
  const result = await pool.query(`SELECT * FROM city WHERE city_id = $1`, [city_id]);
  if (result.rows.length === 0) {
      throw new Error('City not found');
  }
  return result.rows[0];
}

async function updateCity(city_id, cityData) {
  const { city, district_id } = cityData;
  const result = await pool.query(
      `UPDATE city 
       SET city = $2, district_id = $3 
       WHERE city_id = $1 
       RETURNING *`,
      [city_id, city, district_id]
  );
  if (result.rows.length === 0) {
      throw new Error('City not found');
  }
  return result.rows[0];
}

async function deleteCity(city_id) {
  const result = await pool.query(`DELETE FROM city WHERE city_id = $1 RETURNING *`, [city_id]);
  if (result.rows.length === 0) {
      throw new Error('City not found');
  }
  return result.rows[0];
}

module.exports = {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity
};

