import * as actions from '../constants/student'

export const getStudentSpacesReducer = (
	state = { loading: false, error: null, spaces: [] },
	action
) => {
	switch (action.type) {
		case actions.GET__STUDENT__SPACES__REQUEST:
			return {
				...state,
				loading: true
			}

		case actions.GET__STUDENT__SPACES__SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				spaces: action.payload
			}

		case actions.GET__STUDENT__SPACES__FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			}

		case actions.GET__STUDENT__SPACES__RESET:
			return {
				loading: false,
				error: null,
				spaces: []
			}

		default:
			return state
	}
}

export const postStudentJoinSpaceReducer = (
	state = { loading: false, error: null, success: false, message: null },
	action
) => {
	switch (action.type) {
		case actions.POST__STUDENT__JOIN__REQUEST:
			return {
				...state,
				loading: true
			}

		case actions.POST__STUDENT__JOIN__SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				success: true,
				message: action.payload
			}

		case actions.POST__STUDENT__JOIN__FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			}

		case actions.POST__STUDENT__JOIN__RESET:
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
