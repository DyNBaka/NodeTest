const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('./models/product')

mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
  console.log('CONNECTION OPEN FROM Product')
}).catch(err=>{
  console.log('CANT CONNECT FROM Product')
  console.log(err)
})

router.get('/',async (req, res)=>{
    const products = await Product.find({})
    // console.log(products)
    res.render('products/index', {products})
})







module.exports = router