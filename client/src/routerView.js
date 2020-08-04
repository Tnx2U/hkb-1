export default class RouterView extends HTMLElement {
  #routes;
  #shadow;
  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: 'closed' });
    this.#shadow.innerHTML = `
        <div id="router-view"></div>
    `;
    this.#routes = new Map();
  }

  go(component) {
    const view = this.#shadow.getElementById('router-view');
    if (!component) return;
    if (view.firstChild) {
      view.replaceChild(component, view.firstChild);
    } else view.appendChild(component);
  }

  connectedCallback() {
    window.addEventListener('locationchange', ({ detail }) => this.go(detail));
  }
}
