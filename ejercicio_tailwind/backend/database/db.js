const mysql = require('mysql')

const conexion = mysql.createConnection({
host: 'database-1.c9ukegmsmd2h.us-east-2.rds.amazonaws.com',
port: 3306,
user: 'root',
password: 'admin123',
database: 'TalentoTech'

})

conexion.connect((error)=>{
    if(error){
        console.error('error' + error)
        return
    }
    console.log('connection')
}
)

module.exports = conexion;