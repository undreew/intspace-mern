import React from 'react'

import { Link, NavLink } from 'react-router-dom'

import './Button.css'

const Button = (props) => {
	if (props.to) {
		return (
			<Link
				to={props.to}
				exact={props.exact}
				className={`button ${props.inverse && 'button__inverse'} ${
					props.danger && 'button__danger'
				} ${props.small && 'button__small'}`}
			>
				{props.children}
			</Link>
		)
	}

	return (
		<button
			className={`button ${props.cta && 'button__cta'}  ${
				props.inverse && 'button__inverse'
			} ${props.danger && 'button__danger'} ${props.small && 'button__small'}`}
			type={props.type}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	)
}

export default Button
