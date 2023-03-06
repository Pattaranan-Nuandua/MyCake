const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require('body-parser')
const router = express.Router();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
//app.use(express.json({limit: '100mb'}));

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: 'Wearable-2023'
})

app.get("/", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ err: "Error fetching users" });
        } else {
        res.send(result);
        }
    });
});

//use
// Define a route for retrieving user information
app.get('/users/:id', (req, res) => {
    // Get the user ID from the URL parameter
    const id = req.params.id;
    // Execute a MySQL query to retrieve the user data
    pool.query('SELECT * FROM users WHERE id = ?', [id], (error, results, fields) => {
        if (error) {
            return res.status(500).send(error);
        }
        // Send the user data as a JSON response
        res.json(results[0]);
    });
});
app.get('/profile', (req, res) => {
    const userId = req.user.id; // assuming you have the user id in the request object after login
    const sqlQuery = `SELECT * FROM users WHERE id = ${userId}`;
    connection.query(sqlQuery, (error, results, fields) => {
        if (error) throw error;
        const user = results[0];
      // render the profile page with user data
    res.render('profile', { user });
    });
});

app.post("/add",(req,res) => {
    const {email,username,password,fullname,surname,weight,high,age,gender,details} = req.body
    db.query('INSERT INTO users (email,username,password,fullname,surname,weight,high,age,gender,details) VALUES(?,?,?,?,?,?,?,?,?,?)',[email,username,password,fullname,surname,weight,high,age,gender,details],(err,result) => {
        if (err){
            console.log(err)
            res.json({message:"User Add"})
        }else if(result.lenght > 0){
            res.json({status: 'ok'})
            const lastInsertId = result.insertId;
            console.log("Last inserted ID:", lastInsertId);
            res.json({status: 'ok', lastInsertId: lastInsertId})
        }else {
            res.json({status: 'err'})
        }
    })
})

/*app.post("/add"),(req,res) => {
    const {email,username,password,fullname,surname,weight,high,age,gender,details} = req.body
    db.query('INSERT INTO users (email,username,password,fullname,surname,weight,high,age,gender,details) VALUES(?,?,?,?,?,?,?,?,?,?)',[email,username,password,fullname,surname,weight,high,age,gender,details],(err,result) => {
        if (err){
            console.log(err)
            res.json({message:"User Add"})
        } else if(result.length > 0) {
            const lastInsertId = result.insertId;
            console.log("Last inserted ID:", lastInsertId);
            res.json({status: 'ok', lastInsertId: lastInsertId})
        } else {
            res.json({status: 'err'})
        }
    })
}*/

app.get("/add/index/show",(req, res) => {
    db.query('SELECT * FROM index_data',(err,result) => {
        if(err){
            console.log(err)
        }else{
            console.log('Showdata')
            res.send(result);
        }
    })
})
//ADC11,ADC12,ADC13,ADC14,ADC21,ADC22,ADC23,ADC24,ADC31,ADC32,ADC33,ADC34
app.post("/add/index",(req,res) => {
    const {ADC11,ADC12,ADC13,ADC14,ADC21,ADC22,ADC23,ADC24,ADC31,ADC32,ADC33,ADC34 } = req.body
    db.query('INSERT INTO index_data (ADC11,ADC12,ADC13,ADC14,ADC21,ADC22,ADC23,ADC24,ADC31,ADC32,ADC33,ADC34) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',[ADC11,ADC12,ADC13,ADC14,ADC21,ADC22,ADC23,ADC24,ADC31,ADC32,ADC33,ADC34],(err,result) => {
        console.log(req.body)
        if(err){
            console.log(err)
            res.json({message:"Index add"})
        }else{
            res.json({status: 'error'})
            //console.log(result)
            console.log('Add data Success')
        }
    })
})
app.post("/login",(req,res) => {
    const {username, password} = req.body
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, result) => {
        if (err){
            console.log(err)
            res.status(500).json({status: 'error', message: 'An unexpected error occurred. Please try again later.'})
        } else if (result.length > 0) {
            res.json({status: 'ok', message: 'Successfully logged in.', accessToken: 'your_access_token'})
        } else {
            res.status(401).json({status: 'error', message: 'Invalid username or password.'})
        }
    })
})

// Receive data sent from PHP script via HTTP POST request
/*app.post("/add_data",(req,res) => {
    const {sensor_1, sensor_2, sensor_3, sensor_4, sensor_5, sensor_6, sensor_7, sensor_8, sensor_9, sensor_10, sensor_11, sensor_12} = req.body;
    // Save data to MySQL database
    db.query('INSERT INTO arduino_data (sensor_1, sensor_2, sensor_3, sensor_4, sensor_5, sensor_6, sensor_7, sensor_8, sensor_9, sensor_10, sensor_11, sensor_12) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [sensor_1, sensor_2, sensor_3, sensor_4, sensor_5, sensor_6, sensor_7, sensor_8, sensor_9, sensor_10, sensor_11, sensor_12],
        (err,result) => {
            if (err){
                console.log(err)
                res.status(500).json({message:"Error saving data"})
            } else {
                console.log(result)
                res.json({message:"Data saved"})
            }  
        }
    );
});*/
app.post("/add_data",(req,res) => {
    console.log("Received POST request"); // Add this line
    const {data} = req.body; // assuming data is sent in the format {data: 'your_data'}
    try {
        const jsonData = JSON.parse(data);
        // Save jsonData to MySQL database
        db.query('INSERT INTO arduino_data SET ?', jsonData, (err,result) => {
            if (err){
                console.log(err)
                res.status(500).json({message:"Error saving data"})
            } else {
                console.log(result)
                res.json({message:"Data saved"})
            }  
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Invalid JSON data"});
    }
})



app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
});