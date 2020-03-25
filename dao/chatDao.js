const pool = require('./poolConnection');
const Message = require('../models/ChatMessage');
const ChatId = require('../models/ChatId');

exports.getChatMessages = async id => {
    try {
        let response = await pool.query(
            'SELECT chat_id, msg_id, msg_user_id, user_name, msg_text, msg_timestamp FROM msg, users, chat WHERE msg_user_id = user_id AND chat_id = $1', [id]
        );
        let chatID = response.rows[0].chat_id;
        let messages = [];
        for (let row of response.rows) {
            let message = new Message(
                row.msg_id,
                row.msg_user_id,
                row.user_name,
                row.msg_text,
                row.msg_timestamp
            );
            messages = [...messages, message];
        }
        return { chatID, messages };
    } catch (err) {
        console.error(err.message);
        return null;
    }
};

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

exports.newChatMessage = async (userId, chatId, message) => {
    try {
        await pool.query('INSERT INTO msg( msg_user_id, msg_chat_id, msg_text) VALUES ($1, $2, $3)', [userId, chatId, message])
        return 'Message sent to database'
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

exports.addChatID = async () => {
    try {
        newId = await pool.query('INSERT INTO public.chat(chat_id) VALUES (nextval(\'chat_chat_id_seq\'::regclass)) RETURNING chat_id')
        return `Chat id ${newId.rows[0].chat_id} cheated`
    } catch (err) {
        console.error(err.message);
        return null;
    }
}