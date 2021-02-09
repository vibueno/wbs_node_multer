const { Pool } = require("pg");
const { DBUSER, DBHOST, DBNAME, DBPASS, DBPORT } = process.env;

const pool = new Pool({
  user: DBUSER,
  host: DBHOST,
  database: DBNAME,
  password: DBPASS,
  port: DBPORT,
});

const query = async (query) => {
  const data = await pool.query(query);
  return data;
};

db = { query };

module.exports = db;
