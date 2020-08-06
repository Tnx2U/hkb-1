import utils from '../../utils';
const chart = ` <svg class="chart" viewBox="0 0 400 400"></svg> `;

export default class ChartView {
  constructor(parentDom) {
    this.parentDom = parentDom;
    this.rootClassName = 'chart';
    this.dummyData = null;
    this.year = 2020;
    this.month = 8;
    this.setDummyData();
    this.render();
  }

  clear() {
    this.parentDom.innerHTML = '';
  }

  render() {
    this.clear();
    this.parentDom.insertAdjacentHTML('beforeend', chart.strings[0]);
    const chartEl = document.querySelector('.chart');
    const arr = [
      { category: '쇼핑', charge: 2000 },
      { category: '카트', charge: 4000 },
      { category: '식비', charge: 6000 },
      { category: '방탈출', charge: 8000 },
      { category: '데이트', charge: 10000 },
    ];
    let total = 0;
    arr.forEach(({ charge }) => (total += charge));
    const max = 502.5;
    let deg = -90;
    arr.forEach(({ category, charge }) => {
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
      addEventListener('load', () => {
        chartEl.style.transform = 'rotate(360deg)';
        circle.style.transform = `rotate(${deg2}deg)`;
        circle.setAttribute('stroke-dasharray', `${tmp2},1000`);
      });
      deg += (charge / total) * 360;
      circle.addEventListener('mouseover', () => (circle.style.transform += ' scale(1.1)'));
      circle.addEventListener('mouseout', () => (circle.style.transform = circle.style.transform.split(' ')[0]));
    });
  }

  setDummyData() {
    this.dummyData = {
      allExpend: 444790,
      allIncome: 2750000,
      items: [
        {
          date: '2020-06-16',
          day: '화',
          allIncome: 0,
          allExpend: 26000,
          transactions: [
            {
              type: '지출',
              category: '쇼핑/뷰티',
              description: '미용실',
              payment: '현대카드',
              charge: 20000,
            },
            {
              type: '지출',
              category: '식비',
              description: '맥도날드',
              payment: '카카오체크카드',
              charge: 6000,
            },
          ],
        },
        {
          date: '2020-06-15',
          day: '월',
          allIncome: 2750000,
          allExpend: 17200,
          transactions: [
            {
              type: '수입',
              category: '월급',
              description: '월급',
              payment: '국민은행',
              charge: 2750000,
            },
            {
              type: '지출',
              category: '생활',
              description: '이마트에서 생필품',
              payment: '현대카드',
              charge: 17200,
            },
          ],
        },
        {
          date: '2020-06-14',
          day: '일',
          allIncome: 0,
          allExpend: 49500,
          transactions: [
            {
              type: '지출',
              category: '카페/간식',
              description: '스타벅스',
              payment: '카카오체크카드',
              charge: 6400,
            },
            {
              type: '지출',
              category: '생활',
              description: '쿠팡에서 휴지 주문',
              payment: '현대카드',
              charge: 19100,
            },
            {
              type: '지출',
              category: '문화/여가',
              description: 'CGV',
              payment: '현대카드',
              charge: 22000,
            },
          ],
        },
      ],
    };
  }
}
