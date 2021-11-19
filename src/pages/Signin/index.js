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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { userConstants } from "../../constants";
import { Redirect } from "react-router";
import { api } from "../../urlConfig";

const theme = createTheme();

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const auth = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	console.log(process.env.API_URL);
	if (auth.authenticate) {
		return <Redirect to={`/`} />;
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		const user = {
			email,
			password,
		};

		axios
			.post(`${api}/signin`, user)
			.then((res) => {
				const { user } = res.data;
				window.sessionStorage.setItem("user", JSON.stringify(user));
				dispatch({
					type: userConstants.SIGNIN_SUCCESS,
					payload: {
						user: user,
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
