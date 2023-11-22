import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios'

function Footer() {

  const [newsSite,setNewsSite] = useState()

  useEffect(() => {
    axios.get(`https://api.spaceflightnewsapi.net/v4/info/`)
    .then(res => {
      setNewsSite(res.data.news_sites);
    })
  },[])

  return (
    <>
    <Navbar className='nav-bg mt-auto' >
      <Container className="d-flex justify-content-between">
          <div className='d-flex align-items-center'>
            <p className='text-sm text-white'>Copyright © FreshNews, 2023</p>
          </div>

          <div style={{maxWidth:'75%'}}>
            <h5 className='text-center text-white'>Find by news site</h5>
            <div className='footer d-flex flex-wrap' >
              {newsSite && newsSite.map(s => (
                 <a href='' key={s} >
                  <small className='text-white px-2'>{s}</small>
                  </a>
              ))}
            </div>

          </div>
      </Container>
    </Navbar>
    </>
  )
}

export default Footer