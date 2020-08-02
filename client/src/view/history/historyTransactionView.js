//     {
//       type: '지출',
//       category: '쇼핑/뷰티',
//       description: '미용실',
//       payment: '현대카드',
//       charge: 20000,
//     },

export default class HistoryTransactionView {
  constructor(parentDom, data, index) {
    this.parentDom = parentDom;
    this.data = data;
    this.index = index;
    this.rootClassName = `transaction-container transaction_` + index;
    this.render();
  }

  getTransactionHtmlSrc() {
    return `
            <div class=${this.rootClassName}>
                <span class='transaction-category'>
                    ${this.data.category}
                </span>
                <span class='transaction-description'>
                    ${this.data.description}
                </span>
                <span class='transaction-payment'>
                    ${this.data.payment}
                </span>
                <span class='transaction-charge'>
                    ${this.data.charge}
                </span>
            </div>
        `;
  }

  render() {
    this.parentDom.insertAdjacentHTML('beforeend', this.getTransactionHtmlSrc());
  }
}
