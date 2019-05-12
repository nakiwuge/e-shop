const User = require('../controllers/user');
import {verifyToken} from '../middlewares/auth';
import checkRole from '../middlewares/checkRole';

const checkUserRole = new checkRole();

module.exports = (app)=>{
  app.post('/api/register',User.addUser );
  app.post('/api/login', User.login );
  app.get('/api/users',verifyToken, checkUserRole.isAdmin, User.getUsers );
  app.put('/api/users/role/:id',verifyToken, checkUserRole.isAdmin, User.updateUserRole );
};