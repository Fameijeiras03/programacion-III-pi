import React, { Component } from "react";
import Cookies from "universal-cookie";
import "./MovieDetail.css";

const cookies = new Cookies();

class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: null,
            esFavorito: false
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e6ab0746b9dd21afaaa10cb1e2ec2d13&language=es-ES`)
            .then(response => response.json())
            .then(data => {
                this.setState({ movie: data });

                let storage = localStorage.getItem("favoritesMovies");
                if (storage !== null) {
                    let storageParseado = JSON.parse(storage);
                    let esta = storageParseado.filter(fav => fav.id === data.id);
                    if (esta.length > 0) {
                        this.setState({ esFavorito: true });
                    }
                }
            })
            .catch(error => console.log(error));
    }

    agregarFav() {
        let storage = localStorage.getItem("favoritesMovies");
        let favs = [];
        if (storage !== null) {
            favs = JSON.parse(storage);
        }
        favs.push(this.state.movie);
        localStorage.setItem("favoritesMovies", JSON.stringify(favs));
        this.setState({ esFavorito: true });
    }

    sacarFav() {
        let storage = localStorage.getItem("favoritesMovies");
        if (storage !== null) {
            let storageParseado = JSON.parse(storage);
            let storageFiltrado = storageParseado.filter(fav => fav.id !== this.state.movie.id);
            localStorage.setItem("favoritesMovies", JSON.stringify(storageFiltrado));
        }
        this.setState({ esFavorito: false });
    }

    render() {
        if (this.state.movie === null) {
            return <p>Cargando...</p>;
        }

        const m = this.state.movie;
        const userLogged = cookies.get("auth-user");

        return (
            <section className="movie-detail">
                <img src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} alt={m.title} />
                
                <div className="info-detalle">
                    <h1>{m.title}</h1>
                    <p>Rating: {m.vote_average}</p>
                    <p>Estreno: {m.release_date}</p>
                    <p>Duración: {m.runtime} minutos</p>
                    <p>Sinopsis: {m.overview}</p>
                    <p>Géneros: {m.genres.map(g => g.name + ",  ")}</p>

                    {userLogged !== undefined ? (
                        this.state.esFavorito === false ? (
                            <button type="button" onClick={() => this.agregarFav()}>
                                Agregar a favoritos
                            </button>
                        ) : (
                            <button type="button" onClick={() => this.sacarFav()}>
                                Sacar de favoritos
                            </button>
                        )
                    ) : null}
                </div>
            </section>
        );
    }
}

export default MovieDetail;