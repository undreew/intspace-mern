import React, { Fragment, useEffect, useReducer } from 'react'

import './Select.css'

const selectReducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE':
			return {
				value: action.payload,
				isValid: true
			}

		default:
			return state
	}
}

const Select = (props) => {
	const [selectState, dispatch] = useReducer(selectReducer, {
		value: props.initialValue || props.optionValues[0],
		isValid: true
	})

	const { id, onInput } = props
	const { value, isValid } = selectState

	useEffect(() => {
		props.onInput(id, value, isValid)
	}, [onInput, id, value, isValid])

	const handleChange = (e) => {
		dispatch({ type: 'CHANGE', payload: e.target.value })
	}

	return (
		<Fragment>
			<div
				className={`form-control ${
					!selectState.isValid &&
					selectState.isTouched &&
					'form-control__invalid'
				}`}
			>
				<label htmlFor={props.id}>{props.label}</label>
				<div className='form-control__input'>
					<select
						name=''
						id={props.id}
						onChange={handleChange}
						value={selectState.value}
					>
						{[...Array(props.optionValues.length).keys()].map((item) => {
							return (
								<option key={item + 1} value={props.optionValues[item]}>
									{props.optionValues[item]}
								</option>
							)
						})}
					</select>
				</div>
			</div>
		</Fragment>
	)
}

export default Select
