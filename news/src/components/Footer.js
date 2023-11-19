import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Footer() {
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <p className='text-sm'>Copyright © FreshNews, 2023</p>
      </Container>
    </Navbar>
    </>
  )
}

export default Footer