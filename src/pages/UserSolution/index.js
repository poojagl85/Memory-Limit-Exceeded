import { CardContent, Grid, Typography, Card } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import Profile from '../../components/Profile';
import { api } from '../../urlConfig';
import useIsMountedRef from '../../utils/asyncSubscriptionCancel';
import getLongDate from '../../utils/date';
import Toast from '../../utils/swal';

const UserSolution = () => {

      const [solutions, setSolutions] = useState([]);
      const isMountedRef = useIsMountedRef();

      useEffect(() => {
            axios.get(`${api}/user/solutions`).then((res) => {
                  // setQuestions(res.data.user.questionId);
                  if (isMountedRef.current) setSolutions(res.data.user.solutionId);

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
                                                      {solutions && solutions.map((s) => (
                                                            <Link to={`/question/${s.questionId.slug}`} replace key={s._id} style={{ textDecoration: 'none', margin: "20px" }} >
                                                                  <Card >


                                                                        <CardContent>
                                                                              <Typography>
                                                                                    You posted a solution to
                                                                                    <b>{` ${s.questionId.title} `}</b>
                                                                                    on {`${getLongDate(s.createdAt)}`}
                                                                              </Typography>
                                                                              <hr />

                                                                              <Typography variant="body2" color="text.secondary" className="questioncard"
                                                                                    dangerouslySetInnerHTML={{
                                                                                          __html: s.description,
                                                                                    }}

                                                                              />

                                                                              <hr />
                                                                              <Typography variant="body2" color="text.secondary">
                                                                                    {s.commentsId.length} {s.commentsId.length > 1 ? "Comments" : "Comment"}
                                                                              </Typography>
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
}

export default UserSolution;
