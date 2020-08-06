import '../share/observable';
import Observable from '../share/observable';

export default class TransactionModel extends Observable {
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
