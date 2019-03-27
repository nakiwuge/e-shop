const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    },
})

const Category = module.exports = mongoose.model('Category', categorySchema)

// get Categories
module.exports.getCategories = (callback, limit) => {
    Category.find(callback).limit(limit)

}