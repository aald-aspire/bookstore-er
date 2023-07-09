var asyncHandler = require('express-async-handler')
var passport = require('passport')
var { issueToken, revokeToken } = require('../Services/auth')
var { User } = require('../Models/')

const login = asyncHandler(async (req, res, next) => {
  var token = await issueToken({id: req.user.id})

  res.statusCode = 200
  res.json({success: true, token: token})
})

const logout = asyncHandler(async (req, res, next) => {
  await revokeToken(req)

  res.statusCode = 200
  res.json({success: true, status: 'Logged Out Successfully'})
})

const add = asyncHandler(async (req, res, next) => {
  User.register(new User({name: req.body.name, email: req.body.email}), req.body.password, (err, user) => {
    if (err) {
      res.statusCode = 500
      res.json({err: err})
    } else {
      passport.authenticate('local', {session: false})(req, res, () => {
        res.statusCode = 200
        res.json({success: true, status: 'User Added Successfully'})
      })
    }
  })
})

module.exports = {
	login,
	logout,
	add
}