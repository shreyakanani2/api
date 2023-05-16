const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please add a product name'],
        trim: true
    },
    price: {
        type: Number,
        require: [true, 'Please add a product price']
    },
    color: {
        type: String,
        require: [true, 'Please add a product color'],
        trim: true
    },
    description: {
        type: String,
        require: [true, 'Please add a product description']
    },
    imageURL : {
        type: String,
        match: [ /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'Please enter valid URL with HTTP or HTTPS'],
        require: [true, 'Please add a product image URL']   
    }
})

module.exports = mongoose.model('Product', ProductSchema);