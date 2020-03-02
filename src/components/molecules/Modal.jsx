import React from 'react';
import { Modal } from 'react-bootstrap';
const ModalForm = (props) => {
	return (
		<React.Fragment>
			<Modal show={props.show} onHide={props.handleClose} animation={true}>
				<Modal.Header closeButton>
					<Modal.Title>{props.Heading}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{props.TextModal}</Modal.Body>
				<Modal.Footer>
					<button className="btn btn-secondary" onClick={props.handleClose}>
						Cancel
					</button>
					<button className="btn btn-danger" onClick={props.onClick}>
						{props.TextButton}
					</button>
				</Modal.Footer>
			</Modal>
		</React.Fragment>
	);
};

export default ModalForm;
