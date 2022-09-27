import React, { Fragment } from 'react'

import newPassword from '../../assets/images/new-password.png'

import './ConfirmResetPassword.css'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import {
	VALIDATOR_EMAIL,
	VALIDATOR_REQUIRE
} from '../../shared/util/inputValidatiors'
import useForm from '../../shared/hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { confirmResetPassword } from '../../shared/redux/actions/auth'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

const ConfirmResetPassword = () => {
	const dispatch = useDispatch()

	const resetToken = useParams().id

	const auth = useSelector((state) => state.auth)
	const { userId } = auth.login

	const [formState, handleInput] = useForm({}, false)

	const resetPasswordState = useSelector((state) => state.resetPassword)
	const { loading, error, success, message } = resetPasswordState

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(confirmResetPassword(formState.inputs, userId, resetToken))
	}

	return (
		<Fragment>
			{loading && <LoadingSpinner asOverlay />}
			<div className='confirm__reset__password container__full'>
				<div className='confirm__reset__password__img'>
					<img src={newPassword} alt='New Password' />
				</div>

				<form
					action=''
					className='form confirm__password__form'
					onSubmit={handleSubmit}
				>
					<h2>Reset Password</h2>

					{error && <p className='error'>{error}</p>}
					{message && success && <p className='success'>{message}</p>}

					<Input
						label='Current Password'
						placeholder='Enter your current password'
						id='currentPassword'
						element='input'
						type='password'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter your current password'
						onInput={handleInput}
					/>

					<div className='form__details'>
						<Input
							label='New Password'
							placeholder='New password'
							id='newPassword'
							element='input'
							type='password'
							validators={[VALIDATOR_REQUIRE()]}
							errorText='Please enter a new password'
							onInput={handleInput}
						/>

						<Input
							label='Confirm New Password'
							placeholder='Confirm new password'
							id='confirmPassword'
							element='input'
							type='password'
							validators={[VALIDATOR_REQUIRE()]}
							errorText='Please confirm your new password'
							onInput={handleInput}
						/>
					</div>

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

export default ConfirmResetPassword
