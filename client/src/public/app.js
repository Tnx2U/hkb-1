import headerView from '../view/header/headerView.js';
import NavigationView from '../view/navigation/navigationView.js';
import HistoryView from '../view/history/historyView.js';
import RouterView from '../routerView';
import Calendar from '../view/calendar';
import Graph from '../view/graph';
import router from '../router.js';

function render() {
  const headerWrapperDom = document.querySelector('.headerWrapper');
  const naviWrapperDom = document.querySelector('.navigationWrapper');
  const contentWrapperDom = document.querySelector('.contentWrapper');

  new headerView(headerWrapperDom);
  new NavigationView(naviWrapperDom);
  new HistoryView(contentWrapperDom);
  contentWrapperDom.appendChild(new RouterView());
}

function initialize() {
  customElements.define('router-view', RouterView);
  customElements.define('my-cal', Calendar);
  customElements.define('my-gr', Graph);

  render();
}

initialize();
onload = () => {
  console.log('hi');
  // router.to('history');
};
