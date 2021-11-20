import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import useQuestion from "./useQuestion";
import triangle from '../../images/triangle.png'
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
	const { question, hasMore, loading, error } = useQuestion(pageNumber);

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
		const filterButtons = document.getElementsByClassName['active'];

	}

	return (
		<Layout>
			<div class="homeFilter">
				<button className="filter" onClick={addFilter}>Mostly Answered</button>
				<button className="filter" onClick={addFilter}>Least Answered</button>
				<button className="filter" onClick={addFilter}>Most Recent</button>
				<button className="filter" onClick={addFilter}>Least Recent</button>
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
