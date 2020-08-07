// import HistoryListModel from '../../model/historyListModel.js';
import HistoryItemView from './historyItemView.js';

export default class HistoryListView {
  constructor(parentDom, transaction) {
    this.parentDom = parentDom;
    this.transaction = transaction;
    this.rootClassName = 'historyList';
    this.render();
  }

  getHistoryListTemplate() {
    return (
      `
      <div class='${this.rootClassName}'>
        <div class='typeSelector'>` +
      this.getTypeSelectorTemplate() +
      `</div>
        <div class='historyItemWrapper'>
        </div>
      </div>
    `
    );
  }

  getTypeSelectorTemplate() {
    return `
      <div class='incomeSelector'>
        <input class='incomeSelectorBox' type='checkbox'></input>
        <span> 수입 </span>
        <span class='incomeSelectorCharge'> ${this.transaction.allIncome || 0}원 </span>
      </div>
      <div class='expendSelector'>
        <input class='expendSelectorBox' type='checkbox'></input>
        <span> 지출 </span>
        <span class='expendSelectorCharge'> ${this.transaction.allExpend || 0}원 </span>
      </div>
    `;
  }

  renderHistoryList() {
    this.parentDom.insertAdjacentHTML('beforeend', this.getHistoryListTemplate());
  }

  render() {
    this.renderHistoryList();
    this.renderHistoryItem();
  }

  renderHistoryItem() {
    const itemWrapperDom = this.parentDom.querySelector('.historyItemWrapper');
    this.transaction?.items?.forEach((item, index) => {
      itemWrapperDom.insertAdjacentHTML('beforeend', `<div class='historyItem' id='item_${index}'></div>`);
      const historyItemDom = itemWrapperDom.querySelector(`#item_${index}`);
      new HistoryItemView(historyItemDom, item, index);
    });
  }
}
