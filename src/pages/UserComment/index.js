import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Layout from "../../components/Layout";
import Profile from "../../components/Profile";

const UserComment = () => {
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
                                          <Box style={{ borderLeft: '1px solid #e1e1e1', margin: "30px" }}>Comments</Box>
                                    </Grid>
                              </Grid>

                        </Box>
                  </div>
            </Layout>
      );
};

export default UserComment;
