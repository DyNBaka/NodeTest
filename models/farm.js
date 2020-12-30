const mongoose = require('mongoose')
const {Schema, model} = mongoose

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

module.exports = model('Farm', farmSchema)











