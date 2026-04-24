import React, {Component} from "react";
import {Link} from "react-router-dom";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";


class Header extends Component{
    constructor(props){
        super(props)
        this.state={
            busqueda:"",
            tipo:""
        }

    }
    controlCambios(event){
            this.setState({busqueda: event.target.value})
        }

    controlRadio(event){
        this.setState({tipo: event.target.value})
    }

    controlEnvio(event){ // CHEQUEAR
        event.preventDefault()
        this.props.history.push(`/RdoBusqueda/${this.state.tipo}/${this.state.busqueda}`)
    }
    render(){

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

                    <form onSubmit={(event) => this.controlEnvio(event)}>
                        <input
                            type="text"
                            placeholder="Buscar..."
                            onChange={(event) => this.controlCambios(event)}
                        />
                        <label><input type="radio" name="tipo" value="movie" onChange={(event) => this.controlRadio(event)} required /> Películas</label>
                        <label><input type="radio" name="tipo" value="tv" onChange={(event) => this.controlRadio(event)} required /> Series</label>
                        <button type="submit">Buscar</button>
                    </form>

                </nav>

            </header> 
        
    );


}}



export default withRouter(Header);