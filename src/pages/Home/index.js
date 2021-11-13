import {
	Card,
	CardActionArea,
	Typography,
	CardContent,
	CardActions,
	Button,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import useQuestion from "./useQuestion";

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
			<div>
				{question.map((q, index) => {
					if (question.length === index + 1) {
						return (
							<Link
								to={`/${q.slug}`}
								key={q._id}
								style={{ textDecoration: "none" }}
							>
								<Card
									ref={lastQuestionRef}
									key={q._id}
									style={{ margin: "20px" }}
								>
									<CardActionArea>
										<CardContent>
											<Typography
												gutterBottom
												variant="h5"
												component="div"
											>
												{q.title}
											</Typography>
											<Typography
												variant="body2"
												color="text.secondary"
											>
												{q.description}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Link>
						);
					} else {
						return (
							<Link
								to={`/${q.slug}`}
								key={q._id}
								style={{ textDecoration: "none" }}
							>
								<Card key={q._id} style={{ margin: "20px" }}>
									<CardActionArea>
										<CardContent>
											<Typography
												gutterBottom
												variant="h5"
												component="div"
											>
												{q.title}
											</Typography>
											<Typography
												variant="body2"
												color="text.secondary"
											>
												{q.description}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
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
