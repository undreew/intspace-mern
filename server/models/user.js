const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
	firstName: {
		type: String,
		required: true
	},
	middleName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		require: true
	},
	imageUrl: {
		type: String,
		require: false
	},
	address: {
		type: String,
		required: true
	},
	birthday: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		required: true
	},
	contactNumber: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true
	},
	isStudent: {
		type: Boolean,
		required: true
	},
	resetToken: {
		type: String,
		required: false
	},
	resetTokenExpiration: {
		type: Date,
		required: false
	},
	createdSpaces: [
		{
			spaceId: {
				type: Schema.Types.ObjectId,
				ref: 'Space',
				required: true
			}
		}
	],
	spacesJoined: [
		{
			spaceId: {
				type: Schema.Types.ObjectId,
				ref: 'Space',
				required: true
			}
		}
	]
})

userSchema.methods.deleteCreatedSpace = function (spaceId) {
	let updatedCreatedSpaces = [...this.createdSpaces]

	updatedCreatedSpaces = updatedCreatedSpaces.filter((item) => {
		return item.spaceId.toString() !== spaceId.toString()
	})

	this.createdSpaces = updatedCreatedSpaces
	return
}

userSchema.methods.deleteSpaceJoined = function (spaceId) {
	let updatedSpacesJoined = [...this.spacesJoined]

	updatedSpacesJoined = updatedSpacesJoined.filter((item) => {
		return item.spaceId.toString() !== spaceId.toString()
	})

	this.spacesJoined = updatedSpacesJoined
	return
}

module.exports = mongoose.model('User', userSchema)
