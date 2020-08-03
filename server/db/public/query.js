import mysql from 'mysql2';

const getTransactionByMonth = function (params) {
  let getTransactionByMonthQuery = `
        SELECT th.transaction_type, th.transaction_date, th.category, p.name as payment,th.charge, th.description
        from TransactionHistory th , payment p 
        where DATE_FORMAT(th.transaction_date, '%m') = ? and p.id = th.payment_id
        order by th.transaction_date DESC;
    `;
  const getTransactionByMonthQueryC = mysql.format(getTransactionByMonthQuery, [params.month]);

  return getTransactionByMonthQueryC;
};

export { getTransactionByMonth };
