import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import axios from "../../services/axios";
import { userConstants } from "../../constants";

const theme = createTheme();

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const handleSubmit = (event) => {
		const user = {
			email,
			password,
		};

		axios
			.post("/signin", user)
			.then((res) => {
				const { user, token } = res.data;

				window.sessionStorage.setItem(
					"token",
					JSON.stringify({
						token: token,
						exp: Intl.DateTimeFormat("en-US", {
							dateStyle: "long",
						}).format(
							new Date().setDate(new Date().getDate() + 10)
						),
					})
				);
				window.sessionStorage.setItem("user", user);
				dispatch({
					type: userConstants.SIGNIN_SUCCESS,
					payload: {
						user: user,
						token: token,
					},
				});
			})
			.catch((error) => {
				dispatch({
					type: userConstants.SIGNIN_FAILURE,
					payload: {
						error: error.response.data,
					},
				});
			});
	};

	return (
		<Layout>
			<ThemeProvider theme={theme}>
				<Container component="main" maxWidth="xs">
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
							Sign in
						</Typography>
						<Box
							component="form"
							onSubmit={handleSubmit}
							noValidate
							sx={{ mt: 1 }}
						>
							<TextField
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								autoComplete="email"
								autoFocus
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type="password"
								id="password"
								autoComplete="current-password"
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Sign In
							</Button>
							<Grid container>
								{/* <Grid item xs>
									<Link href="#" variant="body2">
										Forgot password?
									</Link>
								</Grid> */}
								<Grid item>
									<Link href="/signup" variant="body2">
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Container>
			</ThemeProvider>
		</Layout>
	);
}
