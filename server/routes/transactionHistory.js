var express = require('express');
var router = express.Router();
import { getTransactionByMonth, postTransaction } from '../service/transactionHistory.js';

/* 월별 거래기록을 조회하는 api 라우터 */
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

/* 새 거래기록을 post하기 위한 api 라우터 */
router.post('/', async function (req, res, next) {
  try {
    console.log('access postTransaction routes');
    const queryResult = await postTransaction(req.body);
    res.status(200).send({ success: true, data: queryResult });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ success: false });
  }
});

module.exports = router;
