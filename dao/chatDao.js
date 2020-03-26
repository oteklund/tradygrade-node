const pool = require('./poolConnection');
const ChatId = require('../models/ChatId');

// GET chatIDs for specific user
exports.getChatIDs = async (id) => {
    try {
        let response = await pool.query(
            'SELECT user_id, chatter_chat_id FROM chatter, users WHERE chatter_user_id = user_id AND user_id = $1', [id]
        );
        let userid = response.rows[0].user_id
        let chats = [];
        for (let row of response.rows) {
            let chatid = new ChatId(
                row.chatter_chat_id
            );
            chats = [...chats, chatid];
        }
        return {userid: userid, chats};
    } catch (err) {
        console.error(err.message);
        return null;
    }
}
 

// POST new chatID
exports.addChatID = async () => {
    try {
        newId = await pool.query('INSERT INTO public.chat(chat_id) VALUES (nextval(\'chat_chat_id_seq\'::regclass)) RETURNING chat_id')
        return `Chat id ${newId.rows[0].chat_id} cheated`
    } catch (err) {
        console.error(err.message);
        return null;
    }
}