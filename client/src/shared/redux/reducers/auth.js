import * as actions from '../constants/auth'

export const authReducer = (
	state = {
		signup: { loading: false, error: null, success: false, message: null },
		login: {
			isLoggedIn: false,
			userId: null,
			token: null,
			isStudent: false,
			loading: false,
			error: null,
			message: null,
			success: false
		}
	},
	action
) => {
	switch (action.type) {
		case actions.SIGNUP_REQUEST:
			return {
				...state,
				signup: {
					loading: true,
					error: null,
					success: false,
					message: null
				}
			}

		case actions.SIGNUP_SUCCESS:
			return {
				...state,
				signup: {
					loading: false,
					error: null,
					success: true,
					message: action.payload
				}
			}

		case actions.SIGNUP_FAIL:
			return {
				...state,
				signup: {
					loading: false,
					error: action.payload,
					success: false,
					message: null
				}
			}

		case actions.SIGNUP_RESET:
			return {
				...state,
				signup: { loading: false, error: null, success: false, message: null }
			}

		case actions.LOGIN_REQUEST:
			return {
				...state,
				login: {
					isLoggedIn: false,
					userId: null,
					token: null,
					isStudent: false,
					loading: true,
					error: null,
					message: null,
					success: false
				}
			}

		case actions.LOGIN_SUCCESS:
			localStorage.setItem(
				'userData',
				JSON.stringify({
					isLoggedIn: !!action.payload.token,
					userId: action.payload.userId,
					isStudent: action.payload.isStudent,
					token: action.payload.token
				})
			)
			return {
				...state,
				login: {
					isLoggedIn: !!action.payload.token,
					userId: action.payload.userId,
					token: action.payload.token,
					isStudent: action.payload.isStudent,
					loading: false,
					error: null,
					message: action.payload.message,
					success: true
				}
			}

		case actions.LOGIN_FAIL:
			return {
				...state,
				login: {
					loading: false,
					error: action.payload
				}
			}

		case actions.LOGIN_RESET:
			return {
				...state,
				login: {
					isLoggedIn: false,
					userId: null,
					token: null,
					isStudent: false,
					loading: false,
					error: null,
					message: null,
					success: false
				}
			}

		case actions.LOGOUT:
			localStorage.removeItem('userData')
			return {
				...state,
				login: {
					isLoggedIn: false,
					userId: null,
					token: null,
					isStudent: false,
					loading: false,
					error: null,
					message: null,
					success: false
				}
			}

		default:
			return state
	}
}

export const resetPasswordReducer = (
	state = { loading: false, error: null, success: false, message: null },
	action
) => {
	switch (action.type) {
		case actions.RESET_PASSWORD_REQUEST:
			return {
				...state,
				loading: true
			}

		case actions.RESET_PASSWORD_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				success: true,
				message: action.payload.message
			}

		case actions.RESET_PASSWORD_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			}

		case actions.RESET_PASSWORD_RESET:
			return {
				loading: false,
				error: null,
				success: false,
				message: null
			}

		case actions.CONFIRM_RESET_PASSWORD_REQUEST:
			return {
				...state,
				loading: true
			}

		case actions.CONFIRM_RESET_PASSWORD_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				success: true,
				message: action.payload.message
			}

		case actions.CONFIRM_RESET_PASSWORD_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			}

		case actions.CONFIRM_RESET_PASSWORD_RESET:
			return {
				loading: false,
				error: null,
				success: false,
				message: null
			}

		default:
			return state
	}
}
