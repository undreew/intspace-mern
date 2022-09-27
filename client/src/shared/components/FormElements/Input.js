import React, { Fragment, useEffect, useReducer } from 'react'

import './Input.css'

import { validate } from '../../util/inputValidatiors'

const inputReducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE':
			return {
				...state,
				value: action.value,
				isValid: validate(action.value, action.validators)
			}

		case 'BLUR':
			return {
				...state,
				isTouched: true
			}

		default:
			return state
	}
}

const Input = (props) => {
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: props.initialValue || '',
		isValid: props.initialValid || false,
		isTouched: false
	})

	const handleOnChange = (e) => {
		dispatch({
			type: 'CHANGE',
			value: e.target.value,
			validators: props.validators
		})
	}

	const handleBlur = () => {
		dispatch({
			type: 'BLUR'
		})
	}

	const { id, onInput } = props
	const { value, isValid } = inputState

	useEffect(() => {
		props.onInput(id, value, isValid)
	}, [onInput, id, value, isValid])

	let element
	if (props.element === 'input') {
		element = (
			<input
				value={inputState.value}
				type={props.type}
				id={props.id}
				placeholder={props.placeholder}
				onChange={handleOnChange}
				onBlur={handleBlur}
			/>
		)
	} else if (props.element === 'textarea') {
		element = (
			<textarea
				value={inputState.value}
				id={props.id}
				placeholder={props.placeholder}
				rows={props.rows || 3}
				onChange={handleOnChange}
				onBlurCapture={handleBlur}
			></textarea>
		)
	}

	return (
		<Fragment>
			<div
				className={`form-control ${
					!inputState.isValid && inputState.isTouched && 'form-control__invalid'
				}`}
			>
				<label htmlFor={props.id}>{props.label}</label>
				<div className='form-control__input'>
					{element}
					{!inputState.isValid && inputState.isTouched && (
						<p>{props.errorText}</p>
					)}
				</div>
			</div>
		</Fragment>
	)
}

export default Input
