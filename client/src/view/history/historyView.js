import HistoryInputView from './historyInputView.js';
import HistoryListView from './historyListView.js';

export default class HistoryView {
  constructor(parentDom) {
    this.parentDom = parentDom;
    this.rootClassName = 'history';
    this.render();
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

  render() {
    this.mount();
    this.renderHistoryInput();
    if (this.transactionData) this.renderHistoryList();
  }

  mount() {
    this.parentDom.insertAdjacentHTML('beforeend', this.getTemplate());
  }

  renderHistoryInput() {
    const historyInputWrapperDom = this.parentDom.querySelector('.historyInputWrapper');
    new HistoryInputView(historyInputWrapperDom);
  }

  renderHistoryList() {
    const historyListWrapperDom = this.parentDom.querySelector('.historyListWrapper');
    new HistoryListView(historyListWrapperDom, this.transactionData);
  }
}
