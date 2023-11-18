const express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  cors = require('cors'),
  morgan = require('morgan'),
  router = require('./routes');
 
require('dotenv').config()

const PORT = process.env.PORT

app.set('views', './src/views')
app.set('view engine', 'ejs')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan('dev')); 

app.use(router)

app.get('/', (req, res) => {
    return res.render('index')
})

app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
  });