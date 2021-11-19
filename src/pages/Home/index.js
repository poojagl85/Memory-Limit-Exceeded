import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import useQuestion from "./useQuestion";
import triangle from '../../images/triangle.png'
import './style.css';

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
			{/* <img src={triangle} style={{ width: '100%' }} /> */}

			<div className="homeContainer">
				{question.map((q, index) => {
					const palleteObj = randomColorPick()
					if (question.length === index + 1) {
						return (
							<Link
								to={`/${q.slug}`}
								key={q._id}
								className="homeLink"
								style={{ textDecoration: "none", backgroundColor: `${palleteObj.bgcolor}`, color: `${palleteObj.heading}` }}
							>
								<div
									ref={lastQuestionRef}
									key={q._id}


								>
									<div className="qcard">
										<div>
											<h5

											>
												{q.title}
											</h5>
											<div
												style={{ color: `${palleteObj.text}` }}
												dangerouslySetInnerHTML={{
													__html: q.description,
												}} />
										</div>
									</div>
								</div>
							</Link>
						);
					} else {
						return (
							<Link
								to={`/${q.slug}`}
								key={q._id}
								className="homeLink"
								style={{ textDecoration: "none", backgroundColor: `${palleteObj.bgcolor}`, color: `${palleteObj.heading}` }}
							>
								<div key={q._id} >
									<div >
										<div className="qcard">
											<h5

											>
												{q.title}
											</h5>
											<div
												style={{ color: `${palleteObj.text}` }}
												dangerouslySetInnerHTML={{
													__html: q.description,
												}} />
										</div>
									</div>
								</div>
							</Link>
						);
					}
				})}

				<div>{loading && "Loading..."}</div>
				<div>{error && "Error"}</div>
			</div>
		</Layout>
	);
}
