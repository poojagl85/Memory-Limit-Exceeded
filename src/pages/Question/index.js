import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import Layout from "../../components/Layout";
import { Editor } from "@tinymce/tinymce-react";
import axios from "../../services/axios";
import { Button } from "@mui/material";
import InputFormatter from "../InputFormatter";
import Lottie from "lottie-web";
import Toast from "../../utils/swal";

export default function Question() {
  const slug = useParams().slug;
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editorData, setEditorData] = useState("");

  useEffect(async () => {
    await axios
      .get(`/question?slug=${slug}`)
      .then((res) => {
        setQuestion(res.data.question);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    Lottie.loadAnimation({
      container: document.getElementById("lottieweb"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("./84860-my-first-ever-lottie.json"),
      rendererSettings: {
        className: "lottieRenderer",
      },
    });
  }, []);

  const handleChange = (content, editor) => {
    setEditorData(content);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Hi");

    const sol = {
      questionId: question._id,
      description: editorData,
    };

    document.getElementsByTagName("html")[0].style.overflow = "hidden";
    console.log(document.getElementsByTagName("html")[0]);
    setLoading(false);
    axios
      .post(`/:${question._id}/addSolution`, sol)
      .then((res) => {
        document.getElementsByTagName("html")[0].removeAttribute("style");
        setLoading(true);
        Toast.fire({
          icon: "success",
          title: res.data.message,
        });
      })
      .catch((error) => {
        document.getElementsByTagName("html")[0].removeAttribute("style");
        setLoading(true);
        Toast.fire({
          icon: "error",
          title: error.response.data.message,
        });
      });
  };

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "50px",
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{ fontWeight: "bold" }}
        >
          {question === null ? "" : question.title}
        </Typography>
        <Button
          // onClick={() => setModalShow(true)}
          style={{
            background: "#1976d2",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Post a Solution
        </Button>
      </div>
      <hr />
      <Typography variant="body2" color="text.secondary">
        {question === null ? "" : question.description}
      </Typography>
      {question === null ? (
        ""
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "end",
              flexDirection: "column",
            }}
          >
            <h5>Posted By</h5>
            <p style={{ margin: 0 }}>{question.authorID.fullName}</p>
            <p>{question.authorID.email}</p>
          </div>
        </div>
      )}
      <br />
      {question && question.solutionId.length > 0 ? (
        <div>
          <h3>
            Looking for the same question ? Go through some of the answers
            below...!
          </h3>
          <h4>
            {" "}
            {question.solutionId.length === 1
              ? `${question.solutionId.length} Answer`
              : `${question.solutionId.length} Answers`}
          </h4>
          <br />
          {question.solutionId.map((sol) => (
            <div key={sol._id}>
              <div variant="body2" color="text.secondary">
                <div
                  dangerouslySetInnerHTML={{
                    __html: sol.description,
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "end",
                  flexDirection: "column",
                }}
              >
                <h5>Posted By</h5>
                <p style={{ margin: 0 }}>{sol.authorID.fullName}</p>
                <p>{sol.authorID.email}</p>
              </div>

              <hr />
            </div>
          ))}
        </div>
      ) : null}

      {question === null ? null : (
        <div>
          <form onSubmit={handleSubmit}>
            <Editor
              apiKey={process.env.REACT_APP_EDITOR_KEY}
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
      )}
      <div
        className="loadContainer"
        style={
          loading
            ? {}
            : {
              position: "fixed",
              backgroundColor: "#00000040",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bottom: 0,
              top: 0,
              right: 0,
              left: 0,
              zIndex: 100,
            }
        }
      >
        <div
          id="lottieweb"
          style={{ display: loading ? "none" : "flex" }}
        ></div>
      </div>
    </Layout>
  );
}
