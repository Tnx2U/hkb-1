import NavigationView from '../navigation/navigationView';
import HistoryView from '../history/historyView';
import CalendarView from '../calendar/calendarView.js';
import TransactionModel from '../../model/transaction/transactionModel';
import ChartView from '../chart/chartView';
import BarChartView from '../chart/barChartView';
import * as api from '../../api/transaction';
import router from '../../router';

export default class HKBPage {
  constructor(parentDom) {
    this.parentDom = parentDom;
    this.rootClassName = 'hkb-page';
    this.transactionModel = new TransactionModel();
    this.render();
    this.init();
  }

  getTemplate() {
    return `
        <div class='${this.rootClassName}'>
                <div class='nav-slot'></div>
                <div class='content-slot'></div>
        </div>
    `;
  }

  mount() {
    this.parentDom.insertAdjacentHTML('beforeend', this.getTemplate());
  }

  render() {
    this.mount();
    this.renderNavigation();
  }

  async init() {
    addEventListener('locationchange', ({ detail }) => this.handleLocationChange(detail));
    const contentSlot = document.querySelector('.content-slot');
    const historyView = new HistoryView(contentSlot);
    const calendarView = new CalendarView(contentSlot);
    const chartView = new ChartView(contentSlot);
    router.routes = [
      { path: 'history', component: historyView },
      { path: 'calendar', component: calendarView },
      { path: 'chart', component: chartView },
    ];
    this.transactionModel.subscribe((transaction) => {
      historyView.transaction = transaction;
      calendarView.transaction = transaction;
      chartView.transaction = transaction;
      this.renderContent();
    });

    if (location.pathname !== 'calendar' && location.pathname !== 'graph') {
      router.to('history');
    }

    const { data } = await (await api.getOrganizeTransaction('06')).json();
    this.transactionModel.transaction = data;
  }

  handleLocationChange(component) {
    this.mounted = component;
    this.renderContent();
  }

  async handleNavChange(month) {
    const { data } = await (await api.getOrganizeTransaction(month)).json();
    this.transactionModel.transaction = data;
  }

  renderNavigation() {
    const navSlot = document.querySelector('.nav-slot');
    new NavigationView({ parentDom: navSlot, handleChange: this.handleNavChange.bind(this) });
  }

  renderContent() {
    this.contentClear();
    this.mounted.render();
  }

  contentClear() {
    document.querySelector('.content-slot').innerHTML = '';
  }
}
