import React, { Fragment, useState } from 'react'
import Input from '../components/FormElements/Input'
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../util/inputValidatiors'

import './Profile.css'
import Button from '../components/FormElements/Button'
import Select from '../components/FormElements/Select'
import useForm from '../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import LoadingSpinner from '../components/UIElements/LoadingSpinner'
import {
	getUserProfile,
	getUserProfileReset,
	patchUserProfile,
	patchUserProfilePicture,
	patchUserProfilePictureReset,
	patchUserProfileReset
} from '../redux/actions/user'
import blank from '../../assets/images/blank_profile.png'
import Modal from '../components/UIElements/Modal'
import ImageUpload from '../components/FormElements/ImageUpload'
import useImage from '../hooks/useImage'

const Profile = () => {
	const dispatch = useDispatch()

	const auth = useSelector((state) => state.auth)
	const { userId, token } = auth.login

	const userProfile = useSelector((state) => state.getUserProfile)
	const { loading, error, success, user } = userProfile

	const [formState, handleInput] = useForm({}, false)

	useEffect(() => {
		dispatch(getUserProfile(userId))
	}, [dispatch, getUserProfile, userId])

	const patchUser = useSelector((state) => state.patchUserProfile)
	const {
		loading: patchLoading,
		error: patchError,
		success: patchSuccess,
		message: patchMessage
	} = patchUser

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(patchUserProfile(userId, formState.inputs, token))
	}

	useEffect(() => {
		if (patchSuccess) {
			dispatch(patchUserProfileReset())
			dispatch(getUserProfileReset())
			dispatch(getUserProfile(userId))
		}
	}, [dispatch, patchSuccess, getUserProfile, userId])

	let image
	if (user) {
		let imageUrl = user.imageUrl

		if (imageUrl) {
			image = imageUrl.substring(7, imageUrl.length)
		}
	}

	const [isModalOpen, setIsModalOpen] = useState(false)

	const [imageState, handleImageInput] = useImage({}, false)

	const handleUpdateModal = () => {
		setIsModalOpen((prevValue) => !prevValue)
	}

	const patchProfilePicture = useSelector((state) => state.patchProfilePicture)
	const {
		loading: patchPictureLoading,
		error: patchPictureError,
		success: patchPictureSuccess,
		message: patchPictureMessage
	} = patchProfilePicture

	const handleImageSubmit = (e) => {
		e.preventDefault()
		dispatch(patchUserProfilePicture(imageState.imageInput, userId, token))
	}

	useEffect(() => {
		if (patchPictureSuccess) {
			dispatch(patchUserProfilePictureReset())
			dispatch(getUserProfile(userId))
			handleUpdateModal()
		}
	}, [
		dispatch,
		patchUserProfilePictureReset,
		getUserProfile,
		patchPictureSuccess
	])

	return (
		<Fragment>
			{/* UPDATE PROFILE MODAL */}
			<Modal
				header='Update Profile Image'
				isOpen={isModalOpen}
				onClick={handleUpdateModal}
			>
				<form
					className='upload-image__form'
					encType='multipart/form-data'
					onSubmit={handleImageSubmit}
				>
					{/* IMAGE UPLOAD COMPONENT */}
					<ImageUpload
						label='Profile Image'
						id='image'
						onInput={handleImageInput}
					/>
					<div className='form__action'>
						<Button type='button' danger onClick={handleUpdateModal}>
							Cancel
						</Button>
						<Button type='submit' disabled={!imageState.isValid}>
							Upload Image
						</Button>
					</div>
				</form>
			</Modal>
			{(loading || patchLoading || patchPictureLoading) && (
				<LoadingSpinner asOverlay />
			)}
			{/* ERROR MODAL */}
			{(error || patchError || patchPictureError) && <p>{error}</p>}
			{success && user && (
				<div className='profile container'>
					<form action='' className='form' onSubmit={handleSubmit}>
						<div className='user__info'>
							<div className='user__image'>
								<img
									src={image ? `http://localhost:5000/images/${image}` : blank}
									alt='Profile'
								/>
							</div>

							<div className='user__details'>
								<div className='user__details__text'>
									<h2>
										{user.firstName} {user.middleName} {user.lastName}
									</h2>
									<p>{user.role}</p>
								</div>

								<div className='user__details__action'>
									<Button
										type='button'
										small
										inverse
										onClick={handleUpdateModal}
									>
										Update Profile Image
									</Button>
									<Button to='/reset-password' small inverse>
										Change Password
									</Button>
								</div>
							</div>
						</div>

						<div className='basic__profile'>
							<h4>Basic Profile</h4>
						</div>

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
								initialValue={user.firstName}
								initialValid={true}
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
								initialValue={user.middleName}
								initialValid={true}
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
								initialValue={user.lastName}
								initialValid={true}
							/>
						</div>

						<div className='form__details'>
							<Input
								label='Address'
								id='address'
								element='input'
								type='text'
								placeholder='Enter an address.'
								validators={[VALIDATOR_REQUIRE()]}
								errorText='Please enter a valid address.'
								onInput={handleInput}
								initialValue={user.address}
								initialValid={true}
							/>
						</div>

						<div className='form__further__details'>
							<Select
								label='Gender'
								id='gender'
								element='select'
								numOfOptions={2}
								optionValues={['Male', 'Female']}
								validators={[]}
								onInput={handleInput}
								initialValue={user.gender}
								initialValid={true}
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
								initialValue={user.contactNumber}
								initialValid={true}
							/>
						</div>

						<div className='form__action'>
							<Button type='submit' disabled={!formState.isValid}>
								Update Profile
							</Button>
						</div>
					</form>
				</div>
			)}
		</Fragment>
	)
}

export default Profile
