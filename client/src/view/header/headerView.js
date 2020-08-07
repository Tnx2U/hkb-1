import PaymentDialogView from '../payment/paymentDialogView';
import paymentModel from '../../model/payment/paymentModel';
import { postPayment, getPayments } from '../../api/payment';
export default class HeaderView {
  constructor(parentDom) {
    this.parentDom = parentDom;
    this.rootClassName = 'header';
    this.paymentModel = paymentModel;
    this.render();
    this.init();
  }

  getTemplate() {
    return `
        <div class=${this.rootClassName}>
            <div class='pad'></div>
            <div class='titleDiv'>
                <span>가계부</span>
            </div>
            <div class='paymentBtn'>
                <button class='btn_open_payment'>결제 수단 관리</button>
            </div>
        </div>
      `;
  }

  render() {
    this.parentDom.insertAdjacentHTML('beforeend', this.getTemplate());
    const header = document.querySelector('.header');
    this.paymentDialog = new PaymentDialogView(header);
  }

  async setPayments() {
    this.paymentModel.payments = (await (await getPayments()).json()).data;
  }

  async init() {
    document.querySelector('.btn_open_payment').addEventListener('click', this.paymentDialog.toggle);
    this.paymentDialog.handleSubmit = async () => {
      await postPayment({ userId: 1, name: this.paymentDialog.value });
      this.setPayments();
    };
    this.paymentModel.subscribe(this.paymentDialog.renderPayments);
    this.setPayments();
  }
}
