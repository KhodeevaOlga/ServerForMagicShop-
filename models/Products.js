const { Schema, model } = require('mongoose')

const Products = new Schema({
  price: {
    type: Number,
    required: true
  },
  info: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, { collection: 'Products' })

module.exports = model('Products', Products)