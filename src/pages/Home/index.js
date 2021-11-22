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

const getLongDate = (d) => {
	const date = new Date(d)
	const arr = date.toString().split(" ");
	return `${arr[1]} ${arr[2]}, ${arr[3]}`
}

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

		// console.log(e.target.getAttribute('value'))
		setValue(e.target.getAttribute('value'));
		setQuery(e.target.getAttribute('query'));
		setPageNumber(1);
		console.log(value, query)
		// console.log(e.target.getAttribute('value'));
		// console.log(e.target)


	}

	return (
		<Layout>
			<div>
				<Box sx={{ flexGrow: 1 }}>
					<Grid container>
						<Grid display="flex" flexDirection="column" alignItems="center" item xs={12} md={3}>
							<Box position="fixed" top="25%" display="flex" flexDirection="column" alignItems="center">
								<Avatar sx={{ width: 150, height: 150 }}> P</Avatar>
								<Typography mt={2} variant="h5">
									Pooja Goyal
								</Typography>
								<Typography mb={4} variant="subtitle">
									@poojagl85
								</Typography>
								<Box borderTop="1px solid #000" display="flex" >
									<Box m={2} display="flex" flexDirection="column" alignItems="center">
										<Avatar sx={{ width: 50, height: 50 }}> P</Avatar>
										<Typography mt={1} variant="h5">
											20
										</Typography>
										<Typography variant="subtitle">
											Questions
										</Typography>

									</Box >
									<Box m={2} display="flex" flexDirection="column" alignItems="center">
										<Avatar sx={{ width: 50, height: 50 }}> P</Avatar>
										<Typography mt={1} variant="h5">
											20
										</Typography>
										<Typography variant="subtitle">
											Solutions
										</Typography>
									</Box>
									<Box m={2} display="flex" flexDirection="column" alignItems="center">
										<Avatar sx={{ width: 50, height: 50 }}> P</Avatar>
										<Typography mt={1} variant="h5">
											20
										</Typography>
										<Typography variant="subtitle">
											Comments
										</Typography>
									</Box>
								</Box>



							</Box>
						</Grid>

						<Grid item xs={12} md={9}>
							<Box style={{ borderLeft: '1px solid #e1e1e1', margin: "30px" }}>
								{/* <div >
									<div className="filter" onClick={addFilter} value={-1} query="solution">Mostly Answered</div>
									<div className="filter" onClick={addFilter} value={1} query="solution">Least Answered</div>
									<div className="filter" onClick={addFilter} value={-1} query="createdAt">Most Recent</div>
									<div className="filter" onClick={addFilter} value={1} query="createdAt">Least Recent</div>
								</div> */}
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
																{q.solutionId.length} solutions
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
																{q.solutionId.length} solutions
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