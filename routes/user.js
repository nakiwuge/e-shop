const User = require('../controllers/user')

module.exports = (app)=>{
    app.post('/api/register',User.addUser )
    app.post('/api/login', User.login )
}