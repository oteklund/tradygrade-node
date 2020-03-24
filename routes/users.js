const express = require('express');
const router = express.Router();
const { getUsers } = require('../dao/usersDao');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      console.log('suoritetaan');
      let usersData = await getUsers();
      console.log(usersData);
      res.json(usersData);
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
    } catch (err) {
      next(err);
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
    } catch (err) {
      next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
