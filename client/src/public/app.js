import HistoryList from '../views/historyList';
import HistoryItem from '../views/historyItem';
import HistoryModel from '../models/historyModel';

customElements.define('history-list', HistoryList);
customElements.define('history-item', HistoryItem);
const page = document.querySelector('.page');

// 히스토리 모델 이니셜 데이터 설정
setTimeout(() => {
  HistoryModel.addHistory('거래 1');
  console.log(HistoryModel);
}, 4000);
setTimeout(() => HistoryModel.addHistory('거래 2'), 8000);
setTimeout(() => HistoryModel.addHistory('거래 3'), 12000);

//1. dom을 파라미터로 던지기
//2. 여기서 바로 dom에 insert하기

// new HistoryListView(page);

// const htmlSrc = new HistoryListView().render();
// page.insertAdjacentHTML('beforeend', htmlSrc);

page.appendChild(new HistoryList());
