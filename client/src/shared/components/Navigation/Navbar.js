import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import './Navbar.css'

import logo from '../../../assets/images/android-chrome-512x512.png'

const Navbar = (props) => {
	return (
		<nav className='navbar container'>
			<Link to='/' className='nav-brand'>
				<img src={logo} alt='INTSPACE' />
				INTSPACE
			</Link>

			<div className='nav-items'>{props.navItems}</div>

			<div className='hamburger__btn' onClick={props.onClick}>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</nav>
	)
}

export default Navbar
