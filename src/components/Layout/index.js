import React from "react";
import Header from "../Header";
import Box from '@mui/material/Box';
import './style.css'

export default function Layout(props) {
	return (
		<Box style={{ backgroundColor: '#f3f3f360', minHeight: '100vh' }}>
			<Header></Header>
			<Box>
				{props.children}
			</Box>
		</Box >
	);
}