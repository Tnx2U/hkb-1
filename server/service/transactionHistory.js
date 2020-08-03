import { queryGetTransactionByMonth } from '../db/transactionHistory.js';

async function getTransactionByMonth(params) {
  console.log('access getbymonth service');
  const result = await queryGetTransactionByMonth(params);
  return result;
}

export { getTransactionByMonth };
