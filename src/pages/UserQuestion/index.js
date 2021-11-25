import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';

import { Grid, Typography, CardContent, Card } from "@mui/material";
import { Box } from "@mui/system";
import Profile from '../../components/Profile';
import { api } from '../../urlConfig';
import axios from 'axios';
import { Link } from "react-router-dom";
import './style.css'
import useIsMountedRef from '../../utils/asyncSubscriptionCancel';
import getLongDate from '../../utils/date';


const UserQuestion = () => {

      const [questions, setQuestions] = useState([]);
      const isMountedRef = useIsMountedRef();

      useEffect(() => {
            axios.get(`${api}/user/questions`).then((res) => {
                  if (isMountedRef.current) setQuestions(res.data.user.questionId);
            }).catch((err) => {
                  console.log(err);

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
                                                      {questions && questions.map((q) => (
                                                            <Link to={`/question/${q.slug}`} replace key={q._id} style={{ textDecoration: 'none', margin: "20px" }} >
                                                                  <Card >


                                                                        <CardContent>
                                                                              <Typography>
                                                                                    You posted a question
                                                                                    <b>{` ${q.title} `}</b>
                                                                                    on {`${getLongDate(q.createdAt)}`}
                                                                              </Typography>
                                                                              <hr />

                                                                              <Typography variant="body2" color="text.secondary" className="questioncard"
                                                                                    dangerouslySetInnerHTML={{
                                                                                          __html: q.description,
                                                                                    }}

                                                                              />

                                                                              <hr />
                                                                              <Typography variant="body2" color="text.secondary">
                                                                                    {q.solutionId.length} solutions
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

export default UserQuestion;
