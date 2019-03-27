const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    image_url: {
        type: String,
    },
    create_date: {
        type: Date,
        default: Date.now
    },
})

const Item = module.exports = mongoose.model('Items', itemSchema)

// get Items
module.exports.getItems = (callback, limit) => {
    Item.find(callback).limit(limit)

}

// get item by id
module.exports.getItemById = (id,callback) => {
    Item.findById(id, callback)
}

// add item
module.exports.addItem = (item,callback) => {
    Item.create(item, callback)
}

// update item
module.exports.updateItem = (id, item,options,callback) => {
    const query = {_id: id}
    const update ={
        title: item.title,
        category: item.category,
        size: item.size,
        price: item.price,
        image_url: item.image_url
    }
    Item.findOneAndUpdate(query, update, options, callback)
}