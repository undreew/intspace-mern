import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
import BackDrop from '../../shared/components/UIElements/BackDrop'
import Modal from '../../shared/components/UIElements/Modal'
import { logout } from '../../shared/redux/actions/auth'
import Navigation from './Navigation'
import SideNav from './SideNav'

import './MainNav.css'
import useForm from '../../shared/hooks/useForm'
import { VALIDATOR_REQUIRE } from '../../shared/util/inputValidatiors'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import {
	getInstructorSpaces,
	postInstructorCreateSpace,
	postInstructorCreateSpaceReset
} from '../../shared/redux/actions/instructor'
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
		dispatch(postInstructorCreateSpaceReset())
	}

	const handleLogout = () => {
		dispatch(getUserProfileReset())
		dispatch(logout())
	}

	const createState = useSelector((state) => state.postInstructorCreate)
	const { loading, error, success, message } = createState

	const handleSubmit = (e) => {
		e.preventDefault()
		// CREATE SPACE
		dispatch(postInstructorCreateSpace(formState.inputs, userId))
	}

	useEffect(() => {
		if (success) {
			dispatch(postInstructorCreateSpaceReset())
			dispatch(getInstructorSpaces(userId))
			handleJoinClass()
		}
	}, [dispatch, success])

	return (
		<Fragment>
			{/* JOIN CLASS MODAL */}
			{/* PROPS: header, children, footer, isOpen, onClick */}
			<Modal header='CREATE CLASS' isOpen={isJoin} onClick={handleJoinClass}>
				{loading && <LoadingSpinner asOverlay />}
				<form action='' className='space__form' onSubmit={handleSubmit}>
					{error && <p className='error'>{error}</p>}
					<Input
						label='Name'
						id='name'
						element='input'
						type='text'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Enter a space name.'
						onInput={handleInput}
					/>

					<Input
						label='Section'
						id='section'
						element='input'
						type='text'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Enter a space section.'
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
							Create Space
						</Button>
					</Fragment>
				}
			/>
		</Fragment>
	)
}

export default MainNav
