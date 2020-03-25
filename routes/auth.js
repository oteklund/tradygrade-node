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

router.post("/login", async (req, res, next) => {
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

  router.delete("/logout", async (req, res, next) => {
      jwtService.deleteRefreshToken(req.body.refreshToken)
      res.status(204).send()
    })

  router.post("/token", async (req, res, next) => {
      const refreshToken = req.body.refreshToken
      if (refreshToken == null) res.status(401).send()
      if (!jwtService.refreshTokens.includes(refreshToken)) res.status(403).send()
      const newToken = jwtService.verifyRefreshToken(refreshToken)
      if (newToken == null) res.status(403).send()
      
      res.json({ token: newToken })
    })

module.exports = router;
