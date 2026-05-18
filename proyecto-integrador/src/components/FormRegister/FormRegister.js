import { useState } from "react";
import { withRouter } from 'react-router-dom';
import Cookies from "universal-cookie";
import "./FormRegister.css";

const cookies = new Cookies();

function FormRegister (props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensajeError, setMensajeError] = useState('');

    const controlarUsername = (event) => setUsername(event.target.value);
    const controlarEmail = (event) => setEmail(event.target.value);
    const controlarPassword = (event) => setPassword(event.target.value);

    const Submit = (event) => {
        event.preventDefault();
        const usuarioACrear = {
            username: username,
            email: email,
            password: password,
            createdAt: Date.now() 
        };

        if (username.length < 3) {
            setMensajeError("La extensión del username debe ser minimo de 3");
            return
        }

        if (!email.includes("@")) {
            setMensajeError("email mal formateado")
            return
        }

        if (password.length < 6) {
            setMensajeError("La extensión del password debe ser de mas de 6 caracteres" )
            return
        }

        let usersStorage = localStorage.getItem("user");

        if (usersStorage !== null) {
            let usersParseado = JSON.parse(usersStorage);
            let usersFiltrados = usersParseado.filter(user => user.email === email);
            
            if (usersFiltrados.length > 0) {
                setMensajeError("Ya existe un usuario con el email ingresado" )
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
            setMensajeError("Ya existe un usuario asociado a ese email, pruebe otro")
        }

        props.history.push("/Login");
    }

        return (
            <section className="register-container">
                <form className="register-form" onSubmit={(event) => Submit(event)}>
                    <h2>Registro de Usuario</h2>

                    <input type="text" name="username" placeholder="Nombre de usuario"
                        onChange={(event) => controlarUsername(event)} value={username} />

                    <input type="email" name="email" placeholder="Email"
                        onChange={(event) => controlarEmail(event)} value={email} />

                    <input type="password" name="password" placeholder="Password"
                        onChange={(event) => controlarPassword(event)} value={password} />

                    <label className="error-msg">{mensajeError}</label>

                    <button type="submit">Registrarme</button>
                </form>
            </section>
        );
    }

export default withRouter(FormRegister);