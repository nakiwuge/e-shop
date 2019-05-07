const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models').User;
const Validate = require('../helpers/validation');

let doValidation;
//get all Items
module.exports.addUser = (req,res) => {
  const saltRounds = 10;
  const { email, firstName, lastName, password , confirmPassword } = req.body;

  doValidation = new Validate(email, firstName, lastName, password, confirmPassword);
  if(doValidation.shouldNotBeEmpty()){
    return res.send({
      message: doValidation.shouldNotBeEmpty()});
  }

  if (password!=confirmPassword){
    return res.send({
      message:'passwords do not match'});
  }

  bcrypt.hash(password, saltRounds, function(err, hash) {
    const  hashedPassword = hash;
    const data = {
      email,
      firstName,
      lastName,
      password: hashedPassword,
    };

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
  });
};

// user login
module.exports.login = (req,res) => {
  const { email, password } = req.body;

  doValidation = new Validate(email, password);
  if(doValidation.shouldNotBeEmpty()){
    return res.send({
      message: doValidation.shouldNotBeEmpty()});
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
          lastName: user.lastName
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

module.exports.verifyToken = (req,res,next)=>{
  const header = req.headers['authorization'];

  if(typeof header !== 'undefined'){
    const bearer = header.split(' ');
    const token = bearer[1];
    req.token = token;
    jwt.verify(req.token, 'secretKey', (err, user)=>{
      if(err){
        res.status(403).send({
          message: err.message
        });
      } else {
        req.user = user.user;
        next();
      }
    });} else {
    res.status(403).send({
      message: 'You are not authorized. Please add a token '});

  }

};
