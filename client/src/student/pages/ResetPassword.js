import React, { Fragment } from 'react'

import resetPasswordImage from '../../assets/images/reset-password.png'

import './ResetPassword.css'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import {
	VALIDATOR_EMAIL,
	VALIDATOR_REQUIRE
} from '../../shared/util/inputValidatiors'
import useForm from '../../shared/hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { resetPassword } from '../../shared/redux/actions/auth'

const ResetPassword = () => {
	const dispatch = useDispatch()

	const [formState, handleInput] = useForm({}, false)

	const resetPasswordState = useSelector((state) => state.resetPassword)
	const { loading, error, success, message } = resetPasswordState

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(resetPassword(formState.inputs))
	}

	return (
		<Fragment>
			{loading && <LoadingSpinner asOverlay />}
			<div className='reset__password container__full'>
				<div className='reset__password__img'>
					<img src={resetPasswordImage} alt='Reset Password' />
				</div>
				<form
					action=''
					className='form reset__password__form'
					onSubmit={handleSubmit}
				>
					<h2>Reset Password</h2>

					{error && <p>{error}</p>}
					{message && success && <p className='success'>{message}</p>}

					<Input
						label='Email'
						placeholder='Enter your email address'
						id='email'
						element='input'
						type='text'
						validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
						errorText='Please enter your email address'
						onInput={handleInput}
					/>

					<div className='form__action'>
						<Button type='submit' disabled={!formState.isValid}>
							Confirm Reset
						</Button>
					</div>
				</form>
			</div>
		</Fragment>
	)
}

export default ResetPassword
