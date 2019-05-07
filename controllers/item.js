const Item = require('../models').Item
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
    const { title, description, price, CategoryId } = req.body

    const data = {
        title,
        description,
        price,
        CategoryId,
        imageUrl: req.file && req.file.path,
        owner: req.user.id
    }

    doValidation = new Validate(title,price,CategoryId)

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
//get one Item
module.exports.getOneItem = (req,res) => {
    Item.findOne({where: {
        id: req.params.id
    }}).then((item)=>{
        if(item){
            res.status(200).send({
                data:item,
                message:"Success"
            })

        }
        res.status(404).send({
            message:"Item not found"
        })

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred, please try again later."
        });
    })
}

//update an Item
module.exports.updateItem = (req,res) => {
    const { title, description, price, CategoryId } = req.body
    const data = {
        title,
        description,
        price,
        CategoryId,
        imageUrl: req.file && req.file.path,
        owner: req.user.id
    }



   doValidation = new Validate(title,price,CategoryId)

    if(doValidation.shouldNotBeEmpty()){
        return res.send({
            message: doValidation.shouldNotBeEmpty()})
    }

    Item.update(
        data,
        { returning:true,
        plain: true,
         where: { id: req.params.id }}).then((item)=>{

        if (item[1]){
            return res.status(200).send({
                data:item[1],
                message:"The Item was successfully updated"
            })
        }

        return res.status(409).send({
            message:"Item was not updated successfully."
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred, please try again later."
        });
    })
}

//delete Item
module.exports.deleteItem = (req,res) => {
    Item.destroy({where: {
        id: req.params.id
    }}).then((rowDeleted)=>{
        if(rowDeleted){
            return res.status(200).send({
                message:"Item was successfully deleted"
            })
        }

        return res.status(404).send({
            message:"Item not found"
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred, please try again later."
        });
    })
}