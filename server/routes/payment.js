import express from 'express';
import { addPayment, getAllPayments } from '../service/payment.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await getAllPayments();
    res.status(200).send({ success: true, data: result });
  } catch (err) {
    console.log(error.message);
    res.status(400).send({ success: false });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const result = await addPayment(req.body);
    res.status(200).send({ success: true, data: result });
  } catch (err) {
    console.log(error.message);
    res.status(400).send({ success: false });
  }
});

export default router;
