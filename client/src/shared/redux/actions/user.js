import * as actions from '../constants/user'

export const getUserProfile = (userId) => async (dispatch) => {
	try {
		dispatch({
			type: actions.GET__USER__PROFILE__REQUEST
		})

		const response = await fetch(
			`http://localhost:5000/api/users/profile/${userId}`
		)

		const data = await response.json()

		dispatch({
			type: actions.GET__USER__PROFILE__SUCCESS,
			payload: data
		})
	} catch (error) {
		dispatch({
			type: actions.GET__USER__PROFILE__FAIL,
			payload: error.toString()
		})
	}
}

export const getUserProfileReset = () => async (dispatch) => {
	dispatch({
		type: actions.GET__USER__PROFILE__RESET
	})
}

export const patchUserProfile = (userId, inputs, token) => async (dispatch) => {
	try {
		dispatch({
			type: actions.PATCH__USER__PROFILE__REQUEST
		})

		const response = await fetch(
			`http://localhost:5000/api/users/update-profile`,
			{
				method: 'PATCH',
				body: JSON.stringify({
					userId,
					firstName: inputs.firstName.value,
					middleName: inputs.middleName.value,
					lastName: inputs.lastName.value,
					address: inputs.address.value,
					gender: inputs.gender.value,
					contactNumber: inputs.contactNumber.value
				}),
				headers: {
					Authorization: 'Bearer ' + token,
					'Content-Type': 'application/json'
				}
			}
		)

		const data = await response.json()

		if (!response.ok) {
			throw new Error(data.message)
		}

		dispatch({
			type: actions.PATCH__USER__PROFILE__SUCCESS,
			payload: data
		})
	} catch (error) {
		dispatch({
			type: actions.PATCH__USER__PROFILE__FAIL,
			payload: error.toString()
		})
	}
}

export const patchUserProfileReset = () => async (dispatch) => {
	dispatch({
		type: actions.PATCH__USER__PROFILE__RESET
	})
}

export const patchUserProfilePicture =
	(input, userId, token) => async (dispatch) => {
		try {
			dispatch({
				type: actions.PATCH__USER__PROFILE__PICTURE__REQUEST
			})

			const formData = new FormData()
			formData.append('image', input.value)
			formData.append('userId', userId)

			const response = await fetch(
				`http://localhost:5000/api/users/update-profile-picture`,
				{
					method: 'PATCH',
					body: formData,
					headers: {
						Authorization: 'Bearer ' + token
					}
				}
			)

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message)
			}

			dispatch({
				type: actions.PATCH__USER__PROFILE__PICTURE__SUCCESS,
				payload: data.message
			})
		} catch (error) {
			dispatch({
				type: actions.PATCH__USER__PROFILE__PICTURE__FAIL,
				payload: error.toString()
			})
		}
	}

export const patchUserProfilePictureReset = () => async (dispatch) => {
	dispatch({
		type: actions.PATCH__USER__PROFILE__PICTURE__RESET
	})
}
