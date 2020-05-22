import React from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const Input = ({ name, label, error, ...rest }) => {
    return (
        <Form.Group>
            <Form.Label htmlFor={name}>
                {label}
            </Form.Label>
            <Form.Control {...rest} name={name} id={name} />
            {error && <Alert variant="danger">{error}</Alert>}
        </Form.Group>
    );
}

export default Input;