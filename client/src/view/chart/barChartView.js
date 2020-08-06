export default class BarChartView {
  constructor(parentDom, transactionData) {
    this.parentDom = parentDom;
    this.rootClassName = 'barChart';
    this.transactionData = transactionData;
    this.render();
  }

  render() {
    this.mount();
    this.renderElement();
  }

  getTemplate() {
    return `
      <div class=${this.rootClassName}>
      </div>`;
  }

  getChartSvg(percet) {
    return `<svg class='barChart' viewBox='0 0 600 50'>
        <line x1='0' x2=${percet * 10} y1='0' y2='0' stroke='skyblue' stroke-width='250' />
    </svg>`;
  }

  getBarElementHtmlSrc(categoryData) {
    return (
      `
        <div class='bar-element' id='bar-element-${categoryData.category}'>
            <div class='bar-element-category'>${categoryData.category}</div>
            <div class='bar-element-percent'>${categoryData.percent}%</div>
            <div class='bar-element-chart'>
            ` +
      this.getChartSvg(categoryData.percent) +
      `</div>
            <div class='bar-element-charge'>${categoryData.charge}원</div>
        <div>
    `
    );
  }

  mount() {
    this.parentDom.insertAdjacentHTML('beforeend', this.getTemplate());
  }

  clear() {
    this.parentDom.innerHTML = '';
  }

  renderElement() {
    const rootDom = this.parentDom.querySelector(`.${this.rootClassName}`);
    this.transactionData.forEach((element) => {
      rootDom.insertAdjacentHTML('beforeend', this.getBarElementHtmlSrc(element));
    });
  }
}
