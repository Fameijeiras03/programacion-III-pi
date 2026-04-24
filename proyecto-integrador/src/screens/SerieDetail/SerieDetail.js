import React, { Component } from "react";
import Cookies from "universal-cookie";
import "../MovieDetail/MovieDetail.css"

const cookies = new Cookies();

class SerieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serie: null,
            esFavorito: false
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=e6ab0746b9dd21afaaa10cb1e2ec2d13&language=es-ES`)
            .then(response => response.json())
            .then(data => {
                this.setState({ serie: data });

                let storage = localStorage.getItem("favoritesSeries");
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
        let storage = localStorage.getItem("favoritesSeries");
        let favs = [];
        if (storage !== null) {
            favs = JSON.parse(storage);
        }
        favs.push(this.state.serie);
        localStorage.setItem("favoritesSeries", JSON.stringify(favs));
        this.setState({ esFavorito: true });
    }

    sacarFav() {
        let storage = localStorage.getItem("favoritesSeries");
        if (storage !== null) {
            let storageParseado = JSON.parse(storage);
            let storageFiltrado = storageParseado.filter(fav => fav.id !== this.state.serie.id);
            localStorage.setItem("favoritesSeries", JSON.stringify(storageFiltrado));
        }
        this.setState({ esFavorito: false });
    }

    render() {
        if (this.state.serie === null) {
            return <p>Cargando serie...</p>;
        }

        const s = this.state.serie;
        const userLogged = cookies.get("auth-user");

        return (
            <section className="movie-detail">
                <img src={`https://image.tmdb.org/t/p/w500${s.poster_path}`} alt={s.name} />
                
                <div className="info-detalle">
                    <h1>{s.name}</h1>
                    <p>Rating: {s.vote_average}</p>
                    <p>Estreno: {s.first_air_date}</p>
                    <p>Episodios: {s.number_of_episodes}</p>
                    <p>Sinopsis: {s.overview}</p>
                    <p>Géneros: {s.genres.map(g => g.name + ",  ")}</p>

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

export default SerieDetail;
