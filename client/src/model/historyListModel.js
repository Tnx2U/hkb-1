export default class HistoryListModel {
  constructor() {
    this.month = null;
    this.setHistoryData = null;
    this.setMonth();
  }

  setMonth() {
    //navigation 모델의 선택된 월정보를 구독하여 데이터를 가져와서 this.month에 바인딩
    this.setHistoryData(this.month);
  }

  setHistoryData(month) {
    // api에 해당 month의 거래내역 데이터를 불러와서 this.setHistoryData에 바인딩
  }
}
