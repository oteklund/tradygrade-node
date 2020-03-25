const express = require('express');
const router = express.Router();
const { getChatMessages, getChatIDs, newChatMessage, addChatID } = require('../dao/chatDao');

// GET chatmessages by chatID
router.route('/:chatid')
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
      let chats = await newChatMessage(req.body.user, req.params.chatid, req.body.message)
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
router.route('/chats/:userid')
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
router.route('/chats/new')
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
