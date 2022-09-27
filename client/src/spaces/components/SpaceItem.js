import React from 'react'

import './SpaceItem.css'

const SpaceItem = (props) => {
	return (
		<div className='space__item'>
			<div className='space__item__left'>
				<h2>{props.name}</h2>
				<div className='space__item__details'>
					<p className='section'>{props.section}</p>
					<p className='instructor__name'>{props.instructorName}</p>
					<p>
						{/* TEMPORARY */}
						<strong>{props.code ? props.code : ''}</strong>
					</p>
				</div>
			</div>

			<div className='space__item__right'></div>
		</div>
	)
}

export default SpaceItem
