import React, { useState } from 'react';
// import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations';
import { Button, Card, Form, Row } from 'react-bootstrap';

export default function Signup(props) {

    const [formState, setFormState] = useState({ 
        email: '', 
        password: '' 
    })

    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      
      console.log(data)

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };


    return (
        // <div>
        //     {/* <Link to="/signup">Don't have an account? Signup!</Link> */}

        //     <h2>Login</h2>
        //     <form onSubmit={handleFormSubmit}>
        //         <div>
        //             <label htmlFor='email'>Email:</label>
        //             <input
        //                 placeholder='Email'
        //                 name='email'
        //                 type='email'
        //                 id='email'
        //                 value={formState.email}
        //                 onChange={handleChange}
        //             />
        //         </div>
        //         <div>
        //             <label htmlFor='password'>Password:</label>
        //             <input
        //                 placeholder='Password'
        //                 name='password'
        //                 type='password'
        //                 id='password'
        //                 value={formState.password}
        //                 onChange={handleChange}
        //             />
        //         </div>
        //         <div>
        //             <button type='submit'>Submit</button>
        //         </div>
        //     </form>
        // </div>

        <Card style={{ padding: 30 }}>
        {" "}
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Enter Email"
            />

          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Enter Password"
            />
          </Form.Group>
          <Row className="justify-content-center">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Row>
        </Form>

      </Card>


    )

}
