const PartTimeJobPost = require('../models/partTimeJobPost');

// Helper function to generate custom ID 
async function generateCustomUUID(prefix) {
    // Query the latest ID (assuming part_time_job_id is stored as a string like 'RGSTR000000000001')
    const result = await pool.query('SELECT part_time_job_id FROM part_time_job ORDER BY part_time_job_id DESC LIMIT 1');
  
    let newId = 1; // Default to 1 if there are no existing records
  
    if (result.rows.length > 0) {
      const lastId = result.rows[0].part_time_job_id;
      const lastSequenceNumber = parseInt(lastId.replace(prefix, '')); // Remove the prefix and get the numeric part
      newId = lastSequenceNumber + 1;
    }
  
    // Return the new custom UUID with leading zeros (e.g., 'RGSTR000000000001')
    return `${prefix}${String(newId).padStart(12, '0')}`;
}

async function createPartTimeJobPost(jobPostData) {
  const { company_id, job_id, pic_id, salary, addressId, date_start_posting } = jobPostData;
  const result = await pool.query(
    `INSERT INTO part_time_job_post (part_time_job_id, company_id, job_id, pic_id, salary, addressId, date_start_posting) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) 
     RETURNING *`,
    [jobPostData.part_time_job_id, company_id, job_id, pic_id, salary, addressId, date_start_posting]
  );
  return result.rows[0];
}

async function getAllPartTimeJobPosts() {
  const result = await pool.query(`SELECT * FROM part_time_job_post`);
  return result.rows;
}

async function getPartTimeJobPostById(part_time_job_id) {
  const result = await pool.query(`SELECT * FROM part_time_job_post WHERE part_time_job_id = $1`, [part_time_job_id]);
  if (result.rows.length === 0) {
    throw new Error('Part-time job post not found');
  }
  return result.rows[0];
}

async function updatePartTimeJobPost(part_time_job_id, jobPostData) {
  const { company_id, job_id, pic_id, salary, addressId, date_start_posting } = jobPostData;
  const result = await pool.query(
    `UPDATE part_time_job_post 
     SET company_id = $2, job_id = $3, pic_id = $4, salary = $5, addressId = $6, date_start_posting = $7 
     WHERE part_time_job_id = $1 
     RETURNING *`,
    [part_time_job_id, company_id, job_id, pic_id, salary, addressId, date_start_posting]
  );
  if (result.rows.length === 0) {
    throw new Error('Part-time job post not found');
  }
  return result.rows[0];
}

async function deletePartTimeJobPost(part_time_job_id) {
  const result = await pool.query(`DELETE FROM part_time_job_post WHERE part_time_job_id = $1 RETURNING *`, [part_time_job_id]);
  if (result.rows.length === 0) {
    throw new Error('Part-time job post not found');
  }
  return result.rows[0];
}

module.exports = {
  createPartTimeJobPost,
  getAllPartTimeJobPosts,
  getPartTimeJobPostById,
  updatePartTimeJobPost,
  deletePartTimeJobPost
};

