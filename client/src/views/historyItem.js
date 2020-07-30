export default class HistoryItem extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
          <li id='item'></li>
      `;
  }
  set history(history) {
    console.log(this.shadowRoot);
    this.shadowRoot.getElementById('item').textContent = history;
  }
}
