export default class HeaderView {
  constructor(parentDom) {
    this.parentDom = parentDom;
    this.rootClassName = 'calendar';
    this.dummyData = null;
    this.setDummyData();
    this.render();
  }

  getHeadHtmlSrc() {
    return `
          <div class=${this.rootClassName}>

          </div>
        `;
  }

  render() {
    this.parentDom.insertAdjacentHTML('beforeend', this.getHeadHtmlSrc());
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
