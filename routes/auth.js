/*
  • API URL: /api/auth
  • ADD JWT SECRET TO .env FILE TO HAVE AUTHENTICATION WORK PROPERLY
  •
*/
const express = require('express');
const router = express.Router();
const hashService = require("../auth/hashService")
const jwtService = require("../auth/jwtService")
const { authenticateToken } = require("./middleware")
const { getUserByName } = require("../dao/usersDao")
const { saveRefreshToken, retrieveRefreshTokenFromDatabase, deleteRefreshToken } = require("../dao/jwtDao")

router.post("/login", async (req, res, next) => {
  try {
    const { name, password } = req.body

    if (!name || !password) res.status(400).json({ error: "Please fill out the required fields." })

    const foundUser = await getUserByName(name)

    if (foundUser == null) {
      res.status(400).send("Invalid credentials")
      return
    }

    const passwordIsCorrect = hashService.dataCompare(password, foundUser.password)
    if (passwordIsCorrect == null) throw "Error handling login, please try again later"

    // in case authentication succeeds, we generate and return a jwt access token + refresh token. 
    if (passwordIsCorrect) {
      const token = jwtService.generateToken(foundUser)
      const refreshToken = jwtService.refreshToken(foundUser)
      saveRefreshToken(foundUser.id, refreshToken) // <- move to db
      res.status(200).json({ ...foundUser, token: token, refreshToken: refreshToken })
    } else {
      res.status(400).send("Invalid credentials")
    }
  } catch (err) {
    res.status(500).send()
    next(err)
  }
})

router.delete("/logout", async (req, res, next) => {
  //remove refresh token from db on logout
  deleteRefreshToken(req.body.name)
  res.status(204).send()
})

router.post("/token", async (req, res, next) => {
  try {
    const { refreshToken, name } = req.body
    if (refreshToken == null) res.status(401).send()

    //retrieve refresh token from db and make sure response isn't empty
    const storedRefreshToken = await retrieveRefreshTokenFromDatabase(name)
    if (storedRefreshToken == null) res.status(401).send()

    //check that submitted refresh token matches with db stored one
    const refreshTokenIsValid = hashService.dataCompare(refreshToken, storedRefreshToken)
    if (!refreshTokenIsValid) res.status(403).send()

    //make sure the refresh token is up to date with our token secret
    const newToken = jwtService.verifyRefreshToken(refreshToken)
    if (newToken == null) res.status(403).send()

    //all good, return token to user
    else if (newToken) res.status(200).json({ token: newToken })
  } catch (error) {
    console.error(error)
    res.status(500).send()
  }

})

module.exports = router;
