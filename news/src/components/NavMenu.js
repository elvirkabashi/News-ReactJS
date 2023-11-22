import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import '../pages/css/button.css'
import { useLocalStorage } from '@uidotdev/usehooks';
import { useNavigate } from "react-router-dom";



function NavMenu() {
  const [isLoggedIn,setIsLoggedIn] = useLocalStorage('isloggedin')
  const navigate = useNavigate()


  const handleLogout = () =>{
    setIsLoggedIn(null)
    navigate("/");
  }

  return (
    <>
      <Navbar className='nav-bg'>
        <Container>
          <Navbar.Brand href="/" className='text-white'>FreshNews</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/" className='text-white nlink'><span className='nlink'>Home</span></Nav.Link>
            <Nav.Link href="/news" className='text-white nlink'><span className='nlink'>News</span></Nav.Link>
            {isLoggedIn && <Nav.Link href="/dashboard" className='text-white nlink'><span className='nlink'>Dashboard</span></Nav.Link>}
          </Nav>
          {isLoggedIn ? 
          (<div>
            
          <button onClick={handleLogout} className="c-button c-button--gooey"> Logout
            <div className="c-button__blobs">
            <div></div>
            <div></div>
            <div></div>
            </div>
          </button>
          
          <svg style={{display: 'block', height: '0', width: '0'}} version="1.1" xmlns="http://www.w3.org/2000/svg">
              <defs>
                  <filter id="goo">
                      <feGaussianBlur result="blur" stdDeviation="10" in="SourceGraphic"></feGaussianBlur>
                      <feColorMatrix result="goo" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" mode="matrix" in="blur">
                      </feColorMatrix>
                      <feBlend in2="goo" in="SourceGraphic"></feBlend>
                  </filter>
              </defs>
      </svg>
          </div>)
          :
          (<div className='d-flex'>
          <a href='/login'>
          <button className="c-button c-button--gooey"> Log In
            <div className="c-button__blobs">
            <div></div>
            <div></div>
            <div></div>
            </div>
          </button>
          </a>
          <svg style={{display: 'block', height: '0', width: '0'}} version="1.1" xmlns="http://www.w3.org/2000/svg">
              <defs>
                  <filter id="goo">
                      <feGaussianBlur result="blur" stdDeviation="10" in="SourceGraphic"></feGaussianBlur>
                      <feColorMatrix result="goo" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" mode="matrix" in="blur">
                      </feColorMatrix>
                      <feBlend in2="goo" in="SourceGraphic"></feBlend>
                  </filter>
              </defs>
      </svg>

        </div>)}
        </Container>
      </Navbar>

            
    </>
  )
}

export default NavMenu