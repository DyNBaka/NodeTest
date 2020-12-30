const mongoose = require('mongoose')
const {Schema, model} = mongoose
const {Product} = require('./product')

const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A name is needed for farm']
    },
    city: {
        type: String
    },
    email: {
        type:String,
        required: [true,'A email is required']
    },
    products:[{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
})

farmSchema.post('findOneAndDelete', async function(farm){
    if(farm.products.length){
        const result = await Product.deleteMany({ _id: { $in: farm.products }})
        console.log(result)
    }
})


module.exports = model('Farm', farmSchema)











