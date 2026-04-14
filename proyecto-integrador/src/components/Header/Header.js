import React from "react";

function Header() {


    const usuarioLogueado= false; 

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


                    {usuarioLogueado && (
                        <li className="nav-item">
                            <a className="nav-link" href="/favorites">Favoritos</a>
                        </li>
                    )}

                    
                    {!usuarioLogueado && (
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
            </nav>

        </header>
    );
}

export default Header;