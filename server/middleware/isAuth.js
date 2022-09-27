const jwt = require('jsonwebtoken')
const HttpError = require('../models/httpError')

module.exports = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next()
	}
	try {
		const token = req.headers.authorization.split(' ')[1]
		if (!token) {
			return next(new HttpError('Authentication failed.', 401))
		}
		const decodedToken = jwt.verify(token, 'MY_SECRET')
		// STORING AUTHENTICATED USER DATA IN ORDER TO PERSIST TO OTHER REQUESTS
		req.userData = {
			userId: decodedToken.userId,
			isStudent: decodedToken.isStudent
		}
		next()
	} catch (error) {
		return next(new HttpError('Authentication failed.', 401))
	}
}
