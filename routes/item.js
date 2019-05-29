const Item = require('../controllers/item');
import {verifyToken} from '../middlewares/auth';
import { isOwner } from '../middlewares/item';
import checkRole from '../middlewares/checkRole';
import { upload }from '../middlewares/multer';

const checkUserRole = new checkRole();

module.exports = (app) => {
  app.get('/api/items', Item.getItems);
  app.post('/api/items/', verifyToken, upload, checkUserRole.isNotBuyer, Item.addItem);
  app.get('/api/items/:id', Item.getOneItem);
  app.put('/api/items/:id', verifyToken,isOwner,Item.updateItem);
  app.delete('/api/items/:id', verifyToken,isOwner, Item.deleteItem);
};
