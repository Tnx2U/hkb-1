export default class CalendarView {
  constructor(parentDom) {
    this.parentDom = parentDom;
    this.rootClassName = 'calendar';
    this.dummyData = null;
    this.year = 2020;
    this.month = 8;
    this.setDummyData();
    this.render();
  }

  getHeadHtmlSrc() {
    return `
          <div class=${this.rootClassName}>
        
          </div>
        `;
  }

  getDateHtmlSrc(dayCount) {
    return `
        <div class='calendar-date-div' id='date-${dayCount}'>
            <div class='day-number'>${dayCount}</div>
            <div class='day-income' id='day-income-${dayCount}'></div>
            <div class='day-expend' id='day-expend-${dayCount}'></div>
        </div>
      `;
  }

  getEmptyDateHtmlSrc() {
    return `
        <div class='calendar-date-div'>
        </div>
      `;
  }

  renderCalendarDom() {
    const calendarDom = this.parentDom.querySelector(`.${this.rootClassName}`);
    const dayList = ['일', '월', '화', '수', '목', '금', '토'];

    const startDate = new Date(this.year, this.month - 1, 1);
    const endDate = new Date(this.year, this.month, 0);
    const numOfDay = endDate.getDate();
    console.log(this.year, this.month, startDate, endDate);

    // 캘린더의 요일dom 렌더
    dayList.forEach((day) => {
      calendarDom.insertAdjacentHTML('beforeend', `<div class='calendar-day-div'><div class=''>${day}</div></div>`);
    });

    // 년월정보에 맞게 빈칸 추가
    // 전체 칸수 == 해당달 시작요일 + 해당달 전체 일수 + (6 - 해당달 끝요일)
    console.log(startDate.getDay(), numOfDay, 6 - endDate.getDay());
    let numOfCell = startDate.getDay() + numOfDay + (6 - endDate.getDay());
    let dayCount = -startDate.getDay() + 1;

    for (let idx = 0; idx < numOfCell; idx++) {
      if (dayCount > 0 && dayCount <= numOfDay) {
        calendarDom.insertAdjacentHTML('beforeend', this.getDateHtmlSrc(dayCount));
      } else {
        calendarDom.insertAdjacentHTML('beforeend', this.getEmptyDateHtmlSrc());
      }
      dayCount++;
    }
  }

  render() {
    this.parentDom.insertAdjacentHTML('beforeend', this.getHeadHtmlSrc());
    // 1. 입력받은 년, 월 정보를 바탕으로 무슨요일부터 시작하는지, 주가 몇개인지, 총 몇일인지 계산
    // 2. 해당 정보를 바탕으로 전체 주차만큼 빈 칸을 만든다.
    this.renderCalendarDom();
    // 3. 1일이 무슨 요일인지 알아내서 해당 빈칸에 정보를 넣고 전체 일수만큼 줄줄이 넣는다.
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
