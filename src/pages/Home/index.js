import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import useQuestion from "./useQuestion";
import triangle from '../../images/triangle.png'
import './style.css';
import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

const palleteList = [
	{
		bgcolor: '00203FFF',
		text: '#ADEFD1FF',
		heading: '#ADEFD1FF'
	},
	{
		bgcolor: '#ADEFD1FF',
		text: '#00203FFF',
		heading: '#00203FFF'
	},
	{
		bgcolor: '#5F4B8BFF',
		text: '#E69A8DFF',
		heading: '#E69A8DFF'
	},
	{
		bgcolor: '#E69A8DFF',
		text: '#5F4B8BFF',
		heading: '#5F4B8BFF'
	},
	{
		bgcolor: '#FAEBEFFF',
		text: '#333D79FF',
		heading: '#333D79FF'
	},
	{
		bgcolor: '#333D79FF',
		text: '#FAEBEFFF',
		heading: '#FAEBEFFF'
	},
	{
		bgcolor: '#F2EDD7FF',
		text: '#755139FF',
		heading: '#755139FF'
	},
	{
		bgcolor: '#755139FF',
		text: '#F2EDD7FF',
		heading: '#F2EDD7FF'
	},
]

const randomColorPick = () => {
	const randomIndex = parseInt(Math.random() * palleteList.length)
	return palleteList[randomIndex]
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

	return (
		<Layout>
			<div class="homeFilter">
				<div>Mostly Answered</div>
				<div>Least Answered</div>
				<div>Most Recent</div>
				<div>Least Recent</div>
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
										subheader={q.createdAt}
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
										subheader={q.createdAt}
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
