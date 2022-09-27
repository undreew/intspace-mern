import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
} from 'react-router-dom'
import Login from './auth/pages/Login'
import Signup from './auth/pages/Signup'
import Button from './shared/components/FormElements/Button'

import MainNavigation from './shared/components/Navigation/MainNavigation'
import Landing from './shared/pages/Landing'
import { logout } from './shared/redux/actions/auth'
import StudentNav from './student/components/MainNav'
import InstructorNav from './instructor/components/MainNav'
import StudentSpaces from './student/pages/Spaces'
import InstructorSpaces from './instructor/pages/Spaces'
import Profile from './shared/pages/Profile'
import ResetPassword from './student/pages/ResetPassword'
import ConfirmResetPassword from './student/pages/ConfirmResetPassword'
import SpaceDashboard from './shared/pages/SpaceDashboard'

const App = () => {
	const auth = useSelector((state) => state.auth)
	const { isLoggedIn, isStudent } = auth.login

	let routes
	if (isLoggedIn && isStudent) {
		routes = (
			<Fragment>
				<Route path='/' element={<StudentSpaces />} />
				<Route path='/space-dashboard' element={<SpaceDashboard />} />
				<Route path='/user-profile' element={<Profile />} />
				<Route path='/reset-password' element={<ResetPassword />} />
				<Route path='/reset/:id' element={<ConfirmResetPassword />} />
				<Route path='*' element={<Navigate to='/' replace />} />
			</Fragment>
		)
	} else if (isLoggedIn && !isStudent) {
		routes = (
			<Fragment>
				<Route path='/' element={<InstructorSpaces />} />
				<Route path='/space-dashboard' element={<SpaceDashboard />} />
				<Route path='/user-profile' element={<Profile />} />
				<Route path='/reset-password' element={<ResetPassword />} />
				<Route path='/reset/:id' element={<ConfirmResetPassword />} />
				<Route path='*' element={<Navigate to='/' replace />} />
			</Fragment>
		)
	} else if (!isLoggedIn) {
		routes = (
			<Fragment>
				<Route path='/' element={<Landing />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/login' element={<Login />} />
				<Route path='*' element={<Navigate to='/' replace />} />
			</Fragment>
		)
	}

	let nav
	if (isLoggedIn && isStudent) {
		nav = <StudentNav />
	} else if (isLoggedIn && !isStudent) {
		nav = <InstructorNav />
	} else if (!isLoggedIn) {
		nav = <MainNavigation />
	}

	return (
		<Fragment>
			<Router>
				{nav}
				<Routes>{routes}</Routes>
			</Router>
		</Fragment>
	)
}

export default App
