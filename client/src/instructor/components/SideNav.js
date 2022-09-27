import React from 'react'
import ReactDOM from 'react-dom'

import './SideNav.css'

const SideNav = (props) => {
	const content = (
		<div className={`side-nav ${props.onShow ? 'show' : ''}`}>
			<div className='side-drawer__nav-items' onClick={props.onClick}>
				{props.sideItems}
			</div>
		</div>
	)

	return ReactDOM.createPortal(content, document.getElementById('side-nav'))
}

export default SideNav
