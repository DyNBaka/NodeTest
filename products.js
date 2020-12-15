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

const categories = ['fruit', 'vegetable', 'dairy']

router.get('/',async (req, res)=>{
    const products = await Product.find({})
    res.render('products/index', {products})
})

router.get('/new', (req,res) =>{
  res.render('products/add', {categories})
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
  res.render('products/edit', { product, categories })
})

router.put('/:id', async(req, res)=>{
  const {id} = req.params
  // const product = await Product.findByIdAndUpdate(id, req.body, {runValidators : true, new: true})
  console.log(req.body)
  // res.redirect(`/products/${product._id}`, {product})
  res.send('PUT SUCCESS')

})

router.delete('/:id', (req, res)=>{
  const {id} = req.params
  await Product.findByIdAndDelete(id)
  res.redirect('/products')
})





module.exports = router