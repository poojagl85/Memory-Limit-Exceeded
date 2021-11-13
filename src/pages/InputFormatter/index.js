import React, { useEffect, useState } from "react";
import "draft-js/dist/Draft.css";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@mui/material";
import axios from "../../services/axios";
import Toast from "../../utils/swal";

export default function InputFormatter(props) {
	const [editorData, setEditorData] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("Hi");

		const sol = {
			questionId: props.data._id,
			description: editorData,
		};

		axios
			.post(`/:${props.data._id}/addSolution`, sol)
			.then((res) => {
				console.log(res.data);
				Toast.fire({
					icon: "success",
					title: "Solution posted! Please refresh to see.",
				});
				setEditorData("");
			})
			.catch((error) => {
				console.log(error);
				Toast.fire({
					icon: "error",
					title: "Oops! Something went wrong..!",
				});
			});
	};

	const handleChange = (content, editor) => {
		setEditorData(content);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<Editor
					apiKey="uqudpvifb5z46luw60d5kwdeupyi1w4sn0c06nl65q9d1g7b"
					value={editorData}
					init={{
						content_css: ["./style.css"],
						menubar: false,
						plugins: [
							"advlist autolink lists link image",
							"charmap print preview anchor help",
							"searchreplace visualblocks code",
							"insertdatetime media table paste wordcount",
						],
						toolbar:
							"undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help",
					}}
					onEditorChange={handleChange}
				/>
				<Button
					type="submit"
					style={{
						background: "#1976d2",
						color: "#fff",
						fontWeight: "bold",
						margin: "10px",
					}}
				>
					Post a Solution
				</Button>
			</form>
		</div>
	);
}
