import HistoryListModel from '../model/historyListModel.js';
import HistoryItem from './historyItem.js';

export default class HistoryList {
  constructor(parentDom) {
    this.parentDom = parentDom;
    this.HistoryData = null;
    this.subscribe();
    render();
  }

  subscribe() {
    //임포트한 HistoryList 모델의 historydata를 구독하여 로컬변수인 this.HistoryData에 할당.
    //만약 구독한 변수에 변경사항이 생길시 update()실행
  }

  render() {
    this.parentDom.insertAdjacentHTML('beforeend', `<div class='itemWrapper'></div>`);
    this.renderItem();
  }

  renderItem() {
    const itemWrapperDom = this.parentDom.querySelector('.itemWrapper');
    this.HistoryData.forEach((item) => {
      new HistoryItem(itemWrapperDom, item);
    });
  }

  update() {
    this.remove();
    this.renderItem();
  }
}
