const AttendanceTrail = require('../models/attendanceTrail');

// Helper function to generate custom ID 
async function generateCustomUUID(prefix) {
    // Query the latest ID (assuming attendance_trail_id is stored as a string like 'RGSTR000000000001')
    const result = await pool.query('SELECT attendance_trail_id FROM attendance_trail ORDER BY attendance_trail_id DESC LIMIT 1');
  
    let newId = 1; // Default to 1 if there are no existing records
  
    if (result.rows.length > 0) {
      const lastId = result.rows[0].attendance_trail_id;
      const lastSequenceNumber = parseInt(lastId.replace(prefix, '')); // Remove the prefix and get the numeric part
      newId = lastSequenceNumber + 1;
    }
  
    // Return the new custom UUID with leading zeros (e.g., 'RGSTR000000000001')
    return `${prefix}${String(newId).padStart(12, '0')}`;
}

async function createAttendanceTrail(attendanceTrailData) {
  const { check_in, check_out, location_in, location_out, position, company_id } = attendanceTrailData;
  const result = await pool.query(
    `INSERT INTO attendance_trail (attendance_trail_id, check_in, check_out, location_in, location_out, position, company_id) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) 
     RETURNING *`,
    [attendanceTrailData.attendance_trail_id, check_in, check_out, location_in, location_out, position, company_id]
  );
  return result.rows[0];
}

async function getAllAttendanceTrails() {
  const result = await pool.query(`SELECT * FROM attendance_trail`);
  return result.rows;
}

async function getAttendanceTrailById(attendance_trail_id) {
  const result = await pool.query(`SELECT * FROM attendance_trail WHERE attendance_trail_id = $1`, [attendance_trail_id]);
  if (result.rows.length === 0) {
    throw new Error('Attendance trail not found');
  }
  return result.rows[0];
}

async function updateAttendanceTrail(attendance_trail_id, attendanceTrailData) {
  const { check_in, check_out, location_in, location_out, position, company_id } = attendanceTrailData;
  const result = await pool.query(
    `UPDATE attendance_trail 
     SET check_in = $2, check_out = $3, location_in = $4, location_out = $5, position = $6, company_id = $7 
     WHERE attendance_trail_id = $1 
     RETURNING *`,
    [attendance_trail_id, check_in, check_out, location_in, location_out, position, company_id]
  );
  if (result.rows.length === 0) {
    throw new Error('Attendance trail not found');
  }
  return result.rows[0];
}

async function deleteAttendanceTrail(attendance_trail_id) {
  const result = await pool.query(`DELETE FROM attendance_trail WHERE attendance_trail_id = $1 RETURNING *`, [attendance_trail_id]);
  if (result.rows.length === 0) {
    throw new Error('Attendance trail not found');
  }
  return result.rows[0];
}

module.exports = {
  createAttendanceTrail,
  getAllAttendanceTrails,
  getAttendanceTrailById,
  updateAttendanceTrail,
  deleteAttendanceTrail
};
