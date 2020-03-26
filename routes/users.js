const express = require('express');
const router = express.Router();
const { getUsers, getUser, createUser, deleteUser } = require('../dao/usersDao');
const { getItemsByUserId } = require('../dao/itemsDao');
const User = require("../models/User")
const hashService = require("../auth/hashService")
const { authenticateToken } = require("./middleware")

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
      const { name, email, picture } = req.body
      const hashedPassword = await hashService.hash(req.body.password)
      const user = new User(id = null, name, hashedPassword, email, picture) //initialize new user with id null (database generates id)
      const data = await createUser(user)
      if (data == null) res.status(400).json("That username is taken!")
      res.status(201).json("Registration successful! You may now log in.")
    } catch (err) {
      res.status(500).send("An unexpected error occurred. Please try again later.")
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
      const id = req.params.id
      let data = await deleteUser(id)
      if (!data) res.status(404).send("No such user")
      else res.status(204).send("User successfully deleted.")
    } catch (err) {
      next(err);
      res.status(500).send()
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
