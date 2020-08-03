import excute from './public/excute.js';
import { getTransactionByMonth } from './public/query.js';

function queryGetTransactionByMonth(params) {
  console.log('access getbymonth db');
  const transactionData = excute(getTransactionByMonth(params)).catch((error) => {
    console.log(error);
    throw error;
  });
  return transactionData;
}

export { queryGetTransactionByMonth };
