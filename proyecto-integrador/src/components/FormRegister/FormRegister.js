import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import Cookies from "universal-cookie"
import "./FormRegister.css";

const cookies = new Cookies ()

class FormRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
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
        const usuarioACrear = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            createdAt: Date.now() 
        };

        if (this.state.username.length < 3) {
            this.setState({ mensajeError: "La extensión del username debe ser minimo de 3" })
            return
        }

        if (!this.state.email.includes("@")) {
            this.setState({ mensajeError: "email mal formateado" })
            return
        }

        if (this.state.password.length < 6) {
            this.setState({ mensajeError: "La extensión del password debe ser de mas de 6 caracteres" })
            return
        }

        let usersStorage = localStorage.getItem("user");

        if (usersStorage !== null) {
            let usersParseado = JSON.parse(usersStorage);
            let usersFiltrados = usersParseado.filter(user => user.email === this.state.email);
            
            if (usersFiltrados.length > 0) {
                this.setState({ mensajeError: "Ya existe un usuario con el email ingresado" })
                return
            } else {
                usersParseado.push(usuarioACrear)
                let usersEnJson = JSON.stringify(usersParseado)
                localStorage.setItem("user", usersEnJson)
            }
        } else {
            let usersInicial = [usuarioACrear];
            let usersEnJson = JSON.stringify(usersInicial)
            localStorage.setItem("user", usersEnJson)
        }

        if (usuarioACrear) {
            cookies.set('user-auth-cookie', usuarioACrear.email);
        } else {
            this.setState({ mensajeError: "Ya existe un usuario asociado a ese email, pruebe otro" })
        }

        this.props.history.push("/Login");
    }

    render() {
        return (
            <section className="register-container">
                <form className="register-form" onSubmit={(event) => this.Submit(event)}>
                    <h2>Registro de Usuario</h2>

                    <input type="text" name="username" placeholder="Nombre de usuario"
                        onChange={(event) => this.controlarCambios(event, 'username')} value={this.state.username} />

                    <input type="email" name="email" placeholder="Email"
                        onChange={(event) => this.controlarCambios(event, "email")} value={this.state.email} />

                    <input type="password" name="password" placeholder="Password"
                        onChange={(event) => this.controlarCambios(event, "password")} value={this.state.password} />

                    <label className="error-msg" onChange={(event) => this.controlarCambios(event , "mensajeError")}>{this.state.mensajeError}</label>

                    <button type="submit">Registrarme</button>
                </form>
            </section>
        );
    }
}

export default withRouter(FormRegister);