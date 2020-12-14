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
    res.render('products/index', {products})
})

router.get('/new', (req,res) =>{
  res.render('products/add')
})

router.get('/:id',async (req, res)=>{
  const { id } = req.params
  const product = await Product.findById(id)
  console.log(product)
  res.render('products/details', {product})
  // res.send('Details page')
})

router.post('/', async (req, res)=>{
  console.log(req.body)
  const newProduct = new Product(req.body)
  await newProduct.save()
  res.redirect('/products')
})


router.get('/:id/edit',async(req, res)=>{
  const {id} = req.params
  const product = Product.findById(id)
  res.render('products/edit', { product })
})

router.put('/products/:id', async(req, res)=>{
  const {id} = req.params
  // const product = await Product.findByIdAndUpdate(id, req.body)
  console.log(req.body)
  res.send('PUT SUCCESS')

})





module.exports = router