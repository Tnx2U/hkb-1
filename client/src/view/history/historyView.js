import HistoryInputView from './historyInputView.js';
import HistoryListView from './historyListView.js';
export default class HistoryView {
  constructor(parentDom) {
    this.parentDom = parentDom;
    this.rootClassName = 'history';
    this._month = '08';
    this.init();
  }

  set transaction(transaction) {
    this.transactionData = transaction;
  }

  getTemplate() {
    return `
        <div class='${this.rootClassName}'>
            <div class='historyInputWrapper'></div>
            <div class='historyListWrapper'></div>
        </div>
    `;
  }

  mount() {
    this.parentDom.insertAdjacentHTML('beforeend', this.getTemplate());
  }

  render() {
    this.mount();
    this.renderHistoryInput();
    if (this.transactionData) this.renderHistoryList();
  }

  renderHistoryInput() {
    this.historyInput = new HistoryInputView(this.parentDom.querySelector('.historyInputWrapper'));
    this.historyInput.payments = this._payments;
    this.historyInput.month = this._month;
  }

  renderHistoryList() {
    const historyListWrapperDom = this.parentDom.querySelector('.historyListWrapper');
    new HistoryListView(historyListWrapperDom, this.transactionData);
  }

  init() {}

  set payments(payments) {
    this._payments = payments;
    this.historyInput.payments = payments;
  }

  set month(month) {
    this._month = month;
    this.historyInput.month = month;
  }
}
