var asyncHandler = require('express-async-handler')
var ExtractJwt = require('passport-jwt').ExtractJwt
var jwt = require('jsonwebtoken')

var { User, ApiToken } = require('../Models/')

var config = require('../../config/auth.js')

const issueToken = async (user) => {
	const tick = new Date()

	user.iat = Math.floor( tick.valueOf() / 1000 )

	const token = jwt.sign(user, config.secretKey, {expiresIn: config.expiresIn})

	var apiToken = await ApiToken.create({
		user_id: user.id,
		token: token,
		valid: true,
		expiresAt: new Date(( user.iat + config.expiresIn ) * 1000)
	})

	return token
}

const revokeToken = async (req) => {
	const extractBearerToken = ExtractJwt.fromAuthHeaderAsBearerToken()

	const apiToken = await ApiToken.findOne({ where: {token: extractBearerToken(req)} })

	if(apiToken)
		await apiToken.destroy()
	else
		throw new Error('Invalid Token')
}

module.exports = {
	issueToken,
	revokeToken
}