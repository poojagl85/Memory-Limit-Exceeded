import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import Toast from "../../utils/swal";
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import AppModal from "../AppModal";
import axios from "../../services/axios";

export default function Header() {
	const auth = useSelector((state) => state.auth);

	const location = useLocation().pathname === "/signin" ? `signin` : `signup`;
	const [modalShow, setModalShow] = useState(false);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [categoryId, setPostCategory] = useState("");
	console.log(title, description);

	const category = useSelector((state) => {
		return state.category;
	});

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

	const submitQuestion = () => {
		const question = {
			title,
			description,
			categoryId,
		};

		axios
			.post("/question/create", question)
			.then((res) => {
				// const { message } = res.data;
				Toast.fire({
					icon: "success",
					title: "Question posted...!",
				});
			})
			.catch((error) => {
				Toast.fire({
					icon: "error",
					title: "Unable to post",
				});
			});
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
					<Box
						sx={{
							display: { xs: "none", md: "flex" },
						}}
					>
						{auth.authenticate ? (
							<Button
								onClick={() => setModalShow(true)}
								style={{
									background: "#1976d2",
									color: "#fff",
									fontWeight: "bold",
									margin: "20px",
								}}
							>
								Ask a Question ?
							</Button>
						) : null}
					</Box>

					{auth.authenticate
						? renderLoggedInLinks()
						: renderNonLoggedInLinks()}
				</Toolbar>
			</AppBar>
			<AppModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				onSubmit={submitQuestion}
			>
				<TextField
					margin="normal"
					required
					fullWidth
					id="title"
					label="Question Title"
					name="title"
					autoComplete="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					autoFocus
				/>
				<TextField
					margin="normal"
					multiline
					maxRows={4}
					required
					fullWidth
					id="description"
					label="Description"
					name="description"
					autoComplete="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					autoFocus
				/>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">
						Category
					</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						label="category"
						value={categoryId}
						onChange={(e) => setPostCategory(e.target.value)}
					>
						{category.categories.map((cat) => (
							<MenuItem value={cat._id} key={cat._id}>
								{cat.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</AppModal>
		</Box>
	);
}
