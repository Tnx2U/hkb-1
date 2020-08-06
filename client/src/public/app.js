import headerView from '../view/header/headerView.js';
import NavigationView from '../view/navigation/navigationView.js';
import HistoryView from '../view/history/historyView.js';
import CalendarView from '../view/calendar/calendarView.js';
import ChartView from '../view/chart/chartView';
import RouterView from '../routerView';
import router from '../router';

function render() {
  const headerWrapperDom = document.querySelector('.headerWrapper');
  const naviWrapperDom = document.querySelector('.navigationWrapper');
  const contentWrapperDom = document.querySelector('.contentWrapper');

  new headerView(headerWrapperDom);
  new NavigationView(naviWrapperDom);
  contentWrapperDom.appendChild(new RouterView());
  new ChartView(naviWrapperDom);
}

function initialize() {
  const contentWrapperDom = document.querySelector('.contentWrapper');
  customElements.define('router-view', RouterView);
  router.routes = [
    { path: 'history', component: new HistoryView(contentWrapperDom) },
    { path: 'calendar', component: new CalendarView(contentWrapperDom) },
    { path: 'graph', component: new ChartView(contentWrapperDom) },
  ];
  render();
  if (location.pathname !== 'calendar' && location.pathname !== 'graph') router.to('history');
}

initialize();
