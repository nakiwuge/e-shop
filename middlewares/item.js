const Item = require('../models').Item

export const isOwner = (req,res, next) =>{
    Item.findOne({where: {
        id: req.params.id,
        owner:req.user.id
    }}).then((item)=>{
        if(!item){
            return  res.status(405).send({
                message: "You are not allowed to update this Item"
            });
        }
        next()
    }).catch(errors => {
        res.status(500).send({
            message: errors.message || "Some error occurred, please try again later."
        });
    })
}