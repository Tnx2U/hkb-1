import Observable from '../share/observable';

class TransactionModel extends Observable {
  #transaction;

  constructor() {
    super();
    this.#transaction = {};
  }

  get transaction() {
    return this.#transaction;
  }

  set transaction(transaction) {
    this.#transaction = transaction;
    this.notify(this.transaction);
  }
}

export default new TransactionModel();
