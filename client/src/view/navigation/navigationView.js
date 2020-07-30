export default class NavigationView {
  constructor(parentDom) {
    this.parentDom = parentDom;
    this.rootClassName = 'navigation';
    this.dummyData = { month: '6' };
    this.render();
  }

  getNavigationHtmlSrc() {
    return `
          <div class=${this.rootClassName}>
              <div class='monthTab'>
                  <button class='monthLeftBtn'>◁</button>
                  <div>${this.dummyData.month}월</div>
                  <button class='monthRightBtn'>▷</button>
              </div>
              <div class='contentTab'>
                <button class='contentHistoryBtn' id='selected'>내역</button>
                <div>|</div>
                <button class='contentCalenderBtn'>달력</button>
                <div>|</div>
                <button class='contentGraphBtn'>통계</button>
              </div>
          </div>
        `;
  }

  render() {
    this.parentDom.insertAdjacentHTML('beforeend', this.getNavigationHtmlSrc());
  }
}
