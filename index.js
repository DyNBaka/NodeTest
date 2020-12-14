const express = require('express')
const path = require('path')
const app = express()
const methodOverride = require('method-override')
const commentRoute = require('./comments.js')
const productRoute = require('./products.js')
const { ROLES, users } = require('./data')
const mongodb = require('mongodb')
const mongoose = require('mongoose')
const Product = require('./models/product')

mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
  console.log('CONNECTION OPEN FROM index')
}).catch(err=>{
  console.log('CANT CONNECT FROM index')
  console.log(err)
})



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
app.use(express.json())
app.use(express.urlencoded({extended: true}))

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

