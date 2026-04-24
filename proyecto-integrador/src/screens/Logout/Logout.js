import React, { Component } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies ()

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    controlarCambios(event) {
        this.setState({ valor: event.target.value });
    }
    Logout() {
        cookies.remove("auth-user")
        this.props.history.push("/Login");
    }

    render () {
        return (
                <button onClick={() => this.Logout()}>Logout</button>
        )
    }
}

export default Logout;