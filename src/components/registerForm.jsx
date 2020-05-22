import React, { useState } from 'react';
import Jio from 'joi-browser';
import * as userService from '../services/userService';
import auth from '../services/authService';
import Form from '../services/formService';

const RegisterForm = props => {

    const [data, setData] = useState({ username: "", password: "", name: "" });
    const [errors, setErrors] = useState({});


    const schema = {
        username: Jio.string().required().email().label("Username"),
        password: Jio.string().required().min(5).label("Password"),
        name: Jio.string().required().label("Name")
    }

    const state = { data, setData, errors, setErrors, schema };

    const registerForm = Form(state);

    const handleSubmit = async (e) => {
        registerForm.handleSubmit(e);
        try {
            const response = await userService.register(data);
            auth.loginWithJwt(response.headers['x-auth-token']);
            window.location = "/";
        }
        catch (ex) {
            if (ex.response && ex.response.status === 400) {
                errors.username = ex.response.data;
                setErrors(errors);
            }
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                {registerForm.renderInput("username", "Username", "email")}
                {registerForm.renderInput("password", "Password", "password")}
                {registerForm.renderInput("name", "Name")}
                {registerForm.renderSubmit("Register")}
            </form>
        </div>
    )
}
export default RegisterForm;