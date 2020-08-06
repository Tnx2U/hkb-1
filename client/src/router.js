class Router {
  #routes;
  constructor(routes = []) {
    this.#routes = new Map();
    addEventListener('popstate', (e) => this.handlePopState(e));
  }

  set routes(routes) {
    routes.forEach(({ path, component }) => {
      this.#routes.set(path, component);
    });
  }

  to(path) {
    if (!this.#routes.has(path)) return;
    history.pushState({ path }, 'tmp', `/${path}`);
    dispatchEvent(new CustomEvent('locationchange', { detail: this.#routes.get(path) }));
  }

  handlePopState(e) {
    if (!e.state) {
      dispatchEvent(new CustomEvent('locationchange', { detail: this.#routes.values().next().value }));
    } else {
      const path = e.state.path;
      if (!this.#routes.has(path)) return;
      dispatchEvent(new CustomEvent('locationchange', { detail: this.#routes.get(path) }));
    }
  }
}

export default new Router();
