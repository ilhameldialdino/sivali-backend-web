const Pic = require('../models/pic');

// Helper function to generate custom ID 
async function generateCustomUUID(prefix) {
    // Query the latest ID (assuming pic_id is stored as a string like 'RGSTR000000000001')
    const result = await pool.query('SELECT pic_id FROM "PIC" ORDER BY pic_id DESC LIMIT 1');
  
    let newId = 1; // Default to 1 if there are no existing records
  
    if (result.rows.length > 0) {
      const lastId = result.rows[0].pic_id;
      const lastSequenceNumber = parseInt(lastId.replace(prefix, '')); // Remove the prefix and get the numeric part
      newId = lastSequenceNumber + 1;
    }
  
    // Return the new custom UUID with leading zeros (e.g., 'RGSTR000000000001')
    return `${prefix}${String(newId).padStart(12, '0')}`;
}

async function createPic(picData) {

  // Generate custom UUID for pic (e.g., 'PIC000000000001')
  const pic_id = await generateCustomUUID('PIC');

  const { pic_name, pic_phone_number, company_id } = picData;
  const result = await pool.query(
      `INSERT INTO "PIC" (pic_id, pic_name, pic_phone_number, company_id) 
       VALUES ($1, $2, $3, $4) 
       ON CONFLICT (pic_id) 
       DO UPDATE SET pic_name = EXCLUDED.pic_name, pic_phone_number = EXCLUDED.pic_phone_number, company_id = EXCLUDED.company_id 
       RETURNING *`,
      [pic_id, pic_name, pic_phone_number, company_id]
  );
  return result.rows[0];
}

async function getAllPics() {
  const result = await pool.query(`SELECT * FROM "PIC"`);
  return result.rows;
}

async function getPicById(pic_id) {
  const result = await pool.query(`SELECT * FROM "PIC" WHERE pic_id = $1`, [pic_id]);
  if (result.rows.length === 0) {
      throw new Error('PIC not found');
  }
  return result.rows[0];
}

async function updatePic(pic_id, picData) {
  const { pic_name, pic_phone_number, company_id } = picData;
  const result = await pool.query(
      `UPDATE "PIC" 
       SET pic_name = $2, pic_phone_number = $3, company_id = $4 
       WHERE pic_id = $1 
       RETURNING *`,
      [pic_id, pic_name, pic_phone_number, company_id]
  );
  if (result.rows.length === 0) {
      throw new Error('PIC not found');
  }
  return result.rows[0];
}

async function deletePic(pic_id) {
  const result = await pool.query(`DELETE FROM "PIC" WHERE pic_id = $1 RETURNING *`, [pic_id]);
  if (result.rows.length === 0) {
      throw new Error('PIC not found');
  }
  return result.rows[0];
}

module.exports = {
  createPic,
  getAllPics,
  getPicById,
  updatePic,
  deletePic
};

