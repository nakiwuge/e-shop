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
module.exports.getCategories = (req, res) => {
    Category.find()
    .then(categories => {
        res.json(categories);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
}