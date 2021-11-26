import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import Search from '../Search';
import axios from 'axios';
import { api } from '../../urlConfig';
import { userConstants } from "../../constants";
import Swal from "sweetalert2";
import Toast from "../../utils/swal";

export default function Header() {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const location = useLocation().pathname === "/signin" ? `signin` : `signup`;


	const handleSignout = () => {
		axios.post(`${api}/signout`).then((res) => {
			window.localStorage.clear();
			dispatch({
				type: userConstants.SIGNOUT_SUCCESS,

			});

			Toast.fire({
				icon: "success",
				title: res.data.message,
			});

		}).catch((error) => {
			dispatch({
				type: userConstants.SIGNOUT_FAILURE,

			});
			Toast.fire({
				icon: "error",
				title: error.response.data.message,
			});
		})
	}

	const renderLoggedInLinks = () => {
		return (
			<Link
				to='/signin'
				variant="body2"
				style={{ textDecoration: "none", fontWeight: "bold", color: 'white' }}
				onClick={handleSignout}
			>
				SIGNOUT
			</Link>
		);
	};

	const renderNonLoggedInLinks = () => {
		return (
			<Link
				to={location === "signin" ? `/signup` : `/signin`}
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
						<Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Memory Limit Exceeded</Link>

					</Typography>
					{auth.authenticate ? <Search /> : null}
					<Box
						sx={{
							display: { xs: "none", md: "flex" },
						}}
					>
						{auth.authenticate ? (
							<Link to='/postquestion' style={{ textDecoration: 'none' }}><Button
								style={{

									fontWeight: "bold",
									margin: "20px",

									backgroundColor: 'white'
								}}
							>
								Ask a Question
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
