export default class RouterView extends HTMLElement {
  #shadow;
  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: 'closed' });
    this.#shadow.innerHTML = `
        <div id="router-view">
        
        </div>
    `;
  }

  handleLocationChange(component) {
    const view = this.#shadow.getElementById('router-view');
    component.render();
    // if (!component) return;
    // if (view.firstChild) {
    //   view.replaceChild(component, view.firstChild);
    // } else view.appendChild(component);
  }

  connectedCallback() {
    window.addEventListener('locationchange', ({ detail }) => this.handleLocationChange(detail));
  }
}
