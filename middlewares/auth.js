const jwt = require('jsonwebtoken');

export const verifyToken = (req,res,next)=>{
  const header = req.headers['authorization'];

  if(typeof header !== 'undefined'){
    const bearer = header.split(' ');
    const token = bearer[1];
    req.token = token;
    jwt.verify(req.token, 'secretKey', (err, user)=>{
      if(err){
        res.status(403).send({
          error: err.message
        });
      } else {
        req.user = user.user;
        next();
      }
    });} else {
    res.status(403).send({
      error: 'You are not authorized. Please add a token'});
  }
};
