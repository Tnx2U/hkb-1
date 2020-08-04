import headerView from '../view/header/headerView.js';
import NavigationView from '../view/navigation/navigationView.js';
import HistoryView from '../view/history/historyView.js';
import CalendarView from '../view/calendar/calendarView.js';

function render() {
  const headerWrapperDom = document.querySelector('.headerWrapper');
  const naviWrapperDom = document.querySelector('.navigationWrapper');
  const contentWrapperDom = document.querySelector('.contentWrapper');

  new headerView(headerWrapperDom);
  new NavigationView(naviWrapperDom);
  // new HistoryView(contentWrapperDom);
  new CalendarView(contentWrapperDom);
}

function initialize() {
  render();
}

initialize();
