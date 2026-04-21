import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import './Movies.css';

const cookies = new Cookies();

class Movies extends Component {
        constructor(props){
            super(props)
            this.state = {
                verMas: false
            }
        }
        btnVerMas (){
            this.setState(
                {verMas: !this.state.verMas}
            )
        }

        agregarFavorito(){
        let movie = this.props.results;
        let favoritesMovies = [];

        if (localStorage.getItem("favoritesMovies") !== null){
            favoritesMovies = JSON.parse(localStorage.getItem("favoritesMovies"));
        }

        favoritesMovies.push(movie);
        localStorage.setItem("favoritesMovies", JSON.stringify(favoritesMovies));
    }
        render(){
            let btn = 'Ver Mas'
            let detalleMovie 
            let movie = this.props.results
            if (this.state.verMas === true) {
                btn = 'Ver Menos'
                detalleMovie = [
                    <p>{this.props.results.overview}</p>,
                ]
            }

            return(
                <article className="single-card-movie">
                    
                    <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} className="card-img-top" alt={movie.title}/>
                    <div className="cardBody">
                        <h5 className="card-title">{movie.title}</h5>
                        {detalleMovie}
                        <button className='btn btn-primary' onClick={()=>this.btnVerMas()} href='#'>{btn}</button> 
                        <Link to={`/movie/${movie.id}`} className='btn btn-primary'>Detalle</Link> 
                        {cookies.get('session') && 
                        <button className='btn alert-primary' onClick={() => this.agregarFavorito()}>🩶</button>
}
                        
                    </div>
                    
                </article>
            )
        }
    }


export default Movies