import * as actions from '../constants/instructor'

export const getInstructorSpacesReducer = (
	state = { loading: false, error: null, spaces: [] },
	action
) => {
	switch (action.type) {
		case actions.GET__INSTRUCTOR__SPACES__REQUEST:
			return {
				...state,
				loading: true
			}

		case actions.GET__INSTRUCTOR__SPACES__SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				spaces: action.payload
			}

		case actions.GET__INSTRUCTOR__SPACES__FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			}

		case actions.GET__INSTRUCTOR__SPACES__RESET:
			return {
				loading: false,
				error: null,
				spaces: []
			}

		default:
			return state
	}
}

export const postInstructorCreateSpaceReducer = (
	state = { loading: false, error: null, success: false, message: null },
	action
) => {
	switch (action.type) {
		case actions.POST__INSTRUCTOR__CREATE__REQUEST:
			return {
				...state,
				loading: true
			}

		case actions.POST__INSTRUCTOR__CREATE__SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				success: true,
				message: action.payload
			}

		case actions.POST__INSTRUCTOR__CREATE__FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			}

		case actions.POST__INSTRUCTOR__CREATE__RESET:
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
