import React, { useEffect, useState } from 'react';
import { Avatar, Typography, Box } from "@mui/material";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faComments, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { purple } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import useIsMountedRef from '../../utils/asyncSubscriptionCancel';
import { api } from '../../urlConfig';
import axios from 'axios';
import { userConstants } from '../../constants';
import Toast from '../../utils/swal';

const Profile = () => {

      const [user, setUser] = useState(JSON.parse(window.sessionStorage.getItem("user")));

      const isMountedRef = useIsMountedRef();
      const dispatch = useDispatch();
      const auth = useSelector(state => state.auth);

      useEffect(() => {
            axios.get(`${api}/user/getUserInfo`).then((res) => {
                  if (isMountedRef.current) {
                        setUser(res.data.user);
                        window.sessionStorage.setItem("user", JSON.stringify(res.data.user));

                  }
                  if (auth.user.commentId.length !== res.data.user.commentId.length ||
                        auth.user.solutionId.length !== res.data.user.solutionId.length ||
                        auth.user.questionId.length !== res.data.user.questionId.length) {
                        dispatch({
                              type: userConstants.USER_UPDATE,
                              payload: {
                                    user: user,
                              },
                        });


                  }

            }).catch((error) => {
                  console.log(error);
            })
      }, [])

      return (
            <Box position="fixed" top="25%" display="flex" flexDirection="column" alignItems="center" border='1px solid #e1e1e1' padding='10px' borderRadius="10px">
                  <Avatar sx={{ width: 100, height: 100 }}> {user && user.fullName.charAt(0)}</Avatar>
                  <Typography mt={2} mb={2} variant="h5">
                        {user && `${user.fullName}`}
                  </Typography>
                  <Box borderTop="1px solid #e1e1e1" display="flex" >
                        <Box m={2} display="flex" flexDirection="column" alignItems="center">
                              <Avatar sx={{ width: 40, height: 40, bgcolor: purple[500] }}> <FontAwesomeIcon icon={faQuestion} /></Avatar>
                              <Typography mt={1} variant="h5">
                                    {user ? `${user.questionId.length}` : '0'}
                              </Typography>
                              <Typography variant="subtitle">
                                    {user && `${user.questionId.length > 1 ? "Questions" : "Question"}`}
                              </Typography>

                        </Box >
                        <Box m={2} display="flex" flexDirection="column" alignItems="center">
                              <Avatar sx={{ width: 40, height: 40, bgcolor: purple[500] }}> <FontAwesomeIcon icon={faLightbulb} /></Avatar>
                              <Typography mt={1} variant="h5">
                                    {user ? `${user.solutionId.length}` : '0'}
                              </Typography>
                              <Typography variant="subtitle">
                                    {user && `${user.solutionId.length > 1 ? "Solutions" : "Solution"}`}
                              </Typography>
                        </Box>
                        <Box m={2} display="flex" flexDirection="column" alignItems="center">
                              <Avatar sx={{ width: 40, height: 40, bgcolor: purple[500] }}> <FontAwesomeIcon icon={faComments} /></Avatar>
                              <Typography mt={1} variant="h5">
                                    {user ? `${user.commentId.length}` : '0'}
                              </Typography>
                              <Typography variant="subtitle">
                                    {user && `${user.commentId.length > 1 ? "Comments" : "Comment"}`}
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
