import React from 'react';
import Joi from 'joi-browser';
import Input from '../components/common/input';
import Select from '../components/common/select';

export const Form = (state) => {
    const { data, setData, errors, setErrors } = state;

    const validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(data, state.schema, options);

        if (!error) return null;
        const errors = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    }

    const validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: state.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    }

    const handleSubmit = e => {
        e.preventDefault();

        const errors = validate();
        setErrors({ errors: errors || {} });
        if (errors) return;
    }

    const handleChange = ({ currentTarget: input }) => {
        const errorMessage = validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
    
        setData({...data, [input.name]: input.value});
        setErrors({...errors});
    }

    const renderSubmit = (label, handleSubmit) => {
        return <button disabled={validate()} className="btn btn-primary" onClick={handleSubmit}>{label}</button>
    }

    const renderInput = (name, label, type = "text") => {
        return (
            <Input
                type={type}
                name={name}
                value={data[name]}
                label={label}
                onChange={handleChange}
                error={errors[name]}
            />
        );
    }

    const renderSelect = (name, label, options) => {
        return (
            <Select
                name={name}
                label={label}
                value={data[name]}
                onChange={handleChange}
                error={errors[name]}
                options={options}
            />
        )
    }

    return { renderInput, renderSelect, renderSubmit, handleSubmit };
}
export default Form;