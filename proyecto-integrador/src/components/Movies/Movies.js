import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import './Movies.css';

const cookies = new Cookies();

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verMas: false,
            esFavorito: false
        };
    }

    componentDidMount() {
        let storage = localStorage.getItem("favoritesMovies");
        if (storage !== null) {
            let storageParseado = JSON.parse(storage);
            let esta = storageParseado.includes(this.props.results.id);
            if (esta) {
                this.setState({ esFavorito: true });
            }
        }
    }

    agregarFavorito() {
        let storage = localStorage.getItem("favoritesMovies");
        let favoritesMovies = [];

        if (storage !== null) {
            favoritesMovies = JSON.parse(storage);
        }

        favoritesMovies.push(this.props.results.id);
        localStorage.setItem("favoritesMovies", JSON.stringify(favoritesMovies));
        
        this.setState({ esFavorito: true });
    }

    sacarFavorito() {
        let storage = localStorage.getItem("favoritesMovies");
        if (storage !== null) {
            let storageParseado = JSON.parse(storage);
            let storageFiltrado = storageParseado.filter(id => id !== this.props.results.id);
            
            localStorage.setItem("favoritesMovies", JSON.stringify(storageFiltrado));
        }
        
        this.setState({ esFavorito: false });
    }

    btnVerMas() {
        this.setState({ verMas: !this.state.verMas });
    }

    render() {
        let btn = 'Ver Mas';
        let detalleMovie = null;
        let movie = this.props.results;

        if (this.state.verMas === true) {
            btn = 'Ver Menos';
            detalleMovie = <p>{movie.overview}</p>;
        }

        const userLogged = cookies.get("auth-user");

        return (
            <article className="single-card-movie">
                <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} className="card-img-top" alt={movie.title} />
                <div className="cardBody">
                    <h5 className="card-title">{movie.title}</h5>
                    
                    {detalleMovie}
                    
                    <button className='btn btn-primary' onClick={() => this.btnVerMas()}>
                        {btn}
                    </button> 
                    
                    <Link to={`/MovieDetail/${movie.id}`} className='btn btn-primary'>
                        Detalle
                    </Link> 

                    {userLogged !== undefined ? (
                        this.state.esFavorito === false ? (
                            <button className='btn alert-primary' onClick={() => this.agregarFavorito()}>
                                Agregar a favoritos
                            </button>
                        ) : (
                            <button className='btn alert-danger' onClick={() => this.sacarFavorito()}>
                                Sacar de favoritos
                            </button>
                        )
                    ) : null}
                </div>
            </article>
        );
    }
}

export default Movies;