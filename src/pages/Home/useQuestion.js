import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../services/axios";
import axios from "axios";

export default function useQuestion(pageNumber) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [question, setQuestions] = useState([]);
	const [hasMore, setHasMore] = useState(false);
	const auth = useSelector((state) => {
		return state.auth;
	});
	console.log(auth.user._id);

	useEffect(() => {
		setQuestions([]);
	}, []);

	useEffect(() => {
		setLoading(true);
		setError(false);
		let cancel;
		axiosInstance
			.get(
				`/getquestions?id=${auth.user._id}&page=${pageNumber}`,
				{
					headers: {
						"Content-type": "application/json",
					},
				},
				{
					cancelToken: new axios.CancelToken((c) => (cancel = c)),
				}
			)
			.then((res) => {
				setQuestions((prevq) => {
					return [
						...new Set([
							...prevq,
							...res.data.questions.map((q) => q),
						]),
					];
				});
				console.log(question);
				setHasMore(res.data.questions.length > 0);
				setLoading(false);
			})
			.catch((e) => {
				if (axios.isCancel(e)) return;
				setError(true);
			});
		return () => cancel();
	}, [pageNumber]);

	return { loading, error, question, hasMore };
}
