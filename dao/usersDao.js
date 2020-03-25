const pool = require('./poolConnection');
const User = require('./models/User');

exports.getUsers = async () => {
  try {
    let response = await pool.query('SELECT * from users'
    );
    let users = [];
    for (let row of response.rows) {
      let user = new user(
        row.user_id,
        row.user_name,
        row.user_password,
        row.user_email,
        row.user_picture
      );
      users = [...users, user];
    }
    return users;
  } catch{
    (err)
    console.error(err.message);
    return null;
  };
};

exports.getUser = async id => {
  try {
    let response = await pool.query('SELECT * FROM users WHERE user_id=$1',
      [id]
    );
    let user = new User(
      response.rows[0].user_id,
      response.rows[0].user_name,
      response.rows[0].user_password,
      response.rows[0].user_email,
      response.rows[0].user_picture
    );
    return user;
  }
  catch (err) {
    console.error(err.message);
    return null;
  }
};



exports.updateUser = async (id, user)=>{
  try {
    const {

    }
  }catch{}
}

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
