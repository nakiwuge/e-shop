const express = require('express');
const bodyParser = require('body-parser')
const app = express()

const db = require('./config/database')
app.use(bodyParser.json())

db.sync().then(()=>{
    console.log("connected")
}).catch(()=>{
    console.log("failed")
})

require('./routes/category-routes')(app);

app.listen(3000, ()=>{
    console.log('started..')
})