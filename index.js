const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cors = require('cors')
const { v4: uuid } = require('uuid')
const commentRoute = require('./comments.js')
const productRoute = require('./products.js')
const { ROLES, users } = require('./data')
const mongodb = require('mongodb')
const mongoose = require('mongoose')
const { move } = require('./comments.js')

mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
  console.log('CONNECTION OPEN')
}).catch(err=>{
  console.log('CANT CONNECT')
  console.log(err)
})


const productSchema = new mongoose.Schema({
  name: {
    type:String, required : true, maxlength: 20, alias: 'N'
  }, 
  price: {
    type: Number,
    require: true,
    min: [0, 'Price must be positive']
  }, 
  onSale:{
    type: Boolean,
    default: false
  },
  categories: {
    type: [String]
  },
  qty: {
    online:{
      type:Number,
      default: 0,
      min:0
    },
    inStore:{
      type: Number,
      default:0,
      min:0
    }
  },
  size:{
    type: String,
    enum: ['S','M','L']
  }
})

const Product = mongoose.model('Product', productSchema)
// const bike = new Product({
//   name: 'Jersey', price : 19.50, categories: ['Cycling',], size: 'M'
// })
// bike.save()
//   .then(data => {
//     console.log('Added item')
//     console.log(data)
//   })
//   .catch(err=> {
//     console.log('Error')
//     console.log(err)
//   })

productSchema.methods.toggleSales = function(){
  this.onSale = !this.onSale
  this.price = this.price - (this.price * 0.2)
  return this.save()
}



const findProduct = async()=>{
  const foundProduct = await Product.find({name: 'Bike Helmet'})
  console.log(foundProduct)
  await foundProduct.toggleSales()
  console.log(foundProduct)
}

findProduct()

// Product.findOneAndUpdate({name: 'Bike Helmet'}, {price: -109.99,  qty: {online: 1}}, {new: true, runValidators: true})
//     .then(data => {
//       console.log('Added item')
//       console.log(data)
//     })
//     .catch(err=> {
//       console.log('Error')
//       console.log(err)
//     })
  

//Insert single document
// const amadeus = new Movie({title: 'Amadeus', year: 1986, score:9.2, rating: 'R'})
// amadeus.save()

//Insert Mutliple, returns a promise -> then/catch, no need for save
// Movie.insertMany([
//   {title: 'Amadeus', year: 1986, score:9.2, rating: 'R'},
//   {title: 'Alien', year: 1979, score:8.1, rating: 'R'},
//   {title: 'The Iron Giant', year: 1999, score:7.5, rating: 'PG'}
// ]).then(data=>{
//   console.log('data added')
//   console.log(data)
// }).catch(err=>{
//   console.log('Error adding')
//   console.log(err)
// })


// {
// const mongoClient = mongodb.MongoClient
// const conURL = 'mongodb://127.0.0.1:27017'
// const dbName = 'task-manager'
// mongodb.connect(conURL, {useNewUrlParser : true}, (error, client)=>{
//   if(error){
//     console.log('Unable to connect to database')
//   }
//   const db = client.db(dbName)

// })
// }
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended : false}))

app.use(setUser)

function setUser(req, res, next) {
  const userId = req.body.userId
  if (userId) {
    req.username = users.find(user => user.id === userId)
  }
  next()
}

function log(req, res, next){
    console.log('LOGGING on home page')
    req.use = ROLES.ADMIN
    next()
}

app.use('/comments', commentRoute)
app.use('/products', productRoute)

app.get('/',log,(req, res)=>{
    console.log(req.use)
    res.render('start', { home: 'HOME PAGE'})
})


app.post('/form',(req, res)=>{
    let {meat, qty} = req.body
    const msg = `You ordered ${qty} of ${meat}`
    res.render('form', {msg})
})

app.listen(3000, ()=> console.log("Listening on port 3000"))

