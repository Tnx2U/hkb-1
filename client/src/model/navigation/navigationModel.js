import Observable from '../share/observable.js';

export default class NavigationModel {
  constructor() {
    super();
    this.selectedMonth = null;
    this.selectedTab = null;
    this.render();
  }

  getInitialData() {
    fetch(url).then((res) => {
      //this.selectedMonth와 this.selectedTab가 선택됨.
    });
  }
}
