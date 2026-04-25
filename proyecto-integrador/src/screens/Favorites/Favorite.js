import React, { Component } from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import "./Favorite.css";

const cookies = new Cookies();

class Favorite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            series: [],
            cargando: true
        };
    }

    componentDidMount() {
        const userLogged = cookies.get("auth-user");

        if (userLogged === undefined) {
            this.props.history.push("/Login");
            return;
        }

        let storageMovies = localStorage.getItem("favoritesMovies");
        let storageSeries = localStorage.getItem("favoritesSeries");

        if (storageMovies !== null) {
            let idsMovies = JSON.parse(storageMovies);
            for (let i = 0; i < idsMovies.length; i++) {
                let id = idsMovies[i];
                fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e6ab0746b9dd21afaaa10cb1e2ec2d13&language=es-ES`)
                    .then((res) => res.json())
                    .then((data) => {
                        this.setState((prevState) => ({
                            movies: prevState.movies.concat(data),
                            cargando: false
                        }));
                    })
                    .catch((err) => console.log(err));
            }
        }

        if (storageSeries !== null) {
            let idsSeries = JSON.parse(storageSeries);
            for (let i = 0; i < idsSeries.length; i++) {
                let id = idsSeries[i];
                fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=e6ab0746b9dd21afaaa10cb1e2ec2d13&language=es-ES`)
                    .then((res) => res.json())
                    .then((data) => {
                        this.setState((prevState) => ({
                            series: prevState.series.concat(data),
                            cargando: false
                        }));
                    })
                    .catch((err) => console.log(err));
            }
        }

        if (storageMovies === null && storageSeries === null) {
            this.setState({ cargando: false });
        }
    }

    eliminar(id, tipo) {
        if (tipo === "movie") {
            let storage = JSON.parse(localStorage.getItem("favoritesMovies"));
            let filtro = storage.filter((favId) => favId !== id);
            localStorage.setItem("favoritesMovies", JSON.stringify(filtro));
            
            let actualizacionEstado = this.state.movies.filter((item) => item.id !== id);
            this.setState({ movies: actualizacionEstado });
        } else {
            let storage = JSON.parse(localStorage.getItem("favoritesSeries"));
            let filtro = storage.filter((favId) => favId !== id);
            localStorage.setItem("favoritesSeries", JSON.stringify(filtro));
            
            let actualizacionEstado = this.state.series.filter((item) => item.id !== id);
            this.setState({ series: actualizacionEstado });
        }
    }

    render() {
        if (this.state.cargando && this.state.movies.length === 0 && this.state.series.length === 0) {
            return <p className="mensaje-estado">Cargando tus favoritos...</p>;
        }

        return (
            <section className="favorites-page">
                <h2 className="favorites-header">Mis Películas Favoritas</h2>
                <div className="container">
                    <div className="row">
                        {this.state.movies.length === 0 ? (
                            <p className="empty-msg">No tienes películas favoritas guardadas.</p>
                        ) : (
                            this.state.movies.map((movie, idx) => (
                                <div key={movie.id + idx} className="col-12 col-md-3">
                                    <article className="fav-card-propia">
                                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                        <div className="fav-content">
                                            <h4>{movie.title}</h4>
                                            <div className="fav-botones">
                                                <Link to={`/MovieDetail/${movie.id}`} className="btn-detalle-recto">DETALLE</Link>
                                                <button className="btn-eliminar-recto" onClick={() => this.eliminar(movie.id, "movie")}>ELIMINAR</button>
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
                        {this.state.series.length === 0 ? (
                            <p className="empty-msg">No tienes series favoritas guardadas.</p>
                        ) : (
                            this.state.series.map((serie, idx) => (
                                <div key={serie.id + idx} className="col-12 col-md-3">
                                    <article className="fav-card-propia">
                                        <img src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} alt={serie.name} />
                                        <div className="fav-content">
                                            <h4>{serie.name}</h4>
                                            <div className="fav-botones">
                                                <Link to={`/SeriesDetail/${serie.id}`} className="btn-detalle-recto">DETALLE</Link>
                                                <button className="btn-eliminar-recto" onClick={() => this.eliminar(serie.id, "serie")}>ELIMINAR</button>
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