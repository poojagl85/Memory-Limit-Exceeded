import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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

	const addFilter = (e) => {

		const filterButtons = document.getElementsByClassName('active');
		console.log(filterButtons);
		if (filterButtons) {
			for (let button of filterButtons) {
				button.classList.remove('active');
			}
		}
		console.log(filterButtons);
		e.target.className += ' active';
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
			<div className="homeFilter">
				<div className="filter" onClick={addFilter} value={-1} query="solution">Mostly Answered</div>
				<div className="filter" onClick={addFilter} value={1} query="solution">Least Answered</div>
				<div className="filter" onClick={addFilter} value={-1} query="createdAt">Most Recent</div>
				<div className="filter" onClick={addFilter} value={1} query="createdAt">Least Recent</div>
			</div>
			<hr />

			<div className="homeContainer">
				{question.map((q, index) => {

					if (question.length === index + 1) {
						return (
							<Link to={`/${q.slug}`} key={q._id} style={{ textDecoration: 'none' }} className="homeLink">
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
							<Link to={`/${q.slug}`} key={q._id} style={{ textDecoration: 'none' }} className="homeLink">
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
		</Layout>
	);
}
