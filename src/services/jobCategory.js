const JobCategory = require('../models/jobCategory');

// Helper function to generate custom ID 
async function generateCustomUUID(prefix) {
    // Query the latest ID (assuming job_category_id is stored as a string like 'RGSTR000000000001')
    const result = await pool.query('SELECT job_category_id FROM job_category ORDER BY job_category_id DESC LIMIT 1');
  
    let newId = 1; // Default to 1 if there are no existing records
  
    if (result.rows.length > 0) {
      const lastId = result.rows[0].job_category_id;
      const lastSequenceNumber = parseInt(lastId.replace(prefix, '')); // Remove the prefix and get the numeric part
      newId = lastSequenceNumber + 1;
    }
  
    // Return the new custom UUID with leading zeros (e.g., 'RGSTR000000000001')
    return `${prefix}${String(newId).padStart(12, '0')}`;
}

async function createJobCategory(jobCategoryData) {
  const { job_category, job_title_id } = jobCategoryData;
  const result = await pool.query(
      `INSERT INTO job_category (job_category_id, job_category, job_title_id) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (job_category_id) 
       DO UPDATE SET job_category = EXCLUDED.job_category, job_title_id = EXCLUDED.job_title_id 
       RETURNING *`,
      [jobCategoryData.job_category_id, job_category, job_title_id]
  );
  return result.rows[0];
}

async function getAllJobCategories() {
  const result = await pool.query(`SELECT * FROM job_category`);
  return result.rows;
}

async function getJobCategoryById(job_category_id) {
  const result = await pool.query(`SELECT * FROM job_category WHERE job_category_id = $1`, [job_category_id]);
  if (result.rows.length === 0) {
      throw new Error('Job category not found');
  }
  return result.rows[0];
}

async function updateJobCategory(job_category_id, jobCategoryData) {
  const { job_category, job_title_id } = jobCategoryData;
  const result = await pool.query(
      `UPDATE job_category 
       SET job_category = $2, job_title_id = $3 
       WHERE job_category_id = $1 
       RETURNING *`,
      [job_category_id, job_category, job_title_id]
  );
  if (result.rows.length === 0) {
      throw new Error('Job category not found');
  }
  return result.rows[0];
}

async function deleteJobCategory(job_category_id) {
  const result = await pool.query(`DELETE FROM job_category WHERE job_category_id = $1 RETURNING *`, [job_category_id]);
  if (result.rows.length === 0) {
      throw new Error('Job category not found');
  }
  return result.rows[0];
}

module.exports = {
  createJobCategory,
  getAllJobCategories,
  getJobCategoryById,
  updateJobCategory,
  deleteJobCategory
};

