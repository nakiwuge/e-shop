const category = require('../models/category')

module.exports = (app)=>{
    app.get('/api/categories', category.getCategories)
}
