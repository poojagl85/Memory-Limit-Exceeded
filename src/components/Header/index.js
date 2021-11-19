import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import Search from '../Search';

export default function Header() {
	const auth = useSelector((state) => state.auth);

	const location = useLocation().pathname === "/signin" ? `signin` : `signup`;

	const renderLoggedInLinks = () => {
		return (
			<Link
				href="#"
				variant="body2"
				style={{ textDecoration: "none", fontWeight: "bold", color: 'white' }}
			>
				SIGNOUT
			</Link>
		);
	};

	const renderNonLoggedInLinks = () => {
		return (
			<Link
				href={location === "signin" ? `/signup` : `/signin`}
				variant="body2"
				style={{ textDecoration: "none", fontWeight: "bold", color: 'white' }}
			>
				{location === "signin" ? "SIGNUP" : "SIGNIN"}
			</Link>
		);
	};


	return (
		<Box sx={{ flexGrow: 1 }} >
			<AppBar
				position="static"
				style={{ marginBottom: '10px', padding: '0 100px' }}

			>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						aria-label="menu"

						sx={{ mr: 2 }}
					></IconButton>

					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}

					>
						<Link href="/" style={{ textDecoration: 'none', color: 'white' }}>Out Of Memory?</Link>

					</Typography>
					{auth.authenticate ? <Search /> : null}
					<Box
						sx={{
							display: { xs: "none", md: "flex" },
						}}
					>
						{auth.authenticate ? (
							<Link href='/postquestion' style={{ textDecoration: 'none' }}><Button
								style={{

									fontWeight: "bold",
									margin: "20px",

									backgroundColor: 'white'
								}}
							>
								Ask a Question ?
							</Button></Link>

						) : null}
					</Box>

					{auth.authenticate
						? renderLoggedInLinks()
						: renderNonLoggedInLinks()}
				</Toolbar>
			</AppBar>

		</Box >
	);
}
