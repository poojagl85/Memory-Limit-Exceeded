import React from "react";
import Header from "../Header";
import './style.css'

export default function Layout(props) {
	return (
		<div >
			<Header></Header>
			<div className="layout" style={{ width: '80vw', margin: 'auto' }}>{props.children}</div>

		</div >
	);
}
