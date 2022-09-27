import React from 'react'
import ReactDOM from 'react-dom'

import './BackDrop.css'

const BackDrop = (props) => {
	const content = <div className='backdrop' onClick={props.onToggle}></div>

	return ReactDOM.createPortal(content, document.getElementById('backdrop'))
}

export default BackDrop
