/*
  • API URL: /api/auth
  • ADD JWT SECRET TO .env FILE TO HAVE AUTHENTICATION WORK PROPERLY
  •
*/
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post("/login", (req, res) => {

})

module.exports = router;
