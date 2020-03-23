const Pool = require('pg').Pool;
require('dotenv').config();
// Get Postgres entry information from dot dot dot dot .. rebooot : dot env

const conopts = {
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        host: process.env.PG_HOST,
        database: process.env.PG_DB,
        // port: process.env.PG_PORT
    };

// const conopts = {
//     user: process.env.RDS_USERNAME,
//     password: process.env.RDS_PASSWORD,
//     host: process.env.RDS_HOSTNAME,
//     database: 'tradygrade',
//     port: process.env.RDS_PORT
// };

const pool = new Pool(conopts);

// const getAll = (cb) => {
//     pool.query('SELECT * from beans ORDER BY id DESC', (err, results) => {
//         if (err) throw err;
//         console.dir(results);
//         cb(results.rows);
//     })
// }