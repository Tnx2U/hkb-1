import HistoryInputView from './historyInputView.js';
import HistoryListView from './historyListView.js';

export default class HistoryView {
  constructor(parentDom) {
    this.parentDom = parentDom;
    this.rootClassName = 'history';
    this.render();
  }

  getHistoryHtmlSrc() {
    return `
        <div class='history'>
            <div class='historyInputWrapper'></div>
            <div class='historyListWrapper'></div>
        </div>
    `;
  }

  render() {
    this.renderHistory();
    this.renderHistoryInput();
    this.renderHistoryList();
  }

  update() {
    //to-do : input과 list만 다시 렌더할건지 혹은 렌더함수자체에 미리 기존에 있던걸 삭제하는 로직을 넣을건지 선택
  }

  renderHistory() {
    this.parentDom.insertAdjacentHTML('beforeend', this.getHistoryHtmlSrc());
  }

  renderHistoryInput() {
    const historyInputWrapperDom = this.parentDom.querySelector('.historyInputWrapper');
    new HistoryInputView(historyInputWrapperDom);
  }

  renderHistoryList() {
    const historyListWrapperDom = this.parentDom.querySelector('.historyListWrapper');
    new HistoryListView(historyListWrapperDom);
  }
}
