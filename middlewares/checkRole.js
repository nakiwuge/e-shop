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
          message: 'You have no permmission to perform this action'
        });
      }
      next();
    }).catch(errors => {
      res.status(500).send({
        message: errors.message || 'Some error occurred, please try again later.'
      });
    });
  }

  isSuperAdmin(req,res,next){
    User.findOne({where: {
      id:req.user.id,
      isSuperAdmin: true
    }}).then((user)=>{
      if(!user){
        return  res.status(405).send({
          message: 'You have no permmission to perform this action'
        });
      }
      next();
    }).catch(errors => {
      res.status(500).send({
        message: errors.message || 'Some error occurred, please try again later.'
      });
    });
  }

  isAdmin(req,res,next){
    User.findOne({where: {
      id:req.user.id,
      [Op.or]: [{isAdmin: true},{isSuperAdmin: true} ]
    }}).then((user)=>{
      if(!user){
        return  res.status(405).send({
          message: 'You have no permmission to perform this action'
        });
      }
      next();
    }).catch(errors => {
      res.status(500).send({
        message: errors.message || 'Some error occurred, please try again later.'
      });
    });
  }
};
export default checkRole;