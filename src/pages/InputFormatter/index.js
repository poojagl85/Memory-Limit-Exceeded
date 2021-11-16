import React, { useEffect, useState } from "react";
import "draft-js/dist/Draft.css";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@mui/material";
import axios from "../../services/axios";
import Toast from "../../utils/swal";

export default function InputFormatter({onSubmit}) {
	const [editorData, setEditorData] = useState("");	

	const handleChange = (content, editor) => {
		setEditorData(content);
	};


	return (
		<div>
			<form onSubmit={(e) => {onSubmit(e, editorData); setEditorData("")}}>
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
