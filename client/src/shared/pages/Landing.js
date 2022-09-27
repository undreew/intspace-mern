import React, { Fragment, useState } from 'react'
import Button from '../components/FormElements/Button'

import './Landing.css'

import headerImage from '../../assets/images/undraw_engineering_team_a7n2.svg'
import Modal from '../components/UIElements/Modal'

const Landing = () => {
	const [isSignup, setIsSignup] = useState(false)

	const handleSignup = () => {
		setIsSignup((prevValue) => !prevValue)
	}

	return (
		<Fragment>
			<div className='hero__section container'>
				<div className='hero__section__info'>
					<h2>
						An <span>Intelligent</span> Workspace.
					</h2>
					<Button type='button' inverse to='/signup'>
						Get Started
					</Button>
				</div>
				<div className='hero__section__img'>
					<img src={headerImage} alt='' />
				</div>
			</div>
		</Fragment>
	)
}

export default Landing
