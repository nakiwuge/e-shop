const item = require('../models/item')

module.exports = (app) => {
    app.get('/api/items', item.getItems)
    app.get('/api/items/:id', item.getItemById)
    app.post('/api/items', item.addItem)
    app.put('/api/items/:id', item.updateItem)
    app.delete('/api/items/:id', item.deleteItem)
}


