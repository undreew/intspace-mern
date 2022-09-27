import * as actions from '../constants/auth'

export const signup = (inputs) => async (dispatch) => {
	try {
		dispatch({
			type: actions.SIGNUP_REQUEST
		})
		const response = await fetch(`http://localhost:5000/api/auth/signup`, {
			method: 'POST',
			body: JSON.stringify({
				firstName: inputs.firstName.value,
				middleName: inputs.middleName.value,
				lastName: inputs.lastName.value,
				address: inputs.address.value,
				birthday: inputs.birthday.value,
				gender: inputs.gender.value,
				contactNumber: inputs.contactNumber.value,
				email: inputs.email.value,
				password: inputs.password.value,
				confirmPassword: inputs.confirmPassword.value,
				role: inputs.role.value
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		const data = await response.json()

		if (!response.ok) {
			throw new Error(data.message)
		}

		dispatch({
			type: actions.SIGNUP_SUCCESS,
			payload: data.message
		})
	} catch (error) {
		dispatch({
			type: actions.SIGNUP_FAIL,
			payload: error.toString()
		})
	}
}

export const signupReset = () => async (dispatch) => {
	dispatch({
		type: actions.SIGNUP_RESET
	})
}

export const login = (inputs) => async (dispatch) => {
	try {
		dispatch({
			type: actions.LOGIN_REQUEST
		})

		const response = await fetch(`http://localhost:5000/api/auth/login`, {
			method: 'POST',
			body: JSON.stringify({
				role: inputs.role.value,
				email: inputs.email.value,
				password: inputs.password.value
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		const data = await response.json()

		if (!response.ok) {
			throw new Error(data.message)
		}

		dispatch({
			type: actions.LOGIN_SUCCESS,
			payload: data
		})
	} catch (error) {
		dispatch({
			type: actions.LOGIN_FAIL,
			payload: error.toString()
		})
	}
}

export const loginReset = () => async (dispatch) => {
	dispatch({
		type: actions.LOGIN_RESET
	})
}

export const logout = () => (dispatch) => {
	dispatch({
		type: actions.LOGOUT
	})
}

export const resetPassword = (inputs) => async (dispatch) => {
	try {
		dispatch({
			type: actions.RESET_PASSWORD_REQUEST
		})

		const response = await fetch(`http://localhost:5000/api/auth/reset`, {
			method: 'POST',
			body: JSON.stringify({
				email: inputs.email.value
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		const data = await response.json()

		if (!response.ok) {
			throw new Error(data.message)
		}

		dispatch({
			type: actions.RESET_PASSWORD_SUCCESS,
			payload: data
		})
	} catch (error) {
		dispatch({
			type: actions.RESET_PASSWORD_FAIL,
			payload: error.toString()
		})
	}
}

export const resetPasswordReset = () => async (dispatch) => {
	dispatch({
		type: actions.RESET_PASSWORD_RESET
	})
}

export const confirmResetPassword =
	(inputs, userId, resetToken) => async (dispatch) => {
		try {
			dispatch({
				type: actions.CONFIRM_RESET_PASSWORD_REQUEST
			})

			const response = await fetch(
				`http://localhost:5000/api/auth/new-password`,
				{
					method: 'POST',
					body: JSON.stringify({
						currentPassword: inputs.currentPassword.value,
						newPassword: inputs.newPassword.value,
						confirmPassword: inputs.confirmPassword.value,
						userId,
						resetToken
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message)
			}

			dispatch({
				type: actions.CONFIRM_RESET_PASSWORD_SUCCESS,
				payload: data
			})
		} catch (error) {
			dispatch({
				type: actions.CONFIRM_RESET_PASSWORD_FAIL,
				payload: error.toString()
			})
		}
	}

export const confirmResetPasswordReset = () => async (dispatch) => {
	dispatch({
		type: actions.CONFIRM_RESET_PASSWORD_RESET
	})
}
