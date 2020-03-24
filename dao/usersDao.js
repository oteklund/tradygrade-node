const pool = require('./poolConnection');

exports.getUsers = async () => {
  let response = await pool.query('SELECT * from users');
  return response.rows;
};
