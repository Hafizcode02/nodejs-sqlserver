const sql = require('mssql/msnodesqlv8')

const pool = new sql.ConnectionPool({
    database: 'LKSJabar2021',
    server: 'DESKTOP-UUUQOK8',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
})

pool.connect().then(() => {
    //simple query
    pool.request().query('select * from MsMenu', (err, result) => {
        console.dir(result)
    })
})