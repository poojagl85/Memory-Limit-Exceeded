import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import UseQuestionSearch from './useQuestionSearch';

const Search = () => {
      const [query, setQuery] = useState("");
      const [pageNumber, setPageNumber] = useState(1);

      const { loading, error, hasMore, questions } = UseQuestionSearch(query, pageNumber);

      const observer = useRef()
      const lastQuestionRef = useCallback((node) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                  if (entries[0].isIntersecting && hasMore) {
                        setPageNumber((prevPageNumber) => prevPageNumber + 1);
                  }
            });
            if (node) observer.current.observe(node);
      },
            [loading, hasMore]
      )

      function handleSearch(e) {
            setQuery(e.target.value);
            setPageNumber(1);
      }

      return (
            <div>
                  <div style={{
                        position: 'relative',
                        // top: 0
                  }}>
                        <input placeholder="Search" value={query} onChange={handleSearch} style={{ fontSize: '16px', width: '500px', borderRadius: '8px', padding: '0.4rem 1rem', outline: 'none', border: '1px solid #e1e1e1', borderBottomLeftRadius: query === '' || questions.length < 1 ? 8 : 0, borderBottomRightRadius: query === '' || questions.length < 1 ? 8 : 0 }} />
                  </div>
                  {query === '' || questions.length < 1 ? null : <div className="searchScroll">
                        {questions.map((ques, idx) => {
                              if (idx + 1 === questions.length) {
                                    return <Link to={`/${ques.type}/${ques.slug}`} replace ref={lastQuestionRef} key={ques._id} >
                                          <div className="box">
                                                <h6>{ques.type === 'question' ? ques.title : ques.name}</h6>
                                                {ques.type === 'question' ? <p dangerouslySetInnerHTML={{
                                                      __html: ques.description,
                                                }} /> : null}
                                          </div>


                                    </Link>
                              } else {
                                    return <Link to={`/${ques.type}/${ques.slug}`} key={ques._id} replace>
                                          <div className="box">
                                                <h6>{ques.type === 'question' ? ques.title : ques.name}</h6>
                                                {ques.type === 'question' ? <p dangerouslySetInnerHTML={{
                                                      __html: ques.description,
                                                }} /> : null}
                                          </div>


                                    </Link>
                              }
                        })}
                  </div>}



            </div >


      );
}

export default Search;
