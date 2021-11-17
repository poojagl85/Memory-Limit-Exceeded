import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Button, Search, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function Header() {
	const auth = useSelector((state) => state.auth);

	const location = useLocation().pathname === "/signin" ? `signin` : `signup`;

	const renderLoggedInLinks = () => {
		return (
			<Link
				href="#"
				variant="body2"
				style={{ textDecoration: "none", fontWeight: "bold" }}
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
				style={{ textDecoration: "none", fontWeight: "bold" }}
			>
				{location === "signin" ? "SIGNUP" : "SIGNIN"}
			</Link>
		);
	};


	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="static"
				style={{ background: "#fff", boxShadow: "none" }}
			>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						aria-label="menu"
						style={{ color: "#1976d2" }}
						sx={{ mr: 2 }}
					></IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
						style={{ color: "#1976d2" }}
					>
						Out Of Memory?
					</Typography>
					<TextField

						label="Search input"

					/>
					<Box
						sx={{
							display: { xs: "none", md: "flex" },
						}}
					>
						{auth.authenticate ? (
							<Link href='/postquestion'><Button
								style={{
									background: "#1976d2",
									color: "#fff",
									fontWeight: "bold",
									margin: "20px",
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

		</Box>
	);
}
