const express = require('express');
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

require('./routes/category')(app);
require('./routes/item')(app);
require('./routes/user')(app);

app.listen(3000, ()=>{
    console.log('started..')
})