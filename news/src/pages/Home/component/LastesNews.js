import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AutoSlider from '../../../components/AutoSlider';
import axios from 'axios'
import NewCard from '../../../components/NewCard';
import LoadingSpinner from '../../../Utils/LoadingSpinner';

function LastesNews() {

  const [lastNews,setLastNews] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios.get('https://api.spaceflightnewsapi.net/v4/articles/?limit=4&&offset=4')
      .then(res => {
        setLastNews(res.data.results);
        setLoading(false); 
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false); 
      });
  }, []);

  return (
    <>
        <Container  className='mt-5'>
          {loading ? (
            <div style={{marginLeft: '50%'}}>
              <LoadingSpinner/>
            </div>
          )
          :
          (
            <Row>
            <Col>
                <AutoSlider/>
            </Col>
            <Col>
            <div className='d-flex flex-wrap' style={{gap:"5px"}}>
              {lastNews && lastNews.map(ln => (
                
                  <NewCard id={ln.id} src={ln.image_url} title={ln.title} summary={ln.summary} news_site={ln.news_site} key={ln.id}/>
                
                ))
              }
              </div>
            </Col>
        </Row>
          )}
        </Container>

        <hr/>
    </>
  )
}

export default LastesNews