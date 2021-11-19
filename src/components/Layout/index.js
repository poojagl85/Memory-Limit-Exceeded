import React from "react";
import Header from "../Header";

export default function Layout(props) {
	return (
		<div style={{ width: '94vw', overflow: 'hidden', margin: "auto" }}>
			<Header></Header>
			{props.children}
		</div>
	);
}
