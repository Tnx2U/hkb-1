// import HistoryListModel from '../../model/historyListModel.js';
import HistoryItemView from './historyItemView.js';

export default class HistoryListView {
  constructor(parentDom) {
    this.parentDom = parentDom;
    this.dummyData = { allExpend: 2450000, items: [1, 2, 3, 4, 5] };
    this.rootClassName = 'historyList';
    this.subscribe();
    this.render();
  }

  subscribe() {
    //임포트한 HistoryList 모델의 historydata를 구독하여 로컬변수인 this.HistoryData에 할당.
    //만약 구독한 변수에 변경사항이 생길시 update()실행
  }

  getHistoryListHtmlSrc() {
    return (
      `
      <div class='${this.rootClassName}'>
        <div class='typeSelector'>` +
      this.getTypeSelectorHtmlSrc() +
      `</div>
        <div class='historyItemWrapper'>
        </div>
      </div>
    `
    );
  }

  getTypeSelectorHtmlSrc() {
    return `
      <div class='incomeSelector'>
        <input class='incomeSelectorBox' type='checkbox'></input>
        <span> 수입 </span>
        <span class='incomeSelectorCharge'> ${this.dummyData.allExpend}원 </span>
      </div>
      <div class='expendSelector'>
        <input class='expendSelectorBox' type='checkbox'></input>
        <span> 지출 </span>
        <span class='expendSelectorCharge'> ${this.dummyData.allExpend}원 </span>
      </div>
    `;
  }

  renderHistoryList() {
    this.parentDom.insertAdjacentHTML('beforeend', this.getHistoryListHtmlSrc());
  }

  render() {
    this.renderHistoryList();
    this.renderHistoryItem();
  }

  renderHistoryItem() {
    const itemWrapperDom = this.parentDom.querySelector('.historyItemWrapper');
    this.dummyData.items.forEach((item) => {
      new HistoryItemView(itemWrapperDom, item);
    });
  }

  // update() {
  //   this.remove();
  //   this.renderItem();
  // }
}
