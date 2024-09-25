const { Pool } = require('pg');

require('dotenv').config({ path: 'D:/Sivali/Backend/WebApp/src/.env' }); // Load environment variables from config.env

//console.log('Loaded Environment Variables:', process.env);  // Print all env variables

const pool = new Pool({
  user: process.env.DB_USER,           // Loaded from config.env
  host: process.env.DB_HOST,           // Loaded from config.env
  database: process.env.DB_NAME,       // Loaded from config.env
  password: process.env.DB_PASSWORD,   // Loaded from config.env
  port: process.env.DB_PORT || 5432    // Loaded from config.env, fallback to 5432 if not set
});

//console.log('DB_USER:', process.env.DB_USER);
//console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

module.exports = pool;
