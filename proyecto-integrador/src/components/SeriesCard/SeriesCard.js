import React, { Component } from "react";
import { Link } from "react-router-dom";
import './SeriesCard.css';

class SeriesCard extends Component {
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
            let detalleSerie 
            let serie = this.props.results
            if (this.state.verMas === true) {
                btn = 'Ver Menos'
                detalleSerie = [
                    <p>{this.props.results.overview}</p>,
                ]
            }

            return(
                <article className="single-card-tv">
                    
                    <img src={`https://image.tmdb.org/t/p/w342${serie.poster_path}`} className="card-img-top" alt={serie.title}/>
                    <div className="cardBody">
                        <h5 className="card-title">{serie.title}</h5>
                        {detalleSerie}
                        <button className='btn btn-primary' onClick={()=>this.btnVerMas()} href='#'>{btn}</button> 
                        <Link to={`/serie/${serie.id}`} className='btn btn-primary'>Detalle</Link> 
                        <a href="" class="btn alert-primary">🩶</a>

                    </div>
                </article>
            )
        }
    }


export default SeriesCard