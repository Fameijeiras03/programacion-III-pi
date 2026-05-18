import{ useState , useEffect } from "react";
import { withRouter } from 'react-router-dom';
import Cookies from "universal-cookie"
import "./FormLogin.css";

const cookies = new Cookies()

function FormLogin (props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensajeError, setMensajeError] = useState('');

    const controlarEmail = (event) => setEmail(event.target.value);
    const controlarPassword = (event) => setPassword(event.target.value);

    const Submit = (event) => {
        event.preventDefault();
        const usersStorage = localStorage.getItem("user");

        if (usersStorage == null) {
            setMensajeError("Credenciales incorrectas");
            return;
        } else {
            let usersParseado = JSON.parse(usersStorage);
            let usersFiltrado = usersParseado.filter(user => user.email === email);

            if (usersFiltrado.length === 0) {
                setMensajeError("Credenciales incorrectas");
                return;
            } else {
                if (usersFiltrado[0].password === password) {
                    sessionStorage.setItem("usuarioEnSesion", JSON.stringify({ sesionActiva: true }));
                    cookies.set('auth-user', usersFiltrado[0].email);
                    props.history.push("/");
                } else {
                    setMensajeError("Credenciales incorrectas");
                    return;
                }
            }
        }
    }
    
        return (
            <section className="login-container">
                <form className="login-form" onSubmit={(event) => Submit(event)}>

                    <h2>Login</h2>
                    
                    <input type="email" name="email" placeholder="email"
                        onChange={(event) => controlarEmail(event)} value={email} />

                    <input type="password" name="password" placeholder="password"
                        onChange={(event) => controlarPassword(event)} value={password} />

                    <label className="error-msg">{mensajeError}</label>

                    <button type="submit">Loguearme</button>

                </form>
            </section>
        );
    }

export default withRouter(FormLogin);