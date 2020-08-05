import headerView from '../view/header/headerView.js';
import NavigationView from '../view/navigation/navigationView.js';
import HistoryView from '../view/history/historyView.js';
import RouterView from '../routerView';
import Calendar from '../view/calendar';
import Graph from '../view/graph';
import router from '../router';

function render() {
  const headerWrapperDom = document.querySelector('.headerWrapper');
  const naviWrapperDom = document.querySelector('.navigationWrapper');
  const contentWrapperDom = document.querySelector('.contentWrapper');

  new headerView(headerWrapperDom);
  new NavigationView(naviWrapperDom);
  contentWrapperDom.appendChild(new RouterView());
}

function initialize() {
  const contentWrapperDom = document.querySelector('.contentWrapper');
  customElements.define('router-view', RouterView);
  customElements.define('my-cal', Calendar);
  customElements.define('my-gr', Graph);
  router.routes = [
    { path: 'history', component: new HistoryView(contentWrapperDom) },
    { path: 'calendar', component: new Calendar() },
    { path: 'graph', component: new Graph() },
  ];
  render();
  if (location.pathname !== 'calendar' && location.pathname !== 'graph') router.to('history');
}

initialize();
