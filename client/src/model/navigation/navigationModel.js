import Observable from '../share/observable.js';

export default class NavigationModel {
  constructor() {
    super();
    this.selectedMonth = null;
    this.selectedTab = null;
    this.render();
  }
}
