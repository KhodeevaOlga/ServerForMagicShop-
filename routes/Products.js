const express = require('express');
const router = express.Router();
// const products = require('../public/products')
const Products = require('../models/Products')

router.get('/all', async (req, res) => {
  try {
    const allProducts = await Products.find()
    res.send( allProducts)
  } catch (err) {
    res.status(400).send({ err: 'failed to get products' })
  }
})

// Страничка продукта. Сюда приходит с фронта запрос
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Products.findOne({ _id : id })

    res.send( product)
  } catch (err) {
    res.status(400).send({ err: 'failed to get products' })
  }
})

module.exports = router