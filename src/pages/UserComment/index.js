import { Grid } from "@mui/material";
import { CardContent, Typography, Card } from '@mui/material';
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Profile from "../../components/Profile";
import { api } from "../../urlConfig";
import { Link } from 'react-router-dom';
import useIsMountedRef from "../../utils/asyncSubscriptionCancel";
import getLongDate from "../../utils/date";
import Toast from "../../utils/swal";


const returnShortString = (s) => {
      const arr = s.split(" ");
      let ans = "";
      for (let i = 0; i < arr.length && i < 4; i++) {
            ans += arr[i] + " "
      }
      return ans + "...";
}
const UserComment = () => {
      const [comments, setComments] = useState([]);
      const isMountedRef = useIsMountedRef();

      useEffect(() => {
            axios.get(`${api}/user/comments`).then((res) => {
                  // setQuestions(res.data.user.questionId);
                  // setSolutions(res.data.user.solutionId);
                  console.log(res.data.user.commentId);
                  if (isMountedRef.current) setComments(res.data.user.commentId);
                  // setSolutions
            }).catch((error) => {
                  Toast.fire({
                        icon: "error",
                        title: error.response.data.message,
                  });
                  console.log(error);

            })
      }, [])
      return (
            <Layout>
                  <div>
                        <Box sx={{ flexGrow: 1 }}>
                              <Grid container>
                                    <Grid
                                          display="flex"
                                          flexDirection="column"
                                          alignItems="center"
                                          item
                                          xs={12}
                                          md={3}
                                    >
                                          <Profile />
                                    </Grid>

                                    <Grid item xs={12} md={9}>
                                          <Box style={{ borderLeft: '1px solid #e1e1e1', margin: "30px", padding: "20px" }}>
                                                <div>
                                                      {comments && comments.map((c) => (
                                                            <Link to={`/question/${c.solutionId.questionId.slug}`} replace key={c._id} style={{ textDecoration: 'none', margin: "20px" }} >
                                                                  <Card >


                                                                        <CardContent>
                                                                              <Typography>
                                                                                    You posted a comment to
                                                                                    <b>{` ${returnShortString(c.solutionId.description)} `}</b>
                                                                                    on {`${getLongDate(c.createdAt)}`}
                                                                              </Typography>
                                                                              <hr />

                                                                              <Typography variant="body2" color="text.secondary" className="questioncard"

                                                                              >{c.description}</Typography>

                                                                              {/* <hr />
                                                                              <Typography variant="body2" color="text.secondary">
                                                                                    {s.commentsId.length} comments
                                                                              </Typography> */}
                                                                        </CardContent>
                                                                  </Card>
                                                            </Link>
                                                      ))}
                                                </div>

                                          </Box>
                                    </Grid>

                              </Grid>



                        </Box>
                  </div>
            </Layout>
      );
};

export default UserComment;
