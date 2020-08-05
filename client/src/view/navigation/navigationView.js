import router from '../../router';
import Calendar from '../calendar';
import Graph from '../graph';
export default class NavigationView {
  constructor(parentDom) {
    this.parentDom = parentDom;
    this.rootClassName = 'navigation';
    this.dummyData = { month: '6' };
    this.render();
    const history = document.createElement('h1');
    history.innerText = 'history';
  }

  getNavigationHtmlSrc() {
    return `
          <div class=${this.rootClassName}>
              <div class='month-tab'>
                  <a class='month-btn-left'>◁</a>
                  <div>${this.dummyData.month}월</div>
                  <a class='month-btn-right'>▷</a>
              </div>
              <div class='content-tab'>
                <a class='content-btn-history selected'>내역</a>
                <span class='content-separater'>|</span>
                <a class='content-btn-calendar'>달력</a>
                <span class='content-separater'>|</span>
                <a class='content-btn-graph'>통계</a>
              </div>
          </div>
        `;
  }

  render() {
    this.parentDom.insertAdjacentHTML('beforeend', this.getNavigationHtmlSrc());
    document.querySelector('.content-btn-history').addEventListener('click', () => {
      router.to('history');
    });
    document.querySelector('.content-btn-calendar').addEventListener('click', () => {
      router.to('calendar');
    });
    document.querySelector('.content-btn-graph').addEventListener('click', () => {
      router.to('graph');
    });
  }
}
