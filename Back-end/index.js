const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require('body-parser')

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
            res.status(500).json({ error: "Error fetching users" });
        } else {
        res.send(result);
        }
    });
});
/*app.get("/api/userselect", (req, res) => {
    const username = req.query
    console.log(username)
    db.query("SELECT * FROM users WHERE username = ?",[username], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Error fetching users" });
        } else {
        res.send(result);
        }
    });
});*/

app.get("/api/userselect/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
        if (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching user" });
        } else if (result.length == 0) {
        res.status(404).json({ error: "User not found" });
        } else {
        res.send(result[0]);
        }
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
        }else {
            res.json({status: 'error'})
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