const mysql = require('mysql');

const pool = mysql.createPool({
    
    password: 'jaipu2MYSQL',
    user: 'riftbuild_gabas',
    database: 'riftbuild_babble',
    host: 'mysql-riftbuild.alwaysdata.net',
    port: '3306'

});




module.exports = [pool];

