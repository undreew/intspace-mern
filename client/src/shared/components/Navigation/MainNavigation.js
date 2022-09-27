import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { logout } from '../../redux/actions/auth'
import Button from '../FormElements/Button'
import BackDrop from '../UIElements/BackDrop'

import './MainNavigation.css'

import Navbar from './Navbar'
import SideDrawer from './SideDrawer'

const MainNavigation = () => {
	const dispatch = useDispatch()
	const auth = useSelector((state) => state.auth)
	const { isLoggedIn } = auth.login

	const [isOpen, setIsOpen] = useState(false)

	const handleDrawer = () => {
		setIsOpen((prevValue) => !prevValue)
	}

	const handleLogout = () => {
		dispatch(logout())
	}

	return (
		<Fragment>
			{/* BACKDROP */}
			{/* PROPS: onClick */}
			{isOpen && <BackDrop onClick={handleDrawer} />}
			{/* SIDEDRAWER */}
			{/* PROPS: onClick onShow sideItems */}
			<SideDrawer
				onClick={handleDrawer}
				onShow={isOpen}
				sideItems={
					<Fragment>
						<Link to='/'>INTSPACE</Link>
						{!isLoggedIn && (
							<Fragment>
								<NavLink to='/login'>Login</NavLink>
								<NavLink to='/signup'>Create an Account</NavLink>
							</Fragment>
						)}
						{isLoggedIn && (
							<Button type='button' logout onClick={handleLogout}>
								Logout
							</Button>
						)}
					</Fragment>
				}
			/>
			{/* NAVBAR */}
			{/* PROPS: onClick navItems */}
			<Navbar
				onClick={handleDrawer}
				navItems={
					<Fragment>
						{!isLoggedIn && (
							<Fragment>
								<NavLink to='/login'>Login</NavLink>
								<NavLink to='/signup'>Create an Account</NavLink>
							</Fragment>
						)}
						{isLoggedIn && (
							<Button type='button' logout onClick={handleLogout}>
								Logout
							</Button>
						)}
					</Fragment>
				}
			/>
		</Fragment>
	)
}

export default MainNavigation
