import { postPayment, getPayments } from '../db/payment.js';

const getAllPayments = async () => {
  const result = await getPayments();
  return result;
};

const addPayment = async (params) => {
  const result = await postPayment(params);
  return result;
};

export { getAllPayments, addPayment };
