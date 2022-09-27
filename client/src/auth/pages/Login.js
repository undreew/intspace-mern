import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
import Select from '../../shared/components/FormElements/Select'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import useForm from '../../shared/hooks/useForm'
import { login } from '../../shared/redux/actions/auth'
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE
} from '../../shared/util/inputValidatiors'

const Login = () => {
	const [formState, handleInput] = useForm({}, false)

	const dispatch = useDispatch()

	const auth = useSelector((state) => state.auth)
	const { loading, error } = auth.login

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(login(formState.inputs))
	}

	return (
		<Fragment>
			{loading && <LoadingSpinner asOverlay />}
			<div className='auth container'>
				<h2>LOGIN</h2>
				<form action='' className='form' onSubmit={handleSubmit}>
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
					</div>

					<div className='form__action'>
						<Button type='submit' disabled={!formState.isValid}>
							Login
						</Button>
					</div>
				</form>
			</div>
		</Fragment>
	)
}

export default Login
