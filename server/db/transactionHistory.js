import excute from './public/excute.js';
import { getTransactionByMonth, postTransaction } from './public/query.js';

function queryGetTransactionByMonth(params) {
  const transactionData = excute(getTransactionByMonth(params)).catch((error) => {
    console.log(error);
    throw error;
  });
  return transactionData;
}

function queryPostTransaction(params) {
  const queryResult = excute(postTransaction(params)).catch((error) => {
    console.log(error);
    throw error;
  });
  return queryResult;
}

export { queryGetTransactionByMonth, queryPostTransaction };
