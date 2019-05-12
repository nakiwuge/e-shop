const multer = require('multer');
const Item = require('../controllers/item');
import {verifyToken} from '../middlewares/auth';
import { isOwner } from '../middlewares/item';
import checkRole from '../middlewares/checkRole';

const checkUserRole = new checkRole();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) =>{
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    filesize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

module.exports = (app) => {
  app.get('/api/items', Item.getItems);
  app.post('/api/items/', verifyToken,upload.single('imageUrl'), checkUserRole.isNotBuyer, Item.addItem);
  app.get('/api/items/:id', Item.getOneItem);
  app.put('/api/items/:id', verifyToken,isOwner,Item.updateItem);
  app.delete('/api/items/:id', verifyToken,isOwner, Item.deleteItem);
};


