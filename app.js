const express = require('express');
const bodyParser = require('body-parser')
const app = express()

const dbConfig = require('./dbConfig')
const mongoose = require('mongoose')

app.use(bodyParser.json())

//connect to db
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
})

require('./routes/category-routes')(app);
require('./routes/item-routes')(app);

app.listen(3000, ()=>{
    console.log('started..')
})