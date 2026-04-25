import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Series extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verMas: false,
            esFavorito: false
        };
    }

    componentDidMount() {
        let storage = localStorage.getItem("favoritesSeries");
        if (storage !== null) {
            let storageParseado = JSON.parse(storage);
            let esta = storageParseado.includes(this.props.results.id);
            if (esta) {
                this.setState({ esFavorito: true });
            }
        }
    }

    agregarFavorito() {
        let storage = localStorage.getItem("favoritesSeries");
        let favoritesSeries = [];

        if (storage !== null) {
            favoritesSeries = JSON.parse(storage);
        }

        favoritesSeries.push(this.props.results.id);
        localStorage.setItem("favoritesSeries", JSON.stringify(favoritesSeries));
        this.setState({ esFavorito: true });
    }

    sacarFavorito() {
        let storage = localStorage.getItem("favoritesSeries");
        if (storage !== null) {
            let storageParseado = JSON.parse(storage);
            let storageFiltrado = storageParseado.filter(id => id !== this.props.results.id);
            localStorage.setItem("favoritesSeries", JSON.stringify(storageFiltrado));
        }
        this.setState({ esFavorito: false });
    }

    btnVerMas() {
        this.setState({ verMas: !this.state.verMas });
    }

    render() {
        let btn = 'Ver Mas';
        let detalleSeries = null;
        let series = this.props.results;

        if (this.state.verMas === true) {
            btn = 'Ver Menos';
            detalleSeries = <p>{series.overview}</p>;
        }

        const userLogged = cookies.get("auth-user");

        return (
            <article className="single-card-movie">
                <img src={`https://image.tmdb.org/t/p/w342${series.poster_path}`} className="card-img-top" alt={series.name} />
                <div className="cardBody">
                    <h5 className="card-title">{series.name}</h5>
                    
                    {detalleSeries}
                    
                    <button className='btn btn-primary' onClick={() => this.btnVerMas()}>
                        {btn}
                    </button> 
                    
                    <Link to={`/SeriesDetail/${series.id}`} className='btn btn-primary'>
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

export default Series;