import { initPool } from './connection.js';

function excute(query) {
  const pool = initPool();
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(query, function (error, results) {
        connection.release();
        if (error) reject(error);
        resolve(results);
      });
    });
  });
}

export default excute;
