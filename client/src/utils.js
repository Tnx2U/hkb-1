export default {
  createSVGElement({ tag = '', attrs = {}, styles = {} }) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const [prop, value] of Object.entries(attrs)) {
      el.setAttribute(prop, value);
    }
    for (const [prop, value] of Object.entries(styles)) {
      el.style[prop] = value;
    }
    return el;
  },
  getRandomHex(min, max) {
    return Math.floor(Math.random() * (max - min) + min).toString(16);
  },
};
