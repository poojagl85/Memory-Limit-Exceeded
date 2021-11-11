import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";

function AppModal(props) {
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
			</Modal.Header>
			<Modal.Body>{props.children}</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={props.onHide}
					style={{ background: "white", color: "#1976d2" }}
				>
					Close
				</Button>
				<Button onClick={props.onSubmit}>Submit</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default AppModal;
