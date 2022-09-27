const User = require('../models/user')
const HttpError = require('../models/httpError')
const fileHelper = require('../middleware/fileHelper')

const { validationResult } = require('express-validator')

exports.getProfile = async (req, res, next) => {
	const userId = req.params.id

	let existingUser
	try {
		existingUser = await User.findById(
			userId,
			'-birthday -email -password -isStudent -createdSpaces -spacesJoined'
		)
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	if (!existingUser) {
		return next(new HttpError('User not found.', 400))
	}

	res.status(200).json({
		message: 'Successfully fetched profile',
		user: existingUser
	})
}

exports.updateProfile = async (req, res, next) => {
	const {
		userId,
		firstName,
		middleName,
		lastName,
		address,
		gender,
		contactNumber
	} = req.body

	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(422).json({
			message: errors.array()[0].msg
		})
	}

	let existingUser
	try {
		existingUser = await User.findById(userId)
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	if (!existingUser) {
		return next(new HttpError('User not found.', 400))
	}

	existingUser.firstName = firstName
	existingUser.middleName = middleName
	existingUser.lastName = lastName
	existingUser.address = address
	existingUser.gender = gender
	existingUser.contactNumber = contactNumber

	try {
		await existingUser.save()
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	res.status(200).json({
		message: 'Successfully edited profile.'
	})
}

exports.updateProfilePicture = async (req, res, next) => {
	const { userId } = req.body

	if (!req.file) {
		return res.status(422).json({
			message: 'No image found.'
		})
	}

	let existingUser
	try {
		existingUser = await User.findById(userId)
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	if (!existingUser) {
		return next(new HttpError('User not found.', 400))
	}

	if (req.file) {
		if (existingUser.imageUrl) {
			fileHelper.deleteFile(existingUser.imageUrl)
		}
		existingUser.imageUrl = req.file.path
	}

	try {
		await existingUser.save()
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	res.status(200).json({
		message: 'Successfully edited profile picture.'
	})
}
