class Router {
  #routes;
  constructor(routes = []) {
    this.#routes = new Map();
    this.routes = routes;
    window.addEventListener('popstate', (e) => {
      if (!e.state) {
        window.dispatchEvent(new CustomEvent('locationchange', { detail: this.#routes.values().next().value }));
      } else {
        const path = e.state.path;
        if (!this.#routes.has(path)) return;
        window.dispatchEvent(new CustomEvent('locationchange', { detail: this.#routes.get(path) }));
      }
    });
  }

  set routes(routes) {
    routes.forEach(({ path, component }) => {
      this.#routes.set(path, component);
    });
  }

  to(path) {
    console.log('to', path);
    if (!this.#routes.has(path)) return;
    history.pushState({ path }, 'tmp', `/${path}`);
    window.dispatchEvent(new CustomEvent('locationchange', { detail: this.#routes.get(path) }));
  }
}

export default new Router();
