const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models').User;

const Validate = require('../helpers/validation');

let doValidation;
//get all Items
module.exports.addUser = (req,res) => {
  const saltRounds = 10;
  const { email, firstName, lastName, password , confirmPassword } = req.body;

  doValidation = new Validate({email}, {firstName}, {lastName}, {password}, {confirmPassword});
  if(doValidation.isEmpty()){
    return res.status(405).send({
      error: doValidation.isEmpty()});
  }

  if (password!==confirmPassword){
    return res.status(405).send({
      error:'passwords do not match'});
  }

  bcrypt.hash(password, saltRounds, async function(err, hash) {
    const  hashedPassword = hash;
    const data = {
      email,
      firstName,
      lastName,
      password: hashedPassword,
      isBuyer: true
    };

    User.findOne({
      where: {email}}).then(user => {
      if(user){
        return res.status(405).send({
          error: 'Email provided already exists'
        });
      }
      User.create(data).then((user)=>{
        user.password = undefined;
        res.status(201).send({
          data: user,
          message:'The registration was successful'
        });
      }).catch(err => {
        res.status(500).send({
          message: err.message || 'Some error occurred, please try again later.'
        });
      });

    }).catch(err=>{
      res.status(500).send({
        message: err.message || 'Some error occurred, please try again later.'
      });
    });
  });
};

// user login
module.exports.login = (req,res) => {
  const { email, password } = req.body;

  doValidation = new Validate(email, password);
  if(doValidation.isEmpty()){
    return res.send({
      message: doValidation.isEmpty()});
  }

  User.findOne({
    where: {
      email,
    }
  }).then((user)=>{

    if (user){
      bcrypt.compare(password, user.password).then(value => {
        const data = {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role:user.RoleId
        };
        if (value){
          jwt.sign({user:data}, 'secretKey',{ expiresIn: '24h' }, (err,token)=>{
            data['token']=token;
            res.send({
              data,
              message: 'The login was successful'
            });
          });}else{
          res.send({
            message: 'wrong password or email'
          });
        }});}
    else {
      res.send({
        message: 'wrong password or email'
      });}
  }).catch((err)=>{
    res.send({
      message: err.message
    });
  });
};

module.exports.getUsers = (req,res) => {

  User.findAll().then((users)=>{
    users.forEach(user => delete user.dataValues.password );

    res.status(200).send({
      data:users,
      message:'Success'
    });
  }).catch(err => {
    res.status(500).send({
      message: err.message || 'Some error occurred, please try again later.'
    });
  });
};

module.exports.updateUserRole = async (req,res) => {
  const role = req.body;
  const isSuperAdmin = await User.findOne({where:{id: req.params.id, isSuperAdmin: false }});

  if (!isSuperAdmin){
    return res.status(405).send({
      error :'you cannot change the role of this user'
    });}

  User.update(
    role,
    { returning:true,
      plain: true,
      where: { id: req.params.id }}).then((user)=>{
    if (user[1]){
      const data = user[1].dataValues;
      delete data.password;
      data.editedBy = req.user;

      return res.status(201).send({
        data,
        message:'The role was successfully updated'
      });
    }

    return res.status(409).send({
      message:'The role was not updated successfully.'
    });
  }).catch(err => {
    res.status(500).send({
      message: err.message || 'Some error occurred, please try again later.'
    });
  });
};
