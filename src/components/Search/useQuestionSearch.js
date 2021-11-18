import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../urlConfig";
import { useSelector } from "react-redux";

const UseQuestionSearch = (query, pageNumber) => {

      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(false);
      const [questions, setQuestions] = useState([])
      const [hasMore, setHasMore] = useState(false);
      const auth = useSelector((state) => {
            return state.auth;
      });


      useEffect(() => {
            setQuestions([])
      }, [query])

      useEffect(() => {
            setLoading(true);
            setError(false);
            let cancel;
            axios
                  .get(
                        `${api}/search?search=${query}&page=${pageNumber}`,
                        {
                              headers: {
                                    "Content-type": "application/json",
                                    Authorization: auth.token ? `Bearer ${auth.token}` : "",
                              },
                              cancelToken: new axios.CancelToken(c => cancel = c),
                        },
                  )
                  .then((res) => {
                        setQuestions(prevQ => {
                              return [...new Set([...prevQ, ...res.data.questions.map(ques => ques)])];
                        })
                        setHasMore(res.data.questions.length > 0)
                        setLoading(false);
                  })
                  .catch((e) => {
                        if (axios.isCancel(e)) return;
                        setError(true);
                  });

            return () => cancel();
      }, [query, pageNumber]);

      return { loading, error, hasMore, questions };
};

export default UseQuestionSearch;
