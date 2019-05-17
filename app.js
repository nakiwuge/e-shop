const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes')(app);

const port = process.env.PORT || 3000;

app.listen(port, ()=>{});
module.exports = app;