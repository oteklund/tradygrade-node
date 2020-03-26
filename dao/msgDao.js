const pool = require('./poolConnection');
const Msg = require('../models/Msg');

// exports.getMsgs = async () => {
//   try {
//     let response = await pool.query('SELECT msg_id, msg_user_id,msg_chat_id, msg_timestamp, msg_text, user_name, user_email, user_picture FROM msg JOIN users ON msg_user_id = user_id');
//     let msgs = [];
//     for (let row of response.rows) {
//       let msg = new Msg(
//         row.msg_id,
//         row.msg_user_id,
//         row.msg_chat_id,
//         row.msg_timestamp,
//         row.msg_text,
//         row.user_name,
//         row.user_email,
//         row.user_picture
//       );
//       msgs = [...msgs, msg];
//     }
//     return users;
//   } catch (err) {
//     console.error(err.message);
//     return null;
//   }
// };





exports.getMsg = async id => {
  try {
    let response = await pool.query('SELECT msg_id, msg_user_id,msg_chat_id, msg_timestamp, msg_text, user_name, user_email, user_picture FROM msg JOIN users ON msg_user_id = user_id WHERE msg_id=$1;', [
      id
    ]);
    let msg = new Msg(
      response.rows[0].msg_id,
      response.rows[0].msg_user_id,
      response.rows[0].msg_chat_id,
      response.rows[0].msg_timestamp,
      response.rows[0].msg_text.
      response.rows[0].user_name,
      response.rows[0].user_email,
      response.rows[0].user_picture
    );
    return msg;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

exports.updateMsg = async (id, msg) => {
  try {
    const { msgText } = msg;

    let response = await pool.query(
      'UPDATE msg SET msg_text=$1 WHERE msg_id=$2',
      [ msgText, id]
    );
    return response.rows;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

// exports.createUser = async msg => {
//   try {
//     const { user, chat, timestamp, msgText } = msg;

//     let response = await pool.query(
//       'INSERT INTO users (msg_user_id, user_password, user_email, user_picture) VALUES($1,$2,$3,$4)',
//       [name, password, email, picture]
//     );
//     return response.rows;
//   } catch (err) {
//     console.error(err.message);
//     return null;
//   }
// };

// exports.deleteUser = async id => {
//   try {
//     let response = await pool.query('DELETE FROM users WHERE user_id=$1', [id]);
//     return response.rows;
//   } catch (err) {
//     console.error(err.message);
//     return null;
//   }
// };
