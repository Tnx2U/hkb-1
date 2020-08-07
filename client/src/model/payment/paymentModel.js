import Observable from '../share/observable';

class PaymentModel extends Observable {
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

export default new PaymentModel();
