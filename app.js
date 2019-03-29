const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const pg = require('pg');

app.use(bodyParser.json())

// connect to db

const pool = new pg.Pool({
host: 'localhost',
database: 'eshop',
password: null,
port: '5432'});

pool.query(`CREATE TABLE categories(id SERIAL PRIMARY KEY, name VARCHAR(40) NOT NULL,
date_created VARCHAR(40) NOT NULL)`, (err, res) => {
console.log(err, res);
pool.end();
});

require('./routes/category-routes')(app);
require('./routes/item-routes')(app);

app.listen(3000, ()=>{
    console.log('started..')
})