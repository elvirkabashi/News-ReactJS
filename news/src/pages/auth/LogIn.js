import { useLocalStorage } from '@uidotdev/usehooks';
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function LogIn() {
  const [users] = useLocalStorage('users', [])
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isloggedin')
  const navigate = useNavigate()

  useEffect(() => {
    if(isLoggedIn != null) {
      navigate("/");
    }
  }, [])

  const handleLogin = e => {
    e.preventDefault()
    const form = e.target.elements
    const email = form[0].value
    const password = form[1].value
    const db_users = users.filter(user => (user.email === email && user.password === password))
    console.log(db_users)
    if(db_users.length > 0) {
      setIsLoggedIn(db_users[0])
      navigate("/");
    } else {
      alert(`Invalid credentials!`)
    }
  }
  
  return (
    <section className="mt-4">
      <div className="container">
        <Form className="mx-auto w-50" onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" required placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" required placeholder="Password" />
          </Form.Group>
          <div className='d-flex align-items-center justify-content-between'>
          <div>
          <Button variant="primary" type="submit">
            Login
          </Button>
          </div>

          <p className="mt-2">If you don't have an account? <a href="singup"
            className="fw-bold text-body"><u>SingUp</u></a></p>

          </div>
        </Form>
      </div>
    </section>
  )
}

export default LogIn