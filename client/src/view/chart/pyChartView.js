import utils from '../../utils';
const pychart = `<svg class="pychart" viewBox="0 0 400 400"></svg> `;

export default class PyChartView {
  constructor(parentDom, transactionData) {
    this.parentDom = parentDom;
    this.rootClassName = 'pychart';
    this.transactionData = transactionData;
    this.render();
  }

  clear() {
    this.parentDom.innerHTML = '';
  }

  render() {
    // this.clear();
    this.parentDom.insertAdjacentHTML('beforeend', pychart);
    const chartEl = document.querySelector('.pychart');
    let chartDataArr = [];

    for (let item of this.transactionData) {
      if (chartDataArr.length === 5) break;
      chartDataArr.push({ category: item.category, charge: item.charge });
    }

    let total = 0;
    chartDataArr.forEach(({ charge }) => (total += charge));
    const max = 502.5;
    let deg = -90;
    chartDataArr.forEach(({ category, charge }) => {
      const tmp = (charge / total) * max;
      const circle = utils.createSVGElement({
        tag: 'circle',
        attrs: {
          cx: '200',
          cy: '200',
          r: '80',
          stroke: `#${utils.getRandomHex(0x111111, 0xdddddd)}`,
          'stroke-width': '160',
          'stroke-dasharray': '0,1000',
        },
        styles: { transform: 'rotate(-90deg)' },
      });
      chartEl.appendChild(circle);
      const deg2 = deg;
      const tmp2 = tmp;
      setTimeout(() => {
        chartEl.style.transform = 'rotate(360deg)';
        circle.style.transform = `rotate(${deg2}deg)`;
        circle.setAttribute('stroke-dasharray', `${tmp2},1000`);
      });
      deg += (charge / total) * 360;
      circle.addEventListener('mouseover', () => (circle.style.transform += ' scale(1.1)'));
      circle.addEventListener('mouseout', () => (circle.style.transform = circle.style.transform.split(' ')[0]));
    });
  }
}
