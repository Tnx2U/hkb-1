import Observable from '../share/observable';

export default class PaymentModel extends Observable {
  #payments;

  constructor() {
    super();
    this.#payments = [];
  }

  get payments() {
    return this.#payments;
  }

  set payments(payments) {
    this.#payments = payments;
    this.notify(this.payments);
  }
}
