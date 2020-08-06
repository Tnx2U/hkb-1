import router from '../../router';

export default class NavigationView {
  constructor({ parentDom, handleChange = () => {} }) {
    this.parentDom = parentDom;
    this.handleChange = handleChange;
    this.rootClassName = 'navigation';
    this.month = 6;
    this.selected = 'history';
    this.render();
    this.init();
  }

  getTemplate() {
    return `
          <div class=${this.rootClassName}>
              <div class='month-tab'>
                  <a class='month-btn-left'>◁</a>
                  <div class="month-text">${this.month}</div>
                  <a class='month-btn-right'>▷</a>
              </div>
              <div class='content-tab'>
                <a class='content-btn-history selected'>내역</a>
                <span class='content-separater'>|</span>
                <a class='content-btn-calendar'>달력</a>
                <span class='content-separater'>|</span>
                <a class='content-btn-chart'>통계</a>
              </div>
          </div>
        `;
  }

  render() {
    this.parentDom.insertAdjacentHTML('beforeend', this.getTemplate());
  }

  init() {
    const root = document.querySelector(`.${this.rootClassName}`);
    root.addEventListener('click', (e) => {
      e.preventDefault();
      const className = e.target.className.split(' ')[0];

      let changed = false;
      switch (className) {
        case 'month-btn-left':
          if (--this.month <= 0) this.month = 12;
          changed = true;
          break;
        case 'month-btn-right':
          if (++this.month > 12) this.month = 1;
          changed = true;
          break;
        case 'content-btn-history':
          router.to('history');
          this.selected = 'history';
          break;
        case 'content-btn-calendar':
          router.to('calendar');
          this.selected = 'calendar';
          break;
        case 'content-btn-chart':
          router.to('chart');
          this.selected = 'chart';
          break;
      }
      if (changed) {
        document.querySelector('.month-text').innerHTML = this.month;
        const month = (this.month < 10 ? '0' : '') + this.month;
        this.handleChange(month);
      }
    });
  }
}
