const Category = require('../controllers/category')
const User = require('../controllers/user')

module.exports = (app)=>{
    app.get('/api/categories', Category.getCategory)
    app.get('/api/categories/:id', Category.getOneCategory)
    app.put('/api/categories/:id', Category.updateCategory)
    app.delete('/api/categories/:id', Category.deleteCategory)
    app.post('/api/categories',User.verifyToken, Category.addCategory)
}