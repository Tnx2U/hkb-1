export default class HistoryItemView {
  constructor(parentDom, data) {
    this.parentDom = parentDom;
    this.data = data;
    this.render();
  }

  render() {
    this.parentDom.insertAdjacentHTML(
      'beforeend',
      `
            <div class='hisoryitem' id='historyitem_${this.data}'>
                <div>
                    ${this.data}
                </div>
            </div>
        `
    );
  }
}
