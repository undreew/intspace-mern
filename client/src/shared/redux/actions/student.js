import * as actions from '../constants/student'

export const getStudentSpaces = (id) => async (dispatch) => {
	try {
		dispatch({
			type: actions.GET__STUDENT__SPACES__REQUEST
		})

		const response = await fetch(`http://localhost:5000/api/students/${id}`)

		const data = await response.json()

		if (!response.ok) {
			throw new Error(data.message)
		}

		dispatch({
			type: actions.GET__STUDENT__SPACES__SUCCESS,
			payload: data.spaces
		})
	} catch (error) {
		dispatch({
			type: actions.GET__STUDENT__SPACES__FAIL,
			payload: error.toString()
		})
	}
}

export const getStudentSpacesReset = () => async (dispatch) => {
	dispatch({
		type: actions.GET__STUDENT__SPACES__RESET
	})
}

export const postStudentJoinSpace = (inputs, studentId) => async (dispatch) => {
	try {
		dispatch({
			type: actions.POST__STUDENT__JOIN__REQUEST
		})

		const response = await fetch(
			`http://localhost:5000/api/students/join-space`,
			{
				method: 'POST',
				body: JSON.stringify({
					spaceCode: inputs.spaceCode.value,
					studentId
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
			type: actions.POST__STUDENT__JOIN__SUCCESS,
			payload: data.message
		})
	} catch (error) {
		dispatch({
			type: actions.POST__STUDENT__JOIN__FAIL,
			payload: error.toString()
		})
	}
}

export const postStudentJoinSpaceReset = () => async (dispatch) => {
	dispatch({
		type: actions.POST__STUDENT__JOIN__RESET
	})
}
