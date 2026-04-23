import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import Cookies from "universal-cookie"
import "./FormLogin.css";

const cookies = new Cookies()

class FormLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            mensajeError: ""
        };
    }

    controlarCambios(event, campo) {
        this.setState({ [campo]: event.target.value });
    }

    Submit(event) {
        event.preventDefault();
        const usersStorage = localStorage.getItem("user");
        if (usersStorage == null) {
            this.setState({ mensajeError: "Credenciales incorrectas" });
            return;
        } else {
            let usersParseado = JSON.parse(usersStorage);
            let usersFiltrado = usersParseado.filter(user => user.email === this.state.email);
            if (usersFiltrado.length === 0) {
                this.setState({ mensajeError: "Credenciales incorrectas" });
                return;
            } else {
                if (usersFiltrado[0].password === this.state.password) {
                    sessionStorage.setItem("usuarioEnSesion", JSON.stringify({ sesionActiva: true }));
                    cookies.set('auth-user', usersFiltrado[0].email);
                    this.props.history.push("/");
                } else {
                    this.setState({ mensajeError: "Credenciales incorrectas" });
                    return;
                }
            }
        }
    }
    render() {
        return (
            <section className="login-container">
                <form className="login-form" onSubmit={(event) => this.Submit(event)}>

                    <h2>Login</h2>
                    
                    <input type="email" name="email" placeholder="email"
                        onChange={(event) => this.controlarCambios(event, "email")} value={this.state.email} />

                    <input type="password" name="password" placeholder="password"
                        onChange={(event) => this.controlarCambios(event, "password")} value={this.state.password} />

                    <label className="error-msg" onChange={(event) => this.controlarCambios(event, "mensajeError")}>{this.state.mensajeError}</label>

                    <button type="submit">Loguearme</button>

                </form>
            </section>
        );
    }
}

export default withRouter(FormLogin);