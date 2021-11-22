import { TextField, Typography, Button, Card, CardHeader, Avatar } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import Layout from "../../components/Layout";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import Lottie from "lottie-web";
import Toast from "../../utils/swal";
import { api } from "../../urlConfig";
import { red } from "@mui/material/colors";

export default function Question() {
      const slug = useParams().slug;
      const [question, setQuestion] = useState(null);
      const [loading, setLoading] = useState(true);
      const [editorData, setEditorData] = useState("");
      const [comments, setComments] = useState([]);
      const [reply, setReply] = useState("");

      useEffect(async () => {
            await axios
                  .get(`${api}/question?slug=${slug}`)
                  .then((res) => {
                        setQuestion(res.data.question);
                  })
                  .catch((error) => {
                        console.log(error);
                  });
      }, []);

      useEffect(() => {
            Lottie.loadAnimation({
                  container: document.getElementById("lottieweb"),
                  renderer: "svg",
                  loop: true,
                  autoplay: true,
                  animationData: require("../../images/84860-my-first-ever-lottie.json"),
                  rendererSettings: {
                        className: "lottieRenderer",
                  },
            });
      }, []);

      useEffect(() => {
            console.log(comments);
      }, [comments])

      const handleChange = (content, editor) => {
            setEditorData(content);
      };

      const handleReply = (e) => {
            const id = e.target.className;
            question.solutionId.map((s) => {
                  let tid = s._id;
                  document.getElementById(tid).style.display = 'none';
            })
            setReply("");
            document.getElementById(id).style.display = 'block';

      }

      const hideReply = (e) => {
            const id = e.target.value;
            document.getElementById(id).style.display = 'none';
      }

      const scrollToBottom = () => {
            window.scrollTo(0, document.body.scrollHeight);
      };

      const postReply = async (e, sol) => {
            document.getElementsByTagName("html")[0].style.overflow = "hidden";

            setLoading(false);
            e.preventDefault();
            const solId = e.target.value;
            const comment = {
                  description: reply,
                  solutionId: solId,
            }
            await axios.post(`${api}/:${solId}/addComment`, comment).then((res) => {
                  document.getElementsByTagName("html")[0].removeAttribute("style");
                  setLoading(true);
                  console.log(res.data);
            })


      }

      const showReply = async (e) => {
            setComments([]);
            const id = e.target.className;
            question.solutionId.map((s) => {
                  let tid = s._id;
                  document.getElementById(tid).style.display = 'none';
            })
            setReply("");
            document.getElementById(id).style.display = 'block';
            await axios.get(`${api}/solution?id=${id}`).then((res) => {
                  setComments(res.data.solution.commentsId)
            })
      }

      const handleSubmit = (event) => {
            event.preventDefault();

            const sol = {
                  questionId: question._id,
                  description: editorData,
                  question: question,
            };

            document.getElementsByTagName("html")[0].style.overflow = "hidden";

            setLoading(false);
            axios
                  .post(`${api}/:${question._id}/addSolution`, sol)
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
                              onClick={scrollToBottom}
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
                  {question === null ? (
                        ""
                  ) : (
                        <div
                              dangerouslySetInnerHTML={{
                                    __html: question.description,
                              }}
                        />
                  )}
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
                                                      justifyContent: "space-between"
                                                }}
                                          >
                                                <div style={{
                                                      display: "flex",
                                                      width: "250px",
                                                      justifyContent: "space-between",
                                                }}>
                                                      <button className={sol._id} style={{ backgroundColor: 'white', border: 'none', color: "blue" }} onClick={(e) => handleReply(e)}>Reply</button>
                                                      <button className={sol._id} style={{ backgroundColor: 'white', border: 'none', color: "blue" }} onClick={(e) => showReply(e)}>Show comments</button>
                                                </div>

                                                <div>
                                                      <h5>Posted By</h5>
                                                      <p style={{ margin: 0 }}>{sol.authorID.fullName}</p>
                                                      <p>{sol.authorID.email}</p>
                                                </div>

                                          </div>
                                          <div id={sol._id} style={{ width: '100%', display: 'none' }}>
                                                <div style={{ width: "100%", display: 'flex', justifyContent: 'right', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                      {comments.length > 0 ? comments.map((c) => (
                                                            <div style={{ width: '100%', display: 'flex', justifyContent: 'right', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                                  <div style={{ display: 'flex', width: '80%', justifyContent: 'space-between', minHeight: '30px' }}>
                                                                        <div>
                                                                              {c.description}
                                                                        </div>
                                                                        <div>
                                                                              <b>Posted By: </b>{c.authorID.fullName}
                                                                        </div>
                                                                  </div>
                                                                  <hr style={{ color: 'black', width: '90%' }} />

                                                            </div>

                                                      )

                                                      ) : null}
                                                </div>
                                                <div>
                                                      <TextField fullWidth label="Add a public reply" variant="standard" value={reply} onChange={(e) => setReply(e.target.value)} />
                                                      <div style={{ margin: '10px 0', display: "flex", justifyContent: "right" }}>
                                                            <Button className="homeButton" value={sol._id} onClick={(e) => hideReply(e)} style={{ color: '#484848', fontWeight: 'bold' }}>Cancel</Button>
                                                            <Button className="homeButton" value={sol._id} onClick={(e) => postReply(e, sol)} style={{ backgroundColor: '#e1e1e1', color: '#484848', fontWeight: 'bold' }}>Reply</Button>

                                                      </div>
                                                </div>
                                          </div>


                                          <hr />
                                    </div>
                              ))}
                        </div>
                  ) : null
                  }

                  {
                        question === null ? null : (
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
                        )
                  }
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
            </Layout >
      );
}
