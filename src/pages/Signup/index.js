import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Redirect, useHistory } from "react-router";
import Swal from "sweetalert2";
import axios from "../../services/axios";
import { userConstants } from "../../constants";

const theme = createTheme();

export default function Signup() {
	const [fullName, setFullname] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [transition, setTransition] = useState(false);
	const auth = useSelector((state) => state.auth);
	const category = useSelector((state) => {
		return state.category;
	});

	const signupState = useSelector((state) => {
		return state.signup;
	});
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		setTimeout(() => {
			setTransition(true);
		}, 200);
	}, []);

	if (auth.authenticate) {
		return <Redirect to={`/`} />;
	}

	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 10000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener("mouseenter", Swal.stopTimer);
			toast.addEventListener("mouseleave", Swal.resumeTimer);
		},
	});

	const transitionStyle = {
		transform: "translateX(0)",
		opacity: 1,
		transition: "all 1s ease",
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		margin: "auto",
		alignSelf: "center",
		zIndex: 2,
	};

	const renderCategories = () => {
		return (
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexWrap: "wrap",
				}}
			>
				{category.categories.length > 0
					? category.categories.map((cat) => (
							<FormGroup>
								<FormControlLabel
									control={<Checkbox />}
									label={cat.name}
									value={cat._id}
									key={cat._id}
								></FormControlLabel>
							</FormGroup>
					  ))
					: null}
			</Box>
		);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const categoryId = [];
		document
			.querySelectorAll("input[type=checkbox]:checked")
			.forEach((ele) => categoryId.push(ele.getAttribute("value")));

		const user = {
			fullName,
			email,
			password,
			username,
			categoryId,
		};

		axios
			.post("/signup", user)
			.then((res) => {
				const { message } = res.data;

				dispatch({
					type: userConstants.SIGNUP_SUCCESS,
					payload: {
						message: message,
					},
				});

				history.push("/signin");
				Toast.fire({
					icon: "success",
					title: "Registered Successful",
				});
			})
			.catch((error) => {
				dispatch({
					type: userConstants.SIGNUP_FAILURE,
					payload: {
						error: error.response.data.message,
					},
				});

				Toast.fire({
					icon: "error",
					title: "Unable to register",
				});
			});
	};

	return (
		<Layout>
			<ThemeProvider theme={theme}>
				<div
					style={{
						position: "relative",
						minHeight: "80vh",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<Container
						component="main"
						maxWidth="xs"
						id="signup-container"
						style={
							!transition
								? {
										transform: "translateX(-300px)",
										opacity: "0",
										transition: "all 1s ease",
								  }
								: { ...transitionStyle, transition: "none" }
						}
					>
						<CssBaseline />
						<Box
							sx={{
								marginTop: 8,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Typography component="h1" variant="h5">
								Sign up
							</Typography>
							<Box
								component="form"
								noValidate
								// onSubmit={handleSubmit}}
								sx={{ mt: 3 }}
							>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={6}>
										<TextField
											name="fullname"
											required
											fullWidth
											value={fullName}
											id="fullName"
											label="Full Name"
											autoFocus
											onChange={(e) =>
												setFullname(e.target.value)
											}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											required
											fullWidth
											value={username}
											id="username"
											label="Username"
											name="username"
											onChange={(e) =>
												setUsername(e.target.value)
											}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											required
											fullWidth
											value={email}
											id="email"
											label="Email Address"
											name="email"
											autoComplete="email"
											onChange={(e) =>
												setEmail(e.target.value)
											}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											required
											fullWidth
											name="password"
											value={password}
											label="Password"
											type="password"
											id="password"
											onChange={(e) =>
												setPassword(e.target.value)
											}
											autoComplete="new-password"
										/>
									</Grid>
								</Grid>

								<Button
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
									onClick={() => setTransition(false)}
								>
									Next
								</Button>
								<Grid container justifyContent="flex-end">
									<Grid item>
										<Link href="/signin" variant="body2">
											Already have an account? Sign in
										</Link>
									</Grid>
								</Grid>
							</Box>
						</Box>
					</Container>
					<Container
						id="category-container"
						style={
							transition
								? {
										transform: "translateX(300px)",
										opacity: "0",
										transition: "none",
								  }
								: {
										...transitionStyle,
										display: "flex",
										justifyContent: "center",
										flexDirection: "column",
										alignItems: "center",
								  }
						}
					>
						<Grid
							container
							justifyContent="center"
							margin="15px auto"
						>
							<Grid item>
								Please choose atleast three categories
							</Grid>
						</Grid>
						{renderCategories()}
						<Button
							type="submit"
							variant="contained"
							sx={{ mt: 3, mb: 2, padding: "0.5rem 3rem" }}
							onClick={handleSubmit}
						>
							Submit
						</Button>
					</Container>
				</div>
			</ThemeProvider>
		</Layout>
	);
}
