import HistoryTransactionView from './historyTransactionView.js';

export default class HistoryItemView {
  constructor(parentDom, data) {
    this.parentDom = parentDom;
    this.rootClassName = 'historyItem';
    this.data = data;
    this.render();
  }

  getHistoryItemHtmlSrc() {
    return `
      <div class=${this.rootClassName}>
        <div class='items-header-div'>
          <div class='date-div'>${this.data.date}</div>
          <div class='day-div'>${this.data.day}</div>
          <div class='allincome-div'>${this.data.allIncome}</div>
          <div class='allexpend-div'>${this.data.allExpend}</div>
        </div>
        <div class='transaction-list'>
        </div>
      </div>
    `;
  }

  renderHistoryItem() {
    this.parentDom.insertAdjacentHTML('beforeend', this.getHistoryItemHtmlSrc());
  }

  renderHistoryTransaction() {
    const transactionDom = this.parentDom.querySelector('.transaction-list');
    this.data.transactions.forEach((transaction, index) => {
      new HistoryTransactionView(transactionDom, transaction, index);
    });
  }

  render() {
    this.renderHistoryItem();
    this.renderHistoryTransaction();
  }
}

// {
//   date: '2020-06-16',
//   day: '화',
//   allIncome: 0,
//   allExpend: 26000,
//   transactions: [
//     {
//       type: '지출',
//       category: '쇼핑/뷰티',
//       description: '미용실',
//       payment: '현대카드',
//       charge: 20000,
//     },
//     {
//       type: '지출',
//       category: '식비',
//       description: '맥도날드',
//       payment: '카카오체크카드',
//       charge: 6000,
//     },
//   ],
// },
