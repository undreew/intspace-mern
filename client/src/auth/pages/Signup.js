import React, { Fragment, useEffect, useState } from 'react'
import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
import Select from '../../shared/components/FormElements/Select'
import useForm from '../../shared/hooks/useForm'
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE
} from '../../shared/util/inputValidatiors'
import { useDispatch, useSelector } from 'react-redux'

import './Auth.css'
import { signup, signupReset } from '../../shared/redux/actions/auth'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

const Signup = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const auth = useSelector((state) => state.auth)
	const { loading, error, success, message } = auth.signup

	const [formState, handleInput] = useForm({}, false)

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(signup(formState.inputs))
	}

	useEffect(() => {
		if (success) {
			setTimeout(() => {
				dispatch(signupReset())
				navigate('/login')
			}, 3000)
		}
	}, [dispatch, success])

	const [sec, setSec] = useState(3)

	useEffect(() => {
		if (success) {
			let seconds = 3
			let timer = setInterval(() => {
				seconds--
				setSec(seconds)
				if (seconds === 0) {
					clearInterval(timer)
				}
			}, 1000)
		}
	}, [success])

	return (
		<Fragment>
			{loading && <LoadingSpinner asOverlay />}
			<div className='auth container'>
				<h2>SIGNUP</h2>
				<form action='' className='form' onSubmit={handleSubmit}>
					{message && (
						<p className='success'>
							{message} Redirecting in {sec} seconds.
						</p>
					)}
					{error && <p className='error'>{error}</p>}
					<Select
						label='Role'
						id='role'
						element='select'
						numOfOptions={2}
						optionValues={['Student', 'Instructor']}
						validators={[]}
						onInput={handleInput}
					/>

					<div className='form__names'>
						<Input
							label='First Name'
							id='firstName'
							element='input'
							type='text'
							placeholder='Enter a first name.'
							validators={[VALIDATOR_REQUIRE()]}
							errorText='Please enter a valid first name.'
							onInput={handleInput}
						/>

						<Input
							label='Middle Name'
							id='middleName'
							element='input'
							type='text'
							placeholder='Enter a middle name.'
							validators={[VALIDATOR_REQUIRE()]}
							errorText='Please enter a valid middle name.'
							onInput={handleInput}
						/>

						<Input
							label='Last Name'
							id='lastName'
							element='input'
							type='text'
							placeholder='Enter a last name.'
							validators={[VALIDATOR_REQUIRE()]}
							errorText='Please enter a valid last name.'
							onInput={handleInput}
						/>
					</div>

					<div className='form__details'>
						<Select
							label='Gender'
							id='gender'
							element='select'
							numOfOptions={2}
							optionValues={['Male', 'Female']}
							validators={[]}
							onInput={handleInput}
						/>

						<Input
							label='Birthday'
							id='birthday'
							element='input'
							type='date'
							validators={[]}
							errorText='Please enter a valid birthdate.'
							onInput={handleInput}
						/>

						<Input
							label='Contact Number'
							id='contactNumber'
							element='input'
							type='text'
							placeholder='Enter a contact number.'
							validators={[VALIDATOR_REQUIRE()]}
							errorText='Please enter a valid contact number.'
							onInput={handleInput}
						/>
					</div>

					<Input
						label='Address'
						id='address'
						element='input'
						type='text'
						placeholder='Enter an address.'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid address.'
						onInput={handleInput}
					/>

					<div className='form__further__details'>
						<Input
							label='Email'
							id='email'
							element='input'
							type='text'
							placeholder='Enter an email.'
							validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
							errorText='Please enter a valid email.'
							onInput={handleInput}
						/>

						<Input
							label='Password'
							id='password'
							element='input'
							type='password'
							placeholder='Enter a password.'
							validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
							errorText='Please enter a valid password (atleast 6 characters).'
							onInput={handleInput}
						/>

						<Input
							label='Confirm Password'
							id='confirmPassword'
							element='input'
							type='password'
							placeholder='Confirm your password.'
							validators={[VALIDATOR_REQUIRE()]}
							errorText='Please match the password.'
							onInput={handleInput}
						/>
					</div>

					<div className='form__action'>
						<Button type='submit' disabled={!formState.isValid}>
							Sign Up
						</Button>
					</div>
				</form>
			</div>
		</Fragment>
	)
}

export default Signup
