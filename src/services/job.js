const Job = require('../models/job');

// Helper function to generate custom ID 
async function generateCustomUUID(prefix) {
    // Query the latest ID (assuming job_id is stored as a string like 'RGSTR000000000001')
    const result = await pool.query('SELECT job_id FROM job ORDER BY job_id DESC LIMIT 1');
  
    let newId = 1; // Default to 1 if there are no existing records
  
    if (result.rows.length > 0) {
        const lastId = result.rows[0].job_id;
        const lastSequenceNumber = parseInt(lastId.replace(prefix, '')); // Remove the prefix and get the numeric part
        newId = lastSequenceNumber + 1;
    }
  
    // Return the new custom UUID with leading zeros (e.g., 'RGSTR000000000001')
    return `${prefix}${String(newId).padStart(12, '0')}`;
}

// Create Job function: Add async to the function declaration
exports.createJob = async (jobData) => {
    // Assuming jobId and other job details are part of jobData
    const jobId = await generateCustomUUID('RGSTR'); // Generating custom ID
    const { job_type, job_category_id, job_period, job_description, job_start_date, job_end_date, job_start_posting, job_expired_posting, job_salary, pic_id, company_id } = jobData;

    // Now use async/await for the pool query
    const result = await pool.query(
        `INSERT INTO job (jobId, job_type, job_category_id, job_period, job_description, job_start_date, job_end_date, job_start_posting, job_expired_posting, job_salary, pic_id, company_id) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
         ON CONFLICT (jobId) 
         DO UPDATE SET job_type = EXCLUDED.job_type, job_category_id = EXCLUDED.job_category_id, job_period = EXCLUDED.job_period, job_description = EXCLUDED.job_description, 
         job_start_date = EXCLUDED.job_start_date, job_end_date = EXCLUDED.job_end_date, job_start_posting = EXCLUDED.job_start_posting, job_expired_posting = EXCLUDED.job_expired_posting, 
         job_salary = EXCLUDED.job_salary, pic_id = EXCLUDED.pic_id, company_id = EXCLUDED.company_id 
         RETURNING *`,
        [jobId, job_type, job_category_id, job_period, job_description, job_start_date, job_end_date, job_start_posting, job_expired_posting, job_salary, pic_id, company_id]
    );

    return result.rows[0]; // Returning the inserted/updated job
};

// Other CRUD operations
exports.getAllJobs = async () => {
    return await Job.find().populate('job_category_id').populate('pic_id').populate('company_id');
};

exports.getJobById = async (id) => {
    return await Job.findById(id).populate('job_category_id').populate('pic_id').populate('company_id');
};

exports.updateJob = async (id, jobData) => {
    return await Job.findByIdAndUpdate(id, jobData, { new: true });
};

exports.deleteJob = async (id) => {
    return await Job.findByIdAndDelete(id);
};
