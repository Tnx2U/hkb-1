import HKBPage from '../view/pages/HKBPage';
import HeaderView from '../view/header/headerView.js';

function render() {
  const headerWrapperDom = document.querySelector('.headerWrapper');
  const page = document.querySelector('.page');
  new HeaderView(headerWrapperDom);
  new HKBPage(page);
}

render();
