const JobTitle = require('../models/jobTitle');

// Helper function to generate custom ID 
async function generateCustomUUID(prefix) {
    // Query the latest ID (assuming job_title_id is stored as a string like 'RGSTR000000000001')
    const result = await pool.query('SELECT job_title_id FROM job_title ORDER BY job_title_id DESC LIMIT 1');
  
    let newId = 1; // Default to 1 if there are no existing records
  
    if (result.rows.length > 0) {
      const lastId = result.rows[0].job_title_id;
      const lastSequenceNumber = parseInt(lastId.replace(prefix, '')); // Remove the prefix and get the numeric part
      newId = lastSequenceNumber + 1;
    }
  
    // Return the new custom UUID with leading zeros (e.g., 'RGSTR000000000001')
    return `${prefix}${String(newId).padStart(12, '0')}`;
}

async function createJobTitle(jobTitleData){
  const {job_title, job_spcialization_id} = jobTitleData;

  const job_title_id = await generateCustomUUID('JBTL');

  const result = await pool.query(
    `INSERT INTO job_title (job_title_id, job_title, job_spcialization_id) 
     VALUES ($1, $2, $3) 
     ON CONFLICT (job_title_id) 
     DO UPDATE SET job_title = EXCLUDED.job_title, job_spcialization_id = EXCLUDED.job_spcialization_id 
     RETURNING *`,
    [job_title_id, job_title, job_spcialization_id]
  )
}

// Get All Job Titles function
async function getAllJobTitles() {
  const result = await pool.query(
      `SELECT jt.job_title_id, jt.job_title, js.job_spcialization_name 
       FROM job_title jt 
       JOIN job_spcialization js ON jt.job_spcialization_id = js.job_spcialization_id`
  );
  return result.rows;
}

// Get Job Title by ID function
async function getJobTitleById(job_title_id) {
  const result = await pool.query(
      `SELECT jt.job_title_id, jt.job_title, js.job_spcialization_name 
       FROM job_title jt 
       JOIN job_spcialization js ON jt.job_spcialization_id = js.job_spcialization_id 
       WHERE jt.job_title_id = $1`,
      [job_title_id]
  );
  if (result.rows.length === 0) {
      throw new Error('Job title not found');
  }
  return result.rows[0];
}

// Update Job Title function
async function updateJobTitle(job_title_id, jobTitleData) {
  const { job_title, job_spcialization_id } = jobTitleData;
  const result = await pool.query(
      `UPDATE job_title 
       SET job_title = $2, job_spcialization_id = $3 
       WHERE job_title_id = $1 
       RETURNING *`,
      [job_title_id, job_title, job_spcialization_id]
  );
  if (result.rows.length === 0) {
      throw new Error('Job title not found or could not be updated');
  }
  return result.rows[0];
}

// Delete Job Title function
async function deleteJobTitle(job_title_id) {
  const result = await pool.query(
      `DELETE FROM job_title 
       WHERE job_title_id = $1 
       RETURNING *`,
      [job_title_id]
  );
  if (result.rows.length === 0) {
      throw new Error('Job title not found or could not be deleted');
  }
  return result.rows[0];
}

// Exporting the functions
module.exports = {
  createJobTitle,
  getAllJobTitles,
  getJobTitleById,
  updateJobTitle,
  deleteJobTitle
};
