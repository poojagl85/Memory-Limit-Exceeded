import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../urlConfig";

const UseQuestionSearch = (query, pageNumber) => {

      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(false);
      const [questions, setQuestions] = useState([])
      const [hasMore, setHasMore] = useState(false);


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

                              cancelToken: new axios.CancelToken(c => cancel = c),

                        },
                  )
                  .then((res) => {
                        setQuestions(prevQ => {
                              return [...new Set([...prevQ, ...res.data.results.map(ques => ques)])];
                        })
                        setHasMore(res.data.results.length > 0)
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
