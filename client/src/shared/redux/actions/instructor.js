import * as actions from '../constants/instructor'

export const getInstructorSpaces = (id) => async (dispatch) => {
	try {
		dispatch({
			type: actions.GET__INSTRUCTOR__SPACES__REQUEST
		})

		const response = await fetch(`http://localhost:5000/api/instructors/${id}`)

		const data = await response.json()

		if (!response.ok) {
			throw new Error(data.message)
		}

		dispatch({
			type: actions.GET__INSTRUCTOR__SPACES__SUCCESS,
			payload: data.spaces
		})
	} catch (error) {
		dispatch({
			type: actions.GET__INSTRUCTOR__SPACES__FAIL,
			payload: error.toString()
		})
	}
}

export const getInstructorSpacesReset = () => async (dispatch) => {
	dispatch({
		type: actions.GET__INSTRUCTOR__SPACES__RESET
	})
}

export const postInstructorCreateSpace =
	(inputs, instructorId) => async (dispatch) => {
		try {
			dispatch({
				type: actions.POST__INSTRUCTOR__CREATE__REQUEST
			})

			const response = await fetch(`http://localhost:5000/api/instructors/`, {
				method: 'POST',
				body: JSON.stringify({
					instructorId,
					name: inputs.name.value,
					section: inputs.section.value
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
				type: actions.POST__INSTRUCTOR__CREATE__SUCCESS,
				payload: data.message
			})
		} catch (error) {
			dispatch({
				type: actions.POST__INSTRUCTOR__CREATE__FAIL,
				payload: error.toString()
			})
		}
	}

export const postInstructorCreateSpaceReset = () => async (dispatch) => {
	dispatch({
		type: actions.POST__INSTRUCTOR__CREATE__RESET
	})
}
