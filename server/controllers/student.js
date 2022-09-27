const User = require('../models/user')
const Space = require('../models/space')
const HttpError = require('../models/httpError')
const { default: mongoose } = require('mongoose')

exports.getAllSpaces = async (req, res, next) => {
	const studentId = req.params.id

	let existingStudent
	try {
		existingStudent = await User.findById(studentId)
	} catch (error) {
		new HttpError('Something went wrong, please try again later.', 500)
	}

	if (!existingStudent) {
		return next(new HttpError('Student not found.', 400))
	}

	let spaces
	try {
		spaces = await existingStudent.populate('spacesJoined.spaceId')
	} catch (error) {
		new HttpError('Something went wrong, please try again later.', 500)
	}

	res.status(200).json({
		message: 'Fetched student spaces.',
		spaces: spaces.spacesJoined
	})
}

exports.joinSpace = async (req, res, next) => {
	const { spaceCode, studentId } = req.body

	let existingUser
	try {
		existingUser = await User.findById(studentId)
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	if (!existingUser) {
		return next(new HttpError('Student not found.', 400))
	}

	let existingSpace
	try {
		existingSpace = await Space.findOne({ code: spaceCode })
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	if (!existingSpace) {
		return next(new HttpError('Space not found.', 400))
	}

	// CHECK IF SPACEID IS ALREADY IN THE SPACES JOINED FOR A STUDENT
	let existingStudentSpaceIndex = existingUser.spacesJoined.findIndex(
		(item) => {
			return item.spaceId.toString() === existingSpace._id.toString()
		}
	)

	if (existingStudentSpaceIndex >= 0) {
		return next(new HttpError('Already joined this space.', 422))
	}

	try {
		const session = await mongoose.startSession()
		session.startTransaction()
		existingSpace.students.push({ studentId: existingUser.id })
		await existingSpace.save({ session: session })
		existingUser.spacesJoined.push({ spaceId: existingSpace.id })
		await existingUser.save({ session: session })
		await session.commitTransaction()
	} catch (error) {
		new HttpError('Something went wrong, please try again later.', 500)
	}

	res.status(200).json({
		message: 'Successfully joined the space.'
	})
}
