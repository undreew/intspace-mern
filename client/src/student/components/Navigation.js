import React from 'react'
import { Link } from 'react-router-dom'

import './Navigation.css'

import logo from '../../assets/images/android-chrome-512x512.png'

const Navigation = (props) => {
	return (
		<nav className='navbar container__full'>
			<div className='navigation__btn' onClick={props.onClick}>
				<span></span>
				<span></span>
				<span></span>
			</div>

			<Link to='/' className='nav-brand'>
				<img src={logo} alt='INTSPACE' />
				INTSPACE
			</Link>

			<div className='nav-items'>{props.navItems}</div>
		</nav>
	)
}

export default Navigation
