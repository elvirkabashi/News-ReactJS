import React, { useEffect, useState } from 'react'
import NewCard from '../../components/NewCard'
import axios from 'axios'
import Pagination from '../../Utils/Paginatioon'
import LoadingSpinner from '../../Utils/LoadingSpinner'
//import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form';



function News() {

  const [news,setNews] = useState()
  const [limit,setLimit] = useState(20)
  const [offset,setOffset] = useState(0)
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
    axios.get(`https://api.spaceflightnewsapi.net/v4/articles/?limit=${limit}&offset=${offset}`)
      .then(res => {
        setNews(res.data.results);
        setLoading(false); 
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  
    window.scroll(0,0);
  }, [offset,limit]);

  const handlePageChange = (newOffset) => {
    setOffset(newOffset);
  };

  const handleRritePagen = (e) =>{
    const newLimit = parseInt(e.target.value, 10);
    setLimit(newLimit);
    setOffset(0);
  }

  return (
    <>
      <div className='container'>
      
        <div className='d-flex justify-content-between'>
          <h1>News</h1>

          <div className='m-5'>
            Show per page
            <Form.Select onChange={handleRritePagen} value={limit}>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="20">20</option>
              <option value="32">32</option>
            </Form.Select>
          </div>
        </div>

        {loading ? (
          <div style={{marginLeft: '50%'}}>
            <LoadingSpinner/>
          </div>
        ) : (
          <>
            <div className='d-flex gap-3 flex-wrap'>
              {news && news.map(newss => (
                <div key={newss.id}>
                  <NewCard id={newss.id} src={newss.image_url} title={newss.title} summary={newss.summary} news_site={newss.news_site} published={newss.published_at} url={newss.url}/>
                </div>
              ))}
            </div>
            <div className='d-flex justify-content-center my-5'>
              <Pagination limit={limit} offset={offset} onPageChange={handlePageChange}/>
            </div>
          </>
        )}
      </div>
    </>
  );
  
}

export default News