const user = require('../UsersController');


module.exports.authUser = (req, res, next)=> {
user.findUser(req, res, next)
}