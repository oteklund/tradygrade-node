class Message {
    constructor(
        msg_id,
        user_id,
        name,
        text,
        time
    ) {
        this.message_id =  msg_id;
        this.user = user_id;
        this.username = name;
        this.message = text;
        this.timestamp = time;
    }
}

module.exports = Message;