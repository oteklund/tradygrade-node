\c tradygrade

CREATE TABLE IF NOT EXISTS user(
user_id SERIAL PRIMARY KEY NOT NULL,
user_name VARCHAR(50) NOT NULL,
user_password VARCHAR(200) NOT NULL,
user_email VARCHAR(99) NOT NULL,
);

CREATE TABLE IF NOT EXISTS chat(
    chat_id SERIAL PRIMARY KEY NOT NULL
)

CREATE TABLE IF NOT EXISTS chatter(
    chatter_id SERIAL PRIMARY KEY NOT NULL,
    chatter_user_id INT NOT NULL,
    chatter_chat_id INT NOT NULL,
    FOREIGN KEY (chatter_user_id) REFERENCES user(user_id),
    FOREIGN KEY (chatter_chat_id) REFERENCES chat(chat_id));

CREATE TABLE IF NOT EXISTS msg(
msg_id SERIAL PRIMARY KEY NOT NULL,
msg_user_id INT NOT NULL,
msg_chat_id INT NOT NULL,
msg_timestamp DATE DEFAULT CURRENT_DATE NOT NULL,
    FOREIGN KEY (msg_user_id) REFERENCES user(user_id),
    FOREIGN KEY (msg_chat_id) REFERENCES chat(chat_id));§§