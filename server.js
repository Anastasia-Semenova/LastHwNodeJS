const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
require('./app/routes')(app);
app.use(express.static('public'));
// говорим, что запускаемся на порту 80
app.listen(80);
console.log("Server started at 80");
