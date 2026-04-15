import React, { Component } from "react";
import { Link } from "react-router-dom";
import './MoviesCard.css';

class MoviesCard extends Component {
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
                        <a href="" class="btn alert-primary">🩶</a>
                    </div>
                </article>
            )
        }
    }


export default MoviesCard

/**
Foto.
Nombre o título.
Una descripción. La descripción iniciará oculta.
Link o botón "ver descripción" que debe mostrar/ ocultar la descripción.
Link o botón “ir a detalle” para navegar hasta la página de detalle del elemento.
Link, botón o ícono "agregar / quitar de favoritos", solamente disponible si la cookie de sesión existe.

 */