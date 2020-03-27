const express = require('express');
const router = express.Router();
const { getChatIDs, addChatID } = require('../dao/chatDao');
const { getChatMessages, newChatMessage } = require('../dao/msgDao');

// GET chatmessages by chatID
router.route('/messages/:chatid')
  .get(async (req, res, next) => {
    try {
      let messages = await getChatMessages(req.params.chatid)
      if (messages) {
        res.json(messages);
        res.status(200);
      } else {
        res.status(400);
      }
    } catch (err) {
      res.status(500);
      next(err);
    }
  })

  // POST new chatmessage to chat
  .post(async (req, res, next) => {
    try {
      let chats = await newChatMessage(req.body.user, req.params.chatid, req.body.message, req.body.time)
      if (chats) {
        res.json(chats);
        res.status(200);
      } else {
        res.status(400);
      }
    } catch (err) {
      res.status(500);
      next(err);
    }
  })


// GET chatIDs for specific user
router.route('/my/:userid')
  .get(async (req, res, next) => {
    try {
      let chats = await getChatIDs(req.params.userid)
      if (chats) {
        res.json(chats);
        res.status(200);
      } else {
        res.status(400);
      }
    } catch (err) {
      res.status(500);
      next(err);
    }
  })

// POST new chatID
router.route('/new')
  .post(async (req, res, next) => {
    try {
      let newChat = await addChatID()
      if (newChat) {
        res.json(newChat);
        res.status(200);
      } else {
        res.status(400);
      }
    } catch (err) {
      res.status(500);
      next(err);
    }
  })


module.exports = router;
