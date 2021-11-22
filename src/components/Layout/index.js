import React from "react";
import Header from "../Header";
import Box from '@mui/material/Box';
import './style.css'

export default function Layout(props) {
	return (
		<Box>
			<Header></Header>
			<Box>
				{props.children}
			</Box>
		</Box >
	);
}