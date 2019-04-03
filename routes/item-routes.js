const multer = require('multer')
const Item = require('../controllers/item')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req, file, cb) =>{
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
      filesize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

module.exports = (app) => {
    app.get('/api/items', Item.getItems)
    app.post('/api/items/', upload.single('imageUrl'), Item.addItem)
    // app.post('/api/items', item.addItem)
    // app.put('/api/items/:id', item.updateItem)
    // app.delete('/api/items/:id', item.deleteItem)
}


