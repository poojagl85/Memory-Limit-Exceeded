import React from 'react';
import { Avatar, Card, CardContent, CardHeader, Typography, Box } from "@mui/material";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faComments, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { blue, deepOrange, purple } from '@mui/material/colors';
import { useSelector } from 'react-redux';

const Profile = () => {


      const user = JSON.parse(window.sessionStorage.getItem("user"));

      return (
            <Box position="fixed" top="25%" display="flex" flexDirection="column" alignItems="center" border='1px solid #e1e1e1' padding='10px' borderRadius="10px">
                  <Avatar sx={{ width: 100, height: 100 }}> P</Avatar>
                  <Typography mt={2} variant="h5">
                        {user && `${user.fullName}`}
                  </Typography>
                  <Typography mb={4} variant="subtitle">
                        {user && `@${user.username}`}
                  </Typography>
                  <Box borderTop="1px solid #e1e1e1" display="flex" >
                        <Box m={2} display="flex" flexDirection="column" alignItems="center">
                              <Avatar sx={{ width: 40, height: 40, bgcolor: purple[500] }}> <FontAwesomeIcon icon={faQuestion} /></Avatar>
                              <Typography mt={1} variant="h5">
                                    {user ? `${user.questionId.length}` : '0'}
                              </Typography>
                              <Typography variant="subtitle">
                                    Questions
                              </Typography>

                        </Box >
                        <Box m={2} display="flex" flexDirection="column" alignItems="center">
                              <Avatar sx={{ width: 40, height: 40, bgcolor: purple[500] }}> <FontAwesomeIcon icon={faLightbulb} /></Avatar>
                              <Typography mt={1} variant="h5">
                                    {user ? `${user.solutionId.length}` : '0'}
                              </Typography>
                              <Typography variant="subtitle">
                                    Solutions
                              </Typography>
                        </Box>
                        <Box m={2} display="flex" flexDirection="column" alignItems="center">
                              <Avatar sx={{ width: 40, height: 40, bgcolor: purple[500] }}> <FontAwesomeIcon icon={faComments} /></Avatar>
                              <Typography mt={1} variant="h5">
                                    {user ? `${user.commentId.length}` : '0'}
                              </Typography>
                              <Typography variant="subtitle">
                                    Comments
                              </Typography>
                        </Box>
                  </Box>
                  <Box width='100%' display='flex' alignItems="center" flexDirection='column'>

                        <Box borderTop="1px solid #e1e1e1" padding="10px" width='100%' display='flex' alignItems="center" flexDirection='column'>
                              <Link to='/user/questions'>
                                    <Typography variant="subtitle">
                                          Your Questions
                                    </Typography></Link>

                        </Box>


                        <Box borderTop="1px solid #e1e1e1" padding="10px" width='100%' display='flex' alignItems="center" flexDirection='column'>
                              <Link to='/user/solutions'>
                                    <Typography variant="subtitle">
                                          Your Solutions
                                    </Typography></Link>
                        </Box>

                        <Box borderTop="1px solid #e1e1e1" padding="10px" width='100%' display='flex' alignItems="center" flexDirection='column'>
                              <Link to='/user/comments'>
                                    <Typography variant="subtitle">
                                          Your Comments
                                    </Typography></Link>
                        </Box>

                  </Box>



            </Box>
      );
}

export default Profile;
