const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/:chatid', function(req, res, next) {
  res.json('hola Postimies!');
});


router.post("/:chatid", (req, res) => {
    res.json('hola DB!');

})

module.exports = router;
