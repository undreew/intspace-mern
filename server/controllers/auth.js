const User = require('../models/user')
const HttpError = require('../models/httpError')

const { validationResult } = require('express-validator')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const sgMail = require('@sendgrid/mail')
const { v4: uuidv4 } = require('uuid')

sgMail.setApiKey(process.env.SEND_GRID_API)

const resetMsg = (email, token) => {
	return {
		to: email, // Change to your recipient
		from: 'jamesdj417@gmail.com', // Change to your verified sender
		subject: 'Password reset!',
		text: 'This is done through Node.js',
		html: `
        <p>You have requested for a password reset.</p>
        <p>Click this <a href='http://localhost:3000/reset/${token}'>link</a> to set a new password.</p>
        `
	}
}

exports.signup = async (req, res, next) => {
	const {
		firstName,
		middleName,
		lastName,
		address,
		birthday,
		gender,
		contactNumber,
		email,
		password,
		confirmPassword,
		role
	} = req.body

	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({
			message: errors.array()[0].msg
		})
	}

	if (role === 'Student' || role === 'Instructor') {
	} else {
		return next(new HttpError('Invalid role', 400))
	}

	let existingUser
	try {
		existingUser = await User.findOne({ email: email })
	} catch (error) {
		return next(new HttpError('Something went wrong, please try again.', 500))
	}

	if (existingUser) {
		return next(new HttpError('User already exists.', 409))
	}

	let hashedPassword
	try {
		hashedPassword = await bcrypt.hash(password, 12)
	} catch (error) {
		return next(new HttpError('Something went wrong, please try again.', 500))
	}

	const createdUser = new User({
		firstName,
		lastName,
		middleName,
		address,
		birthday,
		gender,
		contactNumber,
		email,
		password: hashedPassword,
		role,
		isStudent: role === 'Student' ? true : false,
		createdSpaces: role === 'Student' ? null : [],
		spacesJoined: role === 'Instructor' ? null : []
	})

	try {
		await createdUser.save()
	} catch (error) {
		return next(new HttpError('Something went wrong, please try again.', 500))
	}

	res.status(201).json({
		message: 'Successfully created user.'
	})
}

exports.login = async (req, res, next) => {
	const { role, email, password } = req.body

	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({
			message: errors.array()[0].msg
		})
	}

	if (role === 'Student' || role === 'Instructor') {
	} else {
		return next(new HttpError('Invalid role', 400))
	}

	let existingUser
	try {
		existingUser = await User.findOne({ email: email })
	} catch (error) {
		return next(new HttpError('Something went wrong, please try again.', 500))
	}

	if (!existingUser) {
		return next(new HttpError('No user found.', 409))
	}

	if (existingUser.role !== role) {
		return next(new HttpError('Roles doesnt match.', 401))
	}

	let isMatch
	try {
		isMatch = await bcrypt.compare(password, existingUser.password)
	} catch (error) {
		return next(new HttpError('Something went wrong, please try again.', 500))
	}

	if (!isMatch) {
		return next(new HttpError('Invalid email or password.', 401))
	}

	let token
	try {
		token = jwt.sign(
			{
				userId: existingUser.id,
				isStudent: existingUser.isStudent
			},
			'MY_SECRET',
			{
				expiresIn: '1h'
			}
		)
	} catch (error) {
		return next(new HttpError('Something went wrong, please try again.', 500))
	}

	res.status(200).json({
		message: 'Successfully logged in.',
		userId: existingUser.id,
		isStudent: existingUser.isStudent,
		token
	})
}

exports.postResetPassword = (req, res, next) => {
	const email = req.body.email

	crypto.randomBytes(32, (err, buffer) => {
		if (err) {
			return next(new HttpError('Something went wrong, please try again.', 500))
		}
		const token = buffer.toString('hex')

		User.findOne({ email: email })
			.then((existingUser) => {
				if (!existingUser) {
					return next(new HttpError('User not found.', 400))
				}
				existingUser.resetToken = token
				existingUser.resetTokenExpiration = Date.now() + 3600000
				return existingUser.save()
			})
			.then((result) => {
				sgMail.send(resetMsg(email, token)).then((result) => {
					res.status(200).json({
						message: 'Check your email for further information.'
					})
				})
			})
			.catch((err) => {
				return next(
					new HttpError('Something went wrong, please try again.', 500)
				)
			})
	})
}

exports.postNewPassword = async (req, res, next) => {
	const { currentPassword, newPassword, confirmPassword, userId, resetToken } =
		req.body

	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(422).json({
			message: errors.array()[0].msg
		})
	}

	let existingUser
	try {
		existingUser = await User.findOne({
			resetToken: resetToken,
			resetTokenExpiration: { $gt: Date.now() },
			_id: userId
		})
	} catch (error) {
		new HttpError('Something went wrong, please try again.', 500)
	}

	if (!existingUser) {
		return next(new HttpError('User not found.', 400))
	}

	let isMatch
	try {
		isMatch = await bcrypt.compare(currentPassword, existingUser.password)
	} catch (error) {
		new HttpError('Something went wrong, please try again.', 500)
	}

	if (!isMatch) {
		return next(new HttpError('Incorrect Password.', 400))
	}

	let hashedPassword
	try {
		hashedPassword = await bcrypt.hash(newPassword, 12)
	} catch (error) {
		return next(new HttpError('Something went wrong, please try again.', 500))
	}

	existingUser.password = hashedPassword
	existingUser.resetToken = undefined
	existingUser.resetTokenExpiration = undefined

	try {
		await existingUser.save()
	} catch (error) {
		return next(new HttpError('Something went wrong, please try again.', 500))
	}

	res.status(200).json({
		message: 'Successfully reset password.'
	})
}

// let existingUser
// 	try {
// 		existingUser = await User.findOne({ email: email })
// 	} catch (error) {
// 		return next(new HttpError('Something went wrong, please try again.', 500))
// 	}

// 	let token
// 	crypto.randomBytes(32, (err, buffer) => {
// 		if (err) {
// 			return next(new HttpError('Something went wrong, please try again.', 500))
// 		}
// 		token = buffer.toString('hex')
// 	})

// 	existingUser.resetToken = token
// 	existingUser.resetTokenExpiration = Date.now() + 3600000

// 	try {
// 		const session = await mongoose.startSession()
// 		session.startTransaction()
// 		await existingUser.save({ session: session })
// 		await sgMail.send(resetMsg(email, token))
// 		await session.commitTransaction()
// 	} catch (error) {
// 		return next(new HttpError('Something went wrong, please try again.', 500))
// 	}
