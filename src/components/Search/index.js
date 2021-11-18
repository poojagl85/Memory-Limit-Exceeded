import React, { useState, useRef, useCallback } from 'react';
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
                        <input placeholder="Search" value={query} onChange={handleSearch} style={{ width: '350px' }} />
                  </div>
                  <div class="searchScroll" style={{ maxHeight: '500px', overflow: 'scroll', position: 'absolute', backgroundColor: 'white', zIndex: '100', margin: '10px 0px', width: '350px', padding: '10px' }}>
                        {questions.map((ques, idx) => {
                              if (idx + 1 == questions.length) {
                                    return <div ref={lastQuestionRef} className="box" key={ques._id} >
                                          <h6>{ques.title}</h6>
                                          <p style={{ height: '22px', overflow: 'hidden', margin: '0' }}>{ques.description}</p>
                                          {/* <hr /> */}
                                    </div>
                              } else {
                                    return <div className="box" key={ques._id} >
                                          <h6>{ques.title}</h6>
                                          <p style={{ height: '22px', overflow: 'hidden', margin: '0', }}>{ques.description}</p>
                                          <hr />
                                    </div>
                              }
                        })}
                  </div>

                  {/* <div>{loading && 'Loading...'}</div>
                  <div>{error && 'Error...'}</div> */}
            </div >


      );
}

export default Search;
