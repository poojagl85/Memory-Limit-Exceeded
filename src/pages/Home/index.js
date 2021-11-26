import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Layout from "../../components/Layout";
import useQuestion from "./useQuestion";
import './style.css';
import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import Profile from "../../components/Profile";
import getLongDate from "../../utils/date";


export default function Home() {
	const [pageNumber, setPageNumber] = useState(1);
	const [value, setValue] = useState(0);
	const [filter, setFilter] = useState(false);
	const [query, setQuery] = useState("none");
	const { question, hasMore, loading, error } = useQuestion(pageNumber, query, value);


	useEffect(() => {
		setPageNumber(1);
	}, []);

	const observer = useRef();
	const lastQuestionRef = useCallback(
		(node) => {
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPageNumber((prevPageNumber) => prevPageNumber + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[loading, hasMore]
	);

	const addFilter = (e, filterName) => {

		setFilter(filterName)
		setValue(e.target.getAttribute('value'));
		setQuery(e.target.getAttribute('query'));
		setPageNumber(1);
	}

	return (
		<Layout>
			<div>
				<Box sx={{ flexGrow: 1 }}>
					<Grid container>
						<Grid display="flex" flexDirection="column" alignItems="center" item xs={12} md={3}>
							<Profile />

						</Grid>

						<Grid item xs={12} md={9}>
							<Box style={{ borderLeft: '1px solid #e1e1e1', margin: "30px" }}>

								<Box display="flex" justifyContent="center">
									<ButtonGroup variant="outlined" aria-label="outlined primary button group">
										<Button className="filter" onClick={(e) => addFilter(e, 'most-answered')} variant={filter === 'most-answered' ? 'contained' : ''} value={-1} query="solution">Mostly Answered</Button>
										<Button className="filter" onClick={(e) => addFilter(e, 'least-answered')} variant={filter === 'least-answered' ? 'contained' : ''} value={1} query="solution">Least Answered</Button>
										<Button className="filter" onClick={(e) => addFilter(e, 'most-recent')} variant={filter === 'most-recent' ? 'contained' : ''} value={-1} query="createdAt">Most Recent</Button>
										<Button className="filter" onClick={(e) => addFilter(e, 'least-recent')} variant={filter === 'least-recent' ? 'contained' : ''} value={1} query="createdAt">Least Recent</Button>
									</ButtonGroup>
								</Box>

								<hr />

								<div className="homeContainer">
									{question.map((q, index) => {

										if (question.length === index + 1) {
											return (
												<Link to={`/question/${q.slug}`} replace key={q._id} style={{ textDecoration: 'none' }} className="homeLink">
													<Card sx={{ maxWidth: 345 }} ref={lastQuestionRef}>
														<CardHeader
															avatar={
																<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
																	{q.authorID.fullName.charAt(0)}
																</Avatar>
															}
															title={q.authorID.fullName}
															subheader={getLongDate(q.createdAt)}
														/>
														<CardContent>
															<Typography className="cardDescription" variant="body2" color="text.secondary"
																dangerouslySetInnerHTML={{
																	__html: q.description,
																}}
																className="description"
															/>

															<hr />
															<Typography variant="body2" color="text.secondary">
																{q.solutionId.length} {q.solutionId.length > 1 ? "Solutions" : "Solution"}
															</Typography>
														</CardContent>
													</Card>
												</Link>

											);
										} else {
											return (
												<Link to={`/question/${q.slug}`} replace key={q._id} style={{ textDecoration: 'none' }} className="homeLink">
													<Card sx={{ maxWidth: 345 }} className="homeCard">
														<CardHeader
															avatar={
																<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
																	{q.authorID.fullName.charAt(0)}
																</Avatar>
															}
															title={q.authorID.fullName}
															subheader={getLongDate(q.createdAt)}
														/>
														<CardContent>
															<Typography variant="body2" color="text.secondary"
																dangerouslySetInnerHTML={{
																	__html: q.description,
																}}
																className="description"
															/>
															<hr />
															<Typography variant="body2" color="text.secondary">
																{q.solutionId.length} {q.solutionId.length > 1 ? "Solutions" : "Solution"}
															</Typography>
														</CardContent>
													</Card>
												</Link>

											);
										}
									})}



									{/* <div>{loading && "Loading..."}</div>
										<div>{error && "Error"}</div> */}
								</div>
							</Box>
						</Grid>
					</Grid>
				</Box>


			</div>


		</Layout >
	);
}