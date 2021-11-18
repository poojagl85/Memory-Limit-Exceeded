import { FormControl, InputLabel, MenuItem, Select, TextField, Button } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import Lottie from 'lottie-web';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import useIsMountedRef from '../../utils/asyncSubscriptionCancel';
import axios from '../../services/axios';
import Toast from '../../utils/swal';
import './style.css';

const PostQuestion = () => {
      const [title, setTitle] = useState("");
      const [description, setDescription] = useState("");
      const [categoryId, setPostCategory] = useState("");
      const [editorData, setEditorData] = useState("");
      const [loading, setLoading] = useState(true);
      const [loadEditor, setLoadEditor] = useState(false);
      const isMountedRef = useIsMountedRef();


      const category = useSelector((state) => {
            return state.category;
      });

      useEffect(() => {
            setTimeout(() => {
                  if (isMountedRef.current) { setLoadEditor(true) };
            }, 1000)
      }, []);


      React.useEffect(() => {
            Lottie.loadAnimation({
                  container: document.getElementById("lottieweb"),
                  renderer: "svg",
                  loop: true,
                  autoplay: true,
                  animationData: require("../Question/84860-my-first-ever-lottie.json"),
                  rendererSettings: {
                        className: "lottieRenderer",
                  },
            });
      }, []);

      const handleChange = (content, editor) => {
            setEditorData(content);
      };



      const handleSubmit = (event) => {
            event.preventDefault();

            const question = {
                  title,
                  description: editorData,
                  categoryId,
            };


            document.getElementsByTagName("html")[0].style.overflow = "hidden";
            setLoading(false);
            axios
                  .post("/question/create", question)
                  .then((res) => {
                        document.getElementsByTagName("html")[0].removeAttribute("style");
                        setLoading(true);
                        Toast.fire({
                              icon: "success",
                              title: "Question posted...!",
                        });
                  })
                  .catch((error) => {
                        document.getElementsByTagName("html")[0].removeAttribute("style");
                        setLoading(true);
                        Toast.fire({
                              icon: "error",
                              title: "Unable to post",
                        });
                  });
      };


      return (
            <Layout>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                              <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Question Title"
                                    name="title"
                                    autoComplete="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    autoFocus
                              />
                              <FormControl fullWidth style={{ margin: '10px 0 ' }}>
                                    <InputLabel id="demo-simple-select-label">
                                          Category
                                    </InputLabel>
                                    <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          label="category"
                                          value={categoryId}
                                          onChange={(e) => setPostCategory(e.target.value)}
                                    >
                                          {category.categories.map((cat) => (
                                                <MenuItem value={cat._id} key={cat._id}>
                                                      {cat.name}
                                                </MenuItem>
                                          ))}
                                    </Select>
                              </FormControl>
                              {loadEditor ? <Editor
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
                              /> : null}
                              <Button
                                    type="submit"
                                    style={{
                                          background: "#1976d2",
                                          color: "#fff",
                                          fontWeight: "bold",
                                          margin: "10px 0",
                                    }}
                              >
                                    Post a Question
                              </Button>

                        </form>
                  </div>
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

export default PostQuestion;
