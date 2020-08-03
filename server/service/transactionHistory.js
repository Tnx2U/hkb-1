import { queryGetTransactionByMonth, queryPostTransaction } from '../db/transactionHistory.js';

async function getTransactionByMonth(params) {
  const result = await queryGetTransactionByMonth(params);
  return result;
}

async function postTransaction(params) {
  const result = await queryPostTransaction(params);
  return result;
}

export { getTransactionByMonth, postTransaction };
