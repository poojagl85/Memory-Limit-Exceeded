import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox, InputLabel, ListItemText, MenuItem, FormControl, Select, OutlinedInput } from "@mui/material";
import { Redirect, useHistory } from "react-router";
import axios from 'axios';
import { userConstants } from "../../constants";
import { api } from "../../urlConfig";
import Toast from "../../utils/swal";

const theme = createTheme();
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};



export default function Signup() {
	const [fullName, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const auth = useSelector((state) => state.auth);
	const [categories, setCategories] = useState([]);
	const category = useSelector((state) => {
		return state.category;
	});

	const handleChange = (event) => {

		const {
			target: { value },
		} = event;
		if (categories.findIndex((el) => el.id === event.target.value[event.target.value.length - 1].id) > -1) {
			const index = categories.findIndex((el) => el.id === event.target.value[event.target.value.length - 1].id);
			setCategories(categories.filter((cat, idx) => idx !== index));
			return;
		}
		setCategories(
			value
		);

	};
	const dispatch = useDispatch();
	const history = useHistory();


	if (auth.authenticate) {
		return <Redirect to={`/`} />;
	}

	const renderCategories = () => {
		return (


			<FormControl sx={{ m: 1, width: 300 }}>
				<InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
				<Select
					fullWidth
					labelId="demo-multiple-checkbox-label"
					id="demo-multiple-checkbox"
					multiple
					value={categories}
					onChange={handleChange}
					input={<OutlinedInput label="Tag" />}
					renderValue={(selected) => {
						let selectedOptions = "";
						selected.forEach((el, idx) => selectedOptions += idx == selected.length - 1 ? `${el.name}` : `${el.name},`)
						return selectedOptions
					}

					}
					MenuProps={MenuProps}
				>
					{category.categories.map((cat) => (
						<MenuItem fullWidth key={cat._id} value={{ name: cat.name, id: cat._id }}>
							<Checkbox checked={categories.findIndex((el) => el.id === cat._id) > -1} />
							<ListItemText primary={cat.name} />
						</MenuItem>
					))}
				</Select>
			</FormControl>

		);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		let categoryId = [];
		categories.forEach((el) => categoryId.push(el.id));

		const user = {
			fullName,
			email,
			password,
			categoryId,
		};
		console.log(user);
		axios
			.post(`${api}/signup`, user)
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
					title: res.data.message,
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
					title: error.response.data.message,
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
									<Grid item xs={12}>
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
											helperText="Password must be atleast of length 5 and contain number"
											autoComplete="new-password"
										/>
									</Grid>
									<Grid item xs={12}>
										<FormControl sx={{ width: 400 }}>
											<InputLabel id="demo-multiple-checkbox-label">Categories</InputLabel>
											<Select

												labelId="demo-multiple-checkbox-label"
												id="demo-multiple-checkbox"
												multiple
												value={categories}
												onChange={handleChange}
												input={<OutlinedInput label="Categories" />}
												renderValue={(selected) => {
													let selectedOptions = "";
													selected.forEach((el, idx) => selectedOptions += idx == selected.length - 1 ? `${el.name}` : `${el.name},`)
													return selectedOptions
												}

												}
												MenuProps={MenuProps}
											>
												{category.categories.map((cat) => (
													<MenuItem fullWidth key={cat._id} value={{ name: cat.name, id: cat._id }}>
														<Checkbox checked={categories.findIndex((el) => el.id === cat._id) > -1} />
														<ListItemText primary={cat.name} />
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</Grid>

								</Grid>


								<Button
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
									type="submit"
									variant="contained"
									sx={{ mt: 3, mb: 2, padding: "0.5rem 3rem" }}
									onClick={handleSubmit}
								>
									Submit
								</Button>
								<Grid container justifyContent="flex-end">
									<Grid item>
										<Link to="/signin" variant="body2" style={{ cursor: "pointer", textDecoration: "underline" }}>
											Already have an account? Sign in
										</Link>
									</Grid>
								</Grid>
							</Box>
						</Box>
					</Container>
				</div>
			</ThemeProvider>
		</Layout>
	);
}
