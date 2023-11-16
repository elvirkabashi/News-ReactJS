import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AutoSlider from '../../../components/AutoSlider';
import axios from 'axios'
import NewCard from '../../../components/NewCard';

function LastesNews() {

  const [lastNews,setLastNews] = useState();

  useEffect(() => {
    axios.get('https://api.spaceflightnewsapi.net/v4/articles/?limit=4&&offset=4')
    .then(res => {
      setLastNews(res.data.results)
      //setLoading(false)
    })
  }, [])

  return (
    <>
        <Container  className='mt-5'>
            <Row>
                <Col>
                    <AutoSlider/>
                </Col>
                <Col>
                <div className='d-flex flex-wrap' style={{gap:"5px"}}>
                  {lastNews && lastNews.map(ln => (
                    
                      <NewCard src={ln.image_url} title={ln.title} summary={ln.summary} news_site={ln.news_site} key={ln.id}/>
                    
                    ))
                  }
                  </div>
                </Col>
            </Row>
        </Container>

        <hr/>
    </>
  )
}

export default LastesNews