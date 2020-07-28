var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:month', function (req, res, next) {
  res.send('this route is api for transaction history by month');
});

module.exports = router;
