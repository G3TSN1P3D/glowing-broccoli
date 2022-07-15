import React, { useState } from 'react';
// import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

export default function Signup(props) {
    const [formState, setFormState] = useState({ email: '', password: '', first_name: '', last_name: '' })
    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addUser({
            variables: {
                first_name: formState.first_name,
                last_name: formState.last_name,
                email: formState.email,
                password: formState.password
            }
        })
        const token = mutationResponse.data.addUser.token;
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
            {/* <Link to="/login">Go to Login</Link> */}

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
        </div>
    )

}