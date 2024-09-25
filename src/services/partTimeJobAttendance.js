const PartTimeJobAttendance = require('../models/partTimeJobAttendace');

// Helper function to generate custom ID 
async function generateCustomUUID(prefix) {
    // Query the latest ID (assuming attendance_id is stored as a string like 'RGSTR000000000001')
    const result = await pool.query('SELECT attendance_id FROM attendance ORDER BY attendance_id DESC LIMIT 1');
  
    let newId = 1; // Default to 1 if there are no existing records
  
    if (result.rows.length > 0) {
      const lastId = result.rows[0].attendance_id;
      const lastSequenceNumber = parseInt(lastId.replace(prefix, '')); // Remove the prefix and get the numeric part
      newId = lastSequenceNumber + 1;
    }
  
    // Return the new custom UUID with leading zeros (e.g., 'RGSTR000000000001')
    return `${prefix}${String(newId).padStart(12, '0')}`;
}

async function createPartTimeJobAttendance(attendanceData) {
  const { date, job_id, shift_id, attendance_trail_id } = attendanceData;
  const result = await pool.query(
    `INSERT INTO part_time_job_attendance (attendace_id, date, job_id, shift_id, attendance_trail_id) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING *`,
    [attendanceData.attendace_id, date, job_id, shift_id, attendance_trail_id]
  );
  return result.rows[0];
}

async function getAllPartTimeJobAttendances() {
  const result = await pool.query(`SELECT * FROM part_time_job_attendance`);
  return result.rows;
}

async function getPartTimeJobAttendanceById(attendace_id) {
  const result = await pool.query(`SELECT * FROM part_time_job_attendance WHERE attendace_id = $1`, [attendace_id]);
  if (result.rows.length === 0) {
    throw new Error('Part-time job attendance not found');
  }
  return result.rows[0];
}

async function updatePartTimeJobAttendance(attendace_id, attendanceData) {
  const { date, job_id, shift_id, attendance_trail_id } = attendanceData;
  const result = await pool.query(
    `UPDATE part_time_job_attendance 
     SET date = $2, job_id = $3, shift_id = $4, attendance_trail_id = $5 
     WHERE attendace_id = $1 
     RETURNING *`,
    [attendace_id, date, job_id, shift_id, attendance_trail_id]
  );
  if (result.rows.length === 0) {
    throw new Error('Part-time job attendance not found');
  }
  return result.rows[0];
}

async function deletePartTimeJobAttendance(attendace_id) {
  const result = await pool.query(`DELETE FROM part_time_job_attendance WHERE attendace_id = $1 RETURNING *`, [attendace_id]);
  if (result.rows.length === 0) {
    throw new Error('Part-time job attendance not found');
  }
  return result.rows[0];
}

module.exports = {
  createPartTimeJobAttendance,
  getAllPartTimeJobAttendances,
  getPartTimeJobAttendanceById,
  updatePartTimeJobAttendance,
  deletePartTimeJobAttendance
};

