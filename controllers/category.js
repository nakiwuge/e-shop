const db = require('../config/database')
const Category = require('../models/category')


//get a category
module.exports.getCategory = (req, res) => {
    Category.findAll().then(categories => {
        res.send({
            data: categories,
            message: "The categories have been retrieved successfully"})
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred, please try again later."
        });
    })
}

//add a category
module.exports.addCategory = (req, res) => {
    data = { name: req.body.name }

    Category.create(data).then(category => {
        res.send({
            data: category,
            message: "The category was successfully created"})
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred, please try again later."
        });
    })
}