const express = require('express');
const router = express.Router();
const { getUsers, getUser, createUser, getUserByName } = require('../dao/usersDao');
const { getItemsByUserId } = require('../dao/itemsDao');
const User = require("../models/User")
const hashService = require("../auth/hashService")
const jwtService = require("../auth/jwtService")
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
      await createUser(user)
      res.status(201).send()
    } catch (err) {
      next(err);
    }
  });

router
  .route("/login")
  .post(async (req, res, next) => {
    try {
      const { name, password } = req.body
      const foundUser = await getUserByName(name)
      
      if (foundUser == null) {
        res.status(400).send("Invalid credentials")
        return
      }
      
      const passwordIsCorrect = hashService.passwordCompare(password, foundUser.password)
      if (passwordIsCorrect == null) throw "Error handling login, please try again later"
      
      // in case authentication succeeds, we generate and return a jwt + refresh token. refresh tokens are currently stored locally in an array, but will be moved to a db.
      if (passwordIsCorrect){
        const token = jwtService.generateToken(foundUser)
        const refreshToken = jwtService.refreshToken(foundUser)
        jwtService.refreshTokens.push(refreshToken) // <- move to db
        res.status(200).json({...foundUser, token: token, refreshToken: refreshToken}) 
      } else {
        res.status(400).send("Invalid credentials") 
      }
    } catch (err) {
      res.status(500).send()
      next(err)
    }
  })

  router
    .route("/logout")
    .delete(async (req, res, next) => {
      jwtService.deleteRefreshToken(req.body.refreshToken)
      res.status(204).send()
    })

  router
    .route("/token")
    .post(async (req, res, next) => {
      const refreshToken = req.body.refreshToken
      if (refreshToken == null) res.status(401).send()
      if (!jwtService.refreshTokens.includes(refreshToken)) res.status(403).send()
      const newToken = jwtService.verifyRefreshToken(refreshToken)
      if (newToken == null) res.status(403).send()
      
      res.json({ token: newToken })
    })

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
