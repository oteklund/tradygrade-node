const pool = require('./poolConnection');

exports.getUsers = async () => {
  let response = await pool.query('SELECT * from users');
  return response.rows;
};

exports.getUser = async id => {
  let response = await pool.query('SELECT * FROM users WHERE user_id=$1', [id]);
  return response.rows;
};

exports.createUser = async (newUser) => {
  try {
    const { user_name,
      user_password,
      user_email,
      user_picture } = newUser;

    let response = await pool.query('INSERT INTO users (user_name, user_password, user_email, user_picture) VALUES($1,$2,$3,$4)',
      [user_name,
        user_password,
        user_email,
        user_picture
      ]
    );
    return response.rows;
  } catch (err) {
    console.error(err.message);
    return null;
  }
}
