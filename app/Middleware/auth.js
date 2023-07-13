var asyncHandler = require('express-async-handler')
var passport = require('passport')

var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt
var LocalStrategy = require('passport-local').Strategy

var { User, ApiToken } = require('../Models/')
var config = require('../../config/auth.js')

passport.use(new LocalStrategy({usernameField: 'email'}, User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

var opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = config.secretKey

const jwtPassport = passport.use(new JwtStrategy(opts,
	(jwt_payload, done) => {
		try {
			const user = User.findByPk(jwt_payload.id)
			return done(null, user)
		} catch (err) {
			return done(err, false)
		}

		return done(null, false)
	}))

const verifyToken = asyncHandler(async (req, res, next) => {
	const extractBearerToken = ExtractJwt.fromAuthHeaderAsBearerToken()

	const apiToken = await ApiToken.findOne({token: extractBearerToken(req)})

	if(apiToken) {
		if(!apiToken.valid) {
			return next(new Error('Token is no longer valid'))
		}

		const tick = Math.floor( Date.now() / 1000 )

		const tokenExpiresAt = Date.parse(apiToken.expiresAt).valueOf() / 1000

		if(tokenExpiresAt < tick) {
			return next(new Error('Token has expired'))
		}
	}

	return next()
})

const verifyUser = passport.authenticate('jwt', {session: false})

module.exports = {
	jwtPassport,
	verifyToken,
	verifyUser
}