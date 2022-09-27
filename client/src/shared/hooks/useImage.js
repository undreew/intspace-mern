import React, { useCallback } from 'react'
import { useReducer } from 'react'

const imageReducer = (state, action) => {
	switch (action.type) {
		case 'ON_CHANGE':
			return {
				...state,
				imageInput: {
					value: action.value,
					isValid: action.isValid
				},
				isValid: action.isValid
			}

		default:
			return state
	}
}

const useImage = (initialImageInput, initialImageFormValidity) => {
	const [imageState, dispatch] = useReducer(imageReducer, {
		imageInput: initialImageInput,
		isValid: initialImageFormValidity
	})

	const handleImageInput = useCallback((imageInputId, value, isValid) => {
		dispatch({
			type: 'ON_CHANGE',
			value,
			isValid,
			imageInputId
		})
	}, [])

	return [imageState, handleImageInput]
}

export default useImage
