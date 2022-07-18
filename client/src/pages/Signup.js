import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

export default function Signup(props) {
    const [formState, setFormState] = useState({ 
        first_name: '', 
        last_name: '',
        email: '', 
        password: ''
    })
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
      };

      const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
    
        try {
          const { data } = await addUser({
            variables: { ...formState },
          });
    
          Auth.login(data.addUser.token);
        } catch (e) {
          console.error(e);
        }
      };


    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor='first_name'>First Name:</label>
                    <input
                        placeholder='First'
                        name='first_name'
                        type='first_name'
                        id='first-name'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='last_name'>Last Name:</label>
                    <input
                        placeholder='Last'
                        name='last_name'
                        type='last_name'
                        id='last-name'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input
                        placeholder='Email'
                        name='email'
                        type='email'
                        id='email'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input
                        placeholder='Password'
                        name='password'
                        type='password'
                        id='password'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button type='submit'>Submit</button>
                </div>
            </form>
            <Link to="/login">Already have an account? Login!</Link>
        </div>
    )
    
}
