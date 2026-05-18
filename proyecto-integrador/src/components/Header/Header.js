import {useState,useEffect} from "react";
import {Link} from "react-router-dom";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";


function Header() {
    const [busqueda, setBusqueda] = useState("");
    const [tipo, setTipo] = useState("");

    const controlCambios = (event) => {
        setBusqueda(event.target.value);
    };

    const controlRadio = (event) => {
        setTipo(event.target.value);
    };

    const controlEnvio = (event) => {
        event.preventDefault();
    };

    const cookies = new Cookies();
    const userLogged = cookies.get("auth-user");

    return (
        <header className="container">
            <h1>UdeSA Movies</h1>
            <nav>
                <ul className="nav nav-tabs my-4">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/allmovies">Películas</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/allseries">Series</a>
                    </li>
                    {userLogged && (
                        <>
                            <li className="nav-item">
                                <a className="nav-link" href="/favorites">Favoritos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/Logout">Logout</a>
                            </li>
                        </>
                    )}
                    {!userLogged && (
                        <>
                            <li className="nav-item">
                                <a className="nav-link" href="/register">Crear Cuenta</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Login</a>
                            </li>
                        </>
                    )}
                </ul>
                <form onSubmit={controlEnvio}>
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={busqueda}
                        onChange={controlCambios}
                    />
                    <label>
                        <input
                            type="radio"
                            name="tipo"
                            value="movie"
                            checked={tipo === "movie"}
                            onChange={controlRadio}
                        />
                        Películas
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="tipo"
                            value="tv"
                            checked={tipo === "tv"}
                            onChange={controlRadio}
                        />
                        Series
                    </label>
                    <button type="submit">Buscar</button>
                </form>
            </nav>
        </header>
    );
}

export default withRouter(Header);