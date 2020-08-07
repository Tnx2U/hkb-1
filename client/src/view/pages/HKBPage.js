import NavigationView from '../navigation/navigationView';
import HistoryView from '../history/historyView';
import CalendarView from '../calendar/calendarView.js';
import transactionModel from '../../model/transaction/transactionModel';
import ChartView from '../chart/chartView';
import BarChartView from '../chart/barChartView';
import * as api from '../../api/transaction';
import router from '../../router';
import paymentModel from '../../model/payment/paymentModel';

export default class HKBPage {
  constructor(parentDom) {
    this.parentDom = parentDom;
    this.rootClassName = 'hkb-page';
    this.transactionModel = transactionModel;
    this.mount();
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
    this.renderNavigation();
  }

  async init() {
    addEventListener('locationchange', ({ detail }) => this.handleLocationChange(detail));
    const contentSlot = document.querySelector('.content-slot');
    this.historyView = new HistoryView(contentSlot);
    const calendarView = new CalendarView(contentSlot);
    const chartView = new ChartView(contentSlot);
    router.routes = [
      { path: 'history', component: this.historyView },
      { path: 'calendar', component: calendarView },
      { path: 'chart', component: chartView },
    ];
    this.transactionModel.subscribe((transaction) => {
      this.historyView.transaction = transaction;
      calendarView.transaction = transaction;
      chartView.transaction = transaction;
      this.renderContent();
    });

    paymentModel.subscribe((payments) => {
      this.historyView.payments = payments;
      this._payments = payments;
    });

    if (location.pathname !== '/calendar' && location.pathname !== '/chart') {
      router.to('history');
    }

    const { data } = await (await api.getOrganizeTransaction('08')).json();
    this.transactionModel.transaction = data;
  }

  handleLocationChange(component) {
    this.mounted = component;
    this.renderContent();
  }

  async handleNavChange(month) {
    this.historyView.month = month;
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
