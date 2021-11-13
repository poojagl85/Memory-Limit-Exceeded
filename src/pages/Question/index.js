import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import Layout from "../../components/Layout";
import axios from "../../services/axios";
import { Button } from "@mui/material";
import InputFormatter from "../InputFormatter";
import ReactDOMServer from "react-dom/server";
import { parse } from "react-html-parser";

export default function Question() {
	const slug = useParams().slug;
	const [question, setQuestion] = useState(null);

	useEffect(async () => {
		await axios
			.get(`/question?slug=${slug}`)
			.then((res) => {
				setQuestion(res.data.question);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<Layout>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					marginTop: "50px",
				}}
			>
				<Typography
					gutterBottom
					variant="h5"
					component="div"
					style={{ fontWeight: "bold" }}
				>
					{question === null ? "" : question.title}
				</Typography>
				<Button
					// onClick={() => setModalShow(true)}
					style={{
						background: "#1976d2",
						color: "#fff",
						fontWeight: "bold",
					}}
				>
					Post a Solution
				</Button>
			</div>
			<hr />
			<Typography variant="body2" color="text.secondary">
				{question === null ? "" : question.description}
			</Typography>
			{question === null ? (
				""
			) : (
				<div>
					<div
						style={{
							display: "flex",
							width: "100%",
							alignItems: "end",
							flexDirection: "column",
						}}
					>
						<h5>Posted By</h5>
						<p style={{ margin: 0 }}>
							{question.authorID.fullName}
						</p>
						<p>{question.authorID.email}</p>
					</div>
				</div>
			)}
			<br />
			{question && question.solutionId.length > 0 ? (
				<div>
					<h3>
						Looking for the same question ? Go through some of the
						answers below...!
					</h3>
					<h4>
						{" "}
						{question.solutionId.length === 1
							? `${question.solutionId.length} Answer`
							: `${question.solutionId.length} Answers`}
					</h4>
					<br />
					{question.solutionId.map((sol) => (
						<div key={sol._id}>
							<div variant="body2" color="text.secondary">
								<div
									dangerouslySetInnerHTML={{
										__html: sol.description,
									}}
								/>
								{/* {parse(sol.description)} */}
							</div>
							<div
								style={{
									display: "flex",
									width: "100%",
									alignItems: "end",
									flexDirection: "column",
								}}
							>
								<h5>Posted By</h5>
								<p style={{ margin: 0 }}>
									{sol.authorID.fullName}
								</p>
								<p>{sol.authorID.email}</p>
							</div>

							<hr />
						</div>
					))}
				</div>
			) : null}

			{question === null ? null : (
				<InputFormatter data={question ? question : "Hi"} />
			)}

			{/* <AppModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				onSubmit={submitSolution}
			>
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
			</AppModal> */}
		</Layout>
	);
}
