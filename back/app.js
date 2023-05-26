const path = require('path')

const express = require('express');
const catalog = require('./routes/shop')
const cors = require("cors");
const db = require('./data');

const app = express();

app.use(cors())
app.options('*', cors())



app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(catalog);


db.connectToDatabase().then(function () {
  app.listen(5000)
})