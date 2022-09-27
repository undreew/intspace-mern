import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { getInstructorSpaces } from '../../shared/redux/actions/instructor'
import SpaceItem from '../../spaces/components/SpaceItem'

const Spaces = () => {
	const dispatch = useDispatch()

	const auth = useSelector((state) => state.auth)
	const { userId } = auth.login

	const instructorSpaces = useSelector((state) => state.getInstructorSpaces)
	const { loading, error, spaces } = instructorSpaces

	useEffect(() => {
		dispatch(getInstructorSpaces(userId))
	}, [dispatch, userId])

	return (
		<Fragment>
			{loading && <LoadingSpinner asOverlay />}
			{/* ERROR MODAL to follow */}
			{error && <p className='error'>{error}</p>}
			<div className='spaces container__full'>
				<h2>Spaces</h2>

				<div className='space__items'>
					{spaces.length > 0 &&
						spaces.map((item) => {
							return (
								<Link to='/space-dashboard/'>
									<SpaceItem
										key={item.spaceId._id}
										id={item.spaceId._id}
										name={item.spaceId.name}
										instructorName={item.spaceId.instructorName}
										section={item.spaceId.section}
										code={item.spaceId.code}
									/>
								</Link>
							)
						})}
				</div>
			</div>
		</Fragment>
	)
}

export default Spaces
