const JobSpecialization = require('../models/jobSpecialization');

// Helper function to generate custom ID 
async function generateCustomUUID(prefix) {
    // Query the latest ID (assuming job_specialization_id is stored as a string like 'RGSTR000000000001')
    const result = await pool.query('SELECT job_specialization_id FROM job_specialization ORDER BY job_specialization_id DESC LIMIT 1');
  
    let newId = 1; // Default to 1 if there are no existing records
  
    if (result.rows.length > 0) {
      const lastId = result.rows[0].job_specialization_id;
      const lastSequenceNumber = parseInt(lastId.replace(prefix, '')); // Remove the prefix and get the numeric part
      newId = lastSequenceNumber + 1;
    }
  
    // Return the new custom UUID with leading zeros (e.g., 'RGSTR000000000001')
    return `${prefix}${String(newId).padStart(12, '0')}`;
}

async function createJobSpecialization(jobSpecializationData) {
  const { job_spcialization, job_title_id } = jobSpecializationData;
  const result = await pool.query(
      `INSERT INTO job_specialization (job_spcialization_id, job_spcialization, job_title_id) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (job_spcialization_id) 
       DO UPDATE SET job_spcialization = EXCLUDED.job_spcialization, job_title_id = EXCLUDED.job_title_id 
       RETURNING *`,
      [jobSpecializationData.job_spcialization_id, job_spcialization, job_title_id]
  );
  return result.rows[0];
}

async function getAllJobSpecializations() {
  const result = await pool.query(`SELECT * FROM job_specialization`);
  return result.rows;
}

async function getJobSpecializationById(job_spcialization_id) {
  const result = await pool.query(`SELECT * FROM job_specialization WHERE job_spcialization_id = $1`, [job_spcialization_id]);
  if (result.rows.length === 0) {
      throw new Error('Job specialization not found');
  }
  return result.rows[0];
}

async function updateJobSpecialization(job_spcialization_id, jobSpecializationData) {
  const { job_spcialization, job_title_id } = jobSpecializationData;
  const result = await pool.query(
      `UPDATE job_specialization 
       SET job_spcialization = $2, job_title_id = $3 
       WHERE job_spcialization_id = $1 
       RETURNING *`,
      [job_spcialization_id, job_spcialization, job_title_id]
  );
  if (result.rows.length === 0) {
      throw new Error('Job specialization not found');
  }
  return result.rows[0];
}

async function deleteJobSpecialization(job_spcialization_id) {
  const result = await pool.query(`DELETE FROM job_specialization WHERE job_spcialization_id = $1 RETURNING *`, [job_spcialization_id]);
  if (result.rows.length === 0) {
      throw new Error('Job specialization not found');
  }
  return result.rows[0];
}

module.exports = {
  createJobSpecialization,
  getAllJobSpecializations,
  getJobSpecializationById,
  updateJobSpecialization,
  deleteJobSpecialization
};

