import React, {Component} from "react";
import SeriesCard from "../SeriesCard/SeriesCard";


class SectionAllSeries extends Component {
    constructor (props) {
        super(props)
        this.state = {AllSeriesList: [], page: 1}
    }
    componentDidMount(){
        fetch('https://api.themoviedb.org/3/discover/tv?api_key=e6ab0746b9dd21afaaa10cb1e2ec2d13')
            .then( response => response.json())
            .then( data => this.setState(
                {AllSeriesList: data.results}
            ))
            .catch( error => console.log(error));
    }
    cargarMasSeries(){
        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=e6ab0746b9dd21afaaa10cb1e2ec2d13&page=${this.state.page + 1}`)
        .then( response => response.json())
        .then( data => this.setState(
            {
                AllSeriesList: this.state.AllSeriesList.concat(data.results),
                page: this.state.page + 1

            },
        ))
        .catch(error => console.log(error))
    }

    

    render(){
        return(
            <>
            <h2 className="alert alert-warning">Todas las series</h2>
            <section className="row cards" id="movies">
                {this.state.AllSeriesList.length === 0 ?
                <h3>Cargando...</h3> :
                this.state.AllSeriesList.map((series) => 
                
                <SeriesCard
                    key = {series.id}
                    results = {series}
                />
                )
                }
                <button className="btn btn-info" onClick={() => this.cargarMasSeries()}>Mas Personajes</button>
            </section>
            </>
        )
    }
}

export default SectionAllSeries