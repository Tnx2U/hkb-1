import mysql from 'mysql2';

let db = null;

function initPool() {
  if (!db) {
    db = mysql.createPool({
      host: '13.125.189.204',
      user: 'woowa',
      password: '19934',
      database: 'hkb',
      multipleStatements: true,
      //   host: process.env.DB_HOST,
      //   user: process.env.DB_USER,
      //   password: process.env.DB_PASSWORD,
      //   database: process.env.DB_NAME,
      //   multipleStatements: true,
    });
  }
  return db;
}

export { initPool };
