import excute from './public/excute.js';
import { postPaymentQuery, getPaymentsQuery } from './public/query.js';

const postPayment = async (params) => {
  try {
    const result = await excute(postPaymentQuery(params));
    return result;
  } catch (err) {
    throw err;
  }
};

const getPayments = async () => {
  try {
    const result = await excute(getPaymentsQuery());
    return result;
  } catch (err) {
    throw err;
  }
};

export { postPayment, getPayments };
