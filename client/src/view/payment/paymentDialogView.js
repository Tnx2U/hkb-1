export default class PaymentDialogView {
  constructor(parentDom) {
    this.parentDom = parentDom;
    this.render();
    this.init();
  }
  getTemplate() {
    return `
      <div class="payment-wrapper">
          <div class="payment-container">
              <div class="payment-header">
                  <div></div>
                  <h1 class="payment-header-title">결제 수단 관리</h1>
                  <h1 class="payment-header-close">x</h1>
              </div>
              <div class="payment-content">
                  <div class="payment-registration-container">
                      <label class="payment-registration-label" for="">결제 수단 이름</label>
                      <input class="payment-registration-input">
                      <button class="payment-registration-submit">등록</button>
                  </div>
                  <div class='payment-list'></div>
              </div>
          </div>
      </div>
      `;
  }

  get value() {
    return document.querySelector('.payment-registration-input').value;
  }

  set handleSubmit(handleSubmit) {
    this._handleSubmit = handleSubmit;
  }

  render() {
    this.parentDom.insertAdjacentHTML('beforeend', this.getTemplate());
  }

  renderPayments(payments) {
    const container = document.querySelector('.payment-list');
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    console.log(payments);
    payments.forEach(({ name, id }) => {
      const p = document.createElement('p');
      p.dataset.id = id;
      p.className = 'payment-p';
      p.textContent = name;

      const button = document.createElement('button');
      button.dataset.id = id;
      button.className = 'payment-btn';
      button.textContent = '삭제';

      const div = document.createElement('div');
      div.dataset.id = id;
      div.className = 'payment-item';

      div.appendChild(p);
      div.appendChild(button);
      fragment.appendChild(div);
    });
    container.appendChild(fragment);
  }

  init() {
    document.querySelector('.payment-header-close').addEventListener('click', this.toggle);
    document.querySelector('.payment-registration-submit').addEventListener('click', () => this._handleSubmit());
    document.querySelector('.payment-wrapper').setAttribute('status', 'hide');
  }

  toggle() {
    const dialog = document.querySelector('.payment-wrapper');
    dialog.setAttribute('status', dialog.getAttribute('status') === 'show' ? 'hide' : 'show');
  }
}
