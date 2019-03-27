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

const Item = module.exports = mongoose.model('Item', itemSchema)

// get Items
module.exports.getItems = (req, res) => {
    Item.find()
    .then(items => {
        res.send({
            message: "Items have been retrieved successfully",
            data: items
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
}

// get item by id
module.exports.getItemById = (req, res) => {
    Item.findById(req.params.id)
    .then(item => {
        if(!item) {
            return res.status(404).send({
                message: "Item not found "
            });
        }
        res.send({
            message: "The item has been retrieved successfully",
            data: item
        });;
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
}

// add item
module.exports.addItem = (req, res) => {
    const data ={
        title: req.body.title,
        category: req.body.category,
        size: req.body.size,
        price: req.body.price,
        image_url: req.body.image_url,
        description: req.body.description
    }
    Item.create(data)
    .then(item => {
        res.send({
            message: "The item has been created successfully",
            data: item
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
}

// update item
module.exports.updateItem = (req, res) => {
    const data ={
        title: req.body.title,
        category: req.body.category,
        size: req.body.size,
        price: req.body.price,
        image_url: req.body.image_url,
        description: req.body.description
    }
    Item.findOneAndUpdate(req.params.id, data, {new: true})
    .then(item => {
        res.send({
            message: "The item has been updated successfully",
            data: item
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
}

//delete item
module.exports.deleteItem = (req, res) => {
    Item.findByIdAndRemove(req.params.id)
    .then(item => {
        console.log(item)
        res.send({
            message: "deleted successfully",
            item
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
}
