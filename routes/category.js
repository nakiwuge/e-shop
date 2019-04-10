const Category = require('../controllers/category')
const User = require('../controllers/user')

module.exports = (app)=>{
    app.get('/api/categories', Category.getCategory)
    app.post('/api/categories',User.verifyToken, Category.addCategory)
}