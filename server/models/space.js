const mongoose = require('mongoose')
const Schema = mongoose.Schema

const spaceSchema = new Schema({
	code: {
		type: String,
		required: true
	},
	instructorId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	instructorName: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	section: {
		type: String,
		required: true
	},
	students: [
		{
			studentId: {
				type: Schema.Types.ObjectId,
				ref: 'User',
				required: false
			}
		}
	],
	isArchived: {
		type: Boolean,
		required: false
	}
})

module.exports = mongoose.model('Space', spaceSchema)
