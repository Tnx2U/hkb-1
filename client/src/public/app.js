import headerView from '../view/header/headerView.js';
import NavigationView from '../view/navigation/navigationView.js';

function render() {
  const headerWrapperDom = document.querySelector('.headerWrapper');
  const naviWrapperDom = document.querySelector('.navigationWrapper');
  const contentWrapperDom = document.querySelector('.contentWrapper');

  new headerView(headerWrapperDom);
  new NavigationView(naviWrapperDom);
}

function initialize() {
  render();
}

initialize();
