import { Button } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import Box from '@mui/material/Box';
import Layout from "../../components/Layout";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import Lottie from "lottie-web";
import Toast from "../../utils/swal";
import { api } from "../../urlConfig";
import "./style.css"


export default function Question() {
      const slug = useParams().slug;
      const [question, setQuestion] = useState({
            title: '',
            description: '',
            categoryId: { _id: '', name: '' },
            authorID: { _id: '', fullName: '', email: '' },
            solutionId: [
                  {
                        authorID: { _id: '', fullName: '', email: '' },
                        commentsId: [],
                        createdAt: "",
                        description: "",
                        downvotes: [],
                        questionId: "",
                        updatedAt: "",
                        upvotes: [],
                        _id: "",
                  }
            ]
      });
      const [loading, setLoading] = useState(true);
      const [editorData, setEditorData] = useState("");
      const [ansAccordian, setAccordian] = useState([])
      const [comments, setComments] = useState({
            comments: [],
            index: null
      });
      // const [showComments, setShowComments] = useState(false);
      // const [reply, setReply] = useState("");

      useEffect(async () => {
            await axios
                  .get(`${api}/question?slug=${slug}`)
                  .then((res) => {
                        setQuestion(res.data.question);
                        let ansactivearray = []
                        res.data.question.solutionId.forEach(() => {
                              ansactivearray.push({ active: false })
                        })
                        setAccordian(ansactivearray)
                  })
                  .catch((error) => {
                        Toast.fire({
                              icon: "error",
                              title: error.response.data.message,
                        });
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


      const handleChange = (content, editor) => {
            setEditorData(content);
      };

      const postReply = (data, solId, index) => {
            document.getElementsByTagName("html")[0].style.overflow = "hidden";
            setLoading(false);
            const comment = {
                  description: data.value,
                  solutionId: solId,
            }
            axios.post(`${api}/:${solId}/addComment`, comment).then((res) => {
                  document.getElementsByTagName("html")[0].removeAttribute("style");
                  setLoading(true);
                  Toast.fire({
                        icon: "success",
                        title: res.data.message,
                  });
                  showComments(solId, index)
            }).catch((error) => {
                  document.getElementsByTagName("html")[0].removeAttribute("style");
                  setLoading(true);
                  Toast.fire({
                        icon: "error",
                        title: error.response.data.message,
                  });
            });

            data.value = ""
      }

      const showComments = (solutionid, index) => {
            let newAccordian = ansAccordian
            newAccordian[index].active = !newAccordian[index].active
            setAccordian(newAccordian)
            if (!newAccordian[index].active) {
                  setComments({ comments: [], index: null })
                  return
            }
            axios.get(`${api}/solution?id=${solutionid}`).then((res) => {
                  setComments({ comments: res.data.solution.commentsId, index: index })
            }).catch((error) => {
                  Toast.fire({
                        icon: "error",
                        title: error.response.data.message,
                  });
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
                        window.location.reload();
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
                  <div className="questionContainer">
                        <div className="qText">
                              <h2>{question.title}</h2>
                              <Button style={{
                                    background: "#1976d2",
                                    color: "#fff",
                                    fontWeight: "bold",
                                    margin: "10px",
                                    minWidth: "160px",
                                    height: "40px"
                              }} onClick={() => window.scrollTo(0, document.body.scrollHeight)}
                              >
                                    Post a Solution
                              </Button>

                        </div>
                        <div className="qDescription" dangerouslySetInnerHTML={{
                              __html: question.description
                        }} />

                        <div className="additionalInfo">
                              <div className="category">
                                    <span>{question.categoryId.name}</span>
                              </div>
                              <div className="author">
                                    <span>Posted By</span>
                                    <span>{question.authorID.fullName}</span>
                                    <span>{question.authorID.email}</span>
                              </div>
                        </div>

                        {/* Answers */}
                        <div className="ansContainer">
                              <h3>Answers ({question.solutionId.length})</h3>
                              <div>
                                    {
                                          question.solutionId.map((ele, ind) => {
                                                return (
                                                      <div className="ansInd" key={ind}>
                                                            <div className="ansDescription" dangerouslySetInnerHTML={{
                                                                  __html: ele.description,
                                                            }} />
                                                            <div className="additionalInfo">
                                                                  <div className="answerActions">
                                                                        <button onClick={() => showComments(ele._id, ind)}>{ansAccordian.length > 0 && !ansAccordian[ind].active ? "Show Comments" : "Hide Comments"}</button>
                                                                  </div>
                                                                  <div className="ansAuthor author">
                                                                        <span>Posted By</span>
                                                                        <span>{ele.authorID.fullName}</span>
                                                                        <span>{ele.authorID.email}</span>
                                                                  </div>
                                                            </div>
                                                            <div className="commentsContainer">
                                                                  {
                                                                        comments.comments.map((elem, index) => {
                                                                              if (ind === comments.index) {
                                                                                    return (
                                                                                          <div className="comment" key={index}>
                                                                                                <div className="avatar">{elem.authorID.fullName[0]}</div>
                                                                                                <div className="contentContainer">
                                                                                                      <div className="commentDescription" dangerouslySetInnerHTML={{
                                                                                                            __html: elem.description
                                                                                                      }} />
                                                                                                      <div className="commentAuthor">
                                                                                                            <span>posted by: </span>
                                                                                                            <span>{elem.authorID.email}</span>
                                                                                                      </div>
                                                                                                </div>
                                                                                          </div>
                                                                                    )
                                                                              }
                                                                        })
                                                                  }
                                                            </div>
                                                            <div className="replyContainer">
                                                                  <input className="reply" placeholder="Add a public comment" />
                                                                  <button onClick={(e) => postReply(e.target.previousSibling, ele._id, ind)}>Comment</button>
                                                            </div>
                                                      </div>
                                                )
                                          })
                                    }
                              </div>
                        </div>
                        {
                              question.title === '' ? null : (
                                    <Box>
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
                                    </Box>
                              )
                        }
                  </div>
                  <Box className="loadContainer" style={
                        loading ? {} :
                              {
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
                  }>
                        <div id="lottieweb" style={{ display: loading ? "none" : "flex" }}></div>
                  </Box>
            </Layout >
      );
}