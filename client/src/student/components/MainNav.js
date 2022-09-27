import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
import SideDrawer from '../../shared/components/Navigation/SideDrawer'
import BackDrop from '../../shared/components/UIElements/BackDrop'
import Modal from '../../shared/components/UIElements/Modal'
import { logout } from '../../shared/redux/actions/auth'
import Navigation from './Navigation'
import SideNav from './SideNav'

import './MainNav.css'
import useForm from '../../shared/hooks/useForm'
import { VALIDATOR_REQUIRE } from '../../shared/util/inputValidatiors'
import {
	getStudentSpaces,
	postStudentJoinSpace,
	postStudentJoinSpaceReset
} from '../../shared/redux/actions/student'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { getUserProfileReset } from '../../shared/redux/actions/user'

const MainNav = () => {
	const dispatch = useDispatch()

	const [formState, handleInput] = useForm({}, false)

	const auth = useSelector((state) => state.auth)
	const { userId } = auth.login

	const [isOpen, setIsOpen] = useState(false)
	const [isJoin, setIsJoin] = useState(false)

	const handleDrawer = () => {
		setIsOpen((prevValue) => !prevValue)
	}

	const handleJoinClass = () => {
		setIsJoin((prevValue) => !prevValue)
		dispatch(postStudentJoinSpaceReset())
	}

	const handleLogout = () => {
		dispatch(getUserProfileReset())
		dispatch(logout())
	}

	const joinState = useSelector((state) => state.postJoinSpace)
	const { loading, error, success, message } = joinState

	const handleSubmit = (e) => {
		e.preventDefault()
		// JOIN SPACE
		dispatch(postStudentJoinSpace(formState.inputs, userId))
	}

	useEffect(() => {
		if (success) {
			dispatch(postStudentJoinSpaceReset())
			dispatch(getStudentSpaces(userId))
			handleJoinClass()
		}
	}, [dispatch, success])

	return (
		<Fragment>
			{/* JOIN CLASS MODAL */}
			{/* PROPS: header, children, footer, isOpen, onClick */}
			<Modal header='JOIN CLASS' isOpen={isJoin} onClick={handleJoinClass}>
				{loading && <LoadingSpinner asOverlay />}
				<form action='' className='space__form' onSubmit={handleSubmit}>
					{error && <p className='error'>{error}</p>}
					<Input
						label='Space Code'
						id='spaceCode'
						element='input'
						type='text'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Enter a space code.'
						onInput={handleInput}
					/>

					<div className='form__action'>
						<Button type='button' danger onClick={handleJoinClass}>
							Cancel
						</Button>
						<Button type='submit'>Confirm</Button>
					</div>
				</form>
			</Modal>

			{/* SIDE NAV BACKDROP */}
			{/* PROPS: onClick */}
			{isOpen && <BackDrop onToggle={handleDrawer} />}

			{/* SIDEDRAWER */}
			{/* PROPS: onClick onShow sideItems */}
			<SideNav
				onClick={handleDrawer}
				onShow={isOpen}
				sideItems={
					<Fragment>
						<Button type='button' inverse onClick={handleJoinClass}>
							Join Space
						</Button>
						<Link to='/user-profile'>Profile</Link>
						<Link to='/spaces'>Spaces</Link>
						<Link to='/archived-spaces'>Archived Spaces</Link>
						<Button type='button' logout danger onClick={handleLogout}>
							Logout
						</Button>
					</Fragment>
				}
			/>

			{/* NAVBAR */}
			{/* PROPS: onClick navItems */}
			<Navigation
				onClick={handleDrawer}
				navItems={
					<Fragment>
						<Button type='button' inverse onClick={handleJoinClass}>
							Join Space
						</Button>
					</Fragment>
				}
			/>
		</Fragment>
	)
}

export default MainNav
