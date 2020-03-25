const express = require('express');
const router = express.Router();
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
} = require('../dao/itemsDao');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      console.log('suoritetaan');
      let items = await getItems();
      if (items) {
        res.json(items);
      } else {
        res.status(400);
      }
    } catch (err) {
      res.status(500);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      let response = await createItem(req.body);
      console.log(response);
      if (response) {
        res.status(201).json({ success: true, id: response });
      } else {
        res.status(400);
      }
    } catch (err) {
      res.status(500);
      next(err);
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      let item = await getItem(req.params.id);
      if (item) {
        res.json(item);
      } else {
        res.status(400).json({ msg: 'Invalid id' });
      }
    } catch (err) {
      res.status(500);
      next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      let response = await updateItem(req.params.id, req.body);
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
      let response = await deleteItem(req.params.id);
      console.log(response);
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
