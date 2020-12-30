const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Farm = require('./models/farm')
const { Product, categories} = require('./models/product')

mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
  console.log('CONNECTION OPEN FROM Farm')
}).catch(err=>{
  console.log('CANT CONNECT FROM Farm')
  console.log(err)
})

// const categories = ['fruit', 'vegetable', 'dairy']


router.get('/', async(req, res)=>{
  const farms = await Farm.find({})
  res.render('farms/index', {farms})
})

router.get('/new', (req, res)=>{
  res.render('farms/new')
})

router.post('/', async(req, res)=>{
  const farm = new Farm(req.body)
  await farm.save()
  res.redirect('/farms')
})
router.get('/:id',async(req, res)=>{
  const farm = await Farm.findById(req.params.id).populate('products')
  // console.log(farm)
  res.render('farms/details', {farm})
})

router.get('/:farm_id/products/new', async(req, res)=>{
  // const { farm_id} = req.params
  const farm = await Farm.findById(req.params.farm_id)
  res.render('products/add', {categories, farm})
})

router.post('/:farm_id/products', async(req, res)=>{
  const {farm_id} = req.params
  const product = new Product(req.body)
  const farm = await Farm.findById(farm_id)
  farm.products.push(product)
  product.farm = farm
  await farm.save()
  await product.save()
  res.redirect(`/farms/${farm_id}`)
  
})

router.delete('/:id', async(req,res)=>{
  const farm = await Farm.findByIdAndDelete(req.params.id)
  res.redirect('/farms')
})


module.exports = router


