const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const User = require('../models').User;

class checkRole {

  isNotBuyer(req,res,next){
    User.findOne({where: {
      id:req.user.id,
      [Op.or]: [{isAdmin: true}, {isSeller: true},{isSuperAdmin: true} ]
    }}).then((user)=>{
      if(!user){
        return  res.status(405).send({
          error: 'You have no permmission to perform this action'
        });
      }
      next();
    });
  }

  isSuperAdmin(req,res,next){
    User.findOne({where: {
      id:req.user.id,
      isSuperAdmin: true
    }}).then((user)=>{
      if(!user){
        return  res.status(405).send({
          error: 'You have no permmission to perform this action'
        });
      }
      next();
    });
  }

  isAdmin(req,res,next){
    User.findOne({where: {
      id:req.user.id,
      [Op.or]: [{isAdmin: true},{isSuperAdmin: true} ]
    }}).then((user)=>{
      if(!user){
        return  res.status(405).send({
          error: 'You have no permmission to perform this action'
        });
      }
      next();
    });
  }
};
export default checkRole;