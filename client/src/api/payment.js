import { post, get } from './fetcher.js';

const postPayment = (payment) => {
  const path = `/payment`;
  return post(path, payment);
};

const getPayments = () => {
  const path = `/payment`;
  return get(path, {});
};

export { postPayment, getPayments };
