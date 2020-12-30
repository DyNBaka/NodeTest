const mongoose = require('mongoose')
const {Product} = require('./models/product')

mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
  console.log('CONNECTION OPEN')
}).catch(err=>{
  console.log('CANT CONNECT')
  console.log(err)
})

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price:1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    }
]

Product.insertMany(seedProducts).then(d=>{
    console.log(d)
}).catch(err=>{
    console.log(err)
})

// const p = new Product({
//     name: 'Ruby',
//     price: 1.99,
//     category: 'fruit'
// })

// p.save().then(p=> {
//     console.log(p)
// }).catch(err=>{
//     console.log(err)
// })