const sql = require('mssql/msnodesqlv8')

class DBConnection {
    async getConn() {
        try {
            return await sql.connect({
                database: 'LKSJabar2021',
                server: 'DESKTOP-UUUQOK8',
                driver: 'msnodesqlv8',
                options: {
                    trustedConnection: true
                }
            });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new DBConnection();