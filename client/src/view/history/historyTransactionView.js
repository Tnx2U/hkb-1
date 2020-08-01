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
    this.rootClassName = `transaction_` + index;
    this.render();
  }

  getTransactionHtmlSrc() {
    return `
            <div class=${this.rootClassName}>
                <div class='trans-category-div'>
                    ${this.data.category}
                </div>
                <div class='trans-description-div'>
                    ${this.data.description}
                </div>
                <div class='trans-payment-div'>
                    ${this.data.payment}
                </div>
                <div class='trans-charge-div'>
                    ${this.data.charge}
                </div>
            </div>
        `;
  }

  render() {
    this.parentDom.insertAdjacentHTML('beforeend', this.getTransactionHtmlSrc());
  }
}
