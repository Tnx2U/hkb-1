export default class HistoryInputView {
  constructor(parentDom) {
    this.parentDom = parentDom;
    this.rootClassName = 'historyInput';
    this.render();
  }

  getHistoryInputHtmlSrc() {
    return `
          <div class=${this.rootClassName}>
          </div>
        `;
  }

  render() {
    this.parentDom.insertAdjacentHTML('beforeend', this.getHistoryInputHtmlSrc());
  }
}
