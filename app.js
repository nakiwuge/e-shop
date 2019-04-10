const express = require('express');
const bodyParser = require('body-parser')
const app = express()

const db = require('./config/database')
app.use(bodyParser.json())

db.sync().then(()=>{
    console.log("connected")
}).catch((err)=>{
    console.log(err)
})

require('./routes/category')(app);
require('./routes/item')(app);
require('./routes/user')(app);

app.listen(3000, ()=>{
    console.log('started..')
})