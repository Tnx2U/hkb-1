export default class HeaderView {
  constructor(parentDom) {
    this.parentDom = parentDom;
    this.rootClassName = 'header';
    this.render();
  }

  getHeadHtmlSrc() {
    return `
        <div class=${this.rootClassName}>
            <div class='titleDiv'>
                <span>가계부</span>
            </div>
            <div class='paymentBtn'>
                <button class='btn_open_payment'>결제 수단 관리</button>
            </div>
        </div>
      `;
  }

  render() {
    this.parentDom.insertAdjacentHTML('beforeend', this.getHeadHtmlSrc());
  }
}
