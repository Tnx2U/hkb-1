export default class HistoryInputView {
  constructor(parentDom) {
    this.parentDom = parentDom;
    this.dummyData = { currentDate: '2020-06-16', historyType: 'income-category' };
    this.rootClassName = 'historyInput';
    this.render();
  }

  getHistoryInputHtmlSrc() {
    return `
          <div class=${this.rootClassName}>
            <form action="">
            <div class="input-row">
                <span class="input-label">분류</span>
                <input type="radio" id="income" name="historyType" value="income" style="display: none;">
                <input type="radio" id="spending" name="historyType" value="spending" style="display: none;">
                <label for="income" class="input-btn-type">수입</label>
                <label for="spending" class="input-btn-type">지출</label>
            </div>
            <div class="input-row">
                <div class="input-date">
                    <span class="input-label">날짜</span>
                    <input type="date" name="date" value="${this.dummyData.currentDate}" />
                </div>
                <div class="input-category">
                    <span class="input-label">카테고리</span>
                    <input list="${this.dummyData.historyType}" />
                    <datalist id="income-category">
                        <option selected>선택하세요</option>
                        <option value="월급">월급</option>
                        <option value="용돈">용돈</option>
                        <option value="기타수입">기타수입</option>
                    </datalist>
                    <datalist id="expend-category">
                        <option selected>선택하세요</option>
                        <option value="식비">식비</option>
                        <option value="생활">생활</option>
                        <option value="쇼핑/뷰티">쇼핑/뷰티</option>
                        <option value="교통">교통</option>
                        <option value="의료/건강">의료/건강</option>
                        <option value="문화/여가">문화/여가</option>
                        <option value="미분류">미분류</option>
                    </datalist>
                </div>
                <div class="input-payment">
                    <span class="input-label">결제수단</span>
                    <input list="payment" />
                    <datalist id="payment">
                    <option selected>선택하세요</option>
                </datalist>
                </div>
            </div>
            <div class="input-row">
                <div class="input-charge">
                    <span class="input-label">금액</span>
                    <input type="text" />
                </div>
                <div class="input-description">
                    <span class="input-label">내용</span>
                    <input type="text" />
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
    this.parentDom.insertAdjacentHTML('beforeend', this.getHistoryInputHtmlSrc());
  }
}
