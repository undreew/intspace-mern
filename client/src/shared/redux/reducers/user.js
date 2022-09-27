import * as actions from '../constants/user'

export const getUserProfileReducer = (
	state = {
		loading: false,
		error: null,
		success: false,
		message: null,
		user: {}
	},
	action
) => {
	switch (action.type) {
		case actions.GET__USER__PROFILE__REQUEST:
			return {
				...state,
				loading: true
			}

		case actions.GET__USER__PROFILE__SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				success: true,
				message: action.payload.message,
				user: action.payload.user
			}

		case actions.GET__USER__PROFILE__FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
				success: false
			}

		case actions.GET__USER__PROFILE__RESET: {
			return {
				loading: false,
				error: null,
				success: false,
				message: null,
				user: {}
			}
		}

		default:
			return state
	}
}

export const patchUserProfileReducer = (
	state = { loading: false, error: null, success: false, message: null },
	action
) => {
	switch (action.type) {
		case actions.PATCH__USER__PROFILE__REQUEST:
			return {
				...state,
				loading: true
			}

		case actions.PATCH__USER__PROFILE__SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				success: true,
				message: action.payload.message
			}

		case actions.PATCH__USER__PROFILE__FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
				success: false
			}

		case actions.PATCH__USER__PROFILE__RESET:
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

export const patchUserProfilePictureReducer = (
	state = {
		loading: false,
		error: null,
		success: false,
		message: null
	},
	action
) => {
	switch (action.type) {
		case actions.PATCH__USER__PROFILE__PICTURE__REQUEST:
			return {
				...state,
				loading: true
			}

		case actions.PATCH__USER__PROFILE__PICTURE__SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				success: true,
				message: action.payload
			}

		case actions.PATCH__USER__PROFILE__PICTURE__FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
				success: false
			}

		case actions.PATCH__USER__PROFILE__PICTURE__RESET:
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
