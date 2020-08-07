import mysql from 'mysql2';

const getTransactionByMonth = function (params) {
  let getTransactionByMonthQuery = `
        SELECT th.id, th.transaction_type, th.transaction_date, th.category, p.name as payment,th.charge, th.description
        from TransactionHistory th , payment p 
        where DATE_FORMAT(th.transaction_date, '%m') = ? and p.id = th.payment_id
        order by th.transaction_date DESC;
    `;
  const getTransactionByMonthQueryC = mysql.format(getTransactionByMonthQuery, [params.month]);

  return getTransactionByMonthQueryC;
};

const postTransaction = function (params) {
  let postTransactionQuery = `
    insert into hkb.TransactionHistory (payment_id , user_id , transaction_type , transaction_date , category , charge , description)
    values (? ,? ,? ,? ,? ,?, ?);
  `;

  const postTransactionQueryC = mysql.format(postTransactionQuery, [
    params.paymentId,
    params.userId,
    params.transactionType,
    params.transationDate,
    params.category,
    params.charge,
    params.description,
  ]);
  return postTransactionQueryC;
};

const putTransaction = function (params) {
  let putTransactionQuery = `
  update hkb.TransactionHistory set payment_id = ?, transaction_type = ?, transaction_date = ?, category = ?, charge = ?, description = ?
  where id = ?;
`;

  const putTransactionQueryC = mysql.format(putTransactionQuery, [
    params.paymentId,
    params.transactionType,
    params.transationDate,
    params.category,
    params.charge,
    params.description,
    params.id,
  ]);
  return putTransactionQueryC;
};

const postPaymentQuery = (params) => {
  const query = `insert into hkb.payment (user_id,name) values (?,?)`;
  const formatedQuery = mysql.format(query, [params.userId, params.name]);
  return formatedQuery;
};

const getPaymentsQuery = () => {
  return `select * from payment`;
};

export { getTransactionByMonth, postTransaction, putTransaction, postPaymentQuery, getPaymentsQuery };
