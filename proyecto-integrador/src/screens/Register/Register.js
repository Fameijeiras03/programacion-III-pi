import React, { Component } from 'react';
import FormRegister from '../../components/FormRegister/FormRegister';

class Register extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main>
                <FormRegister />
            </main>
        );
    }
}

export default Register;
