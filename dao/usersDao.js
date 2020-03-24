const pool = require('./poolConnection');

exports.getUsers = async () => {
  let response = await pool.query('SELECT * from users');
  return response.rows;
};

exports.getUser = async id => {
  let response = await pool.query('SELECT * FROM users WHERE user_id=$1', [id]);
  return response.rows;
};
