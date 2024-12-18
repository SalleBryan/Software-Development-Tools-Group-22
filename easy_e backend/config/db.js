var mysql = require('mysql');

var con = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'REMOVED_EXPOSED_CREDENTIAL',
    port: 3306
});

con.connect(function(err) {
    if (err) throw err;
    console.log('connected');
})