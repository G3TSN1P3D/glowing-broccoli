import React, { useState } from 'react';
// import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations';

export default function Signup(props) {
    const [formState, setFormState] = useState({ email: '', password: '', first_name: '', last_name: '' })
    const [loginUser] = useMutation(LOGIN_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await loginUser({
            variables: {
                email: formState.email,
                password: formState.password
            }
        })
        const token = mutationResponse.data.loginUser.token;
        Auth.login(token);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return (
        <div>
            {/* <Link to="/signup">Don't have an account? Signup!</Link> */}

            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
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
        </div>
    )

}
