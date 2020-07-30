export default class Observable {
  constructor() {
    this._observers = new Set();
  }

  subscribe(observers) {
    this._observers.add(observers);
  }

  unsubscribe(observer) {
    this._observers = [...this._observers].filter((subscriber) => subscriber !== observer);
  }

  notify(data) {
    this._observers.forEach((observer) => observer(data));
  }
}
