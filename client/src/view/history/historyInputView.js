import { postTransaction } from '../../api/transaction';
import { getOrganizeTransaction } from '../../api/transaction';
import transactionModel from '../../model/transaction/transactionModel';

const INCOME_CATEGORY = ['월급', '용돈', '기티수입'];

const EXPEND_CATEGORY = ['식비', '생활', '쇼핑/뷰티', '교통', '의료/건강', '문화/여가', '미분류'];

const selectPlaceholder = '<option disabled selected hidden>선택하세요</option>';

export default class HistoryInputView {
  constructor(parentDom) {
    this.parentDom = parentDom;
    this.dummyData = { currentDate: '2020-08-07', historyType: 'income-category' };
    this.rootClassName = 'historyInput';
    this.render();
    this.init();
  }

  getHistoryInputHtmlSrc() {
    return `
          <div class=${this.rootClassName}>
            <form class='history-input-form' action="">
            <div class="input-row">
                <span class="input-label">분류</span>
                <input type="radio" id="income-radio" name="transactionType" value="income" style="display: none;" checked>
                <input type="radio" id="expend-radio" name="transactionType" value="expend" style="display: none;">
                <label for="income-radio" class="input-btn-type income-label radio-selected">수입</label>
                <label for="expend-radio" class="input-btn-type expend-label">지출</label>
            </div>
            <div class="input-row">
                <div class="input-date">
                    <span class="input-label">날짜</span>
                    <input type="date" name="transationDate" value="${this.dummyData.currentDate}" />
                </div>
                <div class="input-category">
                    <span class="input-label">카테고리</span>
                    <select class="category-select" name="category" required>
                        <option disabled selected hidden>선택하세요</option>
                        <option value="월급">월급</option>
                        <option value="용돈">용돈</option>
                        <option value="기타수입">기타수입</option>
                    </select>
                </div>
                <div class="input-payment">
                    <span class="input-label">결제수단</span>
                    <select class="payment-select" name="paymentId" required>
                    </select>
                </datalist>
                </div>
            </div>
            <div class="input-row">
                <div class="input-charge">
                    <span class="input-label">금액</span>
                    <input name="charge" type="number" required/>
                </div>
                <div class="input-description">
                    <span class="input-label">내용</span>
                    <input name="description" type="text" required/>
                </div>
            </div>
            <div class="input-row">
                <input class="input-btn-confirm" type="button" value='확인'/>
            </div>
            </form>
          </div>
        `;
  }

  render() {
    this.parentDom.innerHTML = '';
    this.parentDom.insertAdjacentHTML('beforeend', this.getHistoryInputHtmlSrc());
    if (this._payments) this.renderSelect();
  }

  renderSelect() {
    const paymentSelect = document.querySelector('.payment-select');
    paymentSelect.innerHTML = selectPlaceholder;
    this._payments?.forEach((payment) => {
      paymentSelect.insertAdjacentHTML('beforeend', `<option value=${payment.id}>${payment.name}</option>`);
    });
  }

  init() {
    const form = document.querySelector('.history-input-form');
    form.addEventListener('change', (e) => {
      const incomeLabel = document.querySelector('.income-label');
      const expendLabel = document.querySelector('.expend-label');
      const categorySelect = document.querySelector('.category-select');
      if (e.target.type === 'radio') {
        categorySelect.innerHTML = selectPlaceholder;
        if (e.target.value === 'income') {
          incomeLabel.classList.add('radio-selected');
          expendLabel.classList.remove('radio-selected');
          this.appendOptions(categorySelect, INCOME_CATEGORY);
        } else if (e.target.value === 'expend') {
          incomeLabel.classList.remove('radio-selected');
          expendLabel.classList.add('radio-selected');
          this.appendOptions(categorySelect, EXPEND_CATEGORY);
        }
      }
    });

    document.querySelector('.input-btn-confirm').addEventListener('click', async () => {
      const formData = new FormData(form);
      formData.set('transationDate', formData.get('transationDate') + ' 10:00:00.0');
      formData.set('userId', 1);
      const params = {};
      for (const [key, value] of formData) {
        params[key] = value;
      }
      await postTransaction(params);
      const { data } = await (await getOrganizeTransaction(this._month || '08')).json();
      transactionModel.transaction = data;
    });
  }

  appendOptions(el, arr) {
    arr.forEach((item) => {
      el.insertAdjacentHTML('beforeend', `<option value=${item}>${item}</option>`);
    });
  }

  set payments(payments) {
    this._payments = payments;
    this.renderSelect();
  }

  set month(month) {
    this._month = month;
  }
}
