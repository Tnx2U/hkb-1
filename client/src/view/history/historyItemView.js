import HistoryTransactionView from './historyTransactionView.js';

export default class HistoryItemView {
  constructor(parentDom, data, index) {
    this.parentDom = parentDom;
    this.rootClassName = 'historyItem';
    this.rootIdName = `#item_${index}`;
    this.data = data;
    this.render();
  }

  getHistoryItemHtmlSrc() {
    return `
        <div class='history-item-header'>
          <div class='history-item-section'>
            <div class='history-item-date'>${this.data.date}</div>
            <div class='history-item-day'>${this.data.day}</div>
          </div>
          <div class='history-item-section'>
            <div class='history-item-income-total'>${this.data.allIncome}</div>
            <div class='history-item-expend-total'>${this.data.allExpend}</div>
          </div>
        </div>
        <div class='history-item-container'>
        </div>
    `;
  }

  renderHistoryItem() {
    this.parentDom.insertAdjacentHTML('beforeend', this.getHistoryItemHtmlSrc());
  }

  renderHistoryTransaction() {
    const transactionDom = this.parentDom.querySelector('.history-item-container');
    this.data.transactions.forEach((transaction, index) => {
      new HistoryTransactionView(transactionDom, transaction, index);
    });
  }

  render() {
    this.renderHistoryItem();
    this.renderHistoryTransaction();
  }
}
