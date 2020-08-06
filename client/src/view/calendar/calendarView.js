export default class CalendarView {
  constructor(parentDom) {
    this.parentDom = parentDom;
    this.rootClassName = 'calendar';
    this.year = null;
    this.month = null;
    this.render();
  }

  set transaction(transaction) {
    this.transactionData = transaction;
    console.log('transacitonData : ', this.transactionData);
    if (this.transactionData.items !== undefined) {
      const dateInfo = this.transactionData.items[0].date;
      [this.year, this.month] = dateInfo.split('-').map((date) => Number(date));
    } else {
      this.month = null;
      this.year = null;
    }
  }

  getHeadHtmlSrc() {
    return `
          <div class=${this.rootClassName}>
        
          </div>
        `;
  }

  getDateHtmlSrc(dayCount) {
    let dayIncome;
    let dayExpend;
    for (let item of this.transactionData.items) {
      if (Number(item.date.substring(8, 10)) === dayCount) {
        dayIncome = item.allIncome;
        dayExpend = item.allExpend;
      }
    }

    return `
        <div class='calendar-date-div' id='date-${dayCount}'>
            <div class='day-number'>${dayCount}</div>
            <div class='day-income' id='day-income-${dayCount}'>${dayIncome ? '+' + dayIncome : ''}</div>
            <div class='day-expend' id='day-expend-${dayCount}'>${dayExpend ? '-' + dayExpend : ''}</div>
        </div>
      `;
  }

  getEmptyDateHtmlSrc() {
    return `
        <div class='calendar-date-div'>
        </div>
      `;
  }

  getEmptyMonthHtmlSrc() {
    return `
        <div class='calendar-empty'>
          <div class='calendar-empty-message'>거래 내역이 없는 달입니다!</div>
        </div>
    `;
  }

  getDayHtmlSrc(day) {
    return `
      <div class='calendar-day-div'>
        <div class=''>${day}</div>
      </div>
      `;
  }

  renderCalendarDom() {
    const calendarDom = this.parentDom.querySelector(`.${this.rootClassName}`);

    console.log('this.month', this.month);
    if (this.month === null) {
      console.log('access in null month');
      this.parentDom.insertAdjacentHTML('beforeend', this.getEmptyMonthHtmlSrc());
    } else {
      const dayList = ['일', '월', '화', '수', '목', '금', '토'];
      const startDate = new Date(this.year, this.month - 1, 1);
      const endDate = new Date(this.year, this.month, 0);
      const numOfDay = endDate.getDate();

      // 캘린더의 요일dom 렌더
      dayList.forEach((day) => {
        calendarDom.insertAdjacentHTML('beforeend', this.getDayHtmlSrc(day));
      });

      // 년월정보에 맞게 빈칸 추가
      // 전체 칸수 == 해당달 시작요일 + 해당달 전체 일수 + (6 - 해당달 끝요일)
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
  }

  render() {
    this.parentDom.insertAdjacentHTML('beforeend', this.getHeadHtmlSrc());
    // 1. 입력받은 년, 월 정보를 바탕으로 무슨요일부터 시작하는지, 주가 몇개인지, 총 몇일인지 계산
    // 2. 해당 정보를 바탕으로 전체 주차만큼 빈 칸을 만든다.
    this.renderCalendarDom();
  }
}
