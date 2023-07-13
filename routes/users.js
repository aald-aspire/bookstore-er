var express = require('express')
var passport = require('passport')

var auth = require('../app/Middleware/auth')
var usersController = require('../app/Controllers/user')

var router = express.Router()

router.post('/login', passport.authenticate('local', {session: false}), usersController.login)

router.post('/logout', auth.verifyToken, auth.verifyUser, usersController.logout)

router.post('/add', usersController.add)

module.exports = router;
