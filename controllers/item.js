const Item = require('../models/item')
const Validate = require('../helpers/validation')

let doValidation;
//get all Items
module.exports.getItems = (req,res) => {
    Item.findAll().then((items)=>{
        res.send({
            data:items,
            message:"The Items were successfully retrieved"
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred, please try again later."
        });
    })
}

//add an Item
module.exports.addItem = (req,res) => {
    const { title, description, price, category } = req.body
    const data = {
        title,
        description,
        price,
        category,
        imageUrl: req.file && req.file.path
    }
    doValidation = new Validate(title,price,category,data.imageUrl)

    if(doValidation.shouldNotBeEmpty()){
        return res.send({
            message: doValidation.shouldNotBeEmpty()})
    }

    Item.create(data).then((item)=>{
        res.send({
            data:item,
            message:"The Item was successfully added"
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred, please try again later."
        });
    })
}