import React, { useState } from 'react';
import Joi from 'joi-browser';
import auth from '../services/authService';
import { Redirect } from 'react-router-dom';
import Form from '../services/formService';


const LoginForm = (props) => {
    
    const [data, setData] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({});

    const schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }
    const state = { data, setData, errors, setErrors, schema };

    const loginForm = Form(state);

    const handleSubmit = async (e) => {
        loginForm.handleSubmit(e);
        try {
            await auth.login(data.username, data.password);
            const { state } = props.location;
            window.location = state ? state.from.pathname : "/";

        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                errors.username = ex.response.data;
                setErrors(errors);
            }
        }
    }

    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                {loginForm.renderInput("username", "Username")}
                {loginForm.renderInput("password", "Password", "password")}
                {loginForm.renderSubmit("Login")}
            </form>
        </div>
    );
}

export default LoginForm;