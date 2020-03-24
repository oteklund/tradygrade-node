const express = require('express');
const router = express.Router();

router
  .route('/')
  .get(async (req, res, next) => {
    try {
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
