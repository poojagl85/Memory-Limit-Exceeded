import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import { useLocation } from "react-router";

export default function Header(props) {
	const location = useLocation().pathname === "/signin" ? `signin` : `signup`;
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

					<Link
						href={location === "signin" ? `/signup` : `/signin`}
						variant="body2"
						style={{ textDecoration: "none", fontWeight: "bold" }}
					>
						{location === "signin" ? "SIGNUP" : "SIGNIN"}
					</Link>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
