var express = require('express')
var cors = require('cors')
var app = express()

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'Wearable-2023'
});


app.use(cors())

app.get('/api/login.php', function (req, res, next) {
    connection.query(
        'SELECT * FROM users',
        function(err, results, fields) {
        res.json(results)
        }
    );
})

app.listen(3000, function () {
    console.log('CORS-enabled web server listening on port 3000')
})
