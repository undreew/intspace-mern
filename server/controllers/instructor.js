const Space = require('../models/space')
const User = require('../models/user')

const HttpError = require('../models/httpError')
const randomString = require('randomstring')
const { validationResult } = require('express-validator')
const { default: mongoose } = require('mongoose')

exports.getAllSpaces = async (req, res, next) => {
	const instructorId = req.params.id

	let existingInstructor
	try {
		existingInstructor = await User.findById(instructorId)
	} catch (error) {
		return next(new HttpError('Instructor not found.', 500))
	}

	let spaces
	try {
		spaces = await existingInstructor.populate('createdSpaces.spaceId')
	} catch (error) {
		return next(new HttpError('Something went wrong, please try again.', 500))
	}

	res.status(200).json({
		message: 'Fetched all spaces for instructor',
		spaces: spaces.createdSpaces
	})
}

exports.createSpace = async (req, res, next) => {
	const { instructorId, name, section } = req.body

	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({
			message: errors.array()[0].msg
		})
	}

	let existingInstructor
	try {
		existingInstructor = await User.findById(instructorId)
	} catch (error) {
		return next(new HttpError('Something went wrong, please try again.', 500))
	}

	if (!existingInstructor) {
		return next(new HttpError('Intructor not found.', 400))
	}

	let existingSpace
	try {
		existingSpace = await Space.findOne({ name: name, section: section })
	} catch (error) {
		return next(new HttpError('Something went wrong, please try again.', 500))
	}

	if (existingSpace) {
		return next(new HttpError('Space already exists.', 409))
	}

	let code = randomString.generate(8)

	if (!code) {
		return next(
			new HttpError(
				'Something went wrong in generating the space code, please try again.',
				500
			)
		)
	}

	let instructorFirstName = existingInstructor.firstName
	let instructorLastName = existingInstructor.lastName
	let instructorName = instructorFirstName + ' ' + instructorLastName

	const createdSpace = new Space({
		code,
		instructorId,
		instructorName,
		name,
		section,
		users: []
	})

	try {
		const session = await mongoose.startSession()
		session.startTransaction()
		await createdSpace.save({ session: session })
		// ADD THE CREATED SPACE IN THE INSTRUCTORS SPACES
		existingInstructor.createdSpaces.push({ spaceId: createdSpace.id })
		await existingInstructor.save({ session: session })
		await session.commitTransaction()
	} catch (error) {
		return next(new HttpError('Something went wrong, please try again.', 500))
	}

	res.status(201).json({
		message: 'Successfully created a space.'
	})
}

exports.editSpace = async (req, res, next) => {}

exports.deleteSpace = async (req, res, next) => {
	const spaceId = req.params.id
	const { instructorId } = req.body

	let existingSpace
	try {
		existingSpace = await Space.findById(spaceId)
	} catch (error) {
		return next(new HttpError('Something went wrong, please try again.', 500))
	}

	if (!existingSpace) {
		return next(new HttpError('Space doesnt exist.', 409))
	}

	let existingInstructor
	try {
		existingInstructor = await User.findById(instructorId)
	} catch (error) {
		return next(new HttpError('Something went wrong, please try again.', 500))
	}

	if (!existingInstructor) {
		return next(new HttpError('User not found.', 400))
	}

	let spaces
	try {
		spaces = await Space.findById(spaceId).populate('students.studentId')
	} catch (error) {
		return next(new HttpError('Something went wrong, please try again.', 500))
	}

	console.log(spaces)

	try {
		const session = await mongoose.startSession()
		session.startTransaction()
		await existingSpace.remove({ session: session })
		await existingInstructor.deleteCreatedSpace(spaceId)
		await existingInstructor.save({ session: session })
		// DELETE SPACE FROM THE STUDENT'S JOINED SPACES
		for (let i = 0; i < spaces.students.length; i++) {
			let foundSpace = spaces.students[i].studentId.spacesJoined.findIndex(
				(item) => item.spaceId.toString() === spaceId.toString()
			)
			if (foundSpace >= 0) {
				await spaces.students[i].studentId.deleteSpaceJoined(spaceId)
				await spaces.students[i].studentId.save({ session: session })
			}
		}
		await session.commitTransaction()
	} catch (error) {
		return next(new HttpError('Something went wrong, please try again.', 500))
	}

	res.status(200).json({
		message: 'Successfully deleted space.'
	})
}

exports.archiveSpace = async (req, res, next) => {}
