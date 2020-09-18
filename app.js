const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const products = require('./routes/Products')
const users = require('./routes/Users')
const keys = require('./config/keys')

const app = express();
const port = 3010;
app.use(cors())
app.use(bodyParser.json());
const path = require('path');

app.use('/public', express.static(path.join(__dirname, 'public')))

// app.use(express.static(__dirname + "/public/"));






  async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://Olga:141512Olya@cluster0.itzdv.mongodb.net/shopDB?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }
    )
    app.listen(port, () => {
      console.log(`server has been started on port ${port}`);
    })
  } catch (e) {
    console.log(e);
  }
}

start()


app.use('/products', products);
app.use('/users', users);


module.exports = app;