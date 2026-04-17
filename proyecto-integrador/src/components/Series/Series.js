import React, { Component } from "react";
import { Link } from "react-router-dom";

class Series extends Component {
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
            let detalleSeries 
            let series = this.props.results
            if (this.state.verMas === true) {
                btn = 'Ver Menos'
                detalleSeries = [
                    <p>{this.props.results.overview}</p>,
                ]
            }

            return(
                <article className="single-card-movie">
                    
                    <img src={`https://image.tmdb.org/t/p/w342${series.poster_path}`} className="card-img-top" alt={series.title}/>
                    <div className="cardBody">
                        <h5 className="card-title">{series.title}</h5>
                        {detalleSeries}
                        <button className='btn btn-primary' onClick={()=>this.btnVerMas()} href='#'>{btn}</button> 
                        <Link to={`/series/${series.id}`} className='btn btn-primary'>Detalle</Link> 
                        <a href="" class="btn alert-primary">🩶</a>
                        
                    </div>
                    
                </article>
            )
        }
    }

export default Series
