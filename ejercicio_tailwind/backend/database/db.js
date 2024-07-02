const mysql = require('mysql')

const conexion = mysql.createConnection({
host: 'localhost',
port: 3307,
user: 'root',
password: '',
database: 'modulos'

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