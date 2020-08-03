var express = require('express');
var router = express.Router();
import { getTransactionByMonth } from '../service/transactionHistory.js';

/* GET users listing. */
router.get('/:month', async function (req, res, next) {
  try {
    console.log('access getbymonth routes');
    const transactionData = await getTransactionByMonth(req.body);
    res.status(200).send({ success: true, data: transactionData });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ success: false });
  }
});

module.exports = router;
