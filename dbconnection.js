const sql = require('mssql/msnodesqlv8')

class DBConnection {
    async getConn() {
        try {
            return await sql.connect({
                database: 'LKSJabar2021', // Nama Databasenya
                server: 'DESKTOP-UUUQOK8', // Nama Instance Servernya
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