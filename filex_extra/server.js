const express = require('express')
const app = express()
const db =require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()) //request body

const Person = require('/.models/Person');

app.get('/', function (req, res) {
  res.send('Just checking if the server is working properly')
})




app.listen(3000,()=>{
    console.log('listening on port 3000')
})