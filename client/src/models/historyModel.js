import Observable from '../observable';
import HistoryItem from '../views/historyItem';

export default new (class HistoryModel extends Observable {
  constructor() {
    super();
    this.historys = [];
  }
  addHistory(history) {
    this.historys = [...this.historys, history];
    this.notify(this.historys);
  }
  notify(historys) {
    this._observers.forEach((el) => {
      const list = el.querySelector('#list');
      while (list.firstChild) list.removeChild(list.lastChild);

      historys.forEach((history) => {
        const historyItem = new HistoryItem();

        historyItem.history = history;

        const tmp = historyItem.history;
        list.appendChild(historyItem);
      });
    });
  }
  update() {}
})();
