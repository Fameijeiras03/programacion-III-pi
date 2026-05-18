import {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import './Movies.css';

const cookies = new Cookies();

function Movies({ results }){
    const [verMas, setVerMas] = useState(false);
    const [esFavorito, setEsFavorito] = useState(false);
    useEffect(() => {
        let storage = localStorage.getItem("favoritesMovies");
        if (storage !== null) {
            let storageParseado = JSON.parse(storage);
            let esta = storageParseado.includes(results.id);
            if (esta) {
                setEsFavorito(true);
            }
        }
    }, []);
    function agregarFavorito() {
        let storage = localStorage.getItem("favoritesMovies");
        let favoritesMovies = [];

        if (storage !== null) {
            favoritesMovies = JSON.parse(storage);
        }

        favoritesMovies.push(results.id);
        localStorage.setItem("favoritesMovies", JSON.stringify(favoritesMovies));
        
        setEsFavorito(true);
        
    }
    function sacarFavorito() {
        let storage = localStorage.getItem("favoritesMovies");
        if (storage !== null) {
            let storageParseado = JSON.parse(storage);
            let storageFiltrado = storageParseado.filter(id => id !== results.id);
            
            localStorage.setItem("favoritesMovies", JSON.stringify(storageFiltrado));
        }
        
        setEsFavorito(false)
    }
    function btnVerMas() {
        setVerMas(!verMas);
    }
        let btn = 'Ver Mas';
        let detalleMovie = null;
        let movie = results;

        if (verMas === true) {
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
                    
                    <button className='btn btn-primary' onClick={() => btnVerMas()}>
                        {btn}
                    </button> 
                    
                    <Link to={`/MovieDetail/${movie.id}`} className='btn btn-primary'>
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






        };

export default Movies;