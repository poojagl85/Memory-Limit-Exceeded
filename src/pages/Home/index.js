import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import useQuestion from "./useQuestion";
import './style.css';


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
			{/* <img src={background} /> */}
			<div className="homeContainer">
				{question.map((q, index) => {
					if (question.length === index + 1) {
						return (
							<Link
								to={`/${q.slug}`}
								key={q._id}
								style={{ textDecoration: "none" }}
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
								style={{ textDecoration: "none" }}
							>
								<div key={q._id} >
									<div >
										<div className="qcard">
											<h5

											>
												{q.title}
											</h5>
											<div
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
