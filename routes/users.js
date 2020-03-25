const express = require('express');
const router = express.Router();
const { getUsers, getUser, createUser } = require('../dao/usersDao');
const { getItemsByUserId } = require('../dao/itemsDao');
const User = require("../models/User")
const hashService = require("../auth/hashService")

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
      const { name, email, picture} = req.body
      const hashedPassword = await hashService.hash(req.body.password)
      const user = new User(id = null, name, hashedPassword, email, picture) //initialize new user with id null (database generates id)
      await createUser(user)
      res.status(201).send()
    } catch (err) {
      next(err);
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {

      console.log("Looking for the one!")
      let userData = await getUser(req.params.id);
      console.log(userData);
      res.json(userData);
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

//GET all items user has listed on the marketplace - Pekka

router.get('/:id/items', async (req, res) => {
  try {
    let response = await getItemsByUserId(req.params.id);
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: 'No data found' });
    }
  } catch (err) {
    res.status(500);
    next(err);
  }
});

module.exports = router;
