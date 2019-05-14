const Category = require('../controllers/category');
import {verifyToken} from '../middlewares/auth';
import checkRole from '../middlewares/checkRole';

const checkUserRole = new checkRole();

module.exports = (app)=>{
  app.get('/api/categories', Category.getCategory);
  app.get('/api/categories/:id', Category.getOneCategory);
  app.put('/api/categories/:id', verifyToken, Category.updateCategory);
  app.delete('/api/categories/:id', verifyToken,Category.deleteCategory);
  app.post('/api/categories',verifyToken, checkUserRole.isNotBuyer, Category.addCategory);
};