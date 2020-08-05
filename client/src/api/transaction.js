import { post, put, get } from './fetcher.js';

const getOrganizeTransaction = function (month) {
  const path = `/transactionHistory/${month}/organize`;
  const params = {
    month: month,
  };
  return get(path, params);
};

const getTransaction = function (month) {
  const path = `/transactionHistory/${month}`;
  const params = {
    month: month,
  };
  return get(path, params);
};

const postTransaction = function (paymentId, userId, transactionType, transationDate, category, charge, description) {
  const path = `/transactionHistory/`;
  const params = {
    paymentId: paymentId,
    userId: userId,
    transactionType: transactionType,
    transationDate: transationDate,
    category: category,
    charge: charge,
    description: description,
  };
  console.log(params);
  return post(path, params);
};

const putTransaction = function (paymentId, transactionType, transationDate, category, charge, description, id) {
  const path = `/transactionHistory/${id}`;
  const params = {
    paymentId: paymentId,
    transactionType: transactionType,
    transationDate: transationDate,
    category: category,
    charge: charge,
    description: description,
    id: id,
  };
  return put(path, params);
};

export { getOrganizeTransaction, getTransaction, postTransaction, putTransaction };
