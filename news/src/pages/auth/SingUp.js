import { useLocalStorage } from '@uidotdev/usehooks';
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function SingUp() {
    const [users, setUsers] = useLocalStorage('users', [])
    const [isLoggedIn] = useLocalStorage('isloggedin')
    const navigate = useNavigate()

    useEffect(() => {
        if(isLoggedIn != null) {
        navigate("/");
        }
    }, [isLoggedIn,navigate])

  const handleRegister = e => {
    e.preventDefault()
    const form = e.target.elements
    const user = {
      id: uuidv4(),
      fullname: form[0].value,
      email: form[1].value,
      password: form[2].value,
    }

    if(users.filter(ls_user => user.email === ls_user.email).length > 0) {
      alert(`${user.email} is already is use! Please choose different email address.`)
    } else {
      setUsers([...users, user])
      //setIsLoggedIn(user)
      navigate("/   ");
    }
  }
  
  return (
    <section className="mt-4">
      <div className="container">
        <Form className="mx-auto w-50" onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Fullname</Form.Label>
            <Form.Control type="text" name="fullname" required placeholder="Enter fullname" />
          </Form.Group>
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
            Register
          </Button>
          </div>

          <p className="mt-2">If you have an account? <a href="login"
            className="fw-bold text-body"><u>LogIn</u></a></p>

          </div>
        </Form>
      </div>
    </section>
  )
}

export default SingUp