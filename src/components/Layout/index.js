import React from "react";
import Header from "../Header";

export default function Layout(props) {
	return (
		<div style={{ overflow: "hidden", maxWidth: "70vw", margin: "auto" }}>
			<Header></Header>
			{props.children}
		</div>
	);
}
