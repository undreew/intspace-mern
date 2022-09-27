import React from 'react'
import ReactDOM from 'react-dom'

import './SideDrawer.css'

const SideDrawer = (props) => {
	const content = (
		<div
			className={`side-drawer ${props.onShow ? 'show' : ''}`}
			onClick={props.onClick}>
			<div className='side-drawer__nav-items'>{props.sideItems}</div>
		</div>
	)

	return ReactDOM.createPortal(content, document.getElementById('side-drawer'))
}

export default SideDrawer
