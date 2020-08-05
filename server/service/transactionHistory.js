import { queryGetTransactionByMonth, queryPostTransaction, queryPutTransaction } from '../db/transactionHistory.js';

async function getOrganizeTransactionByMonth(params) {
  const queryResult = await queryGetTransactionByMonth(params);

  console.log('queryResult : ', queryResult);
  if (queryResult.length == 0) return queryResult;

  let organizedTransactions = {
    allExpend: 0,
    allIncome: 0,
    items: [],
  };
  let nowDateTransactions = [];
  let dayIncome = 0;
  let dayExpend = 0;
  let monthIncome = 0;
  let monthExpend = 0;
  console.log(JSON.stringify(queryResult[0].transaction_date).substr(1, 10));
  let beforeDate = JSON.stringify(queryResult[0].transaction_date).substr(1, 10);

  // nowDateData(날짜별 거래 담을 객체배열) , organizeData(전체 거래 객체배열),
  // 1. sql 결과배열을 순회
  // 2. 해당 element의 날짜 구함
  // 3. 이전 날짜랑 다르면 nowDateData에에 추가후, organizeData 추가, 같으면 nowDateData에만 추가

  queryResult.forEach((element, index) => {
    //일별 거래기록, 월별 거래기록에 추가
    let nowDate = JSON.stringify(element.transaction_date).substr(1, 10);
    //마지막 원소면
    if (index == queryResult.length - 1) {
      if (nowDate !== beforeDate) {
        //전일 커밋
        organizedTransactions.items.push({
          date: beforeDate,
          day: new Date(beforeDate).getDay(),
          allIncome: dayIncome,
          allExpend: dayExpend,
          transactions: nowDateTransactions,
        });
        //당일 커밋(원소 커밋도 같이)
        organizedTransactions.items.push({
          date: nowDate,
          day: new Date(nowDate).getDay(),
          allIncome: element.transaction_type == '수입' ? element.charge : 0,
          allExpend: element.transaction_type == '지출' ? element.charge : 0,
          transactions: [
            {
              id: element.id,
              type: element.transaction_type,
              category: element.category,
              description: element.description,
              payment: element.payment,
              charge: element.charge,
            },
          ],
        });
      } else {
        //원소 커밋
        nowDateTransactions.push({
          id: element.id,
          type: element.transaction_type,
          category: element.category,
          description: element.description,
          payment: element.payment,
          charge: element.charge,
        });
        //당일 커밋
        organizedTransactions.items.push({
          date: nowDate,
          day: new Date(nowDate).getDay(),
          allIncome: dayIncome,
          allExpend: dayExpend,
          transactions: nowDateTransactions,
        });
      }
    } else {
      //날짜가 다르면
      if (nowDate !== beforeDate) {
        //전일 커밋 및 일일 초기화
        organizedTransactions.items.push({
          date: beforeDate,
          day: new Date(beforeDate).getDay(),
          allIncome: dayIncome,
          allExpend: dayExpend,
          transactions: nowDateTransactions,
        });
        nowDateTransactions = [];
        dayIncome = 0;
        dayExpend = 0;
        beforeDate = nowDate;
      }
      //원소 커밋
      nowDateTransactions.push({
        id: element.id,
        type: element.transaction_type,
        category: element.category,
        description: element.description,
        payment: element.payment,
        charge: element.charge,
      });
    }

    //일별, 월별 (수입,지출) 기록
    if (element.transaction_type == '지출') {
      dayExpend += element.charge;
      monthExpend += element.charge;
    } else {
      dayIncome += element.charge;
      monthIncome += element.charge;
    }
  });
  organizedTransactions.allExpend = monthExpend;
  organizedTransactions.allIncome = monthIncome;
  return organizedTransactions;
}

async function getTransactionByMonth(params) {
  const result = await queryGetTransactionByMonth(params);
  return result;
}

async function postTransaction(params) {
  const result = await queryPostTransaction(params);
  return result;
}

async function putTransaction(params) {
  const result = await queryPutTransaction(params);
  return result;
}

export { getTransactionByMonth, postTransaction, putTransaction, getOrganizeTransactionByMonth };
