const Category = require('../controllers/category')

module.exports = (app)=>{
    app.get('/api/categories', Category.getCategory)
    app.post('/api/categories', Category.addCategory)
}