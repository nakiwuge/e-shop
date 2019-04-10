const Category = require('../models/category')
const Validate = require('../helpers/validation')


let doValidation;

//get a category
module.exports.getCategory = (req, res) => {
    Category.findAll().then(categories => {
        res.status(201).json({
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
    doValidation = new Validate(data.name)

    if(doValidation.shouldNotBeEmpty()){
        return res.send({
            message: doValidation.shouldNotBeEmpty()})
    }

    Category.create(data).then(category => {
        res.send({
            data: category,
            message: "The category was successfully created"})
    }).catch(errors => {
        console.log(errors.message)
        res.status(500).send({
            message: errors.message || "Some error occurred, please try again later."
        });
    })
}

