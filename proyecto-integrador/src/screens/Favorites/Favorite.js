import React, { Component } from "react";
import Cookies from "universal-cookie";
import Movies from "../../components/Movies/Movies";
import "./Favorite.css"

const cookies = new Cookies();

class Favorite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoritesMovies: [],
            favoritesSeries: []
        };
    }

    componentDidMount() {
        const userLogged = cookies.get("auth-user");

        if (!userLogged) {
            this.props.history.push("/Login");
            return;
        }

        let movies = [];
        let storageMovies = localStorage.getItem("favoritesMovies");
        if (storageMovies !== null) {
            movies = JSON.parse(storageMovies);
        }

        let series = [];
        let storageSeries = localStorage.getItem("favoritesSeries");
        if (storageSeries !== null) {
            series = JSON.parse(storageSeries);
        }

        this.setState({
            favoritesMovies: movies,
            favoritesSeries: series
        });
    }

    eliminarMovie(id) {
        let filtradas = this.state.favoritesMovies.filter(m => m.id !== id);
        this.setState({ favoritesMovies: filtradas });
        localStorage.setItem("favoritesMovies", JSON.stringify(filtradas));
    }

    eliminarSerie(id) {
        let filtradas = this.state.favoritesSeries.filter(s => s.id !== id);
        this.setState({ favoritesSeries: filtradas });
        localStorage.setItem("favoritesSeries", JSON.stringify(filtradas));
    }

    render() {
    return (
        <section className="favorites-page">
            <h2 className="favorites-header">Mis Películas Favoritas</h2>
            <div className="container">
                <div className="row">
                    {this.state.favoritesMovies.length === 0 ? (
                        <p className="empty-msg">No tenés películas favoritas.</p>
                    ) : (
                        this.state.favoritesMovies.map((movie) => (
                            <div key={movie.id} className="col-12 col-sm-6 col-md-3">
                                <article className="fav-card-propia">
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                    <div className="fav-content">
                                        <h4>{movie.title}</h4>
                                        <p>Rating: {movie.vote_average}</p>
                                        <div className="fav-botones">
                                            <a href={`/MovieDetail/${movie.id}`} className="btn-detalle-recto">Detalle</a>
                                            <button 
                                                className="btn-eliminar-recto" 
                                                onClick={() => this.eliminarMovie(movie.id)}
                                            >
                                                ELIMINAR
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <h2 className="favorites-header">Mis Series Favoritas</h2>
            <div className="container">
                <div className="row">
                    {this.state.favoritesSeries.length === 0 ? (
                        <p className="empty-msg">No tenés series favoritas.</p>
                    ) : (
                        this.state.favoritesSeries.map((serie) => (
                            <div key={serie.id} className="col-12 col-sm-6 col-md-3">
                                <article className="fav-card-propia">
                                    <img src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} alt={serie.name} />
                                    <div className="fav-content">
                                        <h4>{serie.name}</h4>
                                        <p>Rating: {serie.vote_average}</p>
                                        <div className="fav-botones">
                                            <a href={`/SerieDetail/${serie.id}`} className="btn-detalle-recto">Detalle</a>
                                            <button 
                                                className="btn-eliminar-recto" 
                                                onClick={() => this.eliminarSerie(serie.id)}
                                            >
                                                ELIMINAR
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
}

export default Favorite;