const mongoose = require('mongoose')
const {Schema } = mongoose

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    price: {
        type: Number,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit','vegetable', 'dairy']
    },
    farm: {
        type: Schema.Types.ObjectId,
        ref: 'Farm'
    }
})

const categories = ['fruit', 'vegetable', 'dairy']

const Product = mongoose.model('Product', productSchema)
module.exports = {
    Product: Product,
    categories: categories
}