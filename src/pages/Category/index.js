import {
      Avatar,
      Card,
      CardContent,
      CardHeader,
      Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { api } from "../../urlConfig";
import getLongDate from "../../utils/date";
import Toast from "../../utils/swal"


const Category = () => {
      const slug = useParams().slug;
      const [question, setQuestion] = useState([]);

      useEffect(async () => {
            await axios
                  .get(`${api}/category?slug=${slug}`)
                  .then((res) => {
                        let q = [];
                        q.push(...res.data.questions);
                        setQuestion(q);

                  })
                  .catch((error) => {
                        Toast.fire({
                              icon: "error",
                              title: error.response.data.message,
                        });
                        console.log(error);
                  });
      }, [slug]);

      return (
            <Layout>
                  {question.length < 1 ? null :
                        <div className="homeContainer">
                              {question.map((q) => (
                                    <Link
                                          to={`/question/${q.slug}`}
                                          replace
                                          key={q._id}
                                          style={{ textDecoration: "none" }}
                                          className="homeLink"
                                    >
                                          <Card sx={{ maxWidth: 345 }}>
                                                <CardHeader
                                                      avatar={
                                                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                                  {q.authorID.fullName.charAt(0)}
                                                            </Avatar>
                                                      }
                                                      title={q.authorID.fullName}
                                                      subheader={getLongDate(q.createdAt)}
                                                />
                                                <CardContent>
                                                      <Typography
                                                            className="description"
                                                            variant="body2"
                                                            color="text.secondary"
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
                  }
            </Layout>
      );
};

export default Category;
