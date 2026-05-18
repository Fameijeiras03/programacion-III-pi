import {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Series({ results }) {
    const [verMas, setVerMas] = useState(false);
    const [esFavorito, setEsFavorito] = useState(false);

    useEffect(() => {
        let storage = localStorage.getItem("favoritesSeries");
        if (storage !== null) {
            let storageParseado = JSON.parse(storage);
            let esta = storageParseado.includes(results.id);
            if (esta) {
                setEsFavorito(true);
            }
        }
    }, []);

    function agregarFavorito() {
        let storage = localStorage.getItem("favoritesSeries");
        let favoritesSeries = [];

        if (storage !== null) {
            favoritesSeries = JSON.parse(storage);
        }

        favoritesSeries.push(results.id);
        localStorage.setItem("favoritesSeries", JSON.stringify(favoritesSeries));
        setEsFavorito(true);
    }

    function sacarFavorito() {
        let storage = localStorage.getItem("favoritesSeries");
        if (storage !== null) {
            let storageParseado = JSON.parse(storage);
            let storageFiltrado = storageParseado.filter(id => id !== results.id);
            localStorage.setItem("favoritesSeries", JSON.stringify(storageFiltrado));
        }
        setEsFavorito(false);
    }
    
    function btnVerMas() {
        setVerMas(!verMas);
    }

        let btn = 'Ver Mas';
        let detalleSeries = null;
        let series = results;

        if (verMas === true) {
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
                    
                    <button className='btn btn-primary' onClick={() => btnVerMas()}>
                        {btn}
                    </button> 
                    
                    <Link to={`/SeriesDetail/${series.id}`} className='btn btn-primary'>
                        Detalle
                    </Link> 

                    {userLogged !== undefined ? (
                        esFavorito === false ? (
                            <button className='btn alert-primary' onClick={() => agregarFavorito()}>
                                Agregar a favoritos
                            </button>
                        ) : (
                            <button className='btn alert-danger' onClick={() => sacarFavorito()}>
                                Sacar de favoritos
                            </button>
                        )
                    ) : null}
                </div>
            </article>
        );
    }

export default Series;