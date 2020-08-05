var express = require('express');
var router = express.Router();
import {
  getOrganizeTransactionByMonth,
  getTransactionByMonth,
  postTransaction,
  putTransaction,
} from '../service/transactionHistory.js';

/* 월별 거래기록을 날짜별로 그룹화하여 조회하는 api 라우터 */
router.get('/:month/organize', async function (req, res, next) {
  try {
    const transactionData = await getOrganizeTransactionByMonth(req.body);
    res.status(200).send({ success: true, data: transactionData });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ success: false });
  }
});

/* 월별 거래기록을 조회하는 api 라우터 */
router.get('/:month', async function (req, res, next) {
  try {
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
    const queryResult = await postTransaction(req.body);
    res.status(200).send({ success: true, data: queryResult });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ success: false });
  }
});

/* id로 찾은 기존 거래기록을 put하기 위한 api라우터 */
router.put('/:id', async function (req, res, next) {
  try {
    const queryResult = await putTransaction(req.body);
    res.status(200).send({ success: true, data: queryResult });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ success: false });
  }
});

module.exports = router;
