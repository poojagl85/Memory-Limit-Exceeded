import { TextField, Typography, Button, Card, CardHeader, Avatar } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
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

            document.getElementById(solId).style.display = 'none';


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
                  <Box mx={10}>
                        <Box
                              style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginTop: "50px",
                              }}
                              mx={10}
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
                        </Box>
                        <hr />
                        {question === null ? (
                              ""
                        ) : (
                              <Box
                                    dangerouslySetInnerHTML={{
                                          __html: question.description,
                                    }}
                                    mx={10}
                              />
                        )}
                        {question === null ? (
                              ""
                        ) : (
                              <Box mx={10}>
                                    <Box
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
                                    </Box>
                              </Box>
                        )}
                        <br />
                        {question && question.solutionId.length > 0 ? (
                              <Box mx={10}>
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
                                          <Box key={sol._id}>
                                                <Box variant="body2" color="text.secondary">
                                                      <Box
                                                            dangerouslySetInnerHTML={{
                                                                  __html: sol.description,
                                                            }}
                                                      />
                                                </Box>
                                                <Box
                                                      style={{
                                                            display: "flex",
                                                            width: "100%",
                                                            justifyContent: "space-between"
                                                      }}
                                                >
                                                      <Box style={{
                                                            display: "flex",
                                                            width: "250px",
                                                            justifyContent: "space-between",
                                                      }}>
                                                            <button className={sol._id} style={{ backgroundColor: 'white', border: 'none', color: "blue" }} onClick={(e) => handleReply(e)}>Reply</button>
                                                            <button className={sol._id} style={{ backgroundColor: 'white', border: 'none', color: "blue" }} onClick={(e) => showReply(e)}>Show comments</button>
                                                      </Box>

                                                      <Box>
                                                            <h5>Posted By</h5>
                                                            <p style={{ margin: 0 }}>{sol.authorID.fullName}</p>
                                                            <p>{sol.authorID.email}</p>
                                                      </Box>

                                                </Box>
                                                <Box id={sol._id} style={{ width: '100%', display: 'none' }}>
                                                      <List m={3} sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                                            {comments.length > 0 && comments.map((c) => (
                                                                  <Box style={{ marginLeft: '50px' }} key={c._id}>
                                                                        <ListItem divider alignItems="flex-start">
                                                                              <ListItemAvatar>
                                                                                    <Avatar alt="Remy Sharp" >
                                                                                          {c.authorID.fullName[0]}
                                                                                    </Avatar>
                                                                              </ListItemAvatar>
                                                                              <ListItemText
                                                                                    primary={<React.Fragment>
                                                                                          <Typography
                                                                                                sx={{ display: 'inline' }}
                                                                                                component="span"
                                                                                                variant="body2"
                                                                                                color="text.primary"
                                                                                          >
                                                                                                Posted by: {c.description}
                                                                                          </Typography>

                                                                                    </React.Fragment>}

                                                                                    secondary={
                                                                                          <React.Fragment>
                                                                                                <Typography
                                                                                                      sx={{ display: 'inline' }}
                                                                                                      component="span"
                                                                                                      variant="body3"
                                                                                                      fontWeight='bold'
                                                                                                      color="text.primary"
                                                                                                >
                                                                                                      Posted by: {c.authorID.fullName}
                                                                                                </Typography>

                                                                                          </React.Fragment>
                                                                                    }
                                                                              />
                                                                        </ListItem>

                                                                  </Box>
                                                            ))}
                                                      </List>
                                                      <Box>
                                                            <TextField fullWidth label="Add a public reply" variant="standard" value={reply} onChange={(e) => setReply(e.target.value)} />
                                                            <Box style={{ margin: '10px 0', display: "flex", justifyContent: "right" }}>
                                                                  <Button className="homeButton" value={sol._id} onClick={(e) => hideReply(e)} style={{ color: '#484848', fontWeight: 'bold' }}>Cancel</Button>
                                                                  <Button className="homeButton" value={sol._id} onClick={(e) => postReply(e, sol)} style={{ backgroundColor: '#e1e1e1', color: '#484848', fontWeight: 'bold' }}>Reply</Button>

                                                            </Box>
                                                      </Box>
                                                </Box>


                                                <hr />
                                          </Box>
                                    ))}
                              </Box>
                        ) : null
                        }

                        {
                              question === null ? null : (
                                    <Box mx={10}>
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
                        <Box
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
                              <Box
                                    id="lottieweb"
                                    style={{ display: loading ? "none" : "flex" }}
                              ></Box>
                        </Box>
                  </Box>

            </Layout >
      );
}