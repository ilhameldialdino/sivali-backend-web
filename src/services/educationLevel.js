const EducationLevel = require('../models/educationLevel');

// Helper function to generate custom ID 
async function generateCustomUUID(prefix) {
    // Query the latest ID (assuming education_level_id is stored as a string like 'RGSTR000000000001')
    const result = await pool.query('SELECT education_level_id FROM education_level ORDER BY education_level_id DESC LIMIT 1');
  
    let newId = 1; // Default to 1 if there are no existing records
  
    if (result.rows.length > 0) {
      const lastId = result.rows[0].education_level_id;
      const lastSequenceNumber = parseInt(lastId.replace(prefix, '')); // Remove the prefix and get the numeric part
      newId = lastSequenceNumber + 1;
    }
  
    // Return the new custom UUID with leading zeros (e.g., 'RGSTR000000000001')
    return `${prefix}${String(newId).padStart(12, '0')}`;
}

async function createEducationLevel(educationLevelData){
  const {job_title_id, job_title, job_spcialization_id} = educationLevelData;

  const companyId = await generateCustomUUID('CMPNY');

  const result = await pool.query(
    `INSERT INTO job_title (job_title_id, job_title, job_spcialization_id) 
     VALUES ($1, $2, $3) 
     ON CONFLICT (job_title_id) 
     DO UPDATE SET job_title = EXCLUDED.job_title, job_spcialization_id = EXCLUDED.job_spcialization_id 
     RETURNING *`,
    [job_title_id, job_title, job_spcialization_id]
  )
}

exports.createEducationLevel = async (data) => {
  
  const newEducationLevel = new EducationLevel(data);
  
  const result = await pool.query(
    `INSERT INTO job_title (job_title_id, job_title, job_spcialization_id) 
     VALUES ($1, $2, $3) 
     ON CONFLICT (job_title_id) 
     DO UPDATE SET job_title = EXCLUDED.job_title, job_spcialization_id = EXCLUDED.job_spcialization_id 
     RETURNING *`,
    [job_title_id, job_title, job_spcialization_id]
  );
  
  return await newEducationLevel.save();
};

async function createEducationLevel(educationLevelData) {
  const { education_level_name } = educationLevelData;
  const result = await pool.query(
    `INSERT INTO education_level (education_level_id, education_level_name) 
     VALUES ($1, $2) 
     RETURNING *`,
    [educationLevelData.education_level_id, education_level_name]
  );
  return result.rows[0];
}

async function getAllEducationLevels() {
  const result = await pool.query(`SELECT * FROM education_level`);
  return result.rows;
}

async function getEducationLevelById(education_level_id) {
  const result = await pool.query(`SELECT * FROM education_level WHERE education_level_id = $1`, [education_level_id]);
  if (result.rows.length === 0) {
    throw new Error('Education level not found');
  }
  return result.rows[0];
}

async function updateEducationLevel(education_level_id, educationLevelData) {
  const { education_level_name } = educationLevelData;
  const result = await pool.query(
    `UPDATE education_level 
     SET education_level_name = $2 
     WHERE education_level_id = $1 
     RETURNING *`,
    [education_level_id, education_level_name]
  );
  if (result.rows.length === 0) {
    throw new Error('Education level not found');
  }
  return result.rows[0];
}

async function deleteEducationLevel(education_level_id) {
  const result = await pool.query(`DELETE FROM education_level WHERE education_level_id = $1 RETURNING *`, [education_level_id]);
  if (result.rows.length === 0) {
    throw new Error('Education level not found');
  }
  return result.rows[0];
}

module.exports = {
  createEducationLevel,
  getAllEducationLevels,
  getEducationLevelById,
  updateEducationLevel,
  deleteEducationLevel
};

