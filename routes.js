const route = require('express').Router();;
const FireForexServiceController = require('./controllers/FireForexServiceController')
const Auth =  require('./controllers/middlewares/middleware.authenticate')
const UserController = require('./controllers/UsersController')

route.get('/getcurrencies', FireForexServiceController.getCurrencies)
route.post('/convertcurrency', Auth.authUser , FireForexServiceController.getLocalPrice)
route.post('/createuser', UserController.createUser)



module.exports = route


