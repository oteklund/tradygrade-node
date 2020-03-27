const express = require('express');
const router = express.Router();
const { getChatMessages, getChatIDs, newChatMessage, addChatID } = require('../dao/chatDao');
const { getMsg, updateMsg, deleteMsg} = require ('../dao/msgDao');

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
  });

router.route('/message/:id')
  .get(async (req, res, next) => {
    try {
      let msg = await getMsg(req.params.id)
      if (msg) {
        res.json(msg);
        res.status(200);
      } else {
        res.status(400).json({ msg: 'Invalid message id' });
      }
    } catch (err) {
      res.status(500);
      next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      let response = await updateMsg(req.params.id, req.body);
      if (response) {
        res.status(200).json({ success: true });
      } else {
        res.status(400);
      }
    } catch (err) {
      res.status(500);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      let response = await deleteMsg(req.params.id);
      if (response) {
        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ error: 'Id not found!' });
      }
    } catch (err) {
      res.status(500);
      next(err);
    }
  });

module.exports = router;
