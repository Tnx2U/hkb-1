export default class HistoryItem {
  constructor(parentDom, data) {
    this.parentDom = parentDom;
    (this.data = data), this.render();
  }

  render() {
    this.parentDom.insertAdjacentHTML(
      'beforeend',
      `
            <div class='hisoryitem' id='historyitem_${data.id}'>
                <div>
                    ${data}
                </div>
            </div>
        `
    );
  }
}
