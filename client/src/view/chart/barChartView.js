import utils from '../../utils';

export default class BarChartView {
  constructor(parentDom) {
    this.parentDom = parentDom;
    this.rootClassName = 'barChart';
    this.dummyData = null;
    this.orderData = null;
    this.year = 2020;
    this.month = 6;
    this.setDummyData();
    this.orderData = this.setOrderData(this.dummyData);
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
    return `<svg class='barChart' viewBox='0 0 300 50'>
        <line x1='0' x2=${percet * 10} y1='0' y2='0' stroke='orange' stroke-width='250' />
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
    this.orderData.forEach((element) => {
      rootDom.insertAdjacentHTML('beforeend', this.getBarElementHtmlSrc(element));
    });
  }

  setOrderData(dummyData) {
    // 1. 2중 foreach 돌면서 dic에 카테고리별로 금액누적
    let orderDic = {};
    dummyData.items.forEach((item) => {
      item.transactions.forEach((transaction) => {
        if (transaction.type == '지출') {
          if (orderDic[transaction.category] == undefined) {
            orderDic[transaction.category] = transaction.charge;
          } else {
            orderDic[transaction.category] += transaction.charge;
          }
        }
      });
    });
    // 2. dic을 list로 변환하고 금액에 따라 정렬
    let orderList = [];
    for (const [key, value] of Object.entries(orderDic)) {
      orderList.push({ category: key, charge: value, percent: Math.round((value / dummyData.allExpend) * 100) });
    }
    orderList.sort(function (a, b) {
      return b.charge - a.charge;
    });

    console.log('ordered data : ', orderList);
    return orderList;
  }

  setDummyData() {
    this.dummyData = {
      allExpend: 90700,
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
