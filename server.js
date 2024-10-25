//Declare dependencies/variables
const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const app = express();
dotenv.config();
//connect to the database
const db = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})
// Question 1 
app.get('/patients',(req, res) =>{
  const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    db.query(sql, (err, results) =>{
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    })
})

//Question 2
app.get('/providers',(req, res) =>{
  const sql = 'SELECT first_name, last_name, provider_specialty FROM providers';
    db.query(sql, (err, results) =>{
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    })
})

//Question 3
app.get('/patientsfirst_name',(req, res) =>{
  const sql = 'SELECT * FROM patients ORDER BY first_name';
    db.query(sql, (err, results) =>{
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    })
})

//Question 4 
app.get('/providers_specialty',(req, res) =>{
  //const specialty =req.query.specialty;
  const specialty ='Surgery';
  console.log({specialty});
  const sql ="SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?";
  //const sql ="SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty IN (SELECT providers_specialty FROM providers))";
  db.query(sql, [specialty], (err, results) =>{
    if(err){
      return res.status(500).send(err);
    }
    res.json({results:results});
  });
});

// listen to the server
const PORT = 3301
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})
