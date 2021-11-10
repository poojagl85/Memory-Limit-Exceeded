import React from "react";
import Header from "../Header";

export default function Layout(props) {
	return (
		<div style={{ overflow: "hidden", maxWidth: "100vw" }}>
			<Header></Header>
			{props.children}
		</div>
	);
}
