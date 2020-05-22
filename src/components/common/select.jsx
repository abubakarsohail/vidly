import React from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const Select = ({ name, label, error, options, ...rest }) => {
    return (
        <Form.Group>
            <Form.Label htmlFor={name}>
                {label}
            </Form.Label>
            <Form.Control as="select" name={name} id={name} {...rest}>
                <option value="" />
                {options.map(option => <option key={option._id} value={option._id}>{option.name}</option>)}
            </Form.Control>
            {error && <Alert variant="danger">{error}</Alert>}
        </Form.Group>
    );
}

export default Select;