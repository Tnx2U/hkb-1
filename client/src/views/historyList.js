import HistoryModel from '../models/historyModel';

export default class HistoryList extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <div>
            <h1>리스트</h1>
            <ul id='list'></ul>
        </div>
    `;

    HistoryModel.subscribe(this);
  }
}
