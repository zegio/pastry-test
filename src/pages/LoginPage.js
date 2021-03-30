import React, { useState } from 'react'
import { Container, Form, Button, Row } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { loginUser } from '../api/login'
  
const LoginPage = () => {
  const history = useHistory()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const setToken = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken));
  }

  const handleSubmit = async e => {
    e.preventDefault(); 
    const res = await loginUser({
      email,
      password
    });
    
    if(res.token){
      setToken(res);
      history.push('/admin/dashboard')
    } else {
      setError(<div>email/password errati</div>)
    }
  }

  return (
    <Container>
      <h1>Login</h1>
      <Row className='mt-40'>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
          </Form.Group>
          {error}
          <Button variant="primary" type="submit">
            Accedi
          </Button>
        </Form>
      </Row>
      <br />
      <strong>Utenti</strong>
      <ul>
        <li>u: luana@mail.com / p: password</li>
        <li>u: maria@mail.com / p: password1</li>
      </ul>
    </Container>
  )
}


export default LoginPage
