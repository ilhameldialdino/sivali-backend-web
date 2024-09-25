const Shift = require('../models/shift');

// Helper function to generate custom ID 
async function generateCustomUUID(prefix) {
    // Query the latest ID (assuming shift_id is stored as a string like 'RGSTR000000000001')
    const result = await pool.query('SELECT shift_id FROM shift ORDER BY shift_id DESC LIMIT 1');
  
    let newId = 1; // Default to 1 if there are no existing records
  
    if (result.rows.length > 0) {
      const lastId = result.rows[0].shift_id;
      const lastSequenceNumber = parseInt(lastId.replace(prefix, '')); // Remove the prefix and get the numeric part
      newId = lastSequenceNumber + 1;
    }
  
    // Return the new custom UUID with leading zeros (e.g., 'RGSTR000000000001')
    return `${prefix}${String(newId).padStart(12, '0')}`;
}

async function createShift(shiftData) {
  const { shift_in, shift_out, attendance_id } = shiftData;
  const result = await pool.query(
      `INSERT INTO shift (shift_id, shift_in, shift_out, attendance_id) 
       VALUES ($1, $2, $3, $4) 
       ON CONFLICT (shift_id) 
       DO UPDATE SET shift_in = EXCLUDED.shift_in, shift_out = EXCLUDED.shift_out, attendance_id = EXCLUDED.attendance_id 
       RETURNING *`,
      [shiftData.shift_id, shift_in, shift_out, attendance_id]
  );
  return result.rows[0];
}

async function getAllShifts() {
  const result = await pool.query(`SELECT * FROM shift`);
  return result.rows;
}

async function getShiftById(shift_id) {
  const result = await pool.query(`SELECT * FROM shift WHERE shift_id = $1`, [shift_id]);
  if (result.rows.length === 0) {
      throw new Error('Shift not found');
  }
  return result.rows[0];
}

async function updateShift(shift_id, shiftData) {
  const { shift_in, shift_out, attendance_id } = shiftData;
  const result = await pool.query(
      `UPDATE shift 
       SET shift_in = $2, shift_out = $3, attendance_id = $4 
       WHERE shift_id = $1 
       RETURNING *`,
      [shift_id, shift_in, shift_out, attendance_id]
  );
  if (result.rows.length === 0) {
      throw new Error('Shift not found');
  }
  return result.rows[0];
}

async function deleteShift(shift_id) {
  const result = await pool.query(`DELETE FROM shift WHERE shift_id = $1 RETURNING *`, [shift_id]);
  if (result.rows.length === 0) {
      throw new Error('Shift not found');
  }
  return result.rows[0];
}

module.exports = {
  createShift,
  getAllShifts,
  getShiftById,
  updateShift,
  deleteShift
};

