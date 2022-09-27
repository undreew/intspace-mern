import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import BackDrop from './BackDrop'

import './Modal.css'

const ModalOverlay = (props) => {
	const content = (
		<div className={`modal ${props.isOpen === true ? 'show' : ''}`}>
			<header className={`modal__header`}>
				<h2>{props.header}</h2>
			</header>
			<div className={`modal__content`}>{props.children}</div>
			<footer className={`modal__footer`}>{props.footer}</footer>
		</div>
	)

	return ReactDOM.createPortal(content, document.getElementById('modal'))
}

const Modal = (props) => {
	return (
		<Fragment>
			{/* BACKDROP */}
			{props.isOpen && <BackDrop onToggle={props.onClick} />}
			<ModalOverlay {...props} />
		</Fragment>
	)
}

export default Modal
