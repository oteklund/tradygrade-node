const pool = require('./poolConnection');

exports.getItems = async () => {
  let response = await pool.query('SELECT * from items');
  return response.rows;
};
exports.getItem = async id => {
  let response = await pool.query('SELECT * from items WHERE id=$1', [id]);
  return response.rows;
};
